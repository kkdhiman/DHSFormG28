node {

    // NOTE the following required environment variables needed in Jenkins for
    // running this pipeline:
    //
    // UI_IMAGE_NAME - UI Docker Image name in the registry that should be moved to PROD
    // API_IMAGE_NAME - API Docker Image name in the registry that should be moved to PROD
    // UI_TASK_DEFINITION_NAME - The UI PROD ECS Fargate Task Definition
    // API_TASK_DEFINITION_NAME - The API PROD ECS Fargate Task Definition
    // CLUSTER_NAME - The ECS Fargate PROD Cluster
    // UI_SERVICE_NAME - The PROD Cluster UI Service Name
    // API_SERVICE_NAME - The PROD Cluster API Service Name

    stage('Checkout Code') {
        checkout([
            $class: 'GitSCM', 
            branches: [[name: '*/master']], 
            doGenerateSubmoduleConfigurations: false, 
            extensions: [], 
            submoduleCfg: [], 
            userRemoteConfigs: [[url: 'https://github.com/DevTechnology/DHSFormG28.git']]])
    }

    stage('Deploy DHS Form G28 Microservices to PROD') {

        sh '''

            # Get the ECS Registry login string
            DOCKER_LOGIN=`aws ecr get-login --no-include-email --region us-east-1`

            # Execute ECS Registry login command
            ${DOCKER_LOGIN}

            UI_IMG=${UI_IMAGE_NAME}
            if [ "$UI_IMG" = "UNDEFINED" ]; then
                # Get the latest DEV Image associated with the UI Microservice.  Use jq to parse JSON on cli.
                UI_IMG=`aws ecs describe-task-definition --task-definition UI | jq .taskDefinition.containerDefinitions[0].image`
            fi

            echo "Identified UI Image ${UI_IMG} for PROD Deploy."

            API_IMG=${API_IMAGE_NAME}
            if [ "$API_IMG" = "UNDEFINED" ]; then
                # Get the latest DEV Image associated with the API Microservice.  Use jq to parse JSON on cli.
                API_IMG=`aws ecs describe-task-definition --task-definition API | jq .taskDefinition.containerDefinitions[0].image`
            fi

            echo "Identified API Image ${API_IMG} for PROD Deploy."

            #########################################################################
            # Update the UI PROD Task Definition
            #########################################################################
            orig="##TAG##"
            cd /var/lib/jenkins/workspace/DHSFormG28-PROD-Deploy/UI/docker/deploy
            sed "s~$orig~${UI_IMG}~g" "docker-compose-template.yml" > "docker-compose.yml"

            # Refresh cluster with new image in registry
            /usr/local/bin/ecs-cli compose --project-name ${UI_TASK_DEFINITION_NAME} up --launch-type FARGATE -c ${CLUSTER_NAME}

            VERSION=`aws ecs describe-task-definition --task-definition ${UI_TASK_DEFINITION_NAME} | egrep "revision" | tr "/" " " | awk '{print $2}' | sed 's/"$//'`
            
            # TODO: use jq to parse JSON to get this value instead of egrep
            #DESIRED_COUNT=`aws ecs describe-services --services ${UI_SERVICE_NAME} --cluster ${CLUSTER_NAME} | egrep "desiredCount" | tr "/" " " | awk '{print $2}' | sed 's/,$//'`
            DESIRED_COUNT=1
            if [ ${DESIRED_COUNT} = "0" ]; then
                DESIRED_COUNT="1"
            fi

            aws ecs update-service --cluster ${CLUSTER_NAME} --service ${UI_SERVICE_NAME} \
                --task-definition ${UI_TASK_DEFINITION_NAME}:${VERSION} --desired-count ${DESIRED_COUNT}

            #########################################################################
            # Update the API PROD Task Definition
            #########################################################################
            orig="##TAG##"
            cd /var/lib/jenkins/workspace/DHSFormG28-PROD-Deploy/API/docker/deploy
            sed "s~$orig~${API_IMG}~g" "docker-compose-template.yml" > "docker-compose-temp.yml"

            env_tag="##ENV##"
            env_val="PROD"

            # Update the Docker Environment Variable to indicate PROD
            sed "s~$env_tag~$env_val~g" "docker-compose-temp.yml" > "docker-compose-temp1.yml"

            PGDATABASE="##PGDATABASE##"
            PGHOST="##PGHOST##"
            PGPASSWORD="##PGPASSWORD##"
            PGPORT="##PGPORT##"
            PGUSER="##PGUSER##"

            sed "s~$PGDATABASE~$PGDATABASE_VAL~g" "docker-compose-temp1.yml" > "docker-compose-temp2.yml"
            sed "s~$PGHOST~$PGHOST_VAL~g" "docker-compose-temp2.yml" > "docker-compose-temp3.yml"
            sed "s~$PGPASSWORD~$PGPASSWORD_VAL~g" "docker-compose-temp3.yml" > "docker-compose-temp4.yml"
            sed "s~$PGPORT~$PGPORT_VAL~g" "docker-compose-temp4.yml" > "docker-compose-temp5.yml"
            sed "s~$PGUSER~$PGUSER_VAL~g" "docker-compose-temp5.yml" > "docker-compose.yml"

            # Refresh cluster with new image in registry
            /usr/local/bin/ecs-cli compose --project-name ${API_TASK_DEFINITION_NAME} up --launch-type FARGATE -c ${CLUSTER_NAME}

            VERSION=`aws ecs describe-task-definition --task-definition ${API_TASK_DEFINITION_NAME} | egrep "revision" | tr "/" " " | awk '{print $2}' | sed 's/"$//'`
            
            # TODO: use jq to parse JSON to get this value instead of egrep
            #DESIRED_COUNT=`aws ecs describe-services --services ${API_SERVICE_NAME} --cluster ${CLUSTER_NAME} | egrep "desiredCount" | tr "/" " " | awk '{print $2}' | sed 's/,$//'`
            DESIRED_COUNT=1
            #if [ ${DESIRED_COUNT} = "0" ]; then
            #    DESIRED_COUNT="1"
            #fi

            aws ecs update-service --cluster ${CLUSTER_NAME} --service ${API_SERVICE_NAME} \
                --task-definition ${API_TASK_DEFINITION_NAME}:${VERSION} --desired-count ${DESIRED_COUNT}

            # Cleanup
            rm -f docker-compose-temp[1-5].yml
            rm -f docker-compose-temp.yml
            rm -f docker-compose.yml

        '''
    }

}
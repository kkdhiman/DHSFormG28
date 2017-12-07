node {

    // Clean Workspace
    cleanWs()

    // Clean previously built images
    try {
        sh 'docker image rm g28form:latest -f'
    } catch (e) {
        echo 'Error removing previously generated image.  Not a big deal.'
    }

    try {
        sh 'docker image rm ${MASTER_IMAGE_NAME} -f'
    } catch (e) {
        echo 'Error removing previously tagged image.  Not a big deal.'
    }

    stage('Checkout Code') {
        checkout([
            $class: 'GitSCM', 
            branches: [[name: '*/master']], 
            doGenerateSubmoduleConfigurations: false, 
            extensions: [], 
            submoduleCfg: [], 
            userRemoteConfigs: [[url: 'https://github.com/DevTechnology/DHSFormG28.git']]])
    }

    // Perform the build in an appropriate docker container so we don't have to install
    // project specific artifacts on the Jenkins server itself.
    try {
        stage('Build UI') { 
            // TODO: Make these first three steps obsolete by creating a custom image.
            sh 'docker run -it -d --name="dhsg28-ui-build" \
                -v /var/lib/jenkins/workspace/DHSFormG28/UI:/app node:7'

            // Install angular ci so we can use 'ng' command in next step
            sh 'docker exec dhsg28-ui-build /bin/bash -c "npm install -g @angular/cli"'

            // Run npm install in the docker container
            sh 'docker exec dhsg28-ui-build /bin/bash -c "cd /app;npm install"'

            // Build artifacts
            sh 'docker exec dhsg28-ui-build /bin/bash -c "cd /app;ng build"'
        }

        stage('OWASP Dependency Security Scan') {

            echo('Running OWASP Vulnerability Security Scan on package.json...')

            sh '''
                # Define and create a directory for OWASP Dependency Data
                OWASP_DATA_DIR=${HOME}/owasp-data
                if [ ! -d "${OWASP_DATA_DIR}" ]; then
                    mkdir -p ${OWASP_DATA_DIR}
                    chmod -R 777 ${OWASP_DATA_DIR}
                fi

                # Define and create a directory for the OWASP Dependency Analysis Report run against node_modules
                OWASP_REPORT_DIR=${WORKSPACE}/owasp-report
                if [ ! -d "${OWASP_REPORT_DIR}" ]; then
                    mkdir -p ${OWASP_REPORT_DIR}
                    chmod -R 777 ${OWASP_REPORT_DIR}
                fi

                # Run the owasp/dependency-check Docker Container against the src directory of the earthquake-design-ws project
                docker run --rm \
                    -v ${WORKSPACE}/UI:/src:ro \
                    -v ${OWASP_DATA_DIR}:/usr/share/dependency-check/data:rw \
                    -v ${OWASP_REPORT_DIR}:/report:rw \
                    owasp/dependency-check \
                    --scan /src \
                    --format "ALL" \
                    -o /report \
                    -l /report \
                    --project "DHSFormG28"
            '''

            // Publish Dependency Scan Report
            publishHTML([
                allowMissing: false, 
                alwaysLinkToLastBuild: false, 
                keepAll: false, 
                reportDir: 'owasp-report', 
                reportFiles: 'dependency-check-vulnerability.html', 
                reportName: 'Dependency Vulnerability Report', 
                reportTitles: 'OWASP Dependency Scan'])

        }

        stage('Test UI') {
            // TODO: Run protractor and selenium to test front-end
            echo 'Testing...'
        }

        stage('Build Docker Container') {
            
            echo 'Building DHS G-28 Form Docker Image...'

            sh 'cd /var/lib/jenkins/workspace/DHSFormG28/UI; docker build -t g28form:latest .'
            
        }

        stage('Deploy to ECS') {
            
            echo 'Deploying DHSFormG28 Docker Image to ECS...'

            sh '''
                echo ${WORKSPACE}

                # Get the ECS Registry login string
                DOCKER_LOGIN=`aws ecr get-login --no-include-email --region us-east-1`

                # Execute ECS Registry login command
                ${DOCKER_LOGIN}

                # Tag Image
                tag=${MASTER_IMAGE_NAME}:v_${BUILD_NUMBER}

                # Push docker image to ECS Registry
                docker tag g28form:latest ${tag}

                # Push docker image to ECS Registry
                docker push ${tag}

                orig="##TAG##"
                cd /var/lib/jenkins/workspace/DHSFormG28/UI
                sed "s~$orig~$tag~g" "docker-compose-template.yml" > "docker-compose.yml"

                # Refresh cluster with new image in registry
                `/usr/local/bin/ecs-cli --cluster ${CLUSTER_NAME} --profile-name ${TASK_DEFINITION_NAME} compose up`

                VERSION=`aws ecs describe-task-definition --task-definition ${TASK_DEFINITION_NAME} | egrep "revision" | tr "/" " " | awk '{print $2}' | sed 's/"$//'`
                DESIRED_COUNT=`aws ecs describe-services --services ${SERVICE_NAME} | egrep "desiredCount" | tr "/" " " | awk '{print $2}' | sed 's/,$//'`
                if [ ${DESIRED_COUNT} = "0" ]; then
                    DESIRED_COUNT="1"
                fi

                aws ecs update-service --cluster ${CLUSTER_NAME} --service ${SERVICE_NAME} \
                    --task-definition ${TASK_DEFINITION_NAME}:${VERSION} --desired-count ${DESIRED_COUNT}
            '''

        }
    } finally {
        sh 'docker container stop dhsg28-ui-build'
        sh 'docker container rm dhsg28-ui-build'
    }
}
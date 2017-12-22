node {

    stage('Deploy DHS Form G28 Microservices to PROD') {

        sh '''

            # Get the ECS Registry login string
            DOCKER_LOGIN=`aws ecr get-login --no-include-email --region us-east-1`

            # Execute ECS Registry login command
            ${DOCKER_LOGIN}

            UI_IMG=${UI_IMAGE_NAME}
            if [ "$UI_IMG" = "UNDEFINED" ]; then
                # Get the latest DEV Image associated with the UI Microservice.  Use jq to parse JSON on cli.
                UI_IMG=aws ecs describe-task-definition --task-definition UI | jq .taskDefinition.containerDefinitions[0].image
            fi

            echo 'Identified UI Image $UI_IMG for PROD Deploy.'

            API_IMG=${API_IMAGE_NAME}
            if [ "$API_IMG" = "UNDEFINED" ]; then
                # Get the latest DEV Image associated with the API Microservice.  Use jq to parse JSON on cli.
                API_IMG=aws ecs describe-task-definition --task-definition API | jq .taskDefinition.containerDefinitions[0].image
            fi

            echo 'Identified API Image $API_IMG for PROD Deploy.'

        '''
    }

}
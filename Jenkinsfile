node {

    stage('Checkout Code') {
        checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/DevTechnology/DHSFormG28.git']]])
    }

    // Perform the build in an appropriate docker container so we don't have to install
    // project specific artifacts on the Jenkins server itself.
    try {
        stage('Build UI') { 
            sh 'docker run -it -d --name="dhsg28-ui-build" \
                -v /var/lib/jenkins/workspace/DHSFormG28:/src/app node:latest'

            // Run npm install in the docker container
            sh 'docker exec dhsg28-ui-build /bin/bash -c "cd /src/app/UI;npm install"'

            // Install angular ci so we can use 'ng' command in next step
            sh 'docker exec dhsg28-ui-build /bin/bash -c "npm install -g @angular/cli"'

            // Build artifacts
            sh 'docker exec dhsg28-ui-build /bin/bash -c "cd /src/app/UI;ng build"'
        }

        stage('Test UI') {
            echo 'Testing...'
        }
    } finally {
        sh 'docker container stop dhsg28-ui-build'
        sh 'docker container rm dhsg28-ui-build'
    }
}
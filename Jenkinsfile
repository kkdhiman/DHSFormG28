node {

    stage('Checkout Code') {
        checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/DevTechnology/DHSFormG28.git']]])
    }

    stage('UI') {
        /* Requires the Docker Pipeline plugin to be installed */
        docker.image('node:7-alpine').inside {
            stage('Build') { 
                echo 'Building...'

                // Change to the UI project dir and list files
                sh 'cd UI; pwd; ls -la; node --version; npm --version'

                // Run npm install to install node dependencies
                sh 'cd UI; npm install'

                // Use Angule CLI to create build artifacts
                sh 'cd UI; ng build'
            }

            stage('Test') {
                echo 'Testing...'
            }
        }
    }
}
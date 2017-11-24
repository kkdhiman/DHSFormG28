node {

    stage('Checkout Code') {
        checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/DevTechnology/DHSFormG28.git']]])
    }

    stage('UI') {
        /* Requires the Docker Pipeline plugin to be installed */
        docker.image('node:carbon').inside('-w ${WORKSPACE}/UI') {
            stage('Build') { 
                echo 'Building...'
                sh 'cd UI; pwd; ls -la'
                /*sh 'npm install'
                sh 'ng build'*/
            }
            stage('Test') {
                echo 'Testing...'
            }
            stage('Deploy') {
                echo 'Deploying..'
            }
        }
    }
}
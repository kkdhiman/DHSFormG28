node {

    stage('UI') {
        /* Requires the Docker Pipeline plugin to be installed */
        docker.image('node:carbon').inside() {
            stage('Build') { 
                echo 'Building...'
                sh 'cd UI; pwd'
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
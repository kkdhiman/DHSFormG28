node {

    stage('UI') {
        /* Requires the Docker Pipeline plugin to be installed */
        docker.image('node:carbon').inside('-v $WORKSPACE/UI:/usr/src/app') {
            stage('Build') { 
                echo 'Building...'
                sh 'npm install'
                sh 'ng build'
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
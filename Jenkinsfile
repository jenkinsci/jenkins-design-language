pipeline {
    agent {
        docker { image 'node:carbon' }
    }
    stages {
        stage('Install') {
            steps {
                sh 'npm install'
                sh 'npm run bootstrap'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}

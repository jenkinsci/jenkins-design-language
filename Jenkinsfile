pipeline {
    agent {
        docker { image 'node:carbon' }
    }
    environment {
        HOME = '.'
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

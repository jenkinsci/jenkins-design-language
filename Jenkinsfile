pipeline {
    agent {
        docker {
            image 'node:carbon'
            args '-u 0:0'
        }
    }
    stages {
        stage('Install') {
            steps {
                sh 'npm install'
                sh 'npm run bootstrap'
                sh 'npm run lint'
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
            post {
                always {
                    junit 'junit.xml'
                }
            }
        }
    }
}

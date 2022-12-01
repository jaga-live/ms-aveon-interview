pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ms-interview .'
            }
        }
        stage('Stop running Container') {
            steps {
                sh 'docker rm ms-interview --force'
            }
        }
        stage('Start Container') {
            steps {
                sh 'docker run -p 5003:5000 -d --name ms-interview ms-interview'
            }
        }

    }
}
pipeline {
    agent { label 'Jenkins' }

    stages {
        stage('Docker check') {
            steps {
                sh 'docker ps -a'
                sh 'docker images'
            }
        }
        stage('Docker up') {
            steps {
                sh 'docker compose up'
            }
        }
        stage('Docker check 1') {
            steps {
                sh 'docker ps -a'
                sh 'docker images'
            }
        }
    }
}

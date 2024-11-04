pipeline {
    agent { label 'Jenkins' }

    stages {
        stage('Docker check') {
            steps {
                sh 'docker ps -a'
                sh 'docker images'
                sh 'docker --help'
            }
        }
        stage('Docker up') {
            steps {
                sh 'docker Compose up'
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

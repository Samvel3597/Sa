pipeline {
    agent { label 'Jenkins' }
    environment {
        withCredentials([string(credentialsId: 'Telegram_BotID', variable: 'BotID')]) {
            My_Bot = ${ BotID }
        }
        withCredentials([string(credentialsId: 'Telegram_Chat_id', variable: 'Chat_id')]) {
            My_Chat_id = ${ Chat_id }
        }
    }

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
                sh 'docker Compose up '
            }
        }
        stage('Docker check 1') {
            steps {
                sh 'docker ps -a'
                sh 'docker images'
            }
        }
        stage('Send message') {
            steps {
                sh 'curl https://api.telegram.org/bot${My_Bot}/sendMessage?chat_id=${My_Chat_id}&text=From Jenkins Ok'
            }
        }
    }
}

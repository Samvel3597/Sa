pipeline {
    agent { label 'Jenkins' }
    environment {
        withCredentials([string(credentialsId: 'telegram_bot_id', variable: 'BotID')]) {
            My_Bot = ${ BotID }
        }
        withCredentials([string(credentialsId: 'telegram_chat_id', variable: 'Chat_id')]) {
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

            steps('Send message') {
                sh 'curl https://api.telegram.org/bot${My_Bot}/sendMessage?chat_id=${My_Chat_id}&text=From Jenkins Ok'
            }
        }
    }
}

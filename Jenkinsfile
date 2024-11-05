
pipeline {
    agent { label 'Jenkins' }

    stages {
        stage('Docker check') {
            steps {
                script {
                        sh 'docker ps -a'
                        sh 'docker images'
                        sh 'docker --help'
                }
            }
        }
        stage('Send message') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'telegram_bot_id', variable: 'BotID'),
                                     string(credentialsId: 'telegram_chat_id', variable: 'Chat_id')]) {
                        def My_Bot = BotID
                        def My_Chat_id = Chat_id
                        sh "curl https://api.telegram.org/bot${My_Bot}/sendMessage?chat_id=${My_Chat_id}&text=From Jenkins Ok"
                    }
                }
            }
        }
    }
}

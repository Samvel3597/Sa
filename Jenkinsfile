pipeline {
    agent { label 'Jenkins' }

    stages {
        stage('Remove old files') {
            steps {
                sh 'rm -r -f Sa/'
            }
        }
        stage('Git clone') {
            steps {
                sh 'git clone https://github.com/Samvel3597/Sa.git'
            }
        }
    }
}

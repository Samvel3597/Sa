pipeline {
    agent { label 'Jenkins' }

    stages {
        stage('Remove old files') {
            steps {
                sh 'rm -r -f Sa/'
            }
        }
        stage('Check') {
            steps {
                sh 'echo ===================================='
                sh 'pwd'
                sh 'ls -la'
                sh 'cat Jenkinsfile'
            }
        }
    }
}

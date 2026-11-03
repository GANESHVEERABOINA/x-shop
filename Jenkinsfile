pipeline {
    agent any
    parameters {
        choice(name: 'ACTION', choices: ['apply', 'destroy'], description: 'Select apply to create servers or destroy to clean them up')
    }
    environment {
        AWS_DEFAULT_REGION = 'ap-south-2'
    }
    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ganeshveeraboina/YOUR_REPO_NAME.git'
            }
        }
        
        stage('Terraform Init & Plan') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-creds']]) {
                    dir('terraform') { 
                        sh 'terraform init'
                        sh 'terraform plan'
                    }
                }
            }
        }
        
        stage('Terraform Apply / Destroy') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-creds']]) {
                    dir('terraform') {
                        sh 'terraform ${ACTION} -auto-approve'
                    }
                }
            }
        }
    }
}

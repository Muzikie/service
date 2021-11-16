@Library('lisk-jenkins') _

def echoBanner(msg) {
	echo '----------------------------------------------------------------------'
	echo msg
	echo '----------------------------------------------------------------------'
}

pipeline {
	agent { node { label 'lisk-service' } }
	options {
		timeout(time: 7, unit: 'MINUTES')
	}
	stages {
		stage ('Build deps') {
			steps {
				script { echoBanner(STAGE_NAME) }
				nvm(getNodejsVersion()) {
					dir('./') { sh 'npm ci --cache .npm' }
					dir('./framework') { sh 'npm ci --cache .npm' }
					dir('./services/core') { sh 'npm ci --cache .npm' }
					dir('./services/market') { sh 'npm ci --cache .npm' }
					dir('./services/newsfeed') { sh 'npm ci --cache .npm' }
					dir('./services/gateway') { sh 'npm ci --cache .npm' }
					dir('./services/export') { sh 'npm ci --cache .npm' }
					dir('./services/template') { sh 'npm ci --cache .npm' }
					dir('./tests') { sh 'npm ci --cache .npm' }
				}
			}
		}
		stage ('Check linting') {
			steps {
				script { echoBanner(STAGE_NAME) }
				nvm(getNodejsVersion()) {
					sh 'npm run eslint'
				}
			}
		}
		stage('Perform unit tests') {
			steps {
				script { echoBanner(STAGE_NAME) }
				nvm(getNodejsVersion()) {
					dir('./framework') { sh "npm run test:unit" }
					dir('./services/core') { sh "npm run test:unit" }
					dir('./services/market') { sh "npm run test:unit" }
					dir('./services/newsfeed') { sh "npm run test:unit" }
				}
			}
		}
	}
	post {
		failure {
			script { echoBanner('Failed to run the pipeline') }
		}
		cleanup {
			script { echoBanner('Cleaning up...') }

			dir('./') { sh 'make clean-local' }
		}
	}
}
// vim: filetype=groovy

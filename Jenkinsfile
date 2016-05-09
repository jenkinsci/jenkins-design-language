docker.image("node").inside {
    sh "export HOME=."
    stage "Checkout and build"
        checkout scm
	sh "npm install"

    stage "Test and validate"	
        sh "npm run gulp"
}

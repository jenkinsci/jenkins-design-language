docker.image("npm").inside {
    stage "Checkout and build"
        checkout scm
	sh "npm install"

    stage "Test and validate"	
        sh "npm run gulp"
}

docker.image("node").inside {
    
    /* 
     * - set the HOME so that npm doesn't try to write to root... which is a bit odd of the image.
     */

    stage "Checkout and build"
    	echo "${pwd}"
        checkout scm
	sh "HOME=. && npm install"

    stage "Test and validate"	
        sh "HOME=. && npm run gulp"
}


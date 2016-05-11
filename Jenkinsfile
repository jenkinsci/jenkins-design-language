node {
     def environment  = docker.build 'cloudbees-node'
     environment.inside {
      stage "Checkout and build"
        checkout scm
	sh "npm install"

       stage "Test and validate"	
          sh "npm run gulp"
     }


}


node {

     stage "Prepare environment"
       deleteDir()
       checkout scm
       def environment  = docker.build 'cloudbees-node'

       environment.inside {
        stage "Checkout and build"
          sh "npm install"

         stage "Install gulp" 
          sh 'npm install gulp-cli'
          
         stage 'Test' 
          sh './node_modules/.bin/gulp'
       }

     stage "Cleanup"
      deleteDir()

}
docker.image("cloudbees/java-build-tools").inside {
    checkout scm
    sh "npm install"
    sh "npm run gulp"
}

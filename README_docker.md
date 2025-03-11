# Docker & DevOps related

Currently there are 3 files and 1 dir related to docker and github action:

files:
    Dockerfile
    entrypoint.sh
    docker.sh
dir:
    .github/workflow/ci.yaml

A) docker.sh is the entrance to all docker related operations, please ensure docker
or podman is installed before using. E.g. to install one of these on Ubuntu:

    $ sudo apt-get install docker # or
    $ sudo apt-get install podman # podman is equal to docker

1. Build docker image:
    $ ./docker.sh build
2. Run docker image to bring up the website:
    $ ./docker.sh run
   Then open your browser and open to http://127.0.0.1:3000
3. Run test, currently there is only lint test ready for use:
    $ ./docker.sh test
4. To stop the docker container:
    $ ./docker.sh stop

B) Dockerfile is used during docker image building.

C) entrypoint.sh is the common entry where docker image start to run. Basically
   it is a wrapper of npm commands.

D) .github/workflow/ci.yaml is used by github actions, which will be triggered
   each time of push or PR happens on main branch. It will run the docker staff
   within a ubuntu VM, so we can ask it to run our lint tests as well as functional
   tests by curl.

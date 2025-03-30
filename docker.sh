#!/bin/bash

DK_CMD=""
PROJECT_NAME="githired-fe"
PORT="3000"

if command -v docker &> /dev/null; then
	DK_CMD="docker"
elif command -v podman &> /dev/null; then
	DK_CMD="podman"
else
	echo "Neither Docker nor Podman is installed."
	exit 1
fi

case "$1" in
"build")
	DK_CMD="$DK_CMD build -t $PROJECT_NAME ."
	eval "$DK_CMD"
	;;
"run")
	DK_CMD="$DK_CMD run --rm -d -p $PORT:$PORT $PROJECT_NAME"
	eval "$DK_CMD"
	;;
"test")
	DK_CMD="$DK_CMD run -e ACTION=lint --rm $PROJECT_NAME"
	eval "$DK_CMD"
	;;
"stop")
	containers=$("$DK_CMD" ps | grep "$PROJECT_NAME" | awk '{print $1}')
	DK_CMD="$DK_CMD stop $containers"
	eval "$DK_CMD"
	;;
*)
	echo "Unexpected parameter: '$1'"
	exit 1
	;;
esac

#!/bin/bash

ACTION=${ACTION:-"dev"}

case "$ACTION" in
"dev")
	;&
"lint")
	;&
"build")
	;&
"start")
	npm run "$ACTION"
	;;
*)
	echo "Unexpected action '$ACTION'"
	;;
esac

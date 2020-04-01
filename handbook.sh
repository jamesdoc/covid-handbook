#!/usr/bin/env bash

PROJECT_FOLDER="/Users/lintoncaldecott/Desktop/foo"


case "$1" in

repo)
    open http://
;;

trello)
    open http://
;;

bash)
   code $0
;;

*)
    # test if script is sourced
    if [[ $0 = ${BASH_SOURCE} ]] ; then
        echo " Valid commands: "
        echo "-------------------------------------------------- "
        echo " bash          edit this script"
        echo " trello        project trello board"
        echo " repo          browse the project repo"
	    echo "-------------------------------------------------- "
    else
        cd $PROJECT_FOLDER
    fi
;;
esac
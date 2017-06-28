#!/bin/bash

REMOTEPATH='/public_html/'
LOCALPATH='./_jrecotec/_site/'

FTPUSER=$1
FTPHOST='66.7.195.240'

lftp -c "set ftp:list-options -a; open ftp://$FTPUSER@$FTPHOST; lcd $LOCALPATH; cd $REMOTEPATH; mirror --reverse --delete --use-cache --verbose --allow-chown --allow-suid --no-umask --parallel=2"

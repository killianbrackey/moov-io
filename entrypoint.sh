#!/bin/bash

NAMESERVER=$(cat /etc/resolv.conf |grep -i '^nameserver'|head -n1|cut -d ' ' -f2)

cat /opt/nginx/conf.d/default.conf.tpl | sed "s/resolver NS;/resolver $NAMESERVER;/g" > /opt/nginx/conf.d/default.conf

exec nginx "$@"

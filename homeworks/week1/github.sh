#!/bin/bash
content="$(curl -s https://api.github.com/users/$1)"

for keyword in name bio location blog ##
do
echo "$content" | grep -w $keyword | cut -d'"' -f4
done
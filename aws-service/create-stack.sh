#!/bin/bash

aws cloudformation create-stack --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM \
--stack-name Dentistimo \
--template-body file://./dentistimo.yaml


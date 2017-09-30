#!/bin/bash
# create build package for Alexa skill and stage in S3 bucket for deployment

cd ../src

zip -r build.zip index.js package.json node_modules/

aws s3 cp index.js s3://trainempire/binaries/
aws s3 cp build.zip s3://trainempire/binaries/

aws lambda update-function-code --function-name trainEmpireGreen --s3-bucket trainempire --s3-key binaries/build.zip

rm build.zip


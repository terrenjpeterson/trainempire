#!/bin/bash
# create build package for Alexa skill, stage in S3 bucket for deployment,
# and update the lambda function

# set to correct directory where source files are located
cd ../src

# create zip file with all of the necessary packages
zip -r build.zip index.js cities.json populations.json package.json connections.json node_modules/

# copy some of the files to a staging bucket in case need for research
aws s3 cp index.js s3://trainempire/binaries/
aws s3 cp build.zip s3://trainempire/binaries/
aws s3 cp connections.json s3://trainempire/binaries/

# cleanup temporary file
rm build.zip

# update the lambda function with the binaries that have been staged
aws lambda update-function-code --function-name trainEmpireGreen --s3-bucket trainempire --s3-key binaries/build.zip

# validate that the new lambda function works
# move back to the local directory
cd ../tools
# read test data into local variable
request=$(<request.json)
# invoke the new lambda function
aws lambda invoke --function-name trainEmpireGreen --payload "$request" response.json

# read response file into local variable then print on the console
response=$(<response.json)
echo $response

echo 'complete'

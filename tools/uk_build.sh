#!/bin/bash
# create build package for Alexa skill, stage in S3 bucket for deployment,
# and update the lambda function

# set to correct directory where source files are located
cd ../src

# create zip file with all of the necessary packages
zip -r uk_build.zip uk_index.js uk_cities.json uk_populations.json uk_package.json uk_connections.json node_modules/

# copy some of the files to a staging bucket in case need for research
aws s3 cp uk_index.js s3://trainempire/binaries/
aws s3 cp uk_build.zip s3://trainempire/binaries/
aws s3 cp uk_connections.json s3://trainempire/binaries/

# cleanup temporary file
rm uk_build.zip

# update the lambda function with the binaries that have been staged
aws lambda update-function-code --function-name ukTrainEmpireSkillGreen --s3-bucket trainempire --s3-key binaries/uk_build.zip

# validate that the new lambda function works
# move back to the local directory
cd ../tools
# read test data into local variable
request=$(<uk_request.json)
# invoke the new lambda function
aws lambda invoke --function-name ukTrainEmpireSkillGreen --payload "$request" uk_response.json

# read response file into local variable then print on the console
response=$(<uk_response.json)
echo $response

echo 'complete'

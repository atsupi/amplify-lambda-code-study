/* Amplify Params - DO NOT EDIT
  API_AMPLIFYLAMBDACODESTU_CONTENTLISTTABLE_ARN
  API_AMPLIFYLAMBDACODESTU_CONTENTLISTTABLE_NAME
  API_AMPLIFYLAMBDACODESTU_GRAPHQLAPIIDOUTPUT
  ENV
  REGION
Amplify Params - DO NOT EDIT */


const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const fs = require('fs');
const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.API_AMPLIFYLAMBDACODESTU_CONTENTLISTTABLE_NAME;

exports.handler = async function (event) {
  console.log('Received S3 event:', JSON.stringify(event, null, 2));
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  const filename = key.split('/')[key.split('/').length - 1].split('.')[0];
  const extension = key.split('/')[key.split('/').length - 1].split('.')[1];
  console.log(`Bucket: ${bucket}`, `Key: ${key}`, `filename: ${filename}`);

  if (extension !== "mp4" && extension !== "mov")
    return;

  {
    const params = {
      TableName: tableName
    }
    try {
      const data = await docClient.scan(params).promise()
      console.log("Table", JSON.stringify(data));
      for (let i = 0; i < data.Count; i++) {
        console.log(i);
        if (data.Items[i].key === filename + '.' + extension) {
          console.log(`Key ${data.Items[i].key} exists already.`);
          return;
        }
      }
    } catch (err) {
      return { error: err }
    }
  }

  let thumbnailKey = "thumbnail/" + filename + '.gif';
  let duration = 0;

  process.env.PATH += ':/var/opt/bin';
  {
    const execSync = require('child_process').execSync;
    execSync('ffmpeg -version');
  }

  const getParams = {
    Bucket: bucket,
    Key: key
  }
  const uploadedData = await s3.getObject(getParams).promise().catch((err) => {
    console.log(err);
    return { error: err }
  });
  fs.writeFileSync('/tmp/' + filename + '.' + extension, uploadedData.Body);

  {
    const execSync = require('child_process').execSync;
    const stdout = execSync('ffprobe -i ' + '/tmp/' + filename + '.' + extension + ' -hide_banner -show_entries format=duration');
    console.log(stdout.toString());
    const data = stdout.toString().split('=');
    console.log(data);
    duration = parseFloat(data[1]);
    console.log("duration", duration);
  }
  {
    const execSync = require('child_process').execSync;
    const stdout = execSync('ffmpeg -ss 00:00:03 -i ' + '/tmp/' + filename + '.' + extension + ' -frames:v 1 /tmp/' + filename + '.gif -y');
    console.log(stdout.toString());
    const fs = require('fs');
    const fileStream = fs.createReadStream('/tmp/' + filename + '.gif');
    fileStream.on('error', function (error) {
      console.log(error);
      throw new Error(error);
    });
    const putParams = {
      Bucket: bucket,
      Key: 'public/' + thumbnailKey,
      Body: fileStream,
      ContentType: 'image/gif'
    }
    await s3.putObject(putParams).promise().catch((err) => {
      console.log(err);
      return { error: err }
    });
  }

  const id = new Date().getTime().toString();
  const dbWriteParams = {
    TableName: tableName,
    /* Item properties will depend on your application concerns */
    Item: {
      id: id,
      bucket: bucket,
      key: filename + '.' + extension,
      thumbnailFile: thumbnailKey,
      duration: duration,
      __typename: "ContentList"
    }
  }

  try {
    await docClient.put(dbWriteParams).promise();
  } catch (err) {
    return { error: err }
  }

  return {
    Result: 200,
    Backet: bucket,
    Key: key,
    Thumbnail: thumbnailKey,
    Duration: duration
  }
}

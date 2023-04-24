/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_LAMBDACODESTUDY_BUCKETNAME
Amplify Params - DO NOT EDIT */


const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const fs = require('fs');

async function getPresignedUrl(params) {
  return new Promise((resolve, reject) => {
    s3.getSignedUrl('getObject', params, (err, url) => {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    });
  })
}

exports.handler = async function (event) {
  console.log('Received S3 event:', JSON.stringify(event, null, 2));
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  const filename = key.split('/')[key.split('/').length - 1].split('.')[0];
  const extension = key.split('/')[key.split('/').length - 1].split('.')[1];
  console.log(`Bucket: ${bucket}`, `Key: ${key}`, `filename: ${filename}`);

  if (extension !== "mp4" && extension !== "mov")
    return;
  
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
  });
  fs.writeFileSync('/tmp/' + key, uploadedData.Body);

  {
    const execSync = require('child_process').execSync;
    const stdout = execSync('ffprobe -i ' + '/tmp/' + key + ' -hide_banner -show_entries format=duration');
    console.log(stdout.toString());
    const data = stdout.toString().split('=');
    console.log(data);
    duration = parseFloat(data[1]);
    console.log("duration", duration);
  }
  {
    const execSync = require('child_process').execSync;
    const stdout = execSync('ffmpeg -ss 00:00:03 -i ' + '/tmp/' + key + ' -frames:v 1 /tmp/' + filename + '.gif -y');
    console.log(stdout.toString());
    const fs = require('fs');
    const fileStream = fs.createReadStream('/tmp/' + filename + '.gif');
    fileStream.on('error', function(error) {
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
    });
  }

  return {
    Result: 200,
    Backet: bucket,
    Key: key,
    Thumbnail: thumbnailKey,
    Duration: duration
  }
}

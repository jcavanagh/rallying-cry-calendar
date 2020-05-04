import aws from 'aws-sdk';

aws.config.setPromisesDependency(Promise);
aws.config.update({ region: 'us-west-1' });

export default class AWS {
  s3 = null;

  constructor() {
    this.s3 = new aws.S3();
  }

  storeCalendar(iCal) {
    console.log('Saving calendar');
    console.log(iCal.toString());

    return this.s3
      .upload({
        Bucket: 'rallying-cry-calendar',
        Key: 'rallying-cry.ics',
        Body: iCal.toString(),
        ACL: 'public-read',
      })
      .promise()
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

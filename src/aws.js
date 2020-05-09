import aws, { ProcessCredentials } from 'aws-sdk';

import util from 'util';
const debug = util.debuglog('rcc');

aws.config.setPromisesDependency(Promise);
aws.config.update({ region: 'us-west-1' });

export default class AWS {
  s3 = null;

  constructor() {
    this.s3 = new aws.S3();
  }

  storeCalendar(realm, iCal) {
    if (process.env.RCC_ALLOW_WRITE !== 'true') {
      console.info(`Not saving calender for realm ${realm.name} - write disabled`);
      return;
    }

    console.info(`Saving calendar for realm ${realm.name}`);
    debug(iCal.toString());

    const cleanRealm = realm.name.toLowerCase().replace(/\s+/g, '-');

    return this.s3
      .upload({
        Bucket: 'rallying-cry-calendar',
        Key: `rallying-cry-${cleanRealm}.ics`,
        Body: iCal.toString(),
        ACL: 'public-read',
      })
      .promise()
      .then((resp) => {
        console.info(`Successfully saved calendar for realm: ${realm.name}`);
        debug(resp);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

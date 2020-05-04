import dotenv from 'dotenv';
dotenv.config();

import AWS from './aws.js';
import Discord from './discord.js';
import * as iCal from './ical.js';

const aws = new AWS();
const discord = new Discord(process.env.DISCORD_BOT_TOKEN);

discord
  .waitForLogin()
  .then(async () => {
    const realms = ['Ashkandi'];

    for (const realm of realms) {
      try {
        const events = await discord.getScheduleEvents(realm);
        await aws.storeCalendar(iCal.createFromDiscord(realm, events));
      } catch (e) {
        console.error(`Error creating calendar for ${realm}`);
        console.error(e);
        console.error(events);
      }
    }
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(() => discord.disconnect());

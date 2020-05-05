import dotenv from 'dotenv';
dotenv.config();

import AWS from './aws.js';
import Discord from './discord.js';
import * as iCal from './ical.js';

const realms = [
  {
    name: 'Rallying Cry Test',
    discord: {
      serverId: '706291021205602385',
      channelId: '706291156102676571',
    },
    timezone: 'America/New_York',
  },
  {
    name: 'Ashkandi',
    discord: {
      serverId: '644165390485946408',
      channelId: '645300955298004992',
    },
    timezone: 'America/New_York',
  },
];

const aws = new AWS();
const discord = new Discord(process.env.DISCORD_BOT_TOKEN);

discord
  .waitForLogin()
  .then(async () => {
    for (const realm of realms) {
      let events;
      try {
        events = await discord.getScheduleEvents(realm);
        if (events.length) {
          await aws.storeCalendar(realm, iCal.createFromDiscord(realm, events));
        } else {
          console.warn(`Not saving calendar for realm: ${realm.name} - no events found`);
        }
      } catch (e) {
        console.error(`Error creating calendar for ${realm.name}`);
        console.error(e);
        console.error(events);
      }
    }
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(() => discord.disconnect());

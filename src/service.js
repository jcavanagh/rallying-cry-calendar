import { add, edit, help, remove } from './commands/index.js';
import Discord from './discord.js';
import realms from './realms.js';

import express from 'express';
import util from 'util';
const debug = util.debuglog('rcc');

const app = express();

const commandPrefix = '!';
const commands = {
  add,
  edit,
  help,
  remove,
};

const locks = {};

export default () => {
  const discord = new Discord(process.env.DISCORD_BOT_TOKEN);

  discord
    .waitForLogin()
    .then(async () => {
      // Add listeners and wait for events
      discord.client.on('message', async (user, userId, channelId, message, evt) => {
        // Find realm
        const realm = realms.find((r) => r.discord.channelId == channelId);

        if (!realm) {
          debug(`Ignoring message - unknown channelId: ${channelId} - ${message}`);
          return;
        }

        // Check locks to avoid I/O races
        if (locks[realm.name]) {
          // TODO: Queue these or respond appropriately
          console.error(`Got message while processing another message for realm: ${realm.name}`);
          console.error('In progress:', locks[realm.name]);
          console.error('Received:', {
            realm,
            user,
            userId,
            channelId,
            message,
          });

          return;
        }

        // Lock realm
        locks[realm.name] = {
          realm,
          user,
          userId,
          channelId,
          message,
        };

        if (message.startsWith(commandPrefix)) {
          let args = message.substring(1).split(/\s+/);
          const cmd = args[0];
          args = args.splice(1);

          const cmdFn = commands[cmd];
          if (!cmdFn) {
            console.warn(`Invalid command: ${cmd}`);
          }

          // Call the handler
          try {
            await cmdFn.apply(null, [discord, realm, ...args]);
          } catch (e) {
            console.error(`Error running command: ${cmd} for realm ${realm.name}`, args);
          } finally {
            locks[realm.name] = false;
          }
        }
      });
    })
    .catch((e) => {
      console.error(e);
    });

  // Health check endpoint
  app.get('/health', (req, res) => {
    // Discord websocket states
    // READY: 0
    // CONNECTING: 1
    // RECONNECTING: 2
    // IDLE: 3
    // NEARLY: 4
    // DISCONNECTED: 5
    // WAITING_FOR_GUILDS: 6
    // IDENTIFYING: 7
    // RESUMING: 8
    const healthyStates = [0, 3];

    try {
      let status = 'DOWN';
      if (healthyStates.includes(discord?.client?.ws?.status)) {
        status = 'UP';
      }
    } catch (e) {
      console.error('Error in health check', e);
    }

    res.json({ status, locks });
  });

  app.listen(8080, () => console.log(`Listening at http://localhost:8080`));
};

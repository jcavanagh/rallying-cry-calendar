import discord from 'discord.js';
import parsers from './parsers/index.js';

import util from 'util';
const debug = util.debuglog('rcc');

export default class Discord {
  client = null;

  constructor(token) {
    this.client = new discord.Client();

    this.client.on('ready', () => {
      this.client.user.setStatus('online');
    });

    this.client.login(token);
  }

  async waitForLogin(interval = 1000, maxRetries = 5) {
    for (let retries = 0; retries < maxRetries; retries++) {
      await new Promise((resolve) => {
        setTimeout(resolve, interval);
      });

      if (this.client.readyAt) {
        return;
      }
    }

    throw new Error(`Failed to login to Discord - timeout after ${(maxRetries * interval) / 1000}s`);
  }

  async getChannelMessages(realm, type) {
    const guild = await this.client.guilds.resolve(realm.discord.serverId);
    if (!guild) {
      console.error(
        `Could not retrieve messages for server: ${realm.name} - bot is not a member of server ${realm.discord.serverId}`
      );
      return [];
    }

    const channel = await this.client.channels.fetch(realm.discord[type]?.channelId);
    if (!channel) {
      console.error(
        `Could not retrieve messages for server: ${realm.name} - bot could not read channel ${realm.discord[type]?.channelId}`
      );
      return [];
    }

    return channel.messages.fetch().then((results) =>
      results.map((r) => ({
        id: r.id,
        content: r.content,
        author: {
          id: r.author.id,
          username: r.author.username,
          usernameSuffix: r.author.discriminator,
          isBot: r.author.bot,
        },
      }))
    );
  }

  parseChannelMessages(realm, type, messages) {
    const parser = parsers[realm.name];

    if (!parser) {
      console.error(`Could not parse messages - no parser for realm ${realm.name}`);
    }

    return parser(realm, messages, type);
  }

  async getScheduleEvents(realm) {
    let allEvents = [];

    for (const type of realm.discord.types) {
      const messages = await this.getChannelMessages(realm, type);
      debug(`Messages found for ${realm.name} in channel ${realm.discord[type]?.channelId}`);
      debug(messages);

      const parsed = this.parseChannelMessages(realm, type, messages);
      debug(`Parsed messages from ${realm.name} in channel ${realm.discord[type]?.channelId}`);
      debug(parsed);

      allEvents = [...allEvents, ...parsed];
    }

    return allEvents;
  }

  disconnect() {
    this.client.destroy();
  }
}

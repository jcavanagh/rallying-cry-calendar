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

  async getRealmServer(realm) {
    const guild = await this.client.guilds.resolve(realm.discord.serverId);
    if (!guild) {
      console.error(
        `Could not get server for realm: ${realm.name} - bot is not a member of server ${realm.discord.serverId}`
      );
      return null;
    }

    return guild;
  }

  async getRealmChannel(realm) {
    const channel = await this.client.channels.fetch(realm.discord.channelId);
    if (!channel) {
      console.error(
        `Could not get server channel for realm: ${realm.name} - bot could not read channel ${realm.discord.channelId}`
      );
      return [];
    }

    return channel;
  }

  async sendMessage(realm, message) {
    const channel = await this.getRealmChannel(realm);
    if (!channel) {
      console.error(`Failed to send message to realm: ${realm.name} - no channel`);
      return;
    }

    return channel.send(message);
  }

  async getChannelMessages(realm) {
    const channel = await this.getRealmChannel(realm);
    if (!channel) {
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

  parseChannelMessages(realm, messages) {
    const parser = parsers[realm.name];

    if (!parser) {
      console.error(`Could not parse messages - no parser for realm ${realm.name}`);
    }

    return parser(realm, messages);
  }

  async getScheduleEvents(realm) {
    const messages = await this.getChannelMessages(realm);
    debug(`Messages found for ${realm.name} in channel ${realm.discord.channelId}`);
    debug(messages);

    const parsed = this.parseChannelMessages(realm, messages);
    debug(`Parsed messages from ${realm.name} in channel ${realm.discord.channelId}`);
    debug(parsed);

    return parsed;
  }

  disconnect() {
    this.client.destroy();
  }
}

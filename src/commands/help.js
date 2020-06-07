const helpMsg = 'TODO: Help message';

export default async function help(discord, realm) {
  return discord.sendMessage(realm, helpMsg);
}

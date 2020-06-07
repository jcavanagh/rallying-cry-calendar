import events from '../events.js';

export default async function remove(discord, realm, eventId) {
  let msg;
  try {
    const removed = events.remove(realm, eventId);
  } catch (e) {
    msg = `Failed to remove event ${eventId}: ${e.message}`;
    console.error(msg, e);
  }

  return discord.sendMessage(realm, msg);
}

import moment from 'moment-timezone';

import util from 'util';
const debug = util.debuglog('rcc');

// This is pretty rigid, but it'll do I guess
function extractEventsFromMessage(realm, message, type) {
  const events = [];

  debug(`Got message: ${message}`);

  if (!message) {
    return events;
  }

  // Split lines
  let lines = message
    .split('\n')
    // Remove any blanks
    .filter((l) => l)
    // Strip title line and header/footer delimiter lines
    .filter((l) => {
      return !l.startsWith('ONYXIA') && !l.startsWith('NEFARIAN') && !l.startsWith('==');
    })
    // Remove any vacancy blocks
    .filter((l) => {
      return !l.startsWith('--') && !l.includes('VACANT');
    })
    // Strip formatting
    .map((l) => {
      return l.replaceAll('*', '').replaceAll('_', '');
    });

  debug(`Filtered message: ${lines.join('\n')}`);

  // Take the rest in groups of three and create events
  if (lines.length < 3) {
    return events;
  }

  for (let idx = 0; idx <= lines.length - 3; idx += 3) {
    const guild = lines[idx];
    const character = lines[idx + 1];
    const dateStr = lines[idx + 2];

    debug(`Adding event:`);
    debug(`Guild: ${guild}`);
    debug(`Character: ${character}`);
    debug(`Date: ${dateStr}`);

    // Build date
    const dateFormat = 'dddd, MMM Do at h:mA';
    const date = moment.tz(dateStr, dateFormat, realm.timezone);

    events.push({
      summary: `Rallying Cry (${type})`,
      description: `${character} - ${guild}`,
      date: date.toDate(),
      location: `Stormwind City, ${realm.name}`,
    });
  }

  return events;
}

function getNefarianEvents(realm, messages) {
  const message = messages.find((m) => m.content.includes('NEFARIAN'));
  return extractEventsFromMessage(realm, message?.content, 'Nefarian');
}

function getOnyxiaEvents(realm, messages) {
  const message = messages.find((m) => m.content.includes('ONYXIA'));
  return extractEventsFromMessage(realm, message?.content, 'Onyxia');
}

export default function (realm, messages) {
  return [...getOnyxiaEvents(realm, messages), ...getNefarianEvents(realm, messages)];
}

import fs from 'fs';

function getPath(realm) {
  return `/data/${realm.name}.json`;
}

function writeEvents(realm, events) {
  try {
    fs.writeFileSync(getPath(realm), JSON.stringify(events));
  } catch (e) {
    console.error(`Failed to write events for realm: ${realm.name}`, e);
  }
}

export function getEvents(realm) {
  try {
    return fs.readFileSync(getPath(realm));
  } catch (e) {
    if (err.code === 'ENOENT') {
      return [];
    } else {
      throw err;
    }
  }
}

export function addEvent(realm, event) {
  const events = getEvents(realm);

  events.push(event);

  writeEvents(realm, events);
  return events;
}

export function editEvent(realm, eventId, event) {
  const events = getEvents(realm);

  if (!events[eventId]) {
    throw new Error(`Invalid event ID: ${eventId}`);
  }

  events[eventId] = {
    ...events[eventId],
    ...event,
  };

  writeEvents(realm, events);
  return events;
}

export function removeEvent(realm, eventId) {
  const events = getEvents(realm);

  if (!events[eventId]) {
    throw new Error(`Invalid event ID: ${eventId}`);
  }

  events.splice(eventId, 1);

  writeEvents(realm, events);
  return events;
}

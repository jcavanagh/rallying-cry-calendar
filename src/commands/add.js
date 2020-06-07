import moment from 'moment-timezone';

import events from '../events.js';

const isoWeekdays = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 7,
};

const cooldowns = {
  nefarian: 8,
  onyxia: 6,
};

// Returns a moment set to the next weekday
function getNextWeekday(realm, dayOfWeek) {
  const today = moment().isoWeekday();
  const targetDay = isoWeekdays[dayOfWeek.toLowerCase()];

  if (!targetDay) {
    return null;
  }

  if (today <= targetDay) {
    // TODO: Need to check for same-day-but-after-current-time
    //       In that case, it should be next week
    return moment.tz(realm.timezone).isoWeekday(targetDay);
  } else {
    return moment.tz(realm.timezone).add(1, 'weeks').isoWeekday(targetDay);
  }
}

function overlapsExistingEvent(realm, newEvent) {}

export default async function add(discord, realm, type, player, guild, dayOfWeek, time) {
  const date = getNextWeekday(realm, dayOfWeek);

  if (!date) {
    return discord.sendMessage(realm, `Could not interpret desired time: ${dayOfWeek} ${time}`);
  }

  const newEvent = {
    summary: `Rallying Cry (${type})`,
    description: `${player} - ${guild}`,
    startDate: date.toDate(),
    endDate: date.clone().add(5, 'm').toDate(),
    location: `Stormwind City, ${realm.name}`,
  };

  // Check for overlap
  if (overlapsExistingEvent(realm, newEvent)) {
    return discord.sendMessage();
  }

  return discord.sendMessage(realm, `Successfully added ${type} event at ${date.format('dddd, MMM Do h:mA')}`);
}

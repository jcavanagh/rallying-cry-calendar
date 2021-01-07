import moment from 'moment-timezone';

import util from 'util';
const debug = util.debuglog('rcc');

export default function (realm, messages, type) {
  // Markers
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const markers = {
    // This maps event type strings into the proper handlers below
    eventTypes: {
      hakkar: 'zandalar',
      soz: 'zandalar',
      onyxia: 'rallyingCry',
      nefarian: 'rallyingCry',
      ony: 'rallyingCry',
      nef: 'rallyingCry',
      rend: 'rend',
      wcb: 'rend',
    },
    // Common markers for the combined buff list
    common: {
      scheduleTitle: 'Rallying Spirit of Ashkandi',
      scheduleBorderDelim: '==',
      vacancyTitle: 'VACANT',
      vacancyBorderDelim: '--',
    },
    // Event types
    rallyingCry: {
      summary: (lineData) => `Rallying Cry (${lineData.type})`,
      location: `Stormwind City, ${realm.name}`,
    },
    zandalar: {
      summary: () => `Spirit of Zandalar`,
      location: `Yojamba Isle/Booty Bay, ${realm.name}`,
    },
    rend: {
      summary: () => `Warchief's Blessing`,
      location: `Orgrimmar/Crossroads, ${realm.name}`,
    },
    darkmoon: {
      title: 'Darkmoon Faire',
    },
  };

  // Extract mode markers
  const { scheduleTitle, scheduleBorderDelim, vacancyTitle, vacancyBorderDelim } = markers.common;

  // This is pretty rigid, but it'll do I guess
  function extractEventsFromMessage(realm, message) {
    const events = [];

    debug(`Got message: ${message}`);

    if (!message) {
      return events;
    }

    // Split lines
    let lines = message
      .split('\n')
      // Strip formatting
      .map((l) => {
        return l.replace(/[\*_~]/g, '');
      })
      // Strip emotes
      .map((l) => {
        return l.replace(/<:.+?>/g, '');
      })
      // Strip unicode emoji
      .map((l) => {
        return l.replace(
          /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
          ''
        );
      })
      // Strip excess whitespace
      .map((l) => {
        return l.trim();
      })
      // Remove any blanks
      .filter((l) => l)
      // Strip title line and header/footer delimiter lines
      .filter((l) => {
        return !l.startsWith(scheduleBorderDelim) && !l.startsWith(scheduleTitle);
      })
      // Strip Darkmoon Faire lines
      .filter((l) => {
        return !l.includes(markers.darkmoon.title);
      })
      // Remove any vacancy blocks
      .filter((l) => {
        return !l.startsWith(vacancyBorderDelim) && !l.includes(vacancyTitle);
      });

    debug(`Filtered message: ${lines.join('\n')}`);

    function isBlockStart(line) {
      if (!line) {
        return false;
      }
      return daysOfWeek.some((d) => line.startsWith(d));
    }

    // Find event groups, which may be blocks of varying size (if e.g. only one head is scheduled)
    let idx = 0;
    while (idx < lines.length) {
      // Find a line that starts with a day of the week
      const line = lines[idx];
      if (isBlockStart(line)) {
        // Loop through the block and find events for that day
        let blockIdx = idx + 1;
        const blockEntryPattern = /(?:(?<player>[\p{L}\s]+)\s+)?(?:[\(<])?(?<guild>[\p{L}\s]+)(?:[\)>])?[\s-]+(?<time>[\w:]+)(?:\s+(?<type>.+))?/u;
        while (!isBlockStart(lines[blockIdx]) && blockIdx < lines.length) {
          const blockLine = lines[blockIdx];
          const lineData = blockLine.match(blockEntryPattern)?.groups;

          if (!lineData) {
            console.warn(`Expected matches for line, but found none: ${blockLine}`);
            blockIdx++;
            continue;
          }

          // Get event type
          const eventType = (lineData.type || '').toLowerCase();
          const eventHandler = markers.eventTypes[eventType];

          if (!eventHandler) {
            console.warn(`Could not handle buff event type: ${eventType}`);
            blockIdx++;
            continue;
          }

          // Get the event-specific helpers
          const { summary, location } = markers[eventHandler];

          // Trim guild name
          lineData.guild = lineData.guild?.trim();

          const dateStr = `${line} ${lineData.time}`;
          debug(`Adding event:`);
          debug(`Guild: ${lineData.guild}`);
          debug(`Player: ${lineData.player}`);
          debug(`Date: ${dateStr}`);

          // Build date
          const dateFormat = 'dddd, MMM Do h:mA';
          const date = moment.tz(dateStr, dateFormat, realm.timezone);

          // Build description
          // Needs to be fudged a little bit since regex is a trap
          let description;
          if (lineData.player && lineData.guild) {
            // If the original line did not contain a paren or bracket, assume it's a guild-only line
            if (blockLine.includes('(') || blockLine.includes('<')) {
              description = `${lineData.player} - ${lineData.guild}`;
            } else {
              description = `${lineData.player} ${lineData.guild}`;
            }
          } else {
            if (lineData.player) {
              description = `${lineData.player}`;
            } else {
              description = `${lineData.guild}`;
            }
          }

          events.push({
            summary: summary(lineData),
            description,
            startDate: date.toDate(),
            endDate: date.clone().add(5, 'm').toDate(),
            location,
          });

          // Next line
          blockIdx++;
        }

        // Increment the main counter by the block amount
        idx += blockIdx - idx;
      } else {
        // This probably shouldn't happen, but for some reason the first line wasn't a date
        // Check filtering if this warning appears
        console.warn(`Expected block start at index ${idx} but found: ${line}`);
        idx++;
      }
    }

    return events;
  }

  function findScheduleMessage(realm, messages) {
    return messages.find((m) => {
      return m.content.includes(scheduleTitle) && m.content.includes(scheduleBorderDelim);
    })?.content;
  }

  return extractEventsFromMessage(realm, findScheduleMessage(realm, messages));
}

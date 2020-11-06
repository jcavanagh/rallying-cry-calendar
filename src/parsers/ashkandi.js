import moment from 'moment-timezone';

import util from 'util';
const debug = util.debuglog('rcc');

export default function (realm, messages, type) {
  // Markers
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const markers = {
    rallyingCry: {
      scheduleTitle: 'Rallying Cry of the Dragonslayer Schedule',
      scheduleBorderDelim: '==',
      vacancyTitle: 'VACANT',
      vacancyBorderDelim: '--',
      summary: (lineData) => `Rallying Cry (${lineData.type})`,
      location: `Stormwind City, ${realm.name}`,
    },
    zandalar: {
      scheduleTitle: 'Spirit of Zandalar Schedule',
      scheduleBorderDelim: '==',
      vacancyTitle: 'VACANT',
      vacancyBorderDelim: '--',
      summary: () => `Spirit of Zandalar`,
      location: `Yojamba Isle/Booty Bay, ${realm.name}`,
    },
    darkmoon: {
      title: 'Darkmoon Faire',
    },
  };

  // Extract mode markers
  const { scheduleTitle, scheduleBorderDelim, vacancyTitle, vacancyBorderDelim, summary, location } = markers[type];

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
        const blockEntryPattern = /(?:(?<player>[\p{L}\s]+)\s+)?(?:\()?(?<guild>[\p{L}\s]+)(?:\))?[\s-]+(?<time>[\w:]+)(?:\s+(?<type>.+))?/u;
        while (!isBlockStart(lines[blockIdx]) && blockIdx < lines.length) {
          const blockLine = lines[blockIdx];
          const lineData = blockLine.match(blockEntryPattern)?.groups;

          if (!lineData) {
            console.warn(`Expected matches for line, but found none: ${blockLine}`);
            blockIdx++;
            continue;
          }

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
            // If the original line did not contain a paren, assume it's a guild-only line
            if (blockLine.includes('(')) {
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

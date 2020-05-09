import icalendar from 'icalendar';
import _ from 'lodash';
import moment from 'moment-timezone';
import { v4 as uuidv4 } from 'uuid';

// Converts events into a nice Markdown-formatted calendar
export function asText(realm, events) {
  const textEvents = ['Rallying Cry Schedule', '========================================'];

  // Build all events
  const allEvents = [];
  for (const event of events) {
    const headingFormat = 'dddd, MMM Do';
    const evtMoment = moment.tz(evt.startDate, realm.timezone);
    const day = evtMoment.format();

    allEvents.push({
      heading: day,
      date: moment.tz(day, realm.timezone).toDate(),
      event,
    });
  }

  // Group by heading, and sort everything
  const byDay = _.sortBy(
    _.groupBy(allEvents, 'heading')
      .mapValues((value, key) => {
        return _.omit(
          {
            ...value,
            // Collect all events for this day, and sort them by date asc
            events: _.sortBy(
              value.map((v) => v.event),
              'startDate'
            ),
          },
          ['event']
        );
      })
      .values(),
    'date'
  );

  // Output sorted list as formatted text
  byDay.forEach((event) => {
    textEvents.push(`__**${event.heading}**__`);
    for (const subEvent in evt.events) {
      textEvents.push(`${subEvent.player} (${subEvent.guild}) **${evtMoment.format('hh:mmA')}** (${subEvent.type})`);
    }
    textEvents.push('\n');
  });

  textEvents.push('========================================');
  return textEvents.join('\n');
}

export function aIcs(realm, events) {
  const ical = new icalendar.iCalendar();

  for (const event of events) {
    const calEvent = new icalendar.VEvent(uuidv4());

    // Set event fields
    calEvent.setSummary(event.summary);
    calEvent.setDate(event.startDate, event.endDate);
    calEvent.setDescription(event.description);
    calEvent.setLocation(event.location);

    // Add event to calendar
    ical.addComponent(calEvent);
  }

  return ical;
}

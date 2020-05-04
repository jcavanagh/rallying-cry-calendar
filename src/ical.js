import icalendar from 'icalendar';
import { v4 as uuidv4 } from 'uuid';

export function createFromDiscord(realm, discordEvents) {
  const ical = new icalendar.iCalendar();

  for (const event of discordEvents) {
    const calEvent = new icalendar.VEvent(uuidv4());
    calEvent.setSummary(event.summary);
    calEvent.setDate(event.date);
    calEvent.setDescription(event.description);
    calEvent.setLocation(`Stormwind City, ${realm}`);

    ical.addComponent(calEvent);
  }

  return ical;
}

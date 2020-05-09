import icalendar from 'icalendar';
import { v4 as uuidv4 } from 'uuid';

export function createFromDiscord(realm, discordEvents) {
  const ical = new icalendar.iCalendar();

  for (const event of discordEvents) {
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

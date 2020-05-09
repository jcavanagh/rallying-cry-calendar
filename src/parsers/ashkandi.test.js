import ashkandi from './ashkandi.js';
import realms from '../realms.js';

const realm = realms.find((r) => r.name == 'Ashkandi');

test('Parses basic schedule', () => {
  // Test schedule
  const testMessages = [
    {
      content:
        '**Rallying Cry Schedule**\n======================\n__**Saturday, May 9th\n**__Toni (Muse) - **6:50PM Onyxia**\nMarisa (Aptitude) - **8:45PM Nefarian**\n\n**__Sunday, May 10th__\n**Adlen (Vindication) - **6:45PM Nefarian**\nDasm (Poseidon) - **7:30PM Onyxia**\n\n**__Monday, May 11th__\n**Galroy (Vindication) - **6:45PM Nefarian**\nTruheala (Vanguard) - **7:45PM Onyxia**\n\n**__Tuesday, May 12th__\n**Aikaterini (Core) - **6:45PM Onyxia**\nKrenqueue (Eye of Skadi) - **6:15PM Nefarian**\n\n**__Wednesday, May 13th__\n**Háwk (Grey Parses) - **8:00PM Onyxia**\n\n**__Thursday, May 14th__\n**Absencearrow (Core) - **6:45PM Onyxia**\n======================',
    },
  ];

  // Build expected
  const expected = [
    {
      summary: 'Rallying Cry (Onyxia)',
      description: 'Toni - Muse',
      startDate: '2020-05-09T22:50:00.000Z',
      endDate: '2020-05-09T22:55:00.000Z',
      location: 'Stormwind City, Ashkandi',
    },
    {
      summary: 'Rallying Cry (Nefarian)',
      description: 'Marisa - Aptitude',
      startDate: '2020-05-10T00:45:00.000Z',
      endDate: '2020-05-10T00:50:00.000Z',
      location: 'Stormwind City, Ashkandi',
    },
    {
      summary: 'Rallying Cry (Nefarian)',
      description: 'Adlen - Vindication',
      startDate: '2020-05-10T22:45:00.000Z',
      endDate: '2020-05-10T22:50:00.000Z',
      location: 'Stormwind City, Ashkandi',
    },
    {
      summary: 'Rallying Cry (Onyxia)',
      description: 'Dasm - Poseidon',
      startDate: '2020-05-10T23:30:00.000Z',
      endDate: '2020-05-10T23:35:00.000Z',
      location: 'Stormwind City, Ashkandi',
    },
    {
      summary: 'Rallying Cry (Nefarian)',
      description: 'Galroy - Vindication',
      startDate: '2020-05-11T22:45:00.000Z',
      endDate: '2020-05-11T22:50:00.000Z',
      location: 'Stormwind City, Ashkandi',
    },
    {
      summary: 'Rallying Cry (Onyxia)',
      description: 'Truheala - Vanguard',
      startDate: '2020-05-11T23:45:00.000Z',
      endDate: '2020-05-11T23:50:00.000Z',
      location: 'Stormwind City, Ashkandi',
    },
    {
      summary: 'Rallying Cry (Onyxia)',
      description: 'Aikaterini - Core',
      startDate: '2020-05-12T22:45:00.000Z',
      endDate: '2020-05-12T22:50:00.000Z',
      location: 'Stormwind City, Ashkandi',
    },
    {
      summary: 'Rallying Cry (Nefarian)',
      description: 'Krenqueue - Eye of Skadi',
      startDate: '2020-05-12T22:15:00.000Z',
      endDate: '2020-05-12T22:20:00.000Z',
      location: 'Stormwind City, Ashkandi',
    },
    {
      summary: 'Rallying Cry (Onyxia)',
      description: 'Háwk - Grey Parses',
      startDate: '2020-05-14T00:00:00.000Z',
      endDate: '2020-05-14T00:05:00.000Z',
      location: 'Stormwind City, Ashkandi',
    },
    {
      summary: 'Rallying Cry (Onyxia)',
      description: 'Absencearrow - Core',
      startDate: '2020-05-14T22:45:00.000Z',
      endDate: '2020-05-14T22:50:00.000Z',
      location: 'Stormwind City, Ashkandi',
    },
  ];

  // Parse and compare
  const result = ashkandi(realm, testMessages);
  expect(result).toEqual(expected);
});

import ashkandi from './ashkandi.js';
import realms from '../realms.js';

const realm = realms.find((r) => r.name == 'Ashkandi');

test('Parses basic schedule', () => {
  const testMessages = [
    {
      id: '708095171400695878',
      content:
        '@everyone - We want YOUR opinion! What is the **minimum** time separation we should have between the Onyxia and Nefarian Rallying Cry buffs? \n' +
        'Cast your vote by reacting 🕕 for 30 minutes, 🕘 for 45 minutes, or 🕛 for 1 hour. Poll closes Tuesday 5/12.',
      author: {
        id: '310288695968137217',
        username: 'Borgir',
        usernameSuffix: '3493',
        isBot: false,
      },
    },
    {
      id: '684124946192007176',
      content:
        '**How do I schedule an Onyxia or Nefarian head turn in?**\n' +
        '\n' +
        'First please visit the <#646271563565629442> summary of how the Rallying Cry buff works. \n' +
        '\n' +
        'Review the current schedule for which head you have to turn in. Either select a day where no head turn in is already scheduled, or you may schedule a turn in anytime 6 hours and 5 minutes prior to another turn in on that day for Onyxia, or 8 hours and 5 minutes for Nefarian.\n' +
        '\n' +
        '**The Rallying Cry buff is triggered when you turn in your quest to Major Mattingly at the Stormwind Gates. Please make sure you turn in the actual head to Highlord Bolvar prior to your scheduled time. If the Onyxia attunement RP quest that involves Highlord Bolvar is taking place, you will need to wait for it to complete before completing his portion of the quest.**\n' +
        '\n' +
        'If you still have any questions or concerns, please reach out to myself or <@!317637139535888387> over Discord or in-game.',
      author: {
        id: '310288695968137217',
        username: 'Borgir',
        usernameSuffix: '3493',
        isBot: false,
      },
    },
    {
      id: '675491166418108466',
      content:
        '**Rallying Cry Schedule**\n' +
        '======================\n' +
        '__**Saturday, May 9th\n' +
        '**__Toni (Muse) - **6:50PM Onyxia**\n' +
        'Marisa (Aptitude) - **8:45PM Nefarian**\n' +
        '\n' +
        '**__Sunday, May 10th__\n' +
        '**Adlen (Vindication) - **6:45PM Nefarian**\n' +
        'Dasm (Poseidon) - **7:30PM Onyxia**\n' +
        '\n' +
        '**__Monday, May 11th__\n' +
        '**Galroy (Vindication) - **6:45PM Nefarian**\n' +
        'Truheala (Vanguard) - **7:45PM Onyxia**\n' +
        '\n' +
        '**__Tuesday, May 12th__\n' +
        '**Aikaterini (Core) - **6:45PM Onyxia**\n' +
        'Krenqueue (Eye of Skadi) - **6:15PM Nefarian**\n' +
        '\n' +
        '**__Wednesday, May 13th__\n' +
        '**Háwk (Grey Parses) - **8:00PM Onyxia**\n' +
        '\n' +
        '**__Thursday, May 14th__\n' +
        '**Absencearrow (Core) - **6:45PM Onyxia**\n' +
        '======================',
      author: {
        id: '310288695968137217',
        username: 'Borgir',
        usernameSuffix: '3493',
        isBot: false,
      },
    },
  ];

  // Build expected
  const expected = [
    {
      summary: 'Rallying Cry (Onyxia)',
      description: 'Toni - Muse',
      startDate: new Date('2020-05-09T22:50:00.000Z'),
      endDate: new Date('2020-05-09T22:55:00.000Z'),
      location: 'Stormwind City, Ashkandi',
    },
    {
      summary: 'Rallying Cry (Nefarian)',
      description: 'Marisa - Aptitude',
      startDate: new Date('2020-05-10T00:45:00.000Z'),
      endDate: new Date('2020-05-10T00:50:00.000Z'),
      location: 'Stormwind City, Ashkandi',
    },
    {
      summary: 'Rallying Cry (Nefarian)',
      description: 'Adlen - Vindication',
      startDate: new Date('2020-05-10T22:45:00.000Z'),
      endDate: new Date('2020-05-10T22:50:00.000Z'),
      location: 'Stormwind City, Ashkandi',
    },
    {
      summary: 'Rallying Cry (Onyxia)',
      description: 'Dasm - Poseidon',
      startDate: new Date('2020-05-10T23:30:00.000Z'),
      endDate: new Date('2020-05-10T23:35:00.000Z'),
      location: 'Stormwind City, Ashkandi',
    },
    {
      summary: 'Rallying Cry (Nefarian)',
      description: 'Galroy - Vindication',
      startDate: new Date('2020-05-11T22:45:00.000Z'),
      endDate: new Date('2020-05-11T22:50:00.000Z'),
      location: 'Stormwind City, Ashkandi',
    },
    {
      summary: 'Rallying Cry (Onyxia)',
      description: 'Truheala - Vanguard',
      startDate: new Date('2020-05-11T23:45:00.000Z'),
      endDate: new Date('2020-05-11T23:50:00.000Z'),
      location: 'Stormwind City, Ashkandi',
    },
    {
      summary: 'Rallying Cry (Onyxia)',
      description: 'Aikaterini - Core',
      startDate: new Date('2020-05-12T22:45:00.000Z'),
      endDate: new Date('2020-05-12T22:50:00.000Z'),
      location: 'Stormwind City, Ashkandi',
    },
    {
      summary: 'Rallying Cry (Nefarian)',
      description: 'Krenqueue - Eye of Skadi',
      startDate: new Date('2020-05-12T22:15:00.000Z'),
      endDate: new Date('2020-05-12T22:20:00.000Z'),
      location: 'Stormwind City, Ashkandi',
    },
    {
      summary: 'Rallying Cry (Onyxia)',
      description: 'Háwk - Grey Parses',
      startDate: new Date('2020-05-14T00:00:00.000Z'),
      endDate: new Date('2020-05-14T00:05:00.000Z'),
      location: 'Stormwind City, Ashkandi',
    },
    {
      summary: 'Rallying Cry (Onyxia)',
      description: 'Absencearrow - Core',
      startDate: new Date('2020-05-14T22:45:00.000Z'),
      endDate: new Date('2020-05-14T22:50:00.000Z'),
      location: 'Stormwind City, Ashkandi',
    },
  ];

  // Parse and compare
  const result = ashkandi(realm, testMessages);
  expect(result).toEqual(expected);
});

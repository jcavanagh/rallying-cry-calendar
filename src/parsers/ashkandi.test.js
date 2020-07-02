import ashkandi from './ashkandi.js';
import realms from '../../realms.js';

const realm = realms.find((r) => r.name == 'Ashkandi');

test('Parses basic RC schedule', () => {
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
  const result = ashkandi(realm, testMessages, 'rallyingCry');
  expect(result).toEqual(expected);
});

test('Parses basic ZG schedule', () => {
  const testMessages = [
    {
      id: '726910310706839702',
      type: 0,
      content: 'Draconis Erus is dropping a heart at 6:20',
      channel_id: '725238755623174184',
      author: {
        id: '705105196468142191',
        username: 'Chirish',
        avatar: null,
        discriminator: '6492',
        public_flags: 0,
      },
      attachments: [],
      embeds: [],
      mentions: [],
      mention_roles: [],
      pinned: false,
      mention_everyone: false,
      tts: false,
      timestamp: '2020-06-28T21:22:03.413000+00:00',
      edited_timestamp: null,
      flags: 0,
      reactions: [
        {
          emoji: { id: null, name: '\ud83d\udc4d' },
          count: 1,
          me: false,
        },
      ],
    },
    {
      id: '726822282248454264',
      type: 0,
      content: '620?',
      channel_id: '725238755623174184',
      author: {
        id: '620810481262919681',
        username: 'celzaria.fadory',
        avatar: 'b1c478ffd7bcbde52a9cccad364d01a8',
        discriminator: '2652',
        public_flags: 0,
      },
      attachments: [],
      embeds: [],
      mentions: [],
      mention_roles: [],
      pinned: false,
      mention_everyone: false,
      tts: false,
      timestamp: '2020-06-28T15:32:15.793000+00:00',
      edited_timestamp: null,
      flags: 0,
    },
    {
      id: '725243045347328000',
      type: 0,
      content:
        '**Spirit of Zandalar Schedule**\n' +
        '===================\n' +
        '**__Sunday, June 28th__**\n' +
        'Mail Enhancement - 7:30PM\n' +
        '\n' +
        '\n' +
        '**__Monday, June 29th__**\n' +
        '\n' +
        '\n' +
        '**__Tuesday, June 30th__**\n' +
        'Booty Bae - 7:25PM\n' +
        '\n' +
        '\n' +
        '**__Wednesday, July 1st__**\n' +
        '\n' +
        '\n' +
        '**__Thursday, July 2nd__**\n' +
        'Booty Bae - 7:25PM\n' +
        '\n' +
        '\n' +
        '**__Friday, July 3rd__**\n' +
        'Onslaught - 8:20PM\n' +
        '\n' +
        '**__Saturday, July 4th__**\n' +
        '\n' +
        '\n' +
        '===================',
      channel_id: '725238755623174184',
      author: {
        id: '310288695968137217',
        username: 'Borgir',
        avatar: '3ab4aaa2bbf8aac37a0486ebae1871bb',
        discriminator: '3493',
        public_flags: 64,
      },
      attachments: [],
      embeds: [],
      mentions: [],
      mention_roles: [],
      pinned: false,
      mention_everyone: false,
      tts: false,
      timestamp: '2020-06-24T06:56:56.375000+00:00',
      edited_timestamp: '2020-06-28T04:49:02.112000+00:00',
      flags: 0,
    },
    {
      id: '725242821073960971',
      type: 0,
      content:
        '===================\n' +
        '***__Format__*\n' +
        '**Name (Guild) - Time\n' +
        '\n' +
        '***__Example__***\n' +
        'Borgir (Aptitude) - 6:40PM\n' +
        '===================\n' +
        '__**Weekly Reoccurring**__\n' +
        'Sunday - Mail Enhancement 7:30PM\n' +
        'Monday -\n' +
        'Tuesday -\n' +
        'Wednesday - \n' +
        'Thursday - \n' +
        'Friday - Onslaught 8:20PM\n' +
        'Saturday -\n' +
        '===================',
      channel_id: '725238755623174184',
      author: {
        id: '310288695968137217',
        username: 'Borgir',
        avatar: '3ab4aaa2bbf8aac37a0486ebae1871bb',
        discriminator: '3493',
        public_flags: 64,
      },
      attachments: [],
      embeds: [],
      mentions: [],
      mention_roles: [],
      pinned: false,
      mention_everyone: false,
      tts: false,
      timestamp: '2020-06-24T06:56:02.904000+00:00',
      edited_timestamp: '2020-06-26T04:37:29.220000+00:00',
      flags: 0,
    },
    {
      id: '725242781689315328',
      type: 0,
      content:
        'The intent of this channel is for people to schedule when they will be turning in a Heart of Hakkar (HoH) and triggering Spirit of Zandalar (SoZ). The goal is to have SoZ scheduled around already scheduled Rallying Cry (RC) buff times 5-10 minutes before and/or after a scheduled RC. Unlike RC, there is no cooldown for SoZ aside from the small troll RP event. Times can be scheduled close together, but we recommend at least 5 minutes apart. Note that you must be level 58 or higher to complete the quest and trigger SoZ.',
      channel_id: '725238755623174184',
      author: {
        id: '310288695968137217',
        username: 'Borgir',
        avatar: '3ab4aaa2bbf8aac37a0486ebae1871bb',
        discriminator: '3493',
        public_flags: 64,
      },
      attachments: [],
      embeds: [],
      mentions: [],
      mention_roles: [],
      pinned: false,
      mention_everyone: false,
      tts: false,
      timestamp: '2020-06-24T06:55:53.514000+00:00',
      edited_timestamp: '2020-06-24T07:05:41.818000+00:00',
      flags: 0,
    },
  ];

  const expected = [
    {
      summary: 'Spirit of Zandalar',
      description: 'Mail Enhancement',
      startDate: new Date('2020-06-28T23:30:00.000Z'),
      endDate: new Date('2020-06-28T23:35:00.000Z'),
      location: 'Yojamba Isle/Booty Bay, Ashkandi',
    },
    {
      summary: 'Spirit of Zandalar',
      description: 'Booty Bae',
      startDate: new Date('2020-06-30T23:25:00.000Z'),
      endDate: new Date('2020-06-30T23:30:00.000Z'),
      location: 'Yojamba Isle/Booty Bay, Ashkandi',
    },
    {
      summary: 'Spirit of Zandalar',
      description: 'Booty Bae',
      startDate: new Date('2020-07-02T23:25:00.000Z'),
      endDate: new Date('2020-07-02T23:30:00.000Z'),
      location: 'Yojamba Isle/Booty Bay, Ashkandi',
    },
    {
      summary: 'Spirit of Zandalar',
      description: 'Onslaught',
      startDate: new Date('2020-07-04T00:20:00.000Z'),
      endDate: new Date('2020-07-04T00:25:00.000Z'),
      location: 'Yojamba Isle/Booty Bay, Ashkandi',
    },
  ];

  // Parse and compare
  const result = ashkandi(realm, testMessages, 'zandalar');
  expect(result).toEqual(expected);
});

import ashkandi from './ashkandi.js';
import realms from '../realms.js';
import testMessages from './ashkandi.test.json';

const realm = realms.find((r) => r.name == 'Ashkandi');

// test('Parses basic RC schedule', () => {
//   const expected = [
//     {
//       summary: 'Rallying Cry (Onyxia)',
//       description: 'Toni - Muse',
//       startDate: new Date('2020-05-09T22:50:00.000Z'),
//       endDate: new Date('2020-05-09T22:55:00.000Z'),
//       location: 'Stormwind City, Ashkandi',
//     },
//     {
//       summary: 'Rallying Cry (Nefarian)',
//       description: 'Marisa - Aptitude',
//       startDate: new Date('2020-05-10T00:45:00.000Z'),
//       endDate: new Date('2020-05-10T00:50:00.000Z'),
//       location: 'Stormwind City, Ashkandi',
//     },
//     {
//       summary: 'Rallying Cry (Nefarian)',
//       description: 'Adlen - Vindication',
//       startDate: new Date('2020-05-10T22:45:00.000Z'),
//       endDate: new Date('2020-05-10T22:50:00.000Z'),
//       location: 'Stormwind City, Ashkandi',
//     },
//     {
//       summary: 'Rallying Cry (Onyxia)',
//       description: 'Dasm - Poseidon',
//       startDate: new Date('2020-05-10T23:30:00.000Z'),
//       endDate: new Date('2020-05-10T23:35:00.000Z'),
//       location: 'Stormwind City, Ashkandi',
//     },
//     {
//       summary: 'Rallying Cry (Nefarian)',
//       description: 'Galroy - Vindication',
//       startDate: new Date('2020-05-11T22:45:00.000Z'),
//       endDate: new Date('2020-05-11T22:50:00.000Z'),
//       location: 'Stormwind City, Ashkandi',
//     },
//     {
//       summary: 'Rallying Cry (Onyxia)',
//       description: 'Truheala - Vanguard',
//       startDate: new Date('2020-05-11T23:45:00.000Z'),
//       endDate: new Date('2020-05-11T23:50:00.000Z'),
//       location: 'Stormwind City, Ashkandi',
//     },
//     {
//       summary: 'Rallying Cry (Onyxia)',
//       description: 'Aikaterini - Core',
//       startDate: new Date('2020-05-12T22:45:00.000Z'),
//       endDate: new Date('2020-05-12T22:50:00.000Z'),
//       location: 'Stormwind City, Ashkandi',
//     },
//     {
//       summary: 'Rallying Cry (Nefarian)',
//       description: 'Krenqueue - Eye of Skadi',
//       startDate: new Date('2020-05-12T22:15:00.000Z'),
//       endDate: new Date('2020-05-12T22:20:00.000Z'),
//       location: 'Stormwind City, Ashkandi',
//     },
//     {
//       summary: 'Rallying Cry (Onyxia)',
//       description: 'Háwk - Grey Parses',
//       startDate: new Date('2020-05-14T00:00:00.000Z'),
//       endDate: new Date('2020-05-14T00:05:00.000Z'),
//       location: 'Stormwind City, Ashkandi',
//     },
//     {
//       summary: 'Rallying Cry (Onyxia)',
//       description: 'Absencearrow - Core',
//       startDate: new Date('2020-05-14T22:45:00.000Z'),
//       endDate: new Date('2020-05-14T22:50:00.000Z'),
//       location: 'Stormwind City, Ashkandi',
//     },
//   ];

//   // Parse and compare
//   const result = ashkandi(realm, testMessages, 'rallyingCry');
//   expect(result).toEqual(expected);
// });

// test('Parses basic ZG schedule', () => {
//   const expected = [
//     {
//       summary: 'Spirit of Zandalar',
//       description: 'Mail Enhancement',
//       startDate: new Date('2020-06-28T23:30:00.000Z'),
//       endDate: new Date('2020-06-28T23:35:00.000Z'),
//       location: 'Yojamba Isle/Booty Bay, Ashkandi',
//     },
//     {
//       summary: 'Spirit of Zandalar',
//       description: 'Booty Bae',
//       startDate: new Date('2020-06-30T23:25:00.000Z'),
//       endDate: new Date('2020-06-30T23:30:00.000Z'),
//       location: 'Yojamba Isle/Booty Bay, Ashkandi',
//     },
//     {
//       summary: 'Spirit of Zandalar',
//       description: 'Booty Bae',
//       startDate: new Date('2020-07-02T23:25:00.000Z'),
//       endDate: new Date('2020-07-02T23:30:00.000Z'),
//       location: 'Yojamba Isle/Booty Bay, Ashkandi',
//     },
//     {
//       summary: 'Spirit of Zandalar',
//       description: 'Onslaught',
//       startDate: new Date('2020-07-04T00:20:00.000Z'),
//       endDate: new Date('2020-07-04T00:25:00.000Z'),
//       location: 'Yojamba Isle/Booty Bay, Ashkandi',
//     },
//   ];

//   // Parse and compare
//   const result = ashkandi(realm, testMessages, 'zandalar');
//   expect(result).toEqual(expected);
// });

test('Parses basic combined schedule', () => {
  const expected = [
    {
      summary: "Warchief's Blessing",
      description: 'Extinction',
      startDate: new Date('2021-01-06T21:45:00.000Z'),
      endDate: new Date('2021-01-06T21:50:00.000Z'),
      location: 'Orgrimmar/Crossroads, Ashkandi',
    },
    {
      summary: 'Spirit of Zandalar',
      description: 'Dubspeach - Primordial Kings',
      startDate: new Date('2021-01-06T23:20:00.000Z'),
      endDate: new Date('2021-01-06T23:25:00.000Z'),
      location: 'Yojamba Isle/Booty Bay, Ashkandi',
    },
    {
      summary: 'Rallying Cry (Nefarian)',
      description: 'Powerplay - Primordial Kings',
      startDate: new Date('2021-01-06T23:30:00.000Z'),
      endDate: new Date('2021-01-06T23:35:00.000Z'),
      location: 'Stormwind City, Ashkandi',
    },
    {
      summary: 'Rallying Cry (Onyxia)',
      description: 'Camouflage - Grey Parses',
      startDate: new Date('2021-01-07T00:30:00.000Z'),
      endDate: new Date('2021-01-07T00:35:00.000Z'),
      location: 'Stormwind City, Ashkandi',
    },
    {
      summary: 'Spirit of Zandalar',
      description: 'Jimz - Extinction',
      startDate: new Date('2021-01-07T00:40:00.000Z'),
      endDate: new Date('2021-01-07T00:45:00.000Z'),
      location: 'Yojamba Isle/Booty Bay, Ashkandi',
    },
    {
      summary: "Warchief's Blessing",
      description: 'Extinction',
      startDate: new Date('2021-01-07T00:45:00.000Z'),
      endDate: new Date('2021-01-07T00:50:00.000Z'),
      location: 'Orgrimmar/Crossroads, Ashkandi',
    },
    {
      summary: 'Spirit of Zandalar',
      description: 'Felthius - Deadlyest',
      startDate: new Date('2021-01-07T23:20:00.000Z'),
      endDate: new Date('2021-01-07T23:25:00.000Z'),
      location: 'Yojamba Isle/Booty Bay, Ashkandi',
    },
    {
      summary: 'Spirit of Zandalar',
      description: 'Elsafreeze - What Comes Next',
      startDate: new Date('2021-01-08T00:20:00.000Z'),
      endDate: new Date('2021-01-08T00:25:00.000Z'),
      location: 'Yojamba Isle/Booty Bay, Ashkandi',
    },
    {
      summary: 'Rallying Cry (Onyxia)',
      description: 'Hairbackjr - Vindication',
      startDate: new Date('2021-01-08T00:30:00.000Z'),
      endDate: new Date('2021-01-08T00:35:00.000Z'),
      location: 'Stormwind City, Ashkandi',
    },
    {
      summary: "Warchief's Blessing",
      description: 'Hogar - Milk Studios',
      startDate: new Date('2021-01-08T00:30:00.000Z'),
      endDate: new Date('2021-01-08T00:35:00.000Z'),
      location: 'Orgrimmar/Crossroads, Ashkandi',
    },
    {
      summary: 'Rallying Cry (Nefarian)',
      description: 'Rasendalghol - Invasive Death',
      startDate: new Date('2021-01-08T01:30:00.000Z'),
      endDate: new Date('2021-01-08T01:35:00.000Z'),
      location: 'Stormwind City, Ashkandi',
    },
    {
      summary: 'Rallying Cry (Onyxia)',
      description: 'Hackert - Poseidon',
      startDate: new Date('2021-01-08T23:30:00.000Z'),
      endDate: new Date('2021-01-08T23:35:00.000Z'),
      location: 'Stormwind City, Ashkandi',
    },
    {
      summary: 'Rallying Cry (Nefarian)',
      description: 'Hairbackjr - Vindication',
      startDate: new Date('2021-01-09T00:30:00.000Z'),
      endDate: new Date('2021-01-09T00:35:00.000Z'),
      location: 'Stormwind City, Ashkandi',
    },

    {
      summary: 'Rallying Cry (Onyxia)',
      description: 'Rockyfett - Poseidon',
      startDate: new Date('2021-01-09T23:30:00.000Z'),
      endDate: new Date('2021-01-09T23:35:00.000Z'),
      location: 'Stormwind City, Ashkandi',
    },
    {
      summary: 'Rallying Cry (Nefarian)',
      description: 'Saberlily - Well We Tried',
      startDate: new Date('2021-01-10T00:30:00.000Z'),
      endDate: new Date('2021-01-10T00:35:00.000Z'),
      location: 'Stormwind City, Ashkandi',
    },
    {
      summary: 'Rallying Cry (Onyxia)',
      description: 'Tankerino - Average Joes',
      startDate: new Date('2021-01-10T23:30:00.000Z'),
      endDate: new Date('2021-01-10T23:35:00.000Z'),
      location: 'Stormwind City, Ashkandi',
    },
    {
      summary: 'Rallying Cry (Nefarian)',
      description: 'Valorious - Poseidon',
      startDate: new Date('2021-01-11T00:30:00.000Z'),
      endDate: new Date('2021-01-11T00:35:00.000Z'),
      location: 'Stormwind City, Ashkandi',
    },
    {
      summary: 'Rallying Cry (Onyxia)',
      description: 'Layz - Poseidon',
      startDate: new Date('2021-01-11T23:30:00.000Z'),
      endDate: new Date('2021-01-11T23:35:00.000Z'),
      location: 'Stormwind City, Ashkandi',
    },
  ];

  // Parse and compare
  const result = ashkandi(realm, testMessages, 'zandalar');
  expect(result).toEqual(expected);
});

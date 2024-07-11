export const User = [
  {
    id: 'rec_905059',
    first_name: 'Michael',
    last_name: 'Brown',
    email: 'michael.brown@example.com',
    password: 'MichaelBrown123',
    streak_count: 61,
  },
  {
    id: 'rec_809560',
    first_name: 'Chris',
    last_name: 'Smith',
    email: 'chris.smith@example.com',
    password: 'ChrisSmith123',
    streak_count: 62,
  },
  {
    id: 'rec_660054',
    first_name: 'John',
    last_name: 'Jones',
    email: 'john.jones@example.com',
    password: 'JohnJones123',
    streak_count: 4,
  },
  {
    id: 'rec_319903',
    first_name: 'David',
    last_name: 'Miller',
    email: 'david.miller@example.com',
    password: 'DavidMiller123',
    streak_count: 83,
  },
  {
    id: 'rec_271778',
    first_name: 'Laura',
    last_name: 'Garcia',
    email: 'laura.garcia@example.com',
    password: 'LauraGarcia123',
    streak_count: 98,
  },
  {
    id: 'rec_584999',
    first_name: 'Alex',
    last_name: 'Jones',
    email: 'alex.jones@example.com',
    password: 'AlexJones123',
    streak_count: 23,
  },
  {
    id: 'rec_996787',
    first_name: 'Jane',
    last_name: 'Martinez',
    email: 'jane.martinez@example.com',
    password: 'JaneMartinez123',
    streak_count: 27,
  },
  {
    id: 'rec_919043',
    first_name: 'Chris',
    last_name: 'Williams',
    email: 'chris.williams@example.com',
    password: 'ChrisWilliams123',
    streak_count: 90,
  },
  {
    id: 'rec_483978',
    first_name: 'Jane',
    last_name: 'Garcia',
    email: 'jane.garcia@example.com',
    password: 'JaneGarcia123',
    streak_count: 93,
  },
  {
    id: 'rec_310101',
    first_name: 'Laura',
    last_name: 'Miller',
    email: 'laura.miller@example.com',
    password: 'LauraMiller123',
    streak_count: 26,
  },
];

export const Emoji = [
  {
    id: '0',
    type: 'nothing',
  },
  {
    id: '1',
    type: 'awful',
  },
  {
    id: '2',
    type: 'sad',
  },
  {
    id: '3',
    type: 'neutral',
  },
  {
    id: '4',
    type: 'good',
  },
  {
    id: '5',
    type: 'happy',
  },
];

export const Quote = [
  {
    id: 'rec_509879',
    author: 'Albert Einstein',
    text: 'Life is like riding a bicycle. To keep your balance, you must keep moving.',
  },
  {
    id: 'rec_132465',
    author: 'Mark Twain',
    text: 'The secret of getting ahead is getting started.',
  },
  {
    id: 'rec_745890',
    author: 'Oscar Wilde',
    text: 'Be yourself; everyone else is already taken.',
  },
  {
    id: 'rec_350178',
    author: 'Yoda',
    text: 'Do, or do not. There is no try.',
  },
  {
    id: 'rec_854967',
    author: 'Nelson Mandela',
    text: 'It always seems impossible until it is done.',
  },
];

export const Assigns = [
  {
    quote_id: 'rec_509879',
    user_id: 'rec_905059',
    id: 'rec_408309',
  },
  {
    quote_id: 'rec_132465',
    user_id: 'rec_809560',
    id: 'rec_902874',
  },
  {
    quote_id: 'rec_745890',
    user_id: 'rec_660054',
    id: 'rec_607482',
  },
  {
    quote_id: 'rec_350178',
    user_id: 'rec_319903',
    id: 'rec_284905',
  },
  {
    quote_id: 'rec_854967',
    user_id: 'rec_271778',
    id: 'rec_390572',
  },
];

export const DailyMood = [
  {
    emoji_id: '2',
    user_id: 'rec_905059',
    id: 'rec_842173',
  },
  {
    emoji_id: '5',
    user_id: 'rec_809560',
    id: 'rec_203498',
  },
  {
    emoji_id: '0',
    user_id: 'rec_660054',
    id: 'rec_674091',
  },
  {
    emoji_id: '3',
    user_id: 'rec_319903',
    id: 'rec_284190',
  },
  {
    emoji_id: '2',
    user_id: 'rec_271778',
    id: 'rec_942580',
  },
];

export const DiaryPage = [
  {
    image: null,
    text: 'Had a great day!',
    user_id: 'rec_905059',
    id: 'rec_610978',
  },
  {
    image: null,
    text: 'Feeling down...',
    user_id: 'rec_809560',
    id: 'rec_195708',
  },
  {
    image: null,
    text: 'Excited about the new project.',
    user_id: 'rec_660054',
    id: 'rec_980175',
  },
  {
    image: null,
    text: 'Need some rest.',
    user_id: 'rec_319903',
    id: 'rec_308091',
  },
  {
    image: null,
    text: 'Grateful for everything.',
    user_id: 'rec_271778',
    id: 'rec_901287',
  },
];

export const Survey = [
  {
    comment: 'Great service!',
    emoji_id: '2',
    keywords: ['service', 'feedback'],
    question: 'How do you feel about our service?',
    user_id: 'rec_905059',
    id: 'rec_203984',
  },
  {
    comment: 'Not satisfied.',
    emoji_id: '3',
    keywords: ['satisfaction', 'improvement'],
    question: 'What can we improve?',
    user_id: 'rec_809560',
    id: 'rec_789245',
  },
  {
    comment: 'Could be better.',
    emoji_id: '4',
    keywords: ['recommendation'],
    question: 'Would you recommend us?',
    user_id: 'rec_660054',
    id: 'rec_490871',
  },
  {
    comment: 'Excellent!',
    emoji_id: '1',
    keywords: ['feedback'],
    question: 'Any other feedback?',
    user_id: 'rec_319903',
    id: 'rec_682031',
  },
  {
    comment: null,
    emoji_id: '2',
    keywords: ['service', 'feedback'],
    question: 'How do you feel about our service?',
    user_id: 'rec_271778',
    id: 'rec_892013',
  },
];

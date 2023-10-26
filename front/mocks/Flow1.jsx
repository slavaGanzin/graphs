export default [
  {
    id: 0,
    kind: 'send',
    data: { text: 'Hello' },
    next: [1],
  },
  {
    id: 1,
    kind: 'question',
    data: { text: 'Are you good', options: ['Yes', 'No'] },
    next: [3],
  },
  {
    id: 3,
    kind: 'switch',
    data: {
      conditions: [
        { property: 'answer', operation: 'eq', value: 'Yes' },
        { property: 'answer', operation: 'eq', value: 'No' },
      ],
    },
    next: ['4', '5'],
  },
  {
    id: 4,
    kind: 'send',
    data: { text: 'That is Good' },
  },
  {
    id: 5,
    kind: 'send',
    data: { text: 'Shame on you' },
  },
];

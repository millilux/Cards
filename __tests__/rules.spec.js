jest.unmock('../lib/pontoon/rules');

const rules = require('../lib/pontoon/rules');

function createPontoonHand() {
  const mockHand = [
    { rank: 10 },
    { rank: 'Ace' },
  ];
  mockHand.aces = [null];
  return mockHand;
}

describe('cardValue', () => {
  it('gets the value of a card in Pontoon', () => {
    //const player = { hand: [{ rank: 10 }] };
    //expect(rules.score(player)).toBe(10);
    const cardMock = { rank: 10 };
    expect(rules.cardValue(cardMock)).toBe(10);
  });
});

describe('handValue', () => {
  it('evaluates a 10 and an Ace to be worth 21', () => {
    //const player = { hand: [{ rank: 10 }] };
    //expect(rules.score(player)).toBe(10);
    expect(rules.handValue(createPontoonHand())).toBe(21);
  });

  it('evaluates a 5, Jack and Ace to be 16', () => {
    const mockHand = [
      { rank: 5 },
      { rank: 'Jack' },
      { rank: 'Ace' },
    ];
    mockHand.aces = [null];
    expect(rules.handValue(mockHand)).toBe(16);
  });
});

describe('rules', () => {
  it('recognises when a player has a Pontoon', () => {
    const player = { hand: createPontoonHand() };
    expect(rules.score(player)).toBe(21);
    expect(rules.hasPontoon(player)).toBe(true);
  });
});

describe('score', () => {
  it('evaluates a player with no cards having score 0', () => {
    const mockHand = [];
    mockHand.aces = [];
    const player = { hand: mockHand };
    expect(rules.score(player)).toBe(0);
  });
});


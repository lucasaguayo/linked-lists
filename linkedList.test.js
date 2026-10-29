import { LinkedList } from "./linkedList";

// Helper: builds a list from an array of values.
const buildList = (...values) => {
  const list = new LinkedList();
  values.forEach((value) => list.append(value));
  return list;
};

describe('LinkedList', () => {
  let list;

  beforeEach(() => {
    list = new LinkedList();
  });

  describe('append()', () => {
    test('adds a node to an empty list, making it the head', () => {
      list.append('a');
      expect(list.head()).toBe('a');
      expect(list.size()).toBe(1);
    });

    test('adds nodes to the end of the list, preserving order', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      expect(list.toString()).toBe('( 1 ) -> ( 2 ) -> ( 3 ) -> null');
    });

    test('updates the tail with each appended value', () => {
      list.append(1);
      expect(list.tail()).toBe(1);
      list.append(2);
      expect(list.tail()).toBe(2);
    });
  });

  describe('prepend()', () => {
    test('adds a node to an empty list', () => {
      list.prepend('a');
      expect(list.head()).toBe('a');
      expect(list.tail()).toBe('a');
      expect(list.size()).toBe(1);
    });

    test('adds nodes to the start of the list', () => {
      list.prepend(3);
      list.prepend(2);
      list.prepend(1);
      expect(list.toString()).toBe('( 1 ) -> ( 2 ) -> ( 3 ) -> null');
    });

    test('keeps the previous head linked as the second node', () => {
      list.append(2);
      list.prepend(1);
      expect(list.at(0)).toBe(1);
      expect(list.at(1)).toBe(2);
    });
  });

  describe('size()', () => {
    test('returns 0 for an empty list', () => {
      expect(list.size()).toBe(0);
    });

    test('returns the total number of nodes', () => {
      list = buildList(1, 2, 3, 4);
      expect(list.size()).toBe(4);
    });

    test('reflects additions and removals', () => {
      list.append(1);
      list.prepend(0);
      expect(list.size()).toBe(2);
      list.pop();
      expect(list.size()).toBe(1);
    });
  });

  describe('head()', () => {
    test('returns undefined for an empty list', () => {
      expect(list.head()).toBeUndefined();
    });

    test('returns the value of the first node', () => {
      list = buildList('x', 'y', 'z');
      expect(list.head()).toBe('x');
    });

    test('returns falsy values correctly (0, empty string)', () => {
      list = buildList(0, 1);
      expect(list.head()).toBe(0);
      list = buildList('', 'a');
      expect(list.head()).toBe('');
    });
  });

  describe('tail()', () => {
    test('returns undefined for an empty list', () => {
      expect(list.tail()).toBeUndefined();
    });

    test('returns the head value when there is only one node', () => {
      list = buildList('solo');
      expect(list.tail()).toBe('solo');
    });

    test('returns the value of the last node', () => {
      list = buildList('x', 'y', 'z');
      expect(list.tail()).toBe('z');
    });
  });

  describe('at()', () => {
    test('returns undefined for an empty list', () => {
      expect(list.at(0)).toBeUndefined();
    });

    test('returns the value at the given index', () => {
      list = buildList('a', 'b', 'c');
      expect(list.at(0)).toBe('a');
      expect(list.at(1)).toBe('b');
      expect(list.at(2)).toBe('c');
    });

    test('returns undefined when the index is out of range', () => {
      list = buildList('a', 'b', 'c');
      expect(list.at(3)).toBeUndefined();
      expect(list.at(100)).toBeUndefined();
    });

    test('returns undefined for a negative index', () => {
      list = buildList('a', 'b', 'c');
      expect(list.at(-1)).toBeUndefined();
    });
  });

  describe('pop()', () => {
    test('returns undefined on an empty list', () => {
      expect(list.pop()).toBeUndefined();
      expect(list.size()).toBe(0);
    });

    test('removes the head node and returns its value', () => {
      list = buildList(1, 2, 3);
      expect(list.pop()).toBe(1);
      expect(list.head()).toBe(2);
      expect(list.size()).toBe(2);
    });

    test('leaves the list empty after popping the only node', () => {
      list = buildList('only');
      expect(list.pop()).toBe('only');
      expect(list.head()).toBeUndefined();
      expect(list.tail()).toBeUndefined();
      expect(list.size()).toBe(0);
    });

    test('can be called repeatedly until the list is empty', () => {
      list = buildList(1, 2);
      expect(list.pop()).toBe(1);
      expect(list.pop()).toBe(2);
      expect(list.pop()).toBeUndefined();
    });
  });

  describe('contains()', () => {
    test('returns false for an empty list', () => {
      expect(list.contains('a')).toBe(false);
    });

    test('returns true when the value is in the list', () => {
      list = buildList('a', 'b', 'c');
      expect(list.contains('a')).toBe(true);
      expect(list.contains('b')).toBe(true);
      expect(list.contains('c')).toBe(true);
    });

    test('returns false when the value is not in the list', () => {
      list = buildList('a', 'b', 'c');
      expect(list.contains('z')).toBe(false);
    });

    test('uses strict equality (no type coercion)', () => {
      list = buildList(1, 2, 3);
      expect(list.contains('1')).toBe(false);
    });
  });

  describe('findIndex()', () => {
    test('returns -1 for an empty list', () => {
      expect(list.findIndex('a')).toBe(-1);
    });

    test('returns the index of the matching node', () => {
      list = buildList('a', 'b', 'c');
      expect(list.findIndex('a')).toBe(0);
      expect(list.findIndex('b')).toBe(1);
      expect(list.findIndex('c')).toBe(2);
    });

    test('returns -1 when the value is not found', () => {
      list = buildList('a', 'b', 'c');
      expect(list.findIndex('z')).toBe(-1);
    });

    test('returns the first index when the value is duplicated', () => {
      list = buildList('a', 'b', 'a', 'b');
      expect(list.findIndex('a')).toBe(0);
      expect(list.findIndex('b')).toBe(1);
    });
  });

  describe('toString()', () => {
    test('returns an empty string for an empty list', () => {
      expect(list.toString()).toBe('');
    });

    test('formats a single node', () => {
      list = buildList('a');
      expect(list.toString()).toBe('( a ) -> null');
    });

    test('formats multiple nodes', () => {
      list = buildList('dog', 'cat', 'parrot', 'hamster', 'snake', 'turtle');
      expect(list.toString()).toBe(
        '( dog ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> null',
      );
    });
  });

  describe('insertAt()', () => {
    test('inserts at the start of the list (index 0)', () => {
      list = buildList(2, 3);
      list.insertAt(0, 1);
      expect(list.toString()).toBe('( 1 ) -> ( 2 ) -> ( 3 ) -> null');
    });

    test('inserts multiple values at index 0 preserving their order', () => {
      list = buildList(3);
      list.insertAt(0, 1, 2);
      expect(list.toString()).toBe('( 1 ) -> ( 2 ) -> ( 3 ) -> null');
    });

    test('inserts into an empty list at index 0', () => {
      list.insertAt(0, 'a', 'b');
      expect(list.toString()).toBe('( a ) -> ( b ) -> null');
      expect(list.size()).toBe(2);
    });

    test('inserts values in the middle of the list', () => {
      list = buildList(1, 2, 3);
      list.insertAt(1, 10, 11);
      expect(list.toString()).toBe(
        '( 1 ) -> ( 10 ) -> ( 11 ) -> ( 2 ) -> ( 3 ) -> null',
      );
    });

    test('inserts at the end of the list (index === size)', () => {
      list = buildList(1, 2, 3);
      list.insertAt(3, 4, 5);
      expect(list.toString()).toBe(
        '( 1 ) -> ( 2 ) -> ( 3 ) -> ( 4 ) -> ( 5 ) -> null',
      );
      expect(list.tail()).toBe(5);
    });

    test('updates the size correctly', () => {
      list = buildList(1, 2, 3);
      list.insertAt(1, 10, 11);
      expect(list.size()).toBe(5);
    });

    test('throws a RangeError when the index is negative', () => {
      list = buildList(1, 2, 3);
      expect(() => list.insertAt(-1, 99)).toThrow(RangeError);
    });

    test('throws a RangeError when the index is greater than the size', () => {
      list = buildList(1, 2, 3);
      expect(() => list.insertAt(4, 99)).toThrow(RangeError);
    });

    test('does not modify the list when it throws', () => {
      list = buildList(1, 2, 3);
      expect(() => list.insertAt(10, 99)).toThrow();
      expect(list.toString()).toBe('( 1 ) -> ( 2 ) -> ( 3 ) -> null');
    });
  });

  describe('removeAt()', () => {
    test('removes the head node (index 0)', () => {
      list = buildList(1, 2, 3);
      list.removeAt(0);
      expect(list.toString()).toBe('( 2 ) -> ( 3 ) -> null');
      expect(list.head()).toBe(2);
    });

    test('removes a node from the middle', () => {
      list = buildList(1, 2, 3);
      list.removeAt(1);
      expect(list.toString()).toBe('( 1 ) -> ( 3 ) -> null');
    });

    test('removes the last node and updates the tail', () => {
      list = buildList(1, 2, 3);
      list.removeAt(2);
      expect(list.toString()).toBe('( 1 ) -> ( 2 ) -> null');
      expect(list.tail()).toBe(2);
    });

    test('empties the list when removing the only node', () => {
      list = buildList('only');
      list.removeAt(0);
      expect(list.size()).toBe(0);
      expect(list.toString()).toBe('');
    });

    test('updates the size correctly', () => {
      list = buildList(1, 2, 3);
      list.removeAt(1);
      expect(list.size()).toBe(2);
    });

    test('throws a RangeError when the index is negative', () => {
      list = buildList(1, 2, 3);
      expect(() => list.removeAt(-1)).toThrow(RangeError);
    });

    test('throws a RangeError when the index equals the size', () => {
      list = buildList(1, 2, 3);
      expect(() => list.removeAt(3)).toThrow(RangeError);
    });

    test('throws a RangeError on an empty list', () => {
      expect(() => list.removeAt(0)).toThrow(RangeError);
    });
  });
});
# Linked List

A singly linked list implemented in JavaScript, built as part of The Odin Project's [Linked Lists](https://www.theodinproject.com/lessons/javascript-linked-lists) assignment.

## Description

This project contains a `LinkedList` class (and its helper `Node` class) that implements the core operations of a singly linked list: adding, removing, searching and inserting nodes, as well as printing the list as a string. It also includes a Jest test suite covering every method.

## Purpose

This is a practice and study project. It was created to:

- Understand how linked lists work under the hood (nodes, `nextNode` pointers, head and tail).
- Practice traversing a data structure and updating node links when inserting or removing elements.
- Get comfortable writing unit tests with Jest, including edge cases such as empty lists and out-of-bounds indexes.


## Project Structure

```
.
├── linkedList.js   # Node and LinkedList classes
├── test.js         # Jest tests
└── package.json
```

## Requirements

- Node.js 20 or higher (because I used `Array.prototype.toReversed()`).
- Jest to run the tests.

## Installation

```bash
npm install
```

## Usage

```js
import { LinkedList } from './linkedList.js';

const list = new LinkedList();

list.append('dog');
list.append('cat');
list.prepend('parrot');

console.log(list.toString());
// ( parrot ) -> ( dog ) -> ( cat ) -> null
```

## Methods

| Method | Description |
| --- | --- |
| `append(value)` | Adds a node to the end of the list. |
| `prepend(value)` | Adds a node to the start of the list. |
| `size()` | Returns the total number of nodes. |
| `head()` | Returns the value of the first node (`undefined` if the list is empty). |
| `tail()` | Returns the value of the last node (`undefined` if the list is empty). |
| `at(index)` | Returns the value at the given index (`undefined` if it doesn't exist). |
| `pop()` | Removes the first node and returns its value (`undefined` if the list is empty). |
| `contains(value)` | Returns `true` if the value is in the list, otherwise `false`. |
| `findIndex(value)` | Returns the index of the first match, or `-1`. |
| `toString()` | Represents the list as `( a ) -> ( b ) -> null` (empty string if the list is empty). |
| `insertAt(index, ...values)` | Inserts one or more values at the given index. Throws a `RangeError` if the index is below 0 or above the list size. |
| `removeAt(index)` | Removes the node at the given index. Throws a `RangeError` if the index is out of bounds. |

## Running the Tests

Tests live in `test.js` and cover every method, including empty lists, out-of-bounds indexes and duplicated values.

```bash
npm test
```

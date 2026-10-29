class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

export class LinkedList {
  constructor() {
    this.headNode = null;
  }

  append(value) {
    if (this.headNode === null) {
      this.headNode = new Node(value);
    } else {
      let current = this.headNode;
      while(current.nextNode !== null) {
        current = current.nextNode;
      }
  
      current.nextNode = new Node(value);
    }
  }

  prepend(value) {
    // Before this.headNode changes its value, JavaScript takes the current value of this.headNode.
    this.headNode = new Node(value, this.headNode);
  }

  size() {
    let countNodes = 0;
    let current = this.headNode;
    while (current !== null) {
      countNodes++;
      current = current.nextNode;
    }

    return countNodes;
  }

  head() {
    return this.headNode ? this.headNode.value : undefined;
  }

  tail() {
    if (this.headNode === null) return undefined;

    let current = this.headNode;
    while (current.nextNode !== null) {
      current = current.nextNode;
    }
    return current.value;
  }

  at(index) {
    if (this.headNode === null) return undefined;

    let currentIndex = 0;
    let current = this.headNode;
    while (current !== null) {
      if (currentIndex === index) return current.value;
      currentIndex++;
      current = current.nextNode;
    }

    return undefined
  }

  pop() {
    // Removes the head node from the list and returns its value.
    if (this.headNode === null) return undefined;

    const headValue = this.headNode.value;
    this.headNode = this.headNode.nextNode;
    return headValue;
  }

  contains(value) {
    let current = this.headNode;
    while (current !== null) {
      if (current.value === value) {
        return true;
      }
      current = current.nextNode;
    }

    return false;   
  }

  findIndex(value) {
    let current = this.headNode;
    let currentIndex = 0;
    
    while (current !== null) {
      if (current.value === value) return currentIndex;
      currentIndex++;
      current = current.nextNode;
    }

    return -1;
  }

  toString() {
    if (this.headNode === null) return '';
    
    let result = '';
    let current = this.headNode;
    while (current !== null) {
      result += `( ${current.value} ) -> `
      current = current.nextNode;
    }
    result += 'null';

    return result;
  }

  insertAt(index, ...values) {
    if (index < 0 || index > this.size()) {
      throw new RangeError("Index out of bounds.")
    }

    let currentIndex = 0;
    let current = this.headNode;

    // If the given index is zero, we can reuse the prepend() method.
    if (index === 0) {
      // Using toReversed ensures that the first value is the last one to be added.
      for (const value of values.toReversed()) { 
        this.prepend(value)
      }
      return;
    }

    // For any other index, we look for the node preceding the insertion index (index - 1), an alternative of this.prev for the nodes.
    while (current !== null) {
      if (currentIndex === index - 1) {
        for (const value of values) {
          // Creates the new node, connecting it to the next one.
          const newNode = new Node(value, current.nextNode);
          current.nextNode = newNode;
          // Updates our current variable so that it now points to the node we just created.
          current = newNode;
        }
        return;
      }

      currentIndex++;
      current = current.nextNode;
    }
  }

  removeAt(index) {
    if (index < 0 || index >= this.size()) {
      throw new RangeError("Index out of bounds.")
    }

    // If the given index is zero, we can reuse the pop() method.
    if (index === 0) {
      this.pop();
      return;
    }

    let currentIndex = 0;
    let current = this.headNode;

    while (current !== null) {
      if (currentIndex === index - 1) {
        current.nextNode = current.nextNode.nextNode;
        return;
      }

      currentIndex++;
      current = current.nextNode;
    }
  }
}
class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor(head = null, tail = null) {
    this.head = head;
    this.tail = tail;
  }

  append(value) {
    const newNode = new Node(value);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }
}
export default class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.size = 0;
    this.buckets = new Array(this.capacity).fill(null);
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  set(key, value) {
    if ((this.size + 1) / this.capacity > this.loadFactor) {
      this._resize();
      console.log(
        `The size of the bucket has been resized to ${this.capacity}`,
      );
    }
    const hash = this.hash(key);
    const index = hash % this.capacity;
    if (this.buckets[index] === null) {
      const linkList = new LinkedList();
      linkList.append({ key, value });
      this.buckets[index] = linkList;
      this.size += 1;
    } else {
      let current = this.buckets[index].head;
      while (current !== null) {
        if (current.value.key === key) {
          current.value.value = value;
          return;
        } else {
          current = current.next;
        }
      }
      this.buckets[index].append({ key, value });
      this.size += 1;
    }
  }

  _resize() {
    const oldBucket = this.buckets;
    this.capacity = this.capacity * 2; // After resize, all calculated indices are always within buckets.length
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;
    for (let i = 0; i < oldBucket.length; i++) {
      if (oldBucket[i] !== null) {
        let current = oldBucket[i].head;
        while (current !== null) {
          const hash = this.hash(current.value.key);
          const index = hash % this.capacity;
          let value = current.value.value;
          let key = current.value.key;
          if (this.buckets[index] === null) {
            let linkList = new LinkedList();
            linkList.append({ key, value });
            this.buckets[index] = linkList;
          } else {
            this.buckets[index].append({ key, value });
          }
          current = current.next;
          this.size += 1;
        }
      }
    }
  }

  get(key) {
    const hash = this.hash(key);
    const index = hash % this.capacity;
    if (this.buckets[index] !== null) {
      let current = this.buckets[index].head;
      while (current !== null) {
        if (current.value.key === key) {
          return current.value.value;
        } else {
          current = current.next;
        }
      }
    }
    return null;
  }

  has(key) {
    const hash = this.hash(key);
    const index = hash % this.capacity;
    if (this.buckets[index] !== null) {
      let current = this.buckets[index].head;
      while (current !== null) {
        if (current.value.key === key) {
          return true;
        } else {
          current = current.next;
        }
      }
    }
    return false;
  }

  remove(key) {
    const hash = this.hash(key);
    const index = hash % this.capacity;

    if (this.buckets[index] !== null) {
      let current = this.buckets[index].head;
      let nodeBefore = null;

      while (current !== null) {
        if (current.value.key === key) {
          this.size -= 1;

          if (current === this.buckets[index].head) {
            this.buckets[index].head = current.next;

            if (this.buckets[index].head === null) {
              this.buckets[index].tail = null;
            }
          } else {
            nodeBefore.next = current.next;

            if (current === this.buckets[index].tail) {
              this.buckets[index].tail = nodeBefore;
            }
          }

          return true;
        }
        nodeBefore = current;
        current = current.next;
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i] = null;
    }
    this.size = 0;
  }

  keys() {
    let array = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] !== null) {
        let current = this.buckets[i].head;
        while (current !== null) {
          array.push(current.value.key);
          current = current.next;
        }
      }
    }
    return array;
  }

  values() {
    let array = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] !== null) {
        let current = this.buckets[i].head;
        while (current !== null) {
          array.push(current.value.value);
          current = current.next;
        }
      }
    }
    return array;
  }

  entries() {
    let entriesArr = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] !== null) {
        let current = this.buckets[i].head;
        while (current !== null) {
          entriesArr.push([current.value.key, current.value.value]);
          current = current.next;
        }
      }
    }
    return entriesArr;
  }
}

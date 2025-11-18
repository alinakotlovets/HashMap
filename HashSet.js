class HashSet {
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

  set(key) {
    if ((this.size + 1) / this.capacity > this.loadFactor) {
      this._resize();
    } else {
      const hash = this.hash(key);
      const index = hash % this.capacity;
      if (this.buckets[index] === null) {
        const linkList = new LinkedList();
        linkList.append({ key });
        this.buckets[index] = linkList;
        this.size += 1;
      } else {
        let current = this.buckets[index].head;
        while (current !== null) {
          if (current.value.key === key) {
            return;
          } else {
            current = current.next;
          }
        }
        this.buckets[index].append({ key });
        this.size += 1;
      }
    }
  }

  _resize() {
    const oldBucket = this.buckets;
    this.capacity = this.capacity * 2;
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;
    for (let i = 0; i < oldBucket.length; i++) {
      if (oldBucket[i] !== null) {
        let current = oldBucket[i].head;
        while (current !== null) {
          const hash = this.hash(current.value.key);
          const index = hash % this.capacity;
          let key = current.value.key;
          if (this.buckets[index] === null) {
            let linkList = new LinkedList();
            linkList.append({ key });
            this.buckets[index] = linkList;
          } else {
            this.buckets[index].append({ key });
          }
          current = current.next;
          this.size += 1;
        }
      }
    }
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

  entries() {
    let entriesArr = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] !== null) {
        let current = this.buckets[i].head;
        while (current !== null) {
          entriesArr.push([current.value.key]);
          current = current.next;
        }
      }
    }
    return entriesArr;
  }
}

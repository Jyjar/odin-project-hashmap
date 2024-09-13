class HashMap {
    constructor(initialSize = 16, loadFactorTreshhold = 0.75) {
        this.buckets = new Array(initialSize);
        this.size = 0;
        this.loadFactorTreshhold = loadFactorTreshhold;
    }
    hash(key) {
        let hasCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hasCode = primeNumber * hasCode + key.charCodeAt(i);
        }

        return hasCode;
    }

    set(key, value) {
        const loadFactor = this.size / this.buckets.length;

        if (loadFactor > this.loadFactorTreshhold) {
            this.resize();
        }

        const index = this.hash(key);

        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }

        for (let i = 0; i < this.buckets[index].length; i++) {
            const pair = this.buckets[index][i];

            if (pair[0] == key) {
                pair[1] = value;
                return;
            }
        }

        this.buckets[index].push([key, value]);
        this.size++;
    }

    get(key) {
        const index = this.hash(key);

        if (!this.buckets[index]) {
            return null;
        } else {
            for (let i = 0; i < this.buckets[index].length; i++) {
                const pair = this.buckets[index][i];

                if (pair[0] == key) {
                    return pair[1];
                }
            }
        }
    }

    has(key) {
        const index = this.hash(key);

        if (!this.buckets[index]) {
            return false;
        }

        for (const pair of this.buckets[index]) {
            if (pair[0] === key) {
                return true;
            }
        }
    }

    remove(key) {
        const index = this.hash(key);

        if (!this.buckets[index]) {
            return false;
        }

        for (let i = 0; i < this.buckets[index].length; i++) {
            const pair = this.buckets[index][i];

            if (pair[0] === key) {
                this.buckets[index].splice(i, 1);
                this.size--;
                return true;
            }
        }

        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = [];
        this.size = 0;
    }

    keys() {
        let keyArray = [];

        for (const bucket of this.buckets) {
            if (bucket) {
                for (const [key] of bucket) {
                    keyArray.push(key);
                }
            }
        }
        return keyArray;
    }

    values() {
        let valueArray = [];

        for (const bucket of this.buckets) {
            if (bucket) {
                for (const [key, value] of bucket) {
                    valueArray.push(value);
                }
            }
        }
        return valueArray;
    }

    entries() {
        let entriesArray = [];

        for (const bucket of this.buckets) {
            if (bucket) {
                for (const [key, value] of bucket) {
                    entriesArray.push([key, value]);
                }
            }
        }
        return entriesArray;
    }

    resize() {
        const oldBuckets = this.buckets;
        this.buckets = new Array(oldBuckets.length * 2);
        this.size = 0;

        for (const bucket of oldBuckets) {
            if (bucket) {
                for (const [key, value] of bucket) {
                    this.set(key, value);
                }
            }
        }
    }
}

export { HashMap };

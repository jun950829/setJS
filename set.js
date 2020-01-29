function Set(elements) {
    if (elements === undefined)
        this.elements = [];
    else
        this.elements = elements;

    // 1개의 element를 입력 받고, set에 중복여부를 확인 후, 추가한다.
    this.add = function (value) {
            if(!this.contain(value)) {
                this.elements.push(value);
            }
    };

    // 1개의 element를 입력 받고, set에 있으면 제거한다.
    this.remove = function (value) {
        const idx = this.elements.indexOf(value);
        if(idx > -1) delete this.elements[idx];
    };

    // 1개의 element를 입력 받고, set에 존재여부를 return 한다
    this.contain = function (value) {
        return this.elements.includes(value);
    };

    // 모든 element를 지운다.
    this.clear = function () {
        this.elements.splice(0, this.length);
    };

    // set이 비어있는지 여부를 return 한다.
    this.isEmpty = function () {
        if(this[0] == null)
            return true;
        else
            return false;
    };

    // 다른 set을 입력 받고, 합집합을 구하고 그 값을 return 한다
    this.union = function (set) {
        let result = new Set();
        for(let i = 0; i < set.elements.length; i++)
            result.add(set.elements[i]);
        for (let j = 0; j < this.elements.length; j++)
            result.add(this.elements[j]);
        result.elements.sort();
        return result;
    };

    // 다른 set을 입력 받고, 교집합을 구하고 그 값을 return 한다
    this.intersection = function (set) {
        let result = new Set();
        for(let i = 0; i < set.elements.length; i++) {
            if(this.elements.includes(set.elements[i]))
                result.elements.push(set.elements[i]);
        }
        result.elements.sort();
        return result;
    };

    // 다른 set을 입력 받고, 차집합을 구하고 그 값을 return 한다
    this.complement = function (set) {
        let result = new Set ();
        for (let j = 0; j < this.elements.length; j++)
            result.add(this.elements[j]);
        let arr1 = this.intersection(set);
        for(let i = 0; i < arr1.elements.length; i++) {
            if(result.contain(arr1.elements[i]))
                result.remove(arr1.elements[i]);
        }
        result.elements.sort();
        return result;
    };

    // 다른 set을 입력 받고, symmtric을 구하고 그 값을 return 한다
    this.symmetric = function (set) {
        let result = new Set(this.union(set).elements);
        let arr1 = this.intersection(set);
        for(let i = 0; i < arr1.elements.length; i++)
            result.remove(arr1.elements[i]);

        return result;
    };

    this.showElement = function (str) {
        if (typeof str === "string")
            console.log(str + this.elements);
        else
            console.log(this.elements);
    }
}

// test code
let A = new Set([1, 2, 3]);
let B = new Set([3, 4, 5]);
let C = new Set();
let union = A.union(B);
let intersection = A.intersection(B);
let complement = A.complement(B);
let symmetric = A.symmetric(B);

A.showElement("A is ");
B.showElement("B is ");
C.showElement("C is ");

console.log("\n");
union.showElement("union of A and B is ");
intersection.showElement("intersection of A and B is ");
complement.showElement("The relative complement B in A (A-B) is ");
symmetric.showElement("The symmetric difference of A and B is ");

console.log("\n");
A.clear();
console.log("is A empty ? " + A.isEmpty());
A.showElement("cleared A is ");

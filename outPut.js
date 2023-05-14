// function foo() {
//     console.log("foo");
//   }
//   setTimeout(()=>console.log("first"),10)
//   setImmediate(()=>console.log("second"))
//   process.nextTick(foo);
//   console.log("bar");

// setTimeout(() => { console.log('timeout'); }, 0);
// setImmediate(() => { console.log('immediate'); });
// process.nextTick(()=> console.log('nexttick'));

// console.log("***** Odd prototype *****");
// console.log();

Array.prototype.odd = async function () {
    let value = await oddHelper(this);
    console.log(value);
    return value;
};
async function oddHelper(arr) {
    return (oddArr = arr.filter((o) => o % 2 !== 0));
}
// [1, 23, 4, 5, 6, 7].odd();

// console.log("****** Fibonacci sequence ******");
// console.log();

let fibCash = {};
function fibonacci(n) {
    if (fibCash[n]) {
        return fibCash[n];
    }
    if (n == 1) {
        return 1;
    }
    if (n == 0) {
        return 0;
    }
    fibCash[n] = fibonacci(n - 2) + fibonacci(n - 1);
    return fibonacci(n - 2) + fibonacci(n - 1);
}
// console.log(fibonacci(40));

// console.log("******* Lucas number *******");
// console.log();
let lucCash = {};
function lucasNumber(n) {
    if (lucCash[n]) {
        return lucCash[n];
    }
    if (n === 0) {
        return 2;
    }
    if (n === 1) {
        return 1;
    }
    lucCash[n] = lucasNumber(n - 2) + lucasNumber(n - 1);
    return lucasNumber(n - 2) + lucasNumber(n - 1);
}
// console.log(lucasNumber(40));

// console.log("***** twoSum *****");
// console.log();

// Two sum: Given an array of integers nums and an
// integer target, return indices of the two numbers such that they add up to target.
// Input: nums = [2,7,11,15], target = 9 Output: [0,1]
// Follow up questions: Find all indices

function twoSum(arr, target) {
    let mp = {};
    for (let i = 0; i < arr.length; i++) {
        let def = target - arr[i];
        if (mp[def] !== undefined) {
            return [mp[def], i];
        } else {
            mp[arr[i]] = i;
        }
    }
    console.log(mp);
    return null;
}
// console.log(twoSum([ 7, 11, 15, 2], 9));

// console.log("***** Even prototype ********");
// console.log();
Array.prototype.even = async function () {
    let value = await evenHelper(this);
    console.log(value);
    return value;
};
function evenHelper(arr) {
    let even = arr.filter((e) => e % 2 === 0);
    return even;
}

// [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].even();

console.log("***** Non duplicated array  *****");
console.log();

// Create a function to return an array from two arrays.
// The returned array contains all different elements in both input arrays.
// Input: [1, 2, 3, 4, 4, 5], [3, 4, 5, 6]
// Output: [1,2,3,4,5,6]

function nonDuplicatedArray(arr1, arr2) {
    return [...new Set([...arr1, ...arr2])];
}
// console.log(nonDuplicatedArray([1, 2, 3, 4, 4, 5], [3, 4, 5, 6]));

console.log("***** Non duplicated array  *****");
console.log();

async function helper(arr) {
    return [...new Set(arr)];
};

Array.prototype.removeDuplicates = async function () {
    let value = await helper(this);
    console.log(value);
};

// [4, 1, 5, 7, 2, 3, 1, 4, 6, 5, 2].removeDuplicates();



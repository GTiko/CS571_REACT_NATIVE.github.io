// # CS571-2023-05-Assignment01
// * Two sum: Given an array of integers nums and an integer target,
// return indices of the two numbers such that they add up to target.
// Input: nums = [2,7,11,15], target = 9 Output: [0,1];
// * Follow up questions: Find all indices.

function twoSum(arr, target) {
  let newArr = [];
  let mp = {};
  for (let i = 0; i < arr.length; i++) {
    let def = target - arr[i];
    if (mp[def] !== undefined) {
      newArr.push([mp[def], i]);
    } else {
      mp[arr[i]] = i;
      console.log(mp);
    }
  }
  return newArr;
}

let num = [2, 7, 4, 11, 5, 15];
let target = 9;

console.log(twoSum(num, target));

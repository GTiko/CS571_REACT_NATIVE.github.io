function optimizesTwoSum(arr, target) {
  let map = {};
  for (let i = 0; i < arr.length; i++) {
    let def = target - arr[i];
    if (map[def] !== undefined) {
      return [map[def], i];
    } else {
      map[arr[i]] = i;
    }
  }
  return [];
}
console.log(optimizesTwoSum([2, 7, 11, 4, 5, 15], 9));

function optimizesTwoSumAll(arr, target) {
  let newArr = [];
  let map = {};
  for (let i = 0; i < arr.length; i++) {
    let def = target - arr[i];
    if (map[def] !== undefined) {
      newArr.push([map[def], i]);
    } else {
      map[arr[i]] = i;
    }
  }
  return newArr;
}
console.log(optimizesTwoSumAll([2, 7, 11, 4, 5, 15], 9));

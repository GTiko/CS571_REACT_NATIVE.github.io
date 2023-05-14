// Input: l1 = [2,4,3], l2 = [5,6,4]
// Output: [7,0,8]
// Explanation: 342 + 465 = 807.

// Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// Output: [8,9,9,9,0,0,0,1]

function addTwoNumbers(l1, l2) {
  let num1 = "";
  let num2 = "";

  for (let i = l1.length - 1; i >= 0; i--) {
    num1 += l1[i];
  }

  for (let i = l2.length - 1; i >= 0; i--) {
    num2 += l2[i];
  }

  let sum = "" + (parseInt(num1) + parseInt(num2));
  let arr = sum.split("");

  for (let i = 0; i < arr.length; i++) {
    arr[i] = parseInt(arr[i]);
  }

  return arr;
}

console.log(addTwoNumbers([2, 4, 3], [5, 6, 4]));



// let num1 = "";
// let num2 = "";
// for (let each of l1) {
//     num1 += each;
// }
// for (let each of l2) {
//     num2 += each;
// }
// num1 = Number(num1);
// num2 = Number(num2);

// let sum = num1 + num2;
// sum = ""+sum

// let arr = []
// for(let i=sum.length-1;i>=0;i--){
//     arr.push(Number(sum.charAt(i)))
// }
// return arr
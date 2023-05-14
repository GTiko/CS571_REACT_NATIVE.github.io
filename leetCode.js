// // const isMatch = function (s, p) {
// //   if (p == ".*") {
// //     return true;
// //   }
// //   if (s == p) {
// //     return true;
// //   }
// //   if (p.includes("*")) {
// //     let x = p[0];
// //     for (let i = 0; i < s.length; i++) {
// //       if (s[i] !== x) {
// //         return false;
// //       }
// //       return true;
// //     }
// //   }
// //   return false;
// // };

// const isMatch = function(s, p) {
//     if(p == ".*"){
//         return true;
//     }else if(s == p){
//         return true;
//     }else{
//         if(p.includes("*")){
//             let x = p[0];
//             for(let i=0;i<s.length;i++){
//                 if(s[i] !== x){
//                     return false;
//                 }
//             }
//             return true;
//         }
//     }
//     return false;
// };

// console.log(isMatch("aa", "a"));
// console.log(isMatch("aa", "a*"));
// console.log(isMatch("aa", ".*"));

// symbols = {
//     "I": 1,
//     "V": 5,
//     "X": 10,
//     "L": 50,
//     "C": 100,
//     "D": 500,
//     "M": 1000
// };

// const romanToInt = function(s) {
//    let value = 0;
//     for(let i = 0; i < s.length; i++){
// console.log(s[i])
//         if(symbols[s[i]] < symbols[s[i+1]]){
//             value = value - symbols[s[i]]
//         }else{
//             value = value + symbols[s[i]]
//         }
//     }
//     return value
// };

// console.log(romanToInt("MCMXCIV"))

//

// let y = "flower";
// console.log(y[0]+y[1]);

const longestCommonPrefix = function (str) {
  let arr = [];
  for (let i = 0; i < str.length; i++) {
    arr.push(str[i][0] + str[i][1]);
  }
  console.log(arr);

  let max = {};
  for (let i = 0; i < arr.length; i++) {
    let count = 0;
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        count++;
      }
    }
    max[arr[i]] = count;
  }

  let val = 0;
  let y = "";
  for (let x in max) {
    if (max[x] > val) {
      y = x;
      val = max[x];
    }
  }

  if (val === 1) {
    return "";
  } else {
    return y;
  }
};

// longestCommonPrefix(["flower","flow","flight"]);
// longestCommonPrefix(["dog","racecar","car", "cat", "caca", "case", "rat", "doge", 'rare']);
// console.log(longestCommonPrefix(["a"]))

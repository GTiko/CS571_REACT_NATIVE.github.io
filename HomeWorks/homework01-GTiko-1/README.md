# CS571-2023-05-Homework01
* Create an Express web server that receives a `GET` request to `/lucas`. This route will receive a number passed in the request as query parameter as following: `http://localhost:3000/lucas?n=5` and returns a `JSON` object contains the Lucas number of `n`. Reference: https://en.wikipedia.org/wiki/Lucas_number
* Write a middleware to validate that the users are passing `n` as query parameter and the value is a valid `number`.
  
**Example**: `/lucas?n=5` should return a `JSON` object: `{lucas: 11}`  
  
**Note:** Calculating Lucas is considered an intense CPU work, design your code so it does not block the main event-loop of the master process. 

**Note: Add `node_modules` folder to your `.gitignore` file. You should only push your code along with `package.json` and `package-lock.json`**

**Note: Please submit the homework by `10:00 PM CST`**

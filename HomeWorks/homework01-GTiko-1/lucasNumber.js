let cash = {}
function lucasNumber(num) {
    if (cash[num]) {
        return cash[num];
    }
    if (num == 0) {
        return 2;
    } if (num == 1) {
        return 1
    } else {
        cash[num] = lucasNumber(num - 1) + lucasNumber(num - 2);
        return lucasNumber(num - 1) + lucasNumber(num - 2);
    }
}
console.log(lucasNumber(40));

module.exports = lucasNumber;
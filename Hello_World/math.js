function add(a, b){
    return a+b;
}

function sub(a, b){
    return a-b;
}

// module.exports = {
//     addFn: add,
//     subFn: sub
// }


exports.add=add = (a, b)=> a+b;
exports.sub=sub = (a, b)=> a-b;
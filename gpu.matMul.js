const { GPU } = require('gpu.js');

const generateMatrices = () => {
    const matrices = [[], []]
    for (let y = 0; y < 512; y++){
      matrices[0].push([])
      matrices[1].push([])
      for (let x = 0; x < 512; x++){
        matrices[0][y].push(Math.random())
        matrices[1][y].push(Math.random())
      }
    }
    return matrices
};

const gpu = new GPU();
const multiplyMatrix_gpu = gpu.createKernel(function(a, b) {
let sum = 0;
for (let i = 0; i < 512; i++) {
    sum += a[this.thread.y][i] * b[i][this.thread.x];
}
return sum;
}).setOutput([512, 512]);

const matrices = generateMatrices();

var start = new Date().getTime();

const out = multiplyMatrix_gpu(matrices[0], matrices[1]);

var end = new Date().getTime();

// console.log(out[y][x]);  // --> Logs the element at the xth row and the yth column of the matrix
console.log(out[10][12]);

console.log(`time taken for execution --> ${end - start} ms`); // 133 ms
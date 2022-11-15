var fs = require('fs')

function read_data(file_path){
    var data = fs.readFileSync(file_path)
        .toString() // convert Buffer to string
        .split('\n') // split string to lines
        .map(e => e.trim()) // remove white spaces for each line
        .map(e => e.split(',') //split into columns
        .map(e => parseFloat(e.trim()))) // split each line to array parse as float

    //Saco la primera fila que contiene los headers del csv
    data.shift()

    //array or arrays
    return data
}

module.exports = {read_data}
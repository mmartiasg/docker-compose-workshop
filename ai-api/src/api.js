var data_parser = require('./data_parsing.js')
const math_extra = require("./math_extras")
const Regression = require('./regression.js')

let base_path = "../datasets"
let train_file_path = base_path+"/train_data.csv"
let val_file_path = base_path+"/val_data.csv"

const express = require('express')
const app = express()
const port = 3000

const mysql = require('mysql2')
const connection = mysql.createConnection({
  host: 'mysql-service',
  user: 'root',
  port: 3306,
  password: 'root',
  database: 'model'
})

//feature a seleccionar 10 seria alcohol
const feature_index = 10
//Nuestro target que es la calidad del vino
const target_index = 11

let model = new Regression(0.001, math_extra.mse)

let baseline_model = new Regression(-1, math_extra.mse)
baseline_model.predict = (x) => 5.64

//Read data
var train_data = data_parser.read_data(train_file_path)
//split feature and target
const train_x = train_data.map((x)=>x[feature_index])
const train_y = train_data.map((x)=>x[target_index])

var val_data = data_parser.read_data(val_file_path)
//split feature and target
const val_x = val_data.map((x)=>x[feature_index])
const val_y = val_data.map((x)=>x[target_index])

model.training_map(train_x, train_y, 5000, true)
console.log("RESULTS")
console.log("BASELINE EVALUACION MSE VALIDATION DATA: "+model.eval_map(val_x, val_y))
console.log("EVAL EVALUACION MSE VALIDATION DATA: "+baseline_model.eval_map(val_x, val_y))

//Endpoints
app.get('/predict', (req, res) => {
  model_input = parseFloat(req.query.alcohol, 10)
  prediction = model.predict(model_input)
  
  if (model_input<0){
    res.send(`fuera de rango: ${model_input}`)
  }

  if (model_input>20){
    res.send(`fuera de rango: ${model_input}`)
  }

  if (prediction>10){
    prediction = 10
  }

  if (prediction<0){
    prediction = 0
  }

  res.send(`prediction: ${prediction}`)
  connection.query(`INSERT into model.requests (model, param_index, tita1, tita2, value, results) values("regression", ${feature_index}, ${model.tita1}, ${model.tita2}, ${model_input}, ${prediction})`, (err, rows, fields) => {
    if (err) throw err
  })
})

app.get('/retrain', (req, res) => {
  epochs = parseInt(req.query.epochs, 10)
  model.training_map(train_x, train_y, epochs, true)

  eval_mse = model.eval_map(val_x, val_y)

  res.send(`values after train tita1: ${model.tita1} - tita2: ${model.tita2} - eval in validation: ${eval_mse}`)
  console.log("RESULTS")
  console.log("BASELINE EVALUACION MSE VALIDATION DATA: "+eval_mse)

  connection.query(`INSERT into model.params (model, param_index, tita1, tita2, eval_mse) values("regression", ${feature_index}, ${model.tita1}, ${model.tita2}, ${eval_mse})`, (err, rows, fields) => {
    if (err) throw err
  })
})

app.listen(port, () => {
  console.log(`model api listening on port ${port}`)
})

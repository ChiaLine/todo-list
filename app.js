const express = require('express')
// 載入 mongoose
const mongoose = require('mongoose')

const app = express()

// 設定連線到 mongoDB
mongoose.connect('mongodb://localhost/todo-list')
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connercted :)')
})

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(3000, () =>{
  console.log(`App is running on http://localhost:3000`)
})
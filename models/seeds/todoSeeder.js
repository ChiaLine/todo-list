// 載入 mongoose & todo model
const mongoose = require('mongoose')
const Todo = require('../todo')

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

  // 建立資料過程，新增 10 筆資料
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}` })
  }

  console.log('done. OK')
})
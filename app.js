// 載入
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const Todo = require('./models/todo')

const app = express()

// 設定連線到 mongoDB
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

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

// hbs設定
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

// 路由設定
app.get('/', (req, res) => {
  // 取得Todo所有資料
  Todo.find()
    .lean()
    .then( todos => res.render( 'index', { todos } ))
    .catch( error => console.error(error))
})

app.listen(3000, () =>{
  console.log(`App is running on http://localhost:3000`)
})
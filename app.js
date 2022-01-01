// 載入
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
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

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  // 取得Todo所有資料
  Todo.find()
    .lean()
    .then( todos => res.render( 'index', { todos } ))
    .catch( error => console.error(error))
})

// 新增todo頁面
app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  // 拿出表單裡的資料
  const name = req.body.name
  // 呼叫Todo物件直接新增資料
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch( error => console.log(error))
})

// todo詳細頁面
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  console.log('222', id)
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(() => console.log(error))
})

// todo編輯頁面
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(() => console.log(error))
})

app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(() => console.log(error))
})

app.listen(3000, () =>{
  console.log(`App is running on http://localhost:3000`)
})
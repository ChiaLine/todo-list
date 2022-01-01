// 把 mongoose 載入
const mongoose = require('mongoose')

// 提供 mongoose.Schema 模組 規定好的格式
// 這裡 Schema 大寫表示可用 new Schema() 的方式來建構一個新的 Schema
const Schema = mongoose.Schema

// 把資料結構當成參數傳給 new Schema() 的設定：
// 每筆 todo 資料都有一個叫做 name 的屬性
const todoSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  }
})

// 透過 module.exports 把 schema 輸出名為 Todo，Todo可操作有關的資料
module.exports = mongoose.model('Todo', todoSchema)
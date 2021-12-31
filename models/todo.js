// 把 mongoose 載入進來，才能使用相關方法
const mongoose = require('mongoose')

// Mongoose 提供了一個 mongoose.Schema 模組 規定好的格式
// 這裡 Schema 大寫表示你可以用 new Schema() 的方式來建構一個新的 Schema
const Schema = mongoose.Schema

// 把我們想要的資料結構當成參數傳給 new Schema() 的設定：
// 每筆 todo 資料都有一個叫做 name 的屬性
// 我們規定 name 屬性：
const todoSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  }
})

// 然後透過 module.exports 把這個 schema 輸出
// 匯出的時候我們把這份 schema 命名為 Todo，以後在其他的檔案直接使用 Todo 就可以操作和「待辦事項」有關的資料了！
module.exports = mongoose.model('Todo', todoSchema)
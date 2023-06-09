//引入 express 並設變數儲存
const express = require ('express')
const app = express()
//引入 restaurant.josn
const port = '3000'
const restaurantList = require('./restaurant.json')
//宣告樣板引擎變數
const exphbs = require('express-handlebars')

//設定樣板引擎
app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

//靜態檔案設置
app.use(express.static('public'))

//設定路由
app.get('/', (req, res) => {
    res.render('index' , { restaurant: restaurantList.results })
})

//設定點擊卡片動態路由
app.get('/restaurants/:restaurant_id', (req, res) => {
    const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
    res.render('show', {restaurant: restaurant})
})

//設定search路由
app.get('/search', (req, res) => {
    const restaurants = restaurantList.results.filter((restaurant) => {return restaurant.name.toLocaleLowerCase().includes(req.query.keyword.toLocaleLowerCase())})
    res.render('index', {restaurant: restaurants, keyword: req.query.keyword})
})

//監聽伺服器
app.listen(port, ()=> {
    console.log(`Express is running on http://locolhost: ${port}`)
})      

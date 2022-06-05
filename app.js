//  to controll ur website

const express = require("express");
const app = express();
const port = 5000;
app.set('view engine', 'ejs')
app.use(express.static('public'))
const Article=require("./models/articleSchema")
app.use(express.urlencoded({ extended: true }));










// for auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});


// connect to dataBase

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://somaia:somaia1234@cluster0.gkw19.mongodb.net/all-data?retryWrites=true&w=majority")
  .then( result => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
    
  })
  .catch( err => {
    console.log(err);
  })



app.get("/", (req, res) => {
  res.redirect("/all-articles");
 
});




app.get("/all-articles", (req, res) => {
  // res.render("index",{myTiTle:"All-Articles"})
  Article.find()
  .then((result) => {
    console.log(result);
    // res.send("here")
    res.render("index",{myTiTle:"home",articlesArray:result})
    
  })
  .catch((err) => {
    console.log(err);
    
  })
});



app.get("/add-new-article", (req, res) => {
  res.render("add-new-article",{myTiTle:"add-new"})
});


app.post("/all-articles",(req,res)=>{
  console.log(req.body)
  const article=new Article(req.body)
article.save()
.then((result)=>{res.redirect("/all-articles")})
.catch((err)=>{console.log(err)})  

});


app.get ("/articles/:id",(req,res) => {
  Article.findById(req.params.id).then((result)=>{
    res.render("details",{myTiTle:"view the article",dataObj:result})


})
});
 


//  404 
app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
});







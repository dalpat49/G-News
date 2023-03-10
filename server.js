const express = require("express");

const route = require("./routes/index")
const bodyParser = require("body-parser")

const app = express();

const port =  process.env.PORT || 5000 ;
const cors = require("cors")
const path = require("path")


app.use(bodyParser.urlencoded({ extended: false }));

app.set(express.urlencoded({ extended: true }));
// app.use(function(req, res, next) { 
//     res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0 application/javascript');
//      next();
     
//    });

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors({
    origin:["https://g-news-qh78.onrender.com"]
}))
// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, './client/build/index.html'));
//   });

  if(process.env.NODE_ENV === "production") {
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "./client/build/index.html"),(err) => err && res.status(500).send(err));

      }); }

//routes
app.use('/',route);


//server
app.listen(port, () => {
    console.log(`server has  been started at ${port}`)
})


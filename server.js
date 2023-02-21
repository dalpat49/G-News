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
    // app.use(cors());
    if (process.env.NODE_ENV === "production") {
        // Serve any static files
        app.use(express.static(path.join(__dirname, "./client/build")));
        // Handle React routing, return all requests to React app
        app.get("*", function (req, res) {
          res.sendFile(path.join(__dirname, "./client/build", "index.html"));
        });
      }
    
    
 
app.use("../client/build",express.static(path.join(__dirname, '../client/build')));

//route
app.use('/',route);


//server
app.listen(port, () => {
    console.log(`server has  been started at ${port}`)
})


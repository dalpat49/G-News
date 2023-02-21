const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const user = require("../models/userModel")
const bodyParser = require("body-parser")
const cors = require("cors")
const bcrypt = require("bcrypt")
const multer = require("multer")
const cookieparser = require("cookie-parser");
const MongoStore = require('connect-mongo');
const session = require("express-session")
const path  = require("path")




const subscription = require("../models/subscribeNewsLetter")
const  {newsletterSubscription,
        newUserRegisteration,
        getAllnewstoUser,
        CommetByUser,
        getAllNewsCategory,
        get_news_by_category,
        updateLikesInNews,
        updateDisLikesInNews,
        userLogin,
        getUserCompliant,
        logout} = require("../Controllers/userController")


const {adminNewUserRegisteration,
        getAllUsers,
        deleteUserFromAdmimPanel,
        updateUserFromAdminPanel,
        addNewNewsCategoryFromAdminPanel,
        getAllTheNewsCategories,
        editCategoryFromAdminPanel,
        dltCategory,
        getAllnews,
        addNewNews,
        dltNews,
        updateNews,
        changeCategoryStatus,
        changeUserStatus,
        changePublishedStatus,
        adminLoginCheck,
        adminLogout,
        getAllCouts} = require("../Controllers/adminControler")






//multer setup
const storage = multer.diskStorage({
    destination: "./client/public/images",
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
        // cb(null, file.originalname);
    },
});

//uplaod image to database
const upload = multer({
    storage: storage,
    
});


//data base connection 
const dburl = "mongodb+srv://dalpatrathore09:ravindra@cluster0.6trkccz.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dburl,{
     useNewUrlParser: true,
    useUnifiedTopology: true,}).then(()=>{
        console.log("successfully connected to database")
    }).catch((err)=>{console.log(err)})

    route.use(bodyParser.urlencoded({ extended: false }));
    route.use(bodyParser.json());
    route.use(express.urlencoded({ extended: true }));
    route.use(express.json())
    route.use("../client/build",express.static(path.join(__dirname, '../client/build')));
route.use(cookieparser());


route.use(cors());
    

    
    
const securedPassword =async(password)=>{
    try{
    let hasedPassword = await bcrypt.hash(password,4)
    return hasedPassword;
    }
    catch(err){
        console.log(err)
    }
}

route.use(
    session({
        store: MongoStore.create({ mongoUrl:dburl}),
        secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
        saveUninitialized: true,
        resave: true,
        cookie: {
            secure: false,
            maxAge: 8*60*60*1000 ,
        },
    })
);

// route.get("/",(req,res)=>{
//     res.sendFile(path.join(__dirname,"index.html"))
// })





route.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
})


//gett all newss to user 
route.get("/getAllNews",getAllnewstoUser);

route.post("/userLoginCheck",userLogin)

//new user registration
route.post("/registered",upload.single("image"),newUserRegisteration);

//user subscription
route.post('/newsLetterSubscription',newsletterSubscription);

//get comments
route.post("/getCommentByUser/:id",CommetByUser)

//get all categorires
route.get("/getAllCategories",getAllNewsCategory)

route.get("/getAllNewsById/:id",get_news_by_category);

//Like news
route.put("/updateLikesForNews/:id",updateLikesInNews)


//dislike news
route.put("/updateDislikesForNews/:id",updateDisLikesInNews)

//get complaint from user
route.post("/getComplaintFromUser",getUserCompliant);

route.get("/logout",logout)










































// **************** ADMIN ROUTES *****************************//

//adminlogin check
route.post("/admin/adminLoginCheck",adminLoginCheck)

//admin new user registration
route.post("/admin/newUserRegistration",adminNewUserRegisteration);

//get all users
route.get("/admin/allUsers",getAllUsers)

//user update
route.put("/admin/editUserFromAdminPanel/:id",updateUserFromAdminPanel)

//delete user
route.delete("/admin/dltUserFromAdminPanel/:id",deleteUserFromAdmimPanel)

//chaange user status
route.put("/admin/upadteUserStatus/:id",changeUserStatus)

//get all the categories in mongodb
route.get("/admin/getAllTheNewsCategories",getAllTheNewsCategories)

//adding new category
route.post("/admin/addNewNewsCategory",addNewNewsCategoryFromAdminPanel)

//edit category
route.put("/admin/EditCategoryFromAdminPanel/:id",editCategoryFromAdminPanel)

//dlt category from admin panel
route.delete("/admin/dltCategoryFromAdminPanel/:id",dltCategory)

//change the status of category
route.put('/admin/changeStatusOfCategory/:id',changeCategoryStatus)

//get all the news at a place 
route.get("/admin/getAllNewsFromAdminPanel",getAllnews)

//add a new news
route.post("/admin/addNewNewsFromAdminPanel",upload.single("newsImage"), addNewNews)

//update news
route.put("/admin/updateNewsFromAdminPanel/:id",updateNews)

//add delete news
route.delete("/admin/dltNewsFromAdminPanel/:id",dltNews)

//chnage news status
route.put("/admin/changeNewsStatus/:id",changePublishedStatus)

///admin logoout
route.get("/admin/adminLogout",adminLogout)

//get all counts
route.get("/admin/adminGetCount",getAllCouts)

module.exports = route;

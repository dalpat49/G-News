const newsletter = require("../models/subscribeNewsLetter")
const user = require("../models/userModel")
const bcrypt = require("bcrypt")
const { route } = require("../routes")
const newsCategory = require("../models/newsCatrgoryModel")
const news = require("../models/newsModel")
const multer = require("multer")



//multer setup
const storage = multer.diskStorage({
    destination: "../public/images",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

//uplaod image to database
const upload = multer({
    storage: storage,
});



async function securedPassword(password){
    try{
    let hasedPassword = await bcrypt.hash(password,4)
    return hasedPassword;
    }
    catch(err){
        console.log(err)
    }
}


//new user regostration
const adminNewUserRegisteration  = async(req,res)=>{
    try{
        const {name,email,number,password,cpassword} = req.body
        const newHasedPassword = await securedPassword(req.body.password);
        const newUserRegister = new user({name,email,number,password:newHasedPassword,cpassword})
        const new_user = await newUserRegister.save()
     return res.status(200).json({success:true,msg:"User added successfully"})


    }
    catch(err)
    {
        console.log(err)
    }
}

const adminLoginCheck =async(req,res)=>{
    try{
        const {email , password} = req.body;
        if(email === "singhdalpat8182@gmail.com" && password === "admin@123"){
            return res.status(200).json({success:true,msg:"admin login done" ,email:email});
        }
    
    }
    catch(err)
    {
        console.log(err)
    }
}


//get allusers
const getAllUsers = async(req,res)=>{
    try{
        const getAllUsersData = await user.find({});
        res.json({getAllUsersData})

    }
    catch(err)
    {
        console.log(err)
    }
}

//update user 
const updateUserFromAdminPanel = async(req,res)=>{
    try{
    const editUserId = req.params.id;
    const {name,email,number} = req.body;

    const editUser = await user.findByIdAndUpdate({_id:editUserId},{
        $set:{
            name:req.body.name,email:req.body.email,number:req.body.number
        }
    })
    return res.status(200).json({success:true,msg:"User updated successfully"})
}
catch(err){
    console.log(err)
}



}



//delete user 
const deleteUserFromAdmimPanel = async(req,res)=>{
    try{
    const dltUserId = req.params.id;

    const dltUserByid = await user.findByIdAndDelete({_id:dltUserId})
    return res.status(200).json({success:true,msg:"User deleted successfully"})
    }
    catch(err){
        console.log(err)
    }
}

//change user status 
const changeUserStatus = async(req,res)=>{
    try{
        const editUserStatusId = req.params.id;
        const findUser = await user.findOne({_id:editUserStatusId});
        if(findUser.status === "active"){
            const change_user_status_to_deactivate = await user.findByIdAndUpdate({_id:editUserStatusId},{
                $set:{
                    status:"deactivate"
                }
            })
            return res.status(200).json({success:true,msg:"User status updated to deactivate ",color:"green"});
        }
        else{
            const change_user_status_to_active = await user.findByIdAndUpdate({_id:editUserStatusId},{
                $set:{
                    status:"active"
                }
            })
            return res.status(200).json({success:true,msg:"User status udpated to active",color:"rose"})
        }

    }
    catch(err)
    {
        console.log(err)
    }
}


//get all the news category
const getAllTheNewsCategories =async(req,res)=>{
    try{
        const getAllNewsCat = await newsCategory.find({});
        return res.status(200).json({getAllNewsCat})
    }
    catch(err)
    {
        console.log(err)
    }
}


//new catgegory
const addNewNewsCategoryFromAdminPanel = async(req,res)=>{
    try{
        const {name,id} = req.body;
     const newNewsCatrgory = new newsCategory({
        category_name:req.body.catName,
    })
    const new_category = await newNewsCatrgory.save()
    return res.status(200).json({success:true,msg:"New Category added"})

    }
    catch(err){
        console.log(err)
    }
}

//edit category
const editCategoryFromAdminPanel = async(req,res)=>{
    try{
        const editById = req.params.id;
        const editCat = await newsCategory.findByIdAndUpdate({_id:editById},{
            $set:{
                category_name:req.body.catName
            }
        })
    return res.status(200).json({success:true,msg:"Category updated successfully"})

    }
    catch(err)
    {
        consolr.log(err)
    }
}


//delet a category from admin panell
const dltCategory = async(req,res)=>{
    try{
        const dltCatId = req.params.id;
        const dltCategoryFromHere = await newsCategory.findByIdAndDelete({_id:dltCatId})
    return res.status(200).json({success:true,msg:"Category deleted successfully"})

    }
    catch(err)
    {
        console.log(err)
    }
}

const changeCategoryStatus = async(req,res)=>{
    try{

        const changeStatusId  = req.params.id;
        const findCategory = await newsCategory.findOne({_id:changeStatusId})
        if(findCategory.Status === "active"){
        const change_status_of_category_to_deactivate = await newsCategory.findByIdAndUpdate({_id:changeStatusId},{
            $set:{
                Status:"deactivate"
            }
        })
        return res.status(200).json({success:true,msg:"Status updated to deactivate."})
    }
    else{
        const change_status_of_category_to_active =  await newsCategory.findByIdAndUpdate({_id:changeStatusId},{
            $set:{
                Status:"active"
            }
        })
        return res.status(200).json({success:true,msg:"Status updated to active"})

    }

    }
    catch(err)
    {
        consoel.log(err)
    }
}

//get all news
const getAllnews = async(req,res)=>{
    try{
        const get_all_news = await news.find({});
        res.status(200).json(get_all_news)

    }
    catch(err)
    {
        console.log(err)
    }
}



//add a new news
const addNewNews =  async(req,res)=>{
    try{
        // console.log(req.body)
        console.log(req.file.destination)
            const add_new_news = new news({
                category:req.body.category,
                Title:req.body.title,
                description:req.body.description,
                short_description:req.body.shortDesc,
                author_name:req.body.author,
                date:Date.now(),
                image:req.file.filename

            })
            console.log(add_new_news)
        const newsadded = await add_new_news.save();
        return res.status(200).json({success:true,msg:"New news added"})
        
    }
    catch(err)
    {
        console.log(err)
    }
}

//update news 
const updateNews = async(req,res)=>{
    try {
            const updateById  = req.params.id;
            const update_news = await news.findByIdAndUpdate({_id:updateById},{
                $set:{
                    category:req.body.category,
                    Title:req.body.title,
                    short_description:req.body.shortDesc,
                    description:req.body.description,
                    author_name:req.body.author

                }
            })
            return res.status(200).json({success:true,msg:"news updated successfully."})
    } catch (err) {
        console.log(err)
    }
}

//delete a news form admin panel
const dltNews = async(req,res)=>{
    try{
        const dltNewsId = req.params.id;
        const dltnews = await news.findByIdAndDelete({_id:dltNewsId});
        return res.status(200).json({success:true,msg:"News deleted successfuly."})
    }
    catch(err)
    {
        console.log(err)
    }
}

const changePublishedStatus  = async(req,res)=>{
    try{
        const getId = req.params.id;
        const findNews = await news.findOne({_id:getId});
        if(findNews.status === "Published"){
            const change_status_of_news_to_Unpublished = await news.findByIdAndUpdate({_id:getId},{
                $set:{
                
                    status:"Unpublished"
                }

            })
            return res.status(200).json({success:true,msg:"News unpublished"});
        }
        else{
            const change_status_of_news_to_published = await news.findByIdAndUpdate({_id:getId},{
                $set:{
                    status:"Published"
                }
            })
            return res.status(200).json({success:true,msg:"News Published"})
        }
    }
    catch(err){
        console.log(err)
    }
}

const adminLogout =async(req,res)=>{
    try {
        
        // res.redirect("/");
        res.status(200).json({success:true})
    } catch (err) {
        return res.status(400).render("errorPage");

    }
}

const getAllCouts = async(req,res)=>{
    try{
        const getUserCount = await user.count({});
        const getNewsCount = await news.count({});
        const getCategoryCount = await newsCategory.count({});
        return res.status(200).json({getUserCount,getNewsCount,getCategoryCount})
    }
    catch(err){
        console.log(err)
    }
}


module.exports = {
    deleteUserFromAdmimPanel,
   adminNewUserRegisteration,
   getAllUsers,
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
   getAllCouts
}
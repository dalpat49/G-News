const newsletter = require("../models/subscribeNewsLetter")
const user = require("../models/userModel")
const bcrypt = require("bcrypt")
const news = require("../models/newsModel")
const newsCategory = require("../models/newsCatrgoryModel")
const complaint = require("../models/complaintModel")


const securedPassword =async(password)=>{
    try{
    let hasedPassword = await bcrypt.hash(password,4)
    return hasedPassword;
    }
    catch(err){
        console.log(err)
    }
}


const newsletterSubscription = async(req,res)=>{
    try{
        const {email} = req.body;
        const newSubscription = new newsletter({
            email
        })
        const usersubscribed = await newSubscription.save()
        return res.status(200).json({success:true,msg:"Thank you!"})

    }
    catch(err)
    {
        console.log(err)
    }
}

//new user regostration
const newUserRegisteration  = async(req,res)=>{
    try{
        const {name,email,number,password,cpassword} = req.body
        // if(!name || !email || !number || !password  || !cpassword){
        //     return res.status(400).json({msg:"Please fill all the details."})
        // }
        // else{
        console.log(req.file)
        const newHasedPassword = await securedPassword(req.body.password);
        const findUserIfExist = await user.findOne({email:email})
        if(findUserIfExist){
            return res.status(200).json({success:false,msg:"user allready exists.Please Login."})

        }
        else{

            const newUserRegister = new user({name,email,number,password:newHasedPassword,image:req.file.filename})
            const new_user = await newUserRegister.save()
            return res.status(200).json({success:true})
                }
                    // }

    }
    catch(err)
    {
        console.log(err)
    }
}

const userLogin = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const findUser = await user.findOne({email:email});
        if(!findUser){
            return res.status(200).json({msg:"User not registred.Please Register."})
        }
        else {
            const matchPassword = await bcrypt.compare(password,findUser.password);
            if(matchPassword){         
                 req.session.user_id = findUser._id;


                res.cookie("id", findUser._id, { expire: 1000 * 60 * 60 * 24 });

                return res.status(200).json({success:true,msg:"User Login",id:findUser._id,userData:findUser})
            }
            else{
                return res.status(200).json({msg:"Invalid details"});
            }
        }
    }
    catch(err){
        console.log(err)
    }
}

//get all news to users 
const getAllnewstoUser = async(req,res)=>{
    try {
        const get_all_news_to_customer = await news.find({status:"Published"});

        return res.status(200).json(get_all_news_to_customer);


    } catch (err) {
        console.log(err)
    }
}


//send comment to user
const CommetByUser =async(req,res)=>{
    try{
        const setcommentId = req.params.id;
        const getNews = await news.findById({_id:setcommentId});
        getNews.comments.push({
            PersonName:req.body.personName,
            comment:req.body.comments
        })
        const saveComment = await getNews.save();
        return res.status(200).json({success:true,msg:"Your comment have been saved."})

    }
    catch(err)
    {
        console.log(err)
    }
}


//get all newsCategory
const getAllNewsCategory = async(req,res)=>{
    try{
        
        const get_all_news_categorires = await newsCategory.find({Status:"active"});
        
        return res.status(200).json(get_all_news_categorires)
    }
    catch(err){
        console.log(err)
    }
}


// //get news by category
const get_news_by_category = async(req,res)=>{
 try{
    const getCategoryById = req.params.id;
    console.log(getCategoryById)
    const getNewsByCategory = await news.find({category:getCategoryById});
    console.log(getNewsByCategory)
    return res.status(200).json({getNewsByCategory})
 }
 catch(err){
    console.log(err)
 }
}

const updateLikesInNews = async(req,res)=>{
    try{
        const getId = req.params.id;
        const {likes} = req.body
        const getNews = await news.findByIdAndUpdate({_id:getId},{
            $set:{
                Likes:likes,
            }
        });

        return res.status(200).json({success:true,msg:"Liked"})
    }
    catch(err)
    {
        console.log(err)
    }
}

const updateDisLikesInNews = async(req,res)=>{
    try{
        const getIds = req.params.id;
        const getNewsForDislike = await news.findByIdAndUpdate({_id:getIds},{
            $set:{
                dislike:req.body.dislike
            }
        })
        return res.status(200).json({success:true,msg:"Disliked"})

    }
    catch(err)
    {
        console.log(err)
    }
}


const getUserCompliant =async(req,res)=>{
    try{
        const {name,email,message} = req.body;
        const NewComplaint = new complaint({
            name:name,
            email:email,
            message:message
})

    const complaintDone = await NewComplaint.save()
    return res.status(200).json({success:true,msg:"Your complaint has been recived."})
    }


    catch(err){
        console.log(err)
    }
}
const logout =async(req,res)=>{
    try {
        req.session.destroy();
        res.clearCookie("email");
        res.clearCookie("id");
        res.clearCookie("connect.sid");
        // res.clearCookie("user_sid");
        // res.redirect("/");
        res.status(200).json({success:true})
    } catch (err) {
        return res.status(400).render("errorPage");

    }
}

module.exports = {
    newsletterSubscription,
    newUserRegisteration,
    getAllnewstoUser,
    CommetByUser,
    getAllNewsCategory,
    get_news_by_category,
    updateLikesInNews,
    updateDisLikesInNews,
    userLogin,
    getUserCompliant,
    logout
    
}
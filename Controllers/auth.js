



const isLogin = async (req, res, next) => {
    try {
        if (req.session.user_id) {
        } else {
            // return res.redirect("/");
        }
        next();
    } catch (err) {
        console.log(err)
    }
};


//auth logout
const isLogout = async (req, res, next) => {
    {
        try {
            if (req.session.user_id) {
                // return res.redirect("/Home");
            }
            else{}
            next();
        } catch (err) {
                    console.log(err)
;
        }
    }
};



module.exports = {
    isLogin,
    isLogout
}

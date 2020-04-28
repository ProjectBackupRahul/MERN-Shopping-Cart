exports.signup = (req,res) =>{
  //console.log ("Sign UP works!! ")
  res.json({
       message: "Signup routes works"
  })
};

exports.signout = (req,res)=>{
    res.json({
        message: "User Sign Out"
    });
};
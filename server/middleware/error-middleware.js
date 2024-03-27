const Error = (err,req,res,next) =>{
    const status = err.status || 500;
    const message =  err.message || "Try agai!!";
    const Extra_Details = err.Extra || "Error From backend";
   
    res.status(status).json({msg:message});
}

module.exports = Error
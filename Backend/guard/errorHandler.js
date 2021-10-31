function errorHandler(err,req,res,next){

    //For unauthorized error
    if(err.name==='UnauthorizedError'){
        return res.status(401).json({
            message:'User not authorized'
        })
    }

    //Validation Error
    if(err.name==='ValidationError'){
        return res.status(401).json({
            message:err
        })
    }

    //Internal Error
    return res.status(500).json(err);
}

module.exports = errorHandler;
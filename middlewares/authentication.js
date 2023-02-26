const jwt=require('jsonwebtoken')

const authentication=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        jwt.verify(token,'anand', (error,decoded) =>{
            if(decoded){
                req.body.user=decoded.userid
                next()
            }else{
                res.send({"msg":"Please Login first"})
            }
        })
    }else{
        res.send({"msg":"Please Login first"})
    }
}

module.exports={
    authentication
}
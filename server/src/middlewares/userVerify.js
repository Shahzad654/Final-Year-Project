import express from 'express'
import jwt from 'jsonwebtoken'


const verifyUser = (req,res,next)=>{
    const token = req.cookies.token
    if(!token){
        return res.json("Token is not available")
    }
    else{
        jwt.verify(token, 'secret-key', (err, decoded)=>{
            if(err) return res.json("Token is wrong")
            next()
        })
    }
}

export {verifyUser as verify}
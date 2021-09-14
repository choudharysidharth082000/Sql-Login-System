const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const AdminValidator= require('../Validators/adminValidator');
const verifyPass = require('../utils/verifyPassword');
const generateJWT = require('../utils/generateJWT');
const Admin = require('../models/UserInfo');
const hashPassword = require('../utils/passwordHash');
const sequelize = require('../models/database/connection');

router.post('/login', async (req, res)=>
{
    const email = req.body.email;
    const password = req.body.password;

    
        

    const data ={email, password};
    

    const resultFromJoi = AdminValidator('email password', data);


    if(!resultFromJoi)
    {
        res.send('User Has Entered Wrong details');
    }

    try 
    {
        const user = await Admin.findAll({where:
             {
            email: email,
            
          }})

        if(!user){
            res.send('User Not found');
        }


        



        const verifier = await verifyPass(password, user.password);
        

       

        if(!verifier)
        {
            res.send('Invalid UserName or Password');
        }


        const userAccess = generateJWT(user);


        const result= {         

        }

        result.status = true
        result.message = "Login Successful"
        result.admin= user
        result.accessToken = userAccess
        



        // res.send(
        //     status: true,
        //     message : "Login Successful",
        //     admin: user,
        //     accessToken : userAccess
        // )
        

        res.json({
            result           

        })

        

        
        
    }
    catch(err)
    {
        throw new Error(`${err}`);
    }


})


router.get('/signup', async (req, res)=>
{
    const {body} = req;
        
        

    const resultFromJoi =  AdminValidator('firstName lastName email password mobileNumber title', body);
   
    if(!resultFromJoi)
    {
        res.send('You have entered Wrong Credentials');
    }

    
    
    

    const {generateSalt, generateHash} =await hashPassword(body.password);
    
    

    if(!generateHash)
    {
        res.send('Internal Password Error in hashing');
    }

    body.password = generateHash;

    body.salt = generateSalt;

    const newJWT = generateJWT(body);
    

    try{
        const adminEmail = await Admin.findAll(
            {
                where:
                {
                    email: email
                }
            }
        );
        

        

        if(adminEmail)
        {
            res.send('User already Exists');
        }

    }
    catch(err)
    {
        throw new Error(`${err}`);
    }


    try 
    {
        const admin = await  new Admin.create(body);
        

        if(!admin)
        {
            res.send(`Something went Wrong`);
        }

            // admin.save();

        res.json({
               status: true,
               message: "Signup Successfull",
               user: admin,
               accessToken: newJWT
           })

        
    }
    catch(err)
    {
        throw new Error(`${err}`)
    }

    
})

module.exports = router;
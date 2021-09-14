const express = require ('express');
const mysql = require('mysql');
const app = express();
const userInfo = require('./models/UserInfo');
const expressRouters= require('./Express Routers/rouetes');
const sequelize = require('./models/database/connection');






app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use(expressRouters);

sequelize.sync({force:true})
.then((result)=>
    {
        userInfo.create({firstName: "SIdharth", lastname: "Choudhary", email: "jshg@gmail.com", password: "ishugudda", isActive: true, mobileNumber: "8448605993"});
        console.log(result);
        
    })
    .then(user=>
        {
            console.log("first User Created: " + user);
        })

        .catch((err)=>
        {
            console.log(err);
        })





app.listen(3000, ()=>
{
    console.log("connected to the webpage");
})
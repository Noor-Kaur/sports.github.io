const express = require("express");
const app= express();
const mysql = require('mysql');

app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Qwemnb12@',
    database:'sports'
})


app.get('/',(req,res)=>{
    res.render('Home.ejs');
});

app.get('/add',(req,res)=>{
    res.render("add.ejs");
});

app.post('/add',(req,res)=>{ 

    if ([req.body.pname]=="Noor") 
        {throw 'Error occured' }
    else {
    connection.query(
        'insert into players values (?,0)',
        [req.body.pname],
        (error,results)=>{
            res.redirect('/');
        });
    }
});

app.get('/check',(req,res)=>{
    connection.query(
        "select * from players order by score desc",
        (error,results)=>{
            console.log(results);
            res.render("check.ejs",{players:results});
        })

});

app.get('/update',(req,res)=>{
    connection.query(
        "select * from players",
        (error,results)=>{
           
            console.log(results);
            res.render("update.ejs",{players:results});
        })
});

app.post('/update/:name',(req,res)=>{

            connection.query(
                'update players set score=? where name=?',
                [req.body.ss, req.params.name],
                (error,results)=>{
                res.redirect('/');
       
                });   
});


app.listen(3000,(error)=>{
    if(error) console.log("Error in server setup")
    console.log("Server listening on Port ",3000)
});
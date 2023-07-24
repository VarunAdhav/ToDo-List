const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose")

const app = express();
app.set("view engine" , "ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

const items = ["Hello"];



app.post("/" , (req , res)=>{
        var newItem = req.body.task;

        items.push(newItem);
        res.redirect("/");
});

app.get("/" , (req , res)=>{

    const today = new Date();
    var kindOfDay = "";
    var Day = today.getDay();
    var day = "";
    switch(Day){
        case 1: day = "Monday";
                break;
        case 2: day = "Tuesday";
                break;
        case 3: day = "Wednesday";
                break;
        case 4: day = "Thursday";
                break;
        case 5: day = "Friday";
                break;
        case 6: day = "Saturday";
                break;
        case 0: day = "Sunday";
                break;
    };
    if(today.getDay() === 6 ||today.getDay() === 0){
        kindOfDay = "Week End 😁";
    }else{
        kindOfDay = "Week Day🥲";
    }
    console.log("Day is "+ day);
    console.log("you have landed on the home page.");
    console.log(items);
    res.render("list" , {day: day , items:items});

});

app.listen(3000 , ()=>{
    console.log("App is currently listening in port 3000....");
}) ;
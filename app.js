const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose")

const app = express();
app.set("view engine" , "ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));



mongoose.connect("mongodb+srv://varunDev:Zgw79eOBFOMCzjjj@cluster0.ef3jysx.mongodb.net/").then(()=>{
        console.log("Connected to MongoDB");
})

const taskSchema = new mongoose.Schema({
        task: {
                type: String,
                required: [1 , "Some task will be there..."]
        }
});

let task = new mongoose.model("tasks" , taskSchema , "tasks");


let items = [];
async function itemPush(){
        items = [];
        let cur = await task.find();
        cur.forEach((task)=>{
                items.push(task.task);
                console.log(task.task);
        });
        // console.log(items);
}

function getDay(){

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
    return day;
}

app.post("/add" , (req , res)=>{
        const newItem = req.body.task;

        const newTask = new task({
                task : newItem
        })
        newTask.save();
        console.log("List has: "+items);
        res.status(200).redirect("/")
        // res.render("list" , {day: getDay() , items:items});
});

app.get("/" , (req , res)=>{
        res.redirect("/home");
});

app.get("/home" , async(req , res)=>{
    
//     if(today.getDay() === 6 ||today.getDay() === 0){
//         kindOfDay = "Week End 😁";
//     }else{
//         kindOfDay = "Week Day🥲";
//     }
        console.log("Day is "+ getDay());
        // console.log("you have landed on the home page."+items);
        const items = await task.find();
        // console.log(items);
        // cur.forEach((task)=>{
        //         items.push(task.task);
        //         console.log(task.task);
        // });
        res.render( "list" , {day: getDay() , items:items} );
});

app.post("/delete" , async(req , res)=>{
        const itemId = req.body.checkBox;
        const deleteItem = await task.deleteOne({_id:itemId});
        res.redirect('/home');
});

app.listen(3000 , ()=>{
    console.log("App is currently listening in port 3000....");
}) ;


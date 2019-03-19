const app = require('express')();
const express = require("express");
const http = require('http').Server(app);
const path = require("path");
const mongoose = require("mongoose");

//  ----------
const PORT = process.env.PORT  || 3000;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", function(e) { console.error(e); });
app.use(express.urlencoded());
app.use("/static", express.static(path.join(__dirname, "assets")));
app.set("view engine", "ejs");
app.set("views", "views");
//  ----------

var notesSchema = mongoose.Schema({
  title: String,
  body:String
});

const Notes = mongoose.model("Notes", notesSchema);

app.get('/', async function(req, res){
  Notes.find(function(err, notes) {
    if (err) return console.error(err);
    const notas = await notes
    res.render("index",{notas});    
  });
});

app.post('/post', function(req,res){
  Notes.create({title:req.body.title,body:req.body.text}, err => {
    if(err){
      return console.log("ocurrio un error: ",err)
    }
    console.log("documento generado");
  });
});

app.listen(PORT, () => console.log("Inició en puerto .." + PORT));
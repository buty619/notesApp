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
app.use("/notes/static", express.static(path.join(__dirname, "assets")));
app.set("view engine", "ejs");
app.set("views", "views");
//  ----------

var notesSchema = mongoose.Schema({
  title: String,
  body:String
});

const Notes = mongoose.model("Notes", notesSchema);

app.get('/', async function(req, res){
  res.redirect("/notes");
});

app.get('/notes', async function(req, res){
  try{
    const notas = await Notes.find(function(err, notes) {
      if (err) return console.error(err);
      return notes;
    });
    res.render("index",{notas});  
  }catch(e){
    console.error(e);
  }  
});

app.post('/notes/new', async function(req, res){
  try{
    const notas = await Notes.find(function(err, notes) {
      if (err) return console.error(err);
      return notes;
    });
    res.render("newNote",{notas});  
  }catch(e){
    console.error(e);
  }  
});

app.post('/notes', function(req,res){
  Notes.create({title:req.body.title,body:req.body.text}, err => {
    if(err){
      return console.log("ocurrio un error: ",err)
    }
    console.log("documento generado");
  });
  res.redirect("/notes");
});

app.get('/noteSelect', function(req,res){
    
});

// app.post('/update', function(req,res){
//   Notes.findById(req.body.idNote, function(err, note) {
//     console.log(note);
//     if (err) return console.error(err);
//     console.log(req.body.title);  
//     note.title = req.body.title;
//     console.log(req.body.text);
//     note.text = req.body.text;
//     note.save(function(err) {
//       if (err) return console.error(err);
//     });
//   });
//   res.redirect("/");
// });

app.listen(PORT, () => console.log("Inició en puerto .." + PORT));
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

app.get('/notes/:id', async function(req,res){
  const notas = await Notes.find();
  const note = await Notes.findById(req.params.id);
  console.log(note);
  res.render("show",{notas:notas, currentNote: note});
});

app.patch('/notes/:id', async function(req,res,next){
  const id = req.params.id;
  const note = await  Notes.findById(id);
  note.title = req.body.title;
  note.body = req.body.text;
  try{
    await note.save({});
    //res.status(204).send([]);
  }catch(e){
    return next(e);
  }
});

app.delete('/notes/:id', async function(req,res,next){
  const id = req.params.id;
  const note = await  Notes.findById(id);
  try{
      note.remove(function(err) {
      if (err) return console.error(err);
    });  
    //res.status(204).send([]);
  }catch(e){
    return next(e);
  }
});

app.listen(PORT, () => console.log("Inició en puerto .." + PORT));
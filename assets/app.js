$("#text").keypress(function (e) {           
    var key = e.which;        
    if (key == 13) {
      $("allNotes").append("<h2>"+$("#title").val()+"</h2><p>"+$("#text").val()+"</p>")
      $("form").submit(function (e){
        e.preventDefault(); 
      });
      $("#text").val("");
      $("#title").val("");      
    }
});
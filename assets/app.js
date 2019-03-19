$("#text").keypress(function (e) {
    e.preventDefault();        
    var key = e.which;        
    if (key == 13) {
      $("allNotes").append("<h2>"+$("#title").val()+"</h2><p>"+$("#text").val()+"</p>")
      $("form").submit();
      $("#text").val("");
      $("#title").val("");      
    }
});
$('form').submit(function(e){
      e.preventDefault();
      $("allNotes").append("<h2>"+$("#title").val()+"</h2><p>"+$("#text").val()+"</p>")
      $("form").submit();
      $("#text").val("");
      $("#title").val("");      
});
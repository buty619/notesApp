$("#text").keypress(function (e) {           
    var key = e.which;        
    if (key == 13) {
      $("form").submit();
      $("#text").val("");
      $("#title").val("");      
    }
});

$(".notas").on("click",function(){
  let title = $(this).find("h2").text();
  let text = $(this).find("p").text();
  $("#title").val(title); 
  $("#text").val(text);
});

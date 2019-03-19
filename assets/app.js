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
  console.log(title);
  let text = $(this).find("p").text();
  console.log(title);
  $("#title").val(title); 
  $("#text").val(text);
});

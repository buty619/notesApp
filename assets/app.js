$("#text").keypress(function (e) {           
    var key = e.which;        
    if (key == 13) {
      $("form").submit();
      $("#text").val("");
      $("#title").val("");      
    }
});

$("#edit").on("submit", function(){
  $.ajax({
    method: "PATCH",
    url:"/notes/<%= note.id %>",
    data: $(this).serialize()
  }).done((result) => {
    window.location = "/notes"
  });
});

// $(".notas").on("click",function(){
//   let title = $(this).find("h2").text();
//   let text = $(this).find("p").text();
//   $("#title").val(title); 
//   $("#text").val(text);
//   $("#idNote").val($(this).attr("id"));
// });


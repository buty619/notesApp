$("#text").keypress(function (e) {           
    var key = e.which;        
    if (key == 13) {
      $("form").submit();
      $("#text").val("");
      $("#title").val("");      
    }
});

$(".notas").on('click', function(e) {
  fetch('/noteSelect', {method: 'GET'})
    .then(function(response) {
      if(response.ok) {
        return $(this).attr("id");
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
});
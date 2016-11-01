$(function()
{


      $.ajax(
        {
        url: "/todos",
        type: "post",
        dataType: "JSON",
        success: function(data)
        {
          console.log(data);
          data.forEach(function(todoItem){
            const li = $(body).append("<li>"+todoItem.message+"</li>");
          });
        }
      });


    $("#searchBtn").on("click",function()
    {
        });

});

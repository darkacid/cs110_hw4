$(function()
{

      $.ajax(
        {
        url: "/todos",
        type: "get",
        dataType: "JSON",
        data: { "default-post":"Loading the page" },
        contentType: "application/x-www-form-urlencoded;utf-8",
        success: function(data)
        {
          for (i=0;i<data.items.length;i++)
            $("#todoList").append("<li>"+data.items[i].message+"</li>");
        },
          error: function(e)
          {
            console.log("You screwed up!");
            alert("You screwed up!");
          }

      });

      $("#addBtn").on("click",function(e)
      {
        e.preventDefault();
      });

    $("#searchBtn").on("click",function(e)
    {
      e.preventDefault();

      $.ajax(
        {
        url: "/todos",
        type: "get",
        dataType: "JSON",
        data: { "searchtext":$("#searchTxt").val() },
        contentType: "application/x-www-form-urlencoded;utf-8",
        success: function(recieved_data)
        {
          $("#todoList").html("");
          for (i=0;i<recieved_data.items.length;i++)
            $("#todoList").append("<li>"+recieved_data.items[i].message+"</li>");
        },
          error: function(e)
          {
            console.log("You screwed up_BTN!");
            alert("You screwed up!");
          }


      });

        });

});

$(function()
{

      //This requests the todo items on page load
      const clearRequest=function()
      {
        $("#todoList").html("");
      }
      const drawRequests=function()
      {
        clearRequest();
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
            $("#todoList").append("<li>"+data.items[i].message+" "+data.items[i].completed+"</li>");
        },
          error: function(e)
          {
            console.log("You screwed up!");
            alert("You screwed up!");
          }

      });
    }
      drawRequests();


      $("#addBtn").on("click",function(e)
      {
        e.preventDefault();
        const val = $('#addTodoTxt').val();
        $('#addTodoTxt').val(''); // clear the textbox

        $.ajax({
            url         : "/todos",
            type        : 'post',
            dataType    : 'json',
            data        : JSON.stringify({
                message   : val,
                completed : false
            }),
            contentType : "application/json; charset=utf-8",
            success     : function(data) {
              drawRequests();
                // refresh the list (re-run the search query)
            },
            error       : function(data) {
                alert('Error creating todo');
            }
        });
      });

      //Search for the todo items on click
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

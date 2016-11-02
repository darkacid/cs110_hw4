$(function()
{

      //This requests the todo items on page load
      const clearRequest=function()
      {
        $("#todoList").html("");
      }
      const appendButton=function(data)
      {
        for (i=0;i<data.items.length;i++)
        {
          //data.forEach(tod)
          console.log(data.items[i].id);
          $("#todoList").append("<li>"+data.items[i].message+' <button id='+data.items[i].id+' class="todo_items">Delete</button>'+"</li>");
          //$("#todoList").append("<li>"+data.items[i].message+"</li>").append(' <button id='+i+' class="todo_items">Delete</button>');


        /*

          $("#"+data.items[i].id).on("click",function(e)
          {
            e.preventDefault();
            console.log(data.items[i].id);
            //deleteTodo(data.items[i].id);
          });
          */

          $("#"+"0.6615884911767151").on("click",function(e)
          {
            e.preventDefault();
            console.log("yay");
            //deleteTodo(data.items[i].id);
          });

        }


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
            appendButton(data);
        },
          error: function(e)
          {
            console.log("You screwed up!");
            alert("You screwed up!");
          }})
        };

          const deleteTodo =function(itemID)
          {
              $.ajax({
                  url     : "/todos/" + itemID,
                  type    : 'delete',
                  success : function(data) {
                      // remove the rendering of that item from the UI
                  },
                  error   : function(data) {
                      alert('Error deleting the item');
                  }
              });
          };
      drawRequests();


      $("#addBtn").on("click",function(e)
      {
        e.preventDefault();
        const val = $('#addTodoTxt').val();
        if(val=="")return;
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
              clearRequest();
              appendButton(recieved_data);
            },
              error: function(e)
              {
                console.log("You screwed up_BTN!");
                alert("You screwed up!");
              }

           });
    });

});

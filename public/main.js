    const clearRequest=function()
      {
        $("#todoList").html("");
      }
      const appendButton=function(data)
      {
        //todoItem.id <- Garbage, in console not defined!
        //this.id <- Actually works!!
        //onclick works, jquery selector doesn't!
        data.items.forEach(function (todoItem)
         {
          $("#todoList").append("<li>"+todoItem.message+'<input type="checkbox" id='+todoItem.id+' onclick=updateTodo(this)  > </input>'+ ' <button id='+todoItem.id+
          ' onclick="deleteTodo(this.id)" class="todo_items">Delete</button>'+"</li>");
          //if(todoItem.completed)
            //$("input#todoItem.id").prop("checked",true);
        });

      }
      //This requests the todo items on page load
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

      const updateTodo=function(todoItem)
      {
        console.log(todoItem);
        console.log(typeof(todoItem));
        console.log(JSON.stringify(todoItem));
          $.ajax({
              url         : "/todos/" + todoItem.id,
              type        : 'put',
              dataType    : 'json',
              data        : todoItem.id,//JSON.stringify(todoItem),
              contentType : "application/json; charset=utf-8",
              success     : function(data) {
                drawRequests();
              },
              error       : function(data) {
                  alert('Error creating todo');
              }
          });
      }

        const deleteTodo =function(itemID)
        {
            $.ajax({
                url     : "/todos/" + itemID,
                type    : 'delete',
                success : function(data) {
                  drawRequests();
                },
                error   : function(data) {
                    alert('Error deleting the item');
                }
            });
        };



      $("#addBtn").on("click",function()
      {

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
  drawRequests();

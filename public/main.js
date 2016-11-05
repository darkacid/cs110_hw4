      //This requests the todo items on page load

/*
      $("#testCheckbox").click(function(){
        let isChecked = $(this).is(':checked');
        //in this case 'this' corresponds to '#testCheckbox'
        console.log(isChecked);
      });
*/

      //assign id to a variable for testing how jquery handles the argument
      let checkboxvalue="testCheckbox";

      $("#"+checkboxvalue).change(function()
      {

       if($(this).is(":checked"))
       {
         console.log("You clicked me!");

       }
       else {
         console.log("You unclicked me!");
       }

      });

      const clearRequest=function()
      {
        $("#todoList").html("");
      }


      const appendButton=function(data)
      {
        //todoItem.id <- Garbage!
        //this.id <- Actually works!!
        data.items.forEach(function (todoItem)
         {

          $("#todoList").append("<li>"+todoItem.message+ '<input type="checkbox" id='+todoItem.id+' > </input>'+' <button id='+todoItem.id+
          ' onclick="deleteTodo(this.id)" class="todo_items">Delete</button>'+"</li>");


          $('#'+todoItem.id+" :checkbox").change(function()
                {
                  console.log("The state changed");

                  if($(todoItem.id).is(":checked"))
                  {
                    console.log("You clicked me!");

                  }
                  else {
                    console.log("You unclicked me!");
                  }
                  //updateTodo(todoItem) <- implement in the next version


                });

        });

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




      const updateTodo=function(todoItem)
      {
          $.ajax({
              url         : "/todos/" + todoItem,
              type        : 'put',
              dataType    : 'json',
              data        : JSON.stringify(todoItem),
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

'use strict'
    const http_server = require("http");
    const fs= require("fs");
    const url = require('url');
    const querystring = require('querystring');




    let todos =[
      {id:Math.random()+'',message:"coffee",completed:false},
      {id:Math.random()+'',message:"bbq",completed:false},
      {id:Math.random()+'',message:"tolma",completed:false}
    ];

    http_server.createServer(function(req,res)
    {
      const parsedUrl = url.parse(req.url);
      const parsedQuery = querystring.parse(parsedUrl.query);
      const method = req.method;     


      //Serve the file to the client
      fs.readFile("./public/"+req.url,function(err,data)
      {
        if(err)
        {
          res.statusCode=404;
          res.end("File not found");
        }
        res.statuscode=200;
        res.end(data);
      });

      // If the requests is for todo items
      if(parsedUrl.pathname.indexOf("/todos")>=0)
      {
        //Execute, if the client requests the items
        if(method === 'GET') {
            if(req.url.indexOf('/todos') === 0) {
                res.setHeader('Content-Type', 'application/json');
                let localTodos = todos;
                //Filter, and send the data
                if(parsedQuery.searchtext) {
                    localTodos = localTodos.filter(function(obj) {
                        return obj.message.indexOf(parsedQuery.searchtext) >= 0;
                    });
                }
                //If search string emtpy, send whole data
                return res.end(JSON.stringify({items : localTodos}));
            }
        }


          //Here, we create a new todo
            if(method === 'POST')
             {
                  if(req.url.indexOf('/todos') === 0)
                   {

                      // read the content of the message
                      let body = '';
                      req.on('data', function (chunk) {
                          body += chunk;
                      });
                      req.on('end', function () {
                          let jsonObj = JSON.parse(body);  // now that we have the content, convert the JSON into an object
                          jsonObj.id = Math.random() + ''; // assign an id to the new object
                          todos[todos.length] = jsonObj;   // store the new object into our array (our 'database')
                          //The new placeholder in the todos array
                          res.setHeader('Content-Type', 'application/json');
                          return res.end(JSON.stringify(jsonObj));
                      });
                      return;
                  }
            }

              if(method === 'PUT')
               {

                    if(req.url.indexOf('/todos') === 0)
                    {

                        let recieved_id =  req.url.substr(7);
                        for(let i = 0; i < todos.length; i++)
                          {
                              if(todos[i].id === recieved_id)
                                  {
                                      //Flip the value of the completion status
                                      todos[i].completed = !(todos[i].completed);
                                      res.statusCode=200;
                                      return res.end("10-4 Bro");
                                  }
                              }
                              res.statusCode = 404;
                              return res.end('Smth went wrong');

                        return;
                    }
              }

              if(method === 'DELETE')
               {
                    if(req.url.indexOf('/todos/') === 0)
                     {
                        let id =  req.url.substr(7);
                        for(let i = 0; i < todos.length; i++) {
                            if(id === todos[i].id) {
                                todos.splice(i, 1);
                                res.statusCode = 200;
                                return res.end('Successfully removed');
                              }
                        }
                        res.statusCode = 404;
                        return res.end('Data was not found');
                      }
                }


    }

    }).listen(4242);

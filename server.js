'use strict'
    let http_server = require("http");
    let fs= require("fs");
    let url = require('url');
    let querystring = require('querystring');




    let todos =[
      {id:Math.random()+'',message:"coffee",completed:false},
      {id:Math.random()+'',message:"bbq",completed:false},
      {id:Math.random()+'',message:"tolma",completed:false}
    ];

    require("http").createServer(function(req,res)
    {
      const parsedUrl = url.parse(req.url);
      const parsedQuery = querystring.parse(parsedUrl.query);
      const method = req.method;



      //Server the file to the client
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


      if(parsedUrl.pathname=="/todos") // If the requests is for todo items
      {
        //Execute, if the client requests the items
        if(method === 'GET') {
            if(req.url.indexOf('/todos') === 0) {
                res.setHeader('Content-Type', 'application/json');
                let localTodos = todos;

                console.log("Query:");
                console.log(parsedQuery);

                if(parsedQuery.searchtext) {                    
                    localTodos = localTodos.filter(function(obj) {
                        return obj.message.indexOf(parsedQuery.searchtext) >= 0;
                    });
                }
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

                          res.setHeader('Content-Type', 'application/json');
                          return res.end(JSON.stringify(jsonObj));
                      });
                      return;
                  }
            }

              if(method === 'PUT')
               {
                    if(req.url.indexOf('/todos') === 0) {

                        // read the content of the message
                        let body = '';
                        req.on('data', function (chunk) {
                            body += chunk;
                        });
                        req.on('end', function () {
                            let jsonObj = JSON.parse(body); // now that we have the content, convert the JSON into an object

                            // find the todo in our todos array and replace it with the new object
                            for(let i = 0; i < todos.length; i++) {
                                if(todos[i].id === jsonObj.id) { // found the same object
                                    todos[i] = jsonObj; // replace the old object with the new object
                                    res.setHeader('Content-Type', 'application/json');
                                    return res.end(JSON.stringify(jsonObj));
                                }
                            }

                            res.statusCode = 404;
                            return res.end('Data was not found and can therefore not be updated');
                        });
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

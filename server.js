'use strict'
    let http_server = require("http");
    let fs= require("fs");


    let todos =[

    ];

    require("http").createServer(function(req,res)
    {
      console.log(req.url);
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
      if(req.url=="/todos")
      {
        const parsedUrl = url.parse(req.url);
        const parsedQuery = querystring.parse(parsedUrl.query);
        const method = req.method;
        const url = req.url;
        if(method === 'GET') {
            if(req.url.indexOf('/todos') === 0) {
                res.setHeader('Content-Type', 'application/json');
                let localTodos = todos;

                if(parsedQuery.searchtext) {
                    localTodos = localTodos.filter(function(obj) {
                        return obj.message.indexOf(parsedQuery.searchtext) >= 0;
                    });
                }
                return res.end(JSON.stringify({items : localTodos}));
            }
        }



            if(method === 'POST') {
                if(req.url.indexOf('/todos') === 0) {

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

              if(method === 'PUT') {
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
                if(req.url.indexOf('/todos/') === 0) {
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

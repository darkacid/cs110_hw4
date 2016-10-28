'use strict'
    let http_server = require("http");
    let fs= require("fs");

    require("http").createServer(function(req,res)
  {


    fs.readFile("./public/"+req.url,function(err,data)
  {

    if(err){
      res.statusCode=404;
      res.end("File not found");
    }
    res.statuscode=200;
    res.end(data);
  });

  }).listen(4242);

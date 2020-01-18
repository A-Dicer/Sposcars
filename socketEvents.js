
const express = require("express");
const app = express();
const mongoose       = require("mongoose");
const db             = require("./models");

exports = module.exports = function(io) {  
    // Set socket.io listeners.
    io.on('connection', (socket) => {
      socket.on('updateInspector', function(data){
        db.User.find({}, function(err, user){socket.broadcast.emit("inspector", user)})           
      })
  
  });
}


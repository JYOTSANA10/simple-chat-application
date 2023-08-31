const io=require("socket.io")(8000);

let users={}


io.on("connection", socket=>{
    socket.on("new-user-join", name => {
        console.log("name",name);
        users[socket.id] = name;
        socket.broadcast.emit("user-join",name);
    })

    socket.on("send", message => {
        socket.broadcast.emit("recieve", {message, name : users[socket.id] });
    })
})
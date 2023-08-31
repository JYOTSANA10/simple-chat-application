const socket = io("http://192.168.10.52:8000/", {
  transports: ["websocket", "polling", "flashsocket"],
});

const form = document.getElementById("submit-form");
const inputText = document.getElementById("inputbox");

const container = document.querySelector(".container");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = inputText.value;
  console.log(message.length);
  if (message.length > 0 || !message==" ") {
    socket.emit("send", message);
    inputText.value = "";
    append(`You : ${message}`, "right");
  }
});

const append = (message, position) => {
  const div = document.createElement("div");
  div.innerText = message;
  div.classList.add("message");
  div.classList.add(position);
  container.append(div);
};

function popBox() {
  name = prompt("Enter Your Name:");
  if (name == "" || name == "null") {
    popBox();
  } else {
    socket.emit("new-user-join", name);
  }
}
popBox();

socket.on("user-join", (name) => {
  console.log(name);
  append(`${name} Joined the Chat`, "left");
});

socket.on("recieve", (data) => {
  console.log("data-", data.name);
  append(`${data.name} : ${data.message}`, "left");
});

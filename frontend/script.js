const socket = io();

const input = document.getElementById('input');
const messages = document.getElementById('messages');
const sendBtn = document.getElementById('send');

sendBtn.onclick = () => {
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
};

socket.on('chat message', (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  messages.appendChild(li);
});

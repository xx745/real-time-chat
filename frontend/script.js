const socket = io();

const usernameContainer = document.getElementById('username-container');
const usernameInput = document.getElementById('username');
const joinBtn = document.getElementById('join-chat');
const chatContainer = document.getElementById('chat-container');
const input = document.getElementById('input');
const messagesList = document.getElementById('messages');
const sendBtn = document.getElementById('send');

let username = '';

joinBtn.onclick = () => {
  if (usernameInput.value) {
    username = usernameInput.value;
    usernameContainer.style.display = 'none';
    chatContainer.style.display = 'block';
  }
};

function sendMessage() {
  if (input.value) {
    socket.emit('chat_msg', { username, message: input.value });
    input.value = '';
  }
}

sendBtn.onclick = sendMessage;

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
  }
});

socket.on('chat_msg', (data) => {
  const li = document.createElement('li');
  li.textContent = `${data.username}: ${data.message}`;
  messagesList.appendChild(li);
});

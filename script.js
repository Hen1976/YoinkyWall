const form = document.getElementById('form');
const message = document.getElementById('message');
const author = document.getElementById('author');
const groupWall = document.getElementById('group-wall');

// Load pastes from local storage on page load
window.addEventListener('load', function() {
  const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
  savedMessages.forEach(function(content) {
    createPaste(content);
  });
});

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const content = message.value;
  if (content.trim() !== '' && author.value.trim() !== '') {
    createPaste('"' + content + '" by ' + author.value);
    message.value = '';
  }
});

groupWall.addEventListener('click', function(event) {
  if (event.target.classList.contains('message')) {
    if (confirm('Are you sure you want to delete this message?')) {
      event.target.remove();
      savePastes();
    }
  }
});

function createPaste(content) {
  const text = document.createElement('div');
  text.classList.add('message');
  text.textContent = content;
  groupWall.prepend(text);
  savePastes();
}

function savePastes() {
  const texts = Array.from(groupWall.children).map(function(text) {
    return text.textContent;
  });
  localStorage.setItem('messages', JSON.stringify(texts));
}
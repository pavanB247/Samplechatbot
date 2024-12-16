// Get chat popup and body elements
const chatPopup = document.getElementById('chatPopup');
const chatBody = document.getElementById('chatBody');
const chatButtonContainer = document.getElementById('chatButtonContainer');

// Open the chat popup
function openChat() {
    chatPopup.style.display = 'block';
}

// Close the chat popup
function closeChat() {
    chatPopup.style.display = 'none';
}

// Load the chat button dynamically
function loadChatButton() {
    fetch('chat-button.html')
        .then(response => response.text())
        .then(data => {
            chatButtonContainer.innerHTML = data;
        })
        .catch(error => console.error('Error loading chat button:', error));
}

// Start voice recognition
function startVoiceRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = (event) => {
        const userText = event.results[0][0].transcript;
        displayMessage(userText, 'user');
        generateBotResponse(userText);
    };

    recognition.onerror = (event) => {
        console.error('Voice recognition error:', event.error);
    };
}

// Display a message in the chat
function displayMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight; // Scroll to the latest message
}

// Generate a bot response
function generateBotResponse(userText) {
    let botResponse = "I'm not sure how to respond to that.";
    if (userText.toLowerCase().includes('hello')) {
        botResponse = 'Hello! How can I assist you today?';
    } else if (userText.toLowerCase().includes('weather')) {
        botResponse = 'The weather is great today!';
    } else if (userText.toLowerCase().includes('time')) {
        botResponse = `The current time is ${new Date().toLocaleTimeString()}.`;
    }
    displayMessage(botResponse, 'bot');
}

// Load the chat button when the page loads
window.onload = loadChatButton;

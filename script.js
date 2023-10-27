// Function to create a new chat message element
function createMessageElement(content, isUser) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message', isUser ? 'user' : 'ai');
    messageContainer.innerHTML = `<p class="message-content">${content}</p>`;
    return messageContainer;
}

// Function to add a message to the chat
function addMessage(content, isUser) {
    const messagesContainer = document.getElementById('messages');
    const messageElement = createMessageElement(content, isUser);
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Function to handle user input and chat interactions
async function handleUserInput() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, true); // Add user's message to the chat
        userInput.value = ''; // Clear the input field

        // Send user's message to your AI model using the OpenAI API
        const aiResponse = await getAIResponse(message);

        addMessage(aiResponse, false); // Add the AI's response to the chat
    }
}

// Function to get AI response using the OpenAI API
async function getAIResponse(userMessage) {
    const apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your actual API key
    const endpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            prompt: userMessage,
            max_tokens: 50, // Adjust as needed
        }),
    });

    const data = await response.json();
    return data.choices[0].text;
}

// Event listener for user input
const userInput = document.getElementById('user-input');
userInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        handleUserInput();
    }
});

// Event listener for the send button
const sendButton = document.getElementById('send-button');
sendButton.addEventListener('click', handleUserInput);

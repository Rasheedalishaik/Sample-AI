// Function to create a new chat message element
function createMessageElement(content, isUser) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message', isUser ? 'outgoing' : 'incoming'); // Updated class names
    messageContainer.textContent = content;
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

        try {
            // Send user's message to your AI model using the OpenAI API
            const aiResponse = await getAIResponse(message);
            addMessage(aiResponse, false); // Add the AI's response to the chat
        } catch (error) {
            console.error('Error:', error);
            addMessage('An error occurred while processing your request.', false);
        }
    }
}

// Function to get AI response using the OpenAI API
async function getAIResponse(userMessage) {
    const apiKey = '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'; // Replace with your actual API key
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

    if (!response.ok) {
        throw new Error(`AI response failed with status: ${response.status}`);
    }

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

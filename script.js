// Function to get AI response using the OpenAI API
async function getAIResponse(userMessage) {
    const apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your actual API key
    const endpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';

    try {
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
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.choices[0].text;
    } catch (error) {
        console.error('Error while fetching data from the API:', error);
        return 'An error occurred while processing your request.';
    }
}

// Rest of your code remains the same.

// Predefined responses for the chatbot
const responses = {
    'hello': ['Hello!', 'Hi there!', 'Greetings!', 'Hey!'],
    'hi': ['Hello!', 'Hi there!', 'Greetings!', 'Hey!'],
    'hey': ['Hello!', 'Hi there!', 'Greetings!', 'Hey!'],
    'how are you': ['I am fine, thank you!', 'Doing great, thanks for asking!', 'I am doing well, how about you?'],
    'what is your name': ['I am a chatbot.', 'You can call me ChatBot.', 'I am your friendly chatbot!'],
    'what can you do': ['I can chat with you and answer simple questions.', 'I can have conversations with you.', 'I can assist you with basic queries.'],
    'tell me a joke': ['Why did the scarecrow win an award? Because he was outstanding in his field!',
                      'Why dont scientists trust atoms? Because they make up everything!',
                      'What do you call a fake noodle? An impasta!'],
    'bye': ['Goodbye!', 'See you later!', 'Bye! Take care!', 'Farewell!'],
    'thank you': ['You\'re welcome!', 'Happy to help!', 'Anytime!', 'Glad I could assist!']
};

// Fallback responses
const fallbacks = [
    'I didn\'t quite understand that.',
    'Could you please rephrase?',
    'Interesting, tell me more.',
    'I see. What else?',
    'Hmm, let\'s talk about something else.',
    'I\'m still learning. Can you ask me something else?'
];

// Mathematical operations
function handleMath(input) {
    const pattern = /(\d+(?:\.\d+)?)\s*([+\-*/])\s*(\d+(?:\.\d+)?)/;
    const match = input.match(pattern);
    
    if (match) {
        const num1 = parseFloat(match[1]);
        const operator = match[2];
        const num2 = parseFloat(match[3]);
        
        try {
            let result;
            switch(operator) {
                case '+':
                    result = num1 + num2;
                    break;
                case '-':
                    result = num1 - num2;
                    break;
                case '*':
                    result = num1 * num2;
                    break;
                case '/':
                    if (num2 === 0) {
                        return "Cannot divide by zero!";
                    }
                    result = num1 / num2;
                    break;
                default:
                    return null;
            }
            return `The result is ${result}`;
        } catch (e) {
            return "Sorry, I couldn't calculate that.";
        }
    }
    return null;
}

// Get response from the chatbot
function getResponse(input) {
    const lowerInput = input.toLowerCase().trim();
    
    // Check for mathematical operations
    const mathResult = handleMath(lowerInput);
    if (mathResult) {
        return mathResult;
    }
    
    // Check for predefined responses
    for (const [key, value] of Object.entries(responses)) {
        if (lowerInput.includes(key)) {
            return value[Math.floor(Math.random() * value.length)];
        }
    }
    
    // Fallback response
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

// Format timestamp
function formatTime() {
    const now = new Date();
    return now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
}

// Add message to chat
function addMessage(text, isUser) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const avatar = isUser ? 
        '<div class="avatar user-avatar"><i class="fas fa-user"></i></div>' : 
        '<div class="avatar bot-avatar"><i class="fas fa-robot"></i></div>';
    
    messageDiv.innerHTML = `
        ${isUser ? '' : avatar}
        <div class="message-content">
            <span>${text}</span>
        </div>
        ${isUser ? avatar : ''}
        <div class="timestamp">${formatTime()}</div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Clear chat function
function clearChat() {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = `
        <div class="message bot-message">
            <div class="avatar bot-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <span>Hello! I'm your friendly chatbot. How can I help you today?</span>
            </div>
            <div class="timestamp">Just now</div>
        </div>
    `;
}

// Toggle suggestions visibility
function toggleSuggestions() {
    const suggestions = document.getElementById('suggestions');
    suggestions.classList.toggle('visible');
}

// Use suggestion
function useSuggestion(text) {
    const userInput = document.getElementById('user-input');
    userInput.value = text;
    userInput.focus();
}

// Send message function
function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    
    if (message) {
        // Add user message
        addMessage(message, true);
        userInput.value = '';
        
        // Get and add bot response
        setTimeout(() => {
            const response = getResponse(message);
            addMessage(response, false);
        }, 500);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const clearBtn = document.getElementById('clear-btn');
    const suggestionBtn = document.getElementById('suggestion-btn');
    const suggestionItems = document.querySelectorAll('.suggestion-item');
    
    sendBtn.addEventListener('click', sendMessage);
    
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    clearBtn.addEventListener('click', clearChat);
    
    suggestionBtn.addEventListener('click', toggleSuggestions);
    
    suggestionItems.forEach(item => {
        item.addEventListener('click', () => {
            useSuggestion(item.textContent);
        });
    });
});
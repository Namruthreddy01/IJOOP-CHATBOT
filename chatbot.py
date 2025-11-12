# Simple Chatbot Implementation
import random
import re

class ChatBot:
    def __init__(self):
        # Define common greetings and responses
        self.greetings = {
            'hello': ['Hello!', 'Hi there!', 'Greetings!', 'Hey!'],
            'hi': ['Hello!', 'Hi there!', 'Greetings!', 'Hey!'],
            'hey': ['Hello!', 'Hi there!', 'Greetings!', 'Hey!'],
            'good morning': ['Good morning!', 'Morning!', 'Hello! Good morning!'],
            'good afternoon': ['Good afternoon!', 'Afternoon!', 'Hello! Good afternoon!'],
            'good evening': ['Good evening!', 'Evening!', 'Hello! Good evening!']
        }
        
        # Define common questions and responses
        self.responses = {
            'how are you': ['I am fine, thank you!', 'Doing great, thanks for asking!', 'I am doing well, how about you?'],
            'what is your name': ['I am a chatbot.', 'You can call me ChatBot.', 'I am your friendly chatbot!'],
            'what can you do': ['I can chat with you and answer simple questions.', 'I can have conversations with you.', 'I can assist you with basic queries.'],
            'tell me a joke': ['Why did the scarecrow win an award? Because he was outstanding in his field!',
                              'Why dont scientists trust atoms? Because they make up everything!',
                              'What do you call a fake noodle? An impasta!'],
            'bye': ['Goodbye!', 'See you later!', 'Bye! Take care!', 'Farewell!'],
            'thank you': ['You\'re welcome!', 'Happy to help!', 'Anytime!', 'Glad I could assist!']
        }
        
        # Define fallback responses
        self.fallbacks = [
            'I didn\'t quite understand that.',
            'Could you please rephrase?',
            'Interesting, tell me more.',
            'I see. What else?',
            'Hmm, let\'s talk about something else.',
            'I\'m still learning. Can you ask me something else?'
        ]
    
    def get_response(self, user_input):
        """
        Process user input and return appropriate response
        """
        # Convert to lowercase for easier matching
        user_input = user_input.lower().strip()
        
        # Check for greetings
        for greeting, responses in self.greetings.items():
            if greeting in user_input:
                return random.choice(responses)
        
        # Check for predefined responses
        for question, responses in self.responses.items():
            if question in user_input:
                return random.choice(responses)
        
        # Check for mathematical calculations
        math_result = self.handle_math(user_input)
        if math_result:
            return math_result
        
        # Fallback response if no match found
        return random.choice(self.fallbacks)
    
    def handle_math(self, user_input):
        """
        Handle simple mathematical calculations
        """
        # Pattern to match basic arithmetic operations
        pattern = r'(\d+(?:\.\d+)?)\s*([+\-*/])\s*(\d+(?:\.\d+)?)'
        match = re.search(pattern, user_input)
        
        if match:
            num1 = float(match.group(1))
            operator = match.group(2)
            num2 = float(match.group(3))
            result = None
            
            try:
                if operator == '+':
                    result = num1 + num2
                elif operator == '-':
                    result = num1 - num2
                elif operator == '*':
                    result = num1 * num2
                elif operator == '/':
                    if num2 == 0:
                        return "Cannot divide by zero!"
                    result = num1 / num2
                
                if result is not None:
                    return f"The result is {result}"
                else:
                    return "Sorry, I couldn't calculate that."
            except Exception as e:
                return "Sorry, I couldn't calculate that."
        
        return None
    
    def start_chat(self):
        """
        Start the chat session
        """
        print("ChatBot: Hello! I'm your friendly chatbot. Type 'quit' to exit.")
        
        while True:
            user_input = input("You: ").strip()
            
            # Exit condition
            if user_input.lower() in ['quit', 'exit', 'bye']:
                print("ChatBot: Goodbye! Have a great day!")
                break
            
            # Get and print bot response
            response = self.get_response(user_input)
            print(f"ChatBot: {response}")

# Main execution
if __name__ == "__main__":
    bot = ChatBot()
    bot.start_chat()
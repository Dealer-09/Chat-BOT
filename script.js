// Select elements
var btn = document.querySelector("#btn");
var content = document.querySelector("#chat-container");
var messageInput = document.querySelector("#message-input");
var suggestionsContainer = document.querySelector("#suggestions");
// Predefined responses
var responses = {
    "hello": "Hello student, what can I help you with?",
    "who are you": "I am your virtual assistant for AIMS (AMIT INSTITUTE OF MATH'S AND SCIENCE), created using modern web technologies.",
    "subjects": "Please tell me your interests or career goals, and I can suggest suitable subjects or courses.",
    "courses": "Please tell me your interests or career goals, and I can suggest suitable subjects or courses.",
    "college": "Are you looking for specific colleges or general advice on how to choose one?",
    "university": "Are you looking for specific colleges or general advice on how to choose one?",
    "contact": "You can reach out to our academic advisor at advisor@aims.edu or call us at (123) 456-7890.",
    "open youtube": function () {
        displayMessage("Opening YouTube...");
        window.open("https://youtube.com/@gyanofficialchannel3418?si=MI4OSUmyfwKj79IR", "_blank");
    },
    "open google": function () {
        displayMessage("Opening Google...");
        window.open("https://google.com/", "_blank");
    },
    "time": function () {
        displayMessage("The current time is ".concat(new Date().toLocaleTimeString()));
    },
    "date": function () {
        displayMessage("Today's date is ".concat(new Date().toLocaleDateString()));
    }
};
// Display message in chat
function displayMessage(text, isUser) {
    if (isUser === void 0) { isUser = false; }
    var messageDiv = document.createElement("div");
    messageDiv.classList.add("message", isUser ? "user-message" : "assistant-message");
    messageDiv.innerText = text;
    content.appendChild(messageDiv);
    setTimeout(function () {
        content.scrollTop = content.scrollHeight;
    }, 0);
}
// Show typing indicator
function showTypingIndicator() {
    var typingDiv = document.createElement("div");
    typingDiv.classList.add("typing-indicator");
    typingDiv.innerText = "Assistant is typing...";
    content.appendChild(typingDiv);
    content.scrollTop = content.scrollHeight;
    return typingDiv;
}
// Auto Dark Mode Detection
function applyTheme() {
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
        document.body.classList.add("dark-mode");
    }
    else {
        document.body.classList.remove("dark-mode");
    }
}
// Listen for theme changes and apply theme on page load
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", applyTheme);
document.addEventListener("DOMContentLoaded", function () {
    applyTheme();
    wishMe();
});
// Initial greeting
function wishMe() {
    var hours = new Date().getHours();
    var greeting = hours < 12 ? "Good Morning Students" :
        hours < 18 ? "Good Afternoon Students" :
            hours < 21 ? "Good Evening Students" : "Good Night Students";
    displayMessage(greeting);
}
// Process user command
function takeCommand(message) {
    message = message.toLowerCase().trim();
    var typing = showTypingIndicator();
    setTimeout(function () {
        content.removeChild(typing);
        if (responses[message]) {
            if (typeof responses[message] === "function") {
                responses[message]();
            }
            else {
                displayMessage(responses[message]);
            }
        }
        else {
            displayMessage("I'm not sure how to respond to that. Try asking about subjects, courses, or contacting us!");
        }
    }, 1000);
}
// Handle user input
function handleUserInput() {
    var userMessage = messageInput.value.trim();
    if (!userMessage)
        return;
    displayMessage(userMessage, true);
    takeCommand(userMessage);
    setTimeout(function () { messageInput.value = ""; }, 100);
}
// Event Listeners
btn.addEventListener("click", handleUserInput);
messageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        handleUserInput();
    }
});
// Generate suggestion buttons
function generateSuggestions() {
    var suggestions = ["hello", "who are you", "subjects", "courses", "college", "contact", "time", "date"];
    suggestions.forEach(function (text) {
        var button = document.createElement("button");
        button.classList.add("suggestion-btn");
        button.innerText = text;
        button.addEventListener("click", function () {
            messageInput.value = text;
            handleUserInput();
        });
        suggestionsContainer.appendChild(button);
    });
}
generateSuggestions();

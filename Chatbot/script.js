document.addEventListener("DOMContentLoaded", function () {
  const chatbotContainer = document.getElementById("chatbot-container");
  const chatbotIcon = document.getElementById("chatbot-icon");
  const closeButton = document.getElementById("close-btn");
  const sendBtn = document.getElementById("send-btn");
  const chatbotInput = document.getElementById("chatbot-input");
  const chatbotMessages = document.getElementById("chatbot-messages");

  
  chatbotIcon.addEventListener("click", () => {
    chatbotContainer.classList.remove("hidden");
    chatbotIcon.style.display = "none";
  });

  closeButton.addEventListener("click", () => {
    chatbotContainer.classList.add("hidden");
    chatbotIcon.style.display = "flex";
  });

  sendBtn.addEventListener("click", sendMessage);
  chatbotInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
  });

  function sendMessage() {
    const userMessage = chatbotInput.value.trim();
    if (userMessage === "") return;
    appendMessage("user", userMessage);
    chatbotInput.value = "";
    getBotResponse(userMessage);
  }

  function appendMessage(sender, message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = message;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  async function getBotResponse(userMessage) {
    const apiKey = "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"; 
    const apiUrl = "https://cors-anywhere.herokuapp.com/https://api.openai.com/v1/chat/completions";


    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: userMessage }],
          max_tokens: 150,
        }),
      });

      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        const botMessage = data.choices[0].message.content;
        appendMessage("bot", botMessage);
      } else {
        appendMessage("bot", "Error: No response from AI.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      appendMessage("bot", "Error: Failed to fetch response.");
    }
  }
});

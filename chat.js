const respostasPossiveis = [
  "OK, entendido!",
  "Vou verificar isso.",
  "Ótimo, obrigado pelo update!",
  "Pode deixar que acompanho aqui.",
  "Vou aguardar seu retorno.",
  "Perfeito, mantenha-me informado.",
  "Estou analisando e te retorno em breve.",
];

function getRandomResponse() {
  return respostasPossiveis[
    Math.floor(Math.random() * respostasPossiveis.length)
  ];
}

function createMessageElement(text, isSent) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${isSent ? "sent" : "received"}`;

  const html = `
        ${!isSent ? '<div class="senderName">Chai Sadjursky</div>' : ""}
        <div>${text}</div>
        <div class="message-time">${new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}</div>
    `;

  messageDiv.innerHTML = html;
  return messageDiv;
}

function sendMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();

  if (text) {
    const messagesContainer = document.getElementById("messages");

    // Sua mensagem
    messagesContainer.appendChild(createMessageElement(text, true));

    // Resposta aleatória com delay variável
    setTimeout(() => {
      const resposta = getRandomResponse();
      messagesContainer.appendChild(createMessageElement(resposta, false));
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, Math.random() * 2000 + 1000); // Delay entre 1 e 3 segundos

    input.value = "";
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}

// Permitir enviar com Enter
document.getElementById("message-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

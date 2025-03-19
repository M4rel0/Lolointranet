let senha = document.getElementById("password");
let email = document.getElementById("email");

function login(event) {
  event.preventDefault();

  if (senha.value === "123" && email.value === "Chai.s.designer@gmail.com") {
    window.location.href = "./pages/intra.html";
  } else {
    alert("Email ou senha incorretos!");
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

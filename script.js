let seconds = 0;
let minutes = 0;
let timer;
let running = false;
let holdTimeout;
let longPress = false;
let travadotempo = true;

// Funções que não dependem diretamente de elementos do DOM no momento da inicialização
function updateDisplay() {
  const counter = document.getElementById("counter");
  if (counter) {
    counter.textContent = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  }
}

function resetTimer() {
  clearInterval(timer);
  seconds = 0;
  minutes = 0;
  running = false;
  updateDisplay();
}

document.addEventListener("DOMContentLoaded", function () {
  // ========== [Timer Logic] ==========
  const botaoRemoto = document.getElementsByClassName("botaoRemoto")[0];
  const botaoPresencial = document.getElementsByClassName("botaoPresencial")[0];
  const startButton = document.getElementById("start");

  function removerseleçao() {
    botaoPresencial?.classList.remove("botaoAtivo");
    botaoRemoto?.classList.remove("botaoAtivo");
  }

  if (botaoRemoto && botaoPresencial) {
    botaoRemoto.addEventListener("click", function () {
      if (travadotempo) {
        removerseleçao();
        this.classList.add("botaoAtivo");
      }
    });

    botaoPresencial.addEventListener("click", function () {
      if (travadotempo) {
        removerseleçao();
        this.classList.add("botaoAtivo");
      }
    });
  }

  if (startButton) {
    // Eventos de clique longo
    startButton.addEventListener("mousedown", startHold);
    startButton.addEventListener("touchstart", startHold);
    startButton.addEventListener("mouseup", endHold);
    startButton.addEventListener("touchend", endHold);
    startButton.addEventListener("mouseleave", endHold);

    // Evento de clique normal
    startButton.addEventListener("click", function () {
      if (longPress) {
        longPress = false;
        return;
      }

      if (!running) {
        startButton.textContent = "Pausar";
        travadotempo = false;
        running = true;
        timer = setInterval(() => {
          seconds++;
          if (seconds === 60) {
            seconds = 0;
            minutes++;
          }
          updateDisplay();
        }, 1000);
      } else {
        startButton.textContent = "Começar Trabalho";
        running = false;
        travadotempo = true;
        clearInterval(timer);
      }
    });
  }

  // ========== [Task Check Logic] ==========
  const taskcheck = document.getElementsByClassName("lista");
  for (let i = 0; i < taskcheck.length; i++) {
    taskcheck[i].addEventListener("click", function () {
      const imagem = taskcheck[i].getElementsByTagName("img")[0];
      if (imagem?.src.includes("checkaudrado.svg")) {
        imagem.src = "../img/checkcomsetinha.svg";
      } else {
        imagem.src = "../img/checkaudrado.svg";
      }
    });
  }

  // ========== [Date Logic] ==========
  async function mostrarData() {
    try {
      const resposta = await fetch(
        "https://timeapi.io/api/Time/current/zone?timeZone=America/Sao_Paulo"
      );
      const dados = await resposta.json();

      const diasSemana = {
        /* ... */
      };
      const meses = {
        /* ... */
      };

      // Atualização dos elementos com verificação
      const updateIfExists = (id, content) => {
        const element = document.getElementById(id);
        if (element) element.textContent = content;
      };

      updateIfExists("DiasID", diasSemana[dados.dayOfWeek] || dados.dayOfWeek);
      updateIfExists("HorasID", dados.day);
      updateIfExists("MesID", meses[dados.month] || dados.month);
      updateIfExists(
        "HorasAtualID",
        dados.time.split("T")[1].split(":").slice(0, 2).join(":")
      );
    } catch (erro) {
      console.log("Erro ao obter data da API: ", erro);
    }
  }
  mostrarData();

  // ========== [Modal Logic] ==========
  const abrirModalLink = document.getElementById("abrirModal");
  const abrirModalChatLink = document.getElementById("abrirModalChat");
  const abrirModalDocumentLink = document.getElementById("abrirModaldocumento");

  // Função genérica para manipulação de iframes
  const setupIframe = (iframe, openButton) => {
    if (openButton && iframe) {
      openButton.addEventListener("click", (event) => {
        event.preventDefault();
        iframe.style.display = "block";
      });

      iframe.addEventListener("load", () => {
        const voltarLink =
          iframe.contentDocument?.getElementById("voltarIntra");
        if (voltarLink) {
          voltarLink.addEventListener("click", (e) => {
            e.preventDefault();
            iframe.style.display = "none";
          });
        }
      });
    }
  };

  setupIframe(
    document.querySelector("iframe[src='./ticket.html']"),
    abrirModalLink
  );
  setupIframe(
    document.querySelector("iframe[src='./chat.html']"),
    abrirModalChatLink
  );
  setupIframe(
    document.querySelector("iframe[src='./documentos.html']"),
    abrirModalDocumentLink
  );

  // ========== [Login Fix] ==========
  document
    .querySelector(".formFooter a")
    .addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = this.href;
    });
});

// ========== [Hold Functions] ==========
function startHold() {
  longPress = false;
  holdTimeout = setTimeout(() => {
    resetTimer();
    longPress = true;
    document.getElementById("start").textContent = "Começar Trabalho";
  }, 2000);
}

function endHold() {
  clearTimeout(holdTimeout);
}

let seconds = 0;
let minutes = 0;
let timer;
let running = false;
let holdTimeout;
let longPress = false; // Flag para controlar o clique longo

function updateDisplay() {
  document.getElementById("counter").textContent = `${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}

function resetTimer() {
  clearInterval(timer);
  seconds = 0;
  minutes = 0;
  running = false;
  updateDisplay();
}

// Configurar eventos para o botão
const startButton = document.getElementById("start");

// Iniciar contagem do clique longo
startButton.addEventListener("mousedown", startHold);
startButton.addEventListener("touchstart", startHold);

// Finalizar contagem do clique longo
startButton.addEventListener("mouseup", endHold);
startButton.addEventListener("touchend", endHold);
startButton.addEventListener("mouseleave", endHold);

function startHold() {
  longPress = false;
  holdTimeout = setTimeout(() => {
    resetTimer();
    longPress = true; // Marca que houve um clique longo
  }, 2000);
}

function endHold() {
  clearTimeout(holdTimeout);
}

// Evento de clique normal
startButton.addEventListener("click", function () {
  if (longPress) {
    longPress = false; // Reseta a flag após o clique longo
    return;
  }

  if (!running) {
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
    running = false;
    clearInterval(timer);
  }
});
/**------------------------------------------------- */
const taskcheck = document.getElementsByClassName("lista");

for (let i = 0; i < taskcheck.length; i++) {
  taskcheck[i].addEventListener("click", function () {
    // Seleciona a imagem dentro do item da lista
    const imagem = taskcheck[i].getElementsByTagName("img")[0];

    if (imagem.src.includes("checkaudrado.svg")) {
      imagem.src = "../img/checkcomsetinha.svg"; // Caminho correto para "checkcomsetinha.svg"
    } else {
      imagem.src = "../img/checkaudrado.svg"; // Caminho correto para "checkaudrado.svg"
    }
  });
}

async function mostrarData() {
  try {
    // Faz a requisição para a API timeapi.io
    const resposta = await fetch(
      "https://timeapi.io/api/Time/current/zone?timeZone=America/Sao_Paulo"
    );
    const dados = await resposta.json();

    // Arrays de tradução para português
    const diasSemana = {
      Monday: "Segunda-feira",
      Tuesday: "Terça-feira",
      Wednesday: "Quarta-feira",
      Thursday: "Quinta-feira",
      Friday: "Sexta-feira",
      Saturday: "Sábado",
      Sunday: "Domingo",
    };

    const meses = {
      January: "Janeiro",
      February: "Fevereiro",
      March: "Março",
      April: "Abril",
      May: "Maio",
      June: "Junho",
      July: "Julho",
      August: "Agosto",
      September: "Setembro",
      October: "Outubro",
      November: "Novembro",
      December: "Dezembro",
    };

    // Obtém os valores e traduz
    const diaSemana = diasSemana[dados.dayOfWeek] || dados.dayOfWeek;
    const diaDoMes = dados.day;
    const mes = meses[dados.month] || dados.month;

    // Obtém a hora atual (no formato 24 horas)
    const hora = dados.time.split("T")[1].split(":");
    const horaAtual = hora[0] + ":" + hora[1];

    // Atualiza os elementos do HTML com os IDs corretos
    document.getElementById("DiasID").textContent = diaSemana;
    document.getElementById("HorasID").textContent = diaDoMes;
    document.getElementById("MesID").textContent = mes;
    document.getElementById("HorasAtualID").textContent = horaAtual;
  } catch (erro) {
    console.log("Erro ao obter data da API: ", erro);
  }
}

// Executa a função quando a página carrega
mostrarData();
//
document.addEventListener("DOMContentLoaded", function () {
  // Seleciona o link que abre o modal
  var abrirModalLink = document.getElementById("abrirModal");
  // Seleciona o iframe que contém o ticket
  var ticketIframe = document.querySelector("iframe[src='./ticket.html']");

  // Adiciona o evento de clique para mostrar o iframe
  if (abrirModalLink && ticketIframe) {
    abrirModalLink.addEventListener("click", function (event) {
      event.preventDefault();
      ticketIframe.style.display = "block";
    });
  }

  // Ao carregar o conteúdo do iframe, adiciona o evento para fechar
  if (ticketIframe) {
    ticketIframe.addEventListener("load", function () {
      var voltarIntraLink =
        ticketIframe.contentDocument.getElementById("voltarIntra");
      if (voltarIntraLink) {
        voltarIntraLink.addEventListener("click", function (e) {
          e.preventDefault();
          ticketIframe.style.display = "none";
        });
      }
    });
  }
});

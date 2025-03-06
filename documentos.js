document.addEventListener("DOMContentLoaded", function () {
  var fileInput = document.getElementById("file-input");
  var uploadArea = document.getElementById("upload-area");
  var arquivoDoc = document.getElementById("arquivo");
  var fileSelector = document.getElementById("file-selector");

  // Função para ajustar a altura da área de upload
  function ajustarAlturaUploadArea() {
    if (fileInput.files.length === 0) {
      uploadArea.style.height = "225px"; // Aumenta a altura quando não há arquivos
      arquivoDoc.style.display = "none"; // Esconde a área de arquivo
    } else {
      uploadArea.style.height = "130px"; // Reduz a altura quando há arquivos
      arquivoDoc.style.display = "block"; // Mostra a área de arquivo
    }
  }

  // Adiciona um evento de mudança ao input de arquivo
  fileInput.addEventListener("change", ajustarAlturaUploadArea);

  // Adiciona um evento de clique ao fileSelector para acionar o input de arquivo
  fileSelector.addEventListener("click", function () {
    fileInput.click();
  });

  // Chama a função inicialmente para definir o estado correto
  ajustarAlturaUploadArea();

  // Adiciona um evento de clique ao uploadArea para acionar o input de arquivo
  uploadArea.addEventListener("click", function (e) {
    if (e.target.tagName !== "SPAN") {
      fileInput.click();
    }
  });

  // Eventos de drag and drop
  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.classList.add("dragover");
  });

  uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("dragover");
  });

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.classList.remove("dragover");
    const files = e.dataTransfer.files;
    handleFiles(files);
  });

  // Manipulação de arquivos
  fileInput.addEventListener("change", (e) => {
    handleFiles(e.target.files);
  });

  function handleFiles(files) {
    if (files.length > 0) {
      console.log("Arquivo selecionado:", files[0]);
      // Adicione aqui o código de upload ou preview
    }
  }
});

//

document.getElementById("upload-area").addEventListener("click", function (e) {
  // Impede que clique no span dispare 2 eventos
  if (e.target.tagName !== "SPAN") {
    document.getElementById("file-input").click();
  }
});

// Mantenha o resto do código de drag and drop anterior
const uploadArea = document.getElementById("upload-area");
const fileInput = document.getElementById("file-input");

// Eventos de drag and drop (mesmo do código anterior)
uploadArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadArea.classList.add("dragover");
});

uploadArea.addEventListener("dragleave", () => {
  uploadArea.classList.remove("dragover");
});

uploadArea.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadArea.classList.remove("dragover");
  const files = e.dataTransfer.files;
  handleFiles(files);
});

// Manipulação de arquivos
fileInput.addEventListener("change", (e) => {
  handleFiles(e.target.files);
});

function handleFiles(files) {
  if (files.length > 0) {
    console.log("Arquivo selecionado:", files[0]);
    // Adicione aqui o código de upload ou preview
  }
}

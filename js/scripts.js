const formulario = document.getElementById("formulario");
const inputNome = document.getElementById("nome");
const inputEmail = document.getElementById("email");
const inputTelefone = document.getElementById("telefone");
const inputRua = document.getElementById("rua");
const inputComplemento = document.getElementById("complemento");
const inputCidade = document.getElementById("cidade");
const inputBairro = document.getElementById("bairro");
const inputEstado = document.getElementById("estado");
const inputCep = document.getElementById("cep");
const btnCadastrar = document.getElementById("btnCadastrar");
const errorApiSpan = document.querySelector(".error-api");
const classeSuccess = document.querySelectorAll(".success");

function validateAndUpdate(inputElement, isValid) {
  const campoGrupo = inputElement.parentElement;
  const mensagemErro = campoGrupo.querySelector(".campo-obrigatorio");

  campoGrupo.classList.toggle("divError", !isValid);
  mensagemErro.classList.toggle("span-error", !isValid);
  inputElement.classList.toggle("error", !isValid);
  campoGrupo.classList.toggle("success", isValid);

  estadoBtnCadastrar();
}

inputNome.addEventListener("input", () => {
  validateAndUpdate(inputNome, inputNome.value.length > 3);
});

inputEmail.addEventListener("input", () => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
    inputEmail.value
  );

  validateAndUpdate(inputEmail, emailRegex);
});

inputTelefone.addEventListener("input", () => {
  let inputValue = inputTelefone.value.replace(/\D/g, "");

  inputValue = inputValue.slice(0, 11);

  if (inputValue.length <= 10 && inputValue.length < 11) {
    inputTelefone.value = inputValue.replace(
      /(\d{2})(\d{4})(\d{4})/,
      "($1) $2-$3"
    );
    validateAndUpdate(inputTelefone, inputTelefone.value.length > 10);
  } else {
    inputTelefone.value = inputValue.replace(
      /(\d{2})(\d{5})(\d{4})/,
      "($1) $2-$3"
    );
    validateAndUpdate(inputTelefone, inputTelefone.value.length > 10);
  }
});

inputRua.addEventListener("input", () => {
  validateAndUpdate(inputRua, inputRua.value.length > 3);
});

inputComplemento.addEventListener("input", () => {
  validateAndUpdate(inputComplemento, inputComplemento.value.trim() !== "");
});

inputCidade.addEventListener("input", () => {
  validateAndUpdate(inputCidade, inputCidade.value.trim() !== "");
});

inputBairro.addEventListener("input", () => {
  validateAndUpdate(inputBairro, inputBairro.value.trim() !== "");
});

inputEstado.addEventListener("input", () => {
  validateAndUpdate(inputEstado, inputEstado.value.trim() !== "");
});

inputCep.addEventListener("input", async () => {
  let inputValue = inputCep.value.replace(/\D/g, "");
  inputValue = inputValue.slice(0, 8);

  inputCep.value = inputValue;

  const cepValido = /^\d{8}$/.test(inputValue);

  if (cepValido) {
    const formattedValue = inputValue.replace(/^(\d{5})(\d{3})$/, "$1-$2");
    inputCep.value = formattedValue;

    try {
      const response = await fetch(
        `https://brasilapi.com.br/api/CEP/v1/${inputValue}`
      );

      if (!response.ok) {
        errorApiSpan.style.display = "block";
        validateAndUpdate(inputCep, false);
        return;
      } else {
        errorApiSpan.style.display = "none";
      }

      const result = await response.json();
      if (result) {
        inputRua.value = result.street || "";
        inputCidade.value = result.city || "";
        inputBairro.value = result.neighborhood || "";
        inputEstado.value = result.state || "";

        inputCep.disabled = true;

        validateAndUpdate(inputCep, true);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  } else {
    errorApiSpan.style.display = "none";
  }

  validateAndUpdate(inputCep, inputCep.value.length >= 8);
});

const inputs = [
  inputNome,
  inputEmail,
  inputTelefone,
  inputRua,
  inputComplemento,
  inputCidade,
  inputBairro,
  inputEstado,
  inputCep,
];

function estadoBtnCadastrar() {
  const allInputsValid = inputs.every(
    (input) => input.value.trim() !== "" && !input.classList.contains("error")
  );

  btnCadastrar.disabled = !allInputsValid;
}

let idUsuario = 1;

function mensagen(msgSistema) {
  if (msgSistema !== "") {
    Swal.fire({
      icon: "success",
      title: msgSistema,
      showConfirmButton: false,
      timer: 1500,
    });
    limparFormulario();
    estadoBtnCadastrar();
  }
}

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const Data = {
    nome: inputNome.value,
    email: inputEmail.value,
    telefone: inputTelefone.value,
    rua: inputRua.value,
    complemento: inputComplemento.value,
    bairro: inputBairro.value,
    cidade: inputCidade.value,
    estado: inputEstado.value,
    cep: inputCep.value,
  };

  const jsonData = JSON.stringify(Data);
  const storageKey = `id_${idUsuario}`;
  idUsuario++;
  localStorage.setItem(storageKey, jsonData);
  mensagen("Usuario cadastrado com sucesso!");
  setTimeout(function () {
    location.reload();
  }, 1000);
});
const btnLimpar = document.getElementById("btnLimpar");

btnLimpar.addEventListener("click", limparFormulario);

function limparFormulario() {
  formulario.reset();
}

function inicializarIdUsuario() {
  for (let i = 1; ; i++) {
    const storageKey = `id_${i}`;
    if (!localStorage.getItem(storageKey)) {
      idUsuario = i;
      break;
    }
  }
}

window.addEventListener("load", () => {
  inicializarIdUsuario();
  exibirUltimoLocalStoredData();
});

const dataFields = [
  { label: "Nome", key: "nome" },
  { label: "Email", key: "email" },
  { label: "Telefone", key: "telefone" },
  { label: "Rua", key: "rua" },
  { label: "Complemento", key: "complemento" },
  { label: "Cidade", key: "cidade" },
  { label: "Bairro", key: "bairro" },
  { label: "Estado", key: "estado" },
  { label: "CEP", key: "cep" },
];

function criarCard(data) {
  const card = document.createElement("div");
  card.classList.add("cardUsuario");

  dataFields.forEach((field) => {
    const fieldElement = document.createElement("p");
    fieldElement.textContent = `${field.label}: ${data[field.key]}`;
    card.appendChild(fieldElement);
  });

  return card;
}
function exibirUltimoLocalStoredData() {
  const container = document.getElementById("cardUsuario");

  const storageKey = `id_${idUsuario - 1}`;
  const jsonData = localStorage.getItem(storageKey);

  if (jsonData) {
    const userData = JSON.parse(jsonData);
    const card = criarCard(userData);
    container.appendChild(card);
  }
}
const storageVazio = document.getElementById("storageVazio");
if (localStorage.length === 0) {
  storageVazio.style.display = "block";
} else {
  storageVazio.style.display = "none";
}

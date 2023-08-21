const form = document.getElementById("formulario");
const inputNome = document.getElementById("nome");
const inputEmail = document.getElementById("email");
const inputTelefone = document.getElementById("telefone");
const inputRua = document.getElementById("rua");
const inputNumeroResidencia = document.getElementById("numeroResidencia");
const inputComplemento = document.getElementById("complemento");
const inputCidade = document.getElementById("cidade");
const inputEstado = document.getElementById("estado");
const inputCep = document.getElementById("cep");
const btnCadastrar = document.getElementById("btnCadastrar");

function validateAndUpdate(inputElement, isValid) {
  const campoGrupo = inputElement.parentElement;
  const mensagemErro = campoGrupo.querySelector(".campo-obrigatorio");

  campoGrupo.classList.toggle("error", !isValid);
  mensagemErro.classList.toggle("span-error", !isValid);
  inputElement.classList.toggle("error", !isValid);

  const inputs = [
    inputNome,
    inputEmail,
    inputTelefone,
    inputRua,
    inputNumeroResidencia,
    inputComplemento,
    inputCidade,
    inputEstado,
    inputCep,
  ];
  const allInputsValid = inputs.every(
    (input) => input.value.trim() !== "" && !input.classList.contains("error")
  );

  btnCadastrar.disabled = !allInputsValid;
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

inputNumeroResidencia.addEventListener("input", () => {
  validateAndUpdate(
    inputNumeroResidencia,
    inputNumeroResidencia.value.trim() !== ""
  );
});

inputComplemento.addEventListener("input", () => {
  validateAndUpdate(inputComplemento, inputComplemento.value.trim() !== "");
});

inputCidade.addEventListener("input", () => {
  validateAndUpdate(inputCidade, inputCidade.value.trim() !== "");
});

inputEstado.addEventListener("input", () => {
  validateAndUpdate(inputEstado, inputEstado.value.trim() !== "");
});

inputCep.addEventListener("input", () => {
  let inputValue = inputCep.value.replace(/\D/g, "");

  inputValue = inputValue.slice(0, 8);

  inputCep.value = inputValue;

  const cepValido = /^\d{8}$/.test(inputValue);

  if (cepValido) {
    const formattedValue = inputValue.replace(/^(\d{5})(\d{3})$/, "$1-$2");
    inputCep.value = formattedValue;
  }

  validateAndUpdate(inputCep, inputCep.value.length > 8);
});

function estadoBtnCadastrar() {
  const inputs = [
    inputNome,
    inputEmail,
    inputTelefone,
    inputRua,
    inputNumeroResidencia,
    inputComplemento,
    inputCidade,
    inputEstado,
    inputCep,
  ];
  const allInputsValid = inputs.every(
    (input) => input.value.trim() !== "" && !input.classList.contains("error")
  );

  btnCadastrar.disabled = !allInputsValid;
}

inputNome.addEventListener("input", estadoBtnCadastrar);
inputEmail.addEventListener("input", estadoBtnCadastrar);
inputTelefone.addEventListener("input", estadoBtnCadastrar);
inputRua.addEventListener("input", estadoBtnCadastrar);
inputNumeroResidencia.addEventListener("input", estadoBtnCadastrar);
inputComplemento.addEventListener("input", estadoBtnCadastrar);
inputCidade.addEventListener("input", estadoBtnCadastrar);
inputEstado.addEventListener("input", estadoBtnCadastrar);
inputCep.addEventListener("input", estadoBtnCadastrar);

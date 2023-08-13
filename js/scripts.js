const formulario = document.getElementById("formulario");
const campos = document.querySelectorAll(".requerido");
const inputNome = document.getElementById("nome");
const inputEmail = document.getElementById("email");
const inputTelefone = document.getElementById("telefone");
const inputRua = document.getElementById("rua");
const inputNumeroResidencia = document.getElementById("numeroResidencia");
const inputComplemento = document.getElementById("complemento");
const inputCidade = document.getElementById("cidade");
const inputEstado = document.getElementById("estado");
const inputCep = document.getElementById("cep");
const mensagemErro = document.querySelectorAll(".campo-obrigatorio");
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    validarNome();
    validarEmail();
    validarTelefone();
    validarRua();
    validarNumeroResidencia();
    validarComplemento();
    validarCidade();
    validarEstado();
    validarCep();

    const Data = {
        nome: inputNome.value,
        email: inputEmail.value,
        telefone: inputTelefone.value,
        rua: inputRua.value,
        numeroResidencia: inputNumeroResidencia.value,
        complemento: inputComplemento.value,
        cidade: inputCidade.value,
        estado: inputEstado.value,
        cep: inputCep.value
    };

    console.log(JSON.stringify(Data, null, 2));

})

function setError(index){
 campos[index].style.border = 'solid 3px #8b0000';
 mensagemErro[index].style.display = 'block';
}

function removerError(index){
    campos[index].style.border = '';
    mensagemErro[index].style.display = 'none';
}

function validarNome(){
    if (inputNome.value.length < 3){
        setError(0);
    }else{
    removerError(0);
}
}
function validarEmail(){
    if (!emailRegex.test(inputEmail.value)){
        setError(1);
    }else{
    removerError(1);
}
}

function formatarTelefone(input) {
    let inputValue = input.value.replace(/\D/g, '');

    inputValue = inputValue.slice(0, 11);

    if (inputValue.length <= 10) {
        input.value = inputValue.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
        input.value = inputValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
}

inputTelefone.addEventListener("input", function() {
    formatarTelefone(this);
    validarTelefone();
});

function validarTelefone() {
   const inputValue = inputTelefone.value.replace(/\D/g, '');

    if (inputValue.length < 11) {
        setError(2);
    } else {
        removerError(2);
    }
}

function validarRua(){
    if (inputRua.value.length < 3){
        setError(3);
    }else{
    removerError(3);
}
}
function validarNumeroResidencia(){
    if (inputNumeroResidencia.value === ''){
        setError(4);
    }else{
    removerError(4);
}
}
function validarComplemento(){
    if (inputComplemento.value.length < 3){
        setError(5);
    }else{
    removerError(5);
}
}
function validarCidade(){
    if (inputCidade.value.length < 3){
        setError(6);
    }else{
    removerError(6);
}
}
function validarEstado(){
    if (inputEstado.value === ''){
        setError(7);
    }else{
    removerError(7);
}
}
function formatarCep(input) {
    let inputValue = input.value.replace(/\D/g, '');
    inputValue = inputValue.slice(0, 8);

    input.value = inputValue.replace(/(\d{5})(\d{0,3})/, '$1-$2');
}

inputCep.addEventListener("input", function() {
    formatarCep(this);
    validarCep();
});

function validarCep() {

    const inputValue = inputCep.value.replace(/\D/g, '');

    if (inputValue.length < 8) {
        setError(8);
    } else {
        removerError(8);
    }
}

const btnLimpar = document.getElementById("btnLimpar");
btnLimpar.addEventListener("click", limparFormulario);

function limparFormulario() {
    formulario.reset();
    //document.getElementById('btnCadastrar').disabled = true;
}




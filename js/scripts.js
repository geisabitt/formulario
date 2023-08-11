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
function validarTelefone(){
    if (inputTelefone.value.length < 11){
        setError(2);
    }else{
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
function validarCep(){
    if (inputCep.value.length < 8 ){
        setError(8);
    }else{
    removerError(8);
}
}




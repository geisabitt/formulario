const formulario = document.getElementById("formulario");
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
    validarFormulario();
});

function setClassError(input){
    const campoGrupo = input.parentElement;
    const mensagemErro = campoGrupo.querySelector('.campo-obrigatorio');

    campoGrupo.classList.add('error'); 
    mensagemErro.classList.add('span-error');
    input.classList.remove("validado")
    return false;
}

function removeClassError(input){
    const campoGrupo = input.parentElement;
    const mensagemErro = campoGrupo.querySelector('.campo-obrigatorio');

    campoGrupo.classList.remove('error');
    mensagemErro.classList.remove('span-error');
    input.classList.add("validado")
    return true;
}

function validarNome(input){
    if (inputNome.value.length < 3){
        setClassError(input)
       
    }else{
        removeClassError(input)
   
}
}
function validarEmail(input){
    if (!emailRegex.test(inputEmail.value)){
        setClassError(input)
    }else{
    removeClassError(input)
}
}

function validarTelefone(input) {
    let inputValue = input.value.replace(/\D/g, '');

    inputValue = inputValue.slice(0, 11);

    if (inputValue.length <= 10 && inputValue.length < 11) {
        input.value = inputValue.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        setClassError(input)
    } else {
        input.value = inputValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        removeClassError(input)
    }
}

function validarRua(input){
    if (inputRua.value.length < 3){
        setClassError(input)
    }else{
    removeClassError(input)
}
}
function validarNumeroResidencia(input){
    if (inputNumeroResidencia.value === ''){
        setClassError(input)
    }else{
   removeClassError(input)
}
}
function validarComplemento(input){
    if (inputComplemento.value.length < 3){
        setClassError(input)
    }else{
    removeClassError(input)
}
}
function validarCidade(input){
    if (inputCidade.value.length < 3){
        setClassError(input)
    }else{
    removeClassError(input)
}
}
function validarEstado(input){
    if (inputEstado.value === ''){
        setClassError(input)
    }else{
    removeClassError(input)
}
}
function validarCep(input) {
    let inputValue = input.value.replace(/\D/g, '');
    inputValue = inputValue.slice(0, 8);

    if (inputValue.length <= 6 && inputValue.length !== 8) {
        input.value = input.value.replace(/\D/g, '');
        setClassError(input)
    } else {
        removeClassError(input)
        input.value = inputValue.replace(/^(\d{5})(\d{0,3})/, '$1-$2');
    }
}


const btnLimpar = document.getElementById("btnLimpar");
btnLimpar.addEventListener("click", limparFormulario);

function limparFormulario() {
    formulario.reset();
    btnCadastrar.disabled = true;
}

function validarFormulario() {
    if( validarNome(inputNome) 
    && validarEmail(inputEmail)
    && validarTelefone(inputTelefone)
    && validarRua(inputRua)
    && validarNumeroResidencia(inputNumeroResidencia)
    && validarComplemento(inputComplemento)
    && validarCidade(inputCidade)
    && validarEstado(inputEstado)
    && validarCep(inputCep))
    {
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
        return true;
        
    } else {
        console.log("Confira se os campos estão digitados corretamente.");
        return false;
        
    }

}

function estadoBotao() {
    inputNome.value;
    inputEmail.value;
    inputTelefone.value;
    inputRua.value;
    inputNumeroResidencia.value;
    inputComplemento.value;
    inputCidade.value;
    inputEstado.value;
    inputCep.value;
    if( inputNome 
    && inputEmail
    && inputTelefone
    && inputRua
    && inputNumeroResidencia
    && inputComplemento
    && inputCidade
    && inputEstado
    && inputCep)
    {
        document.getElementById('btnCadastrar').disabled = false;
        
    } else {
        document.getElementById('btnCadastrar').disabled = true;
        
    }

}

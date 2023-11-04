const body = document.querySelector('body'),
    sidebar = body.querySelector('nav'),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text");

    
//MASCARAS DE FORMATAÇÃO INPUTS
function applyPhoneMask(event) {
    let input = event.target;
    let value = input.value;
    if (!value) return "";
    value = value.replace(/\D/g,'');
    value = value.replace(/(\d{2})(\d)/,"($1) $2");
    value = value.replace(/(\d)(\d{4})$/,"$1-$2");
    input.value = value;
}

const applyZipCodeMask = (event) => {
    let input = event.target;
    let value = input.value;
    
    if (!value) return "";
    
    value = value.replace(/\D/g,'');
    value = value.replace(/(\d{5})(\d)/,'$1-$2');
    
    input.value = value;
}

function applyCNPJMask(event) {
    let input = event.target;
    let value = input.value;
    value = value.replace(/\D/g,"");                           
    value = value.replace(/^(\d{2})(\d)/,"$1.$2");              
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3"); 
    value = value.replace(/\.(\d{3})(\d)/,".$1/$2");          
    value = value.replace(/(\d{4})(\d)/,"$1-$2");             
    input.value = value;
}

document.addEventListener('DOMContentLoaded', function() {
    const cepInput = document.getElementById("inputCep");

    cepInput.addEventListener('blur', function() {
        const cepValue = cepInput.value.replace(/[^0-9]+/, '');
        if (cepValue.length === 8) {
            fetchCEP(cepValue);
        }
    });
});

function fetchCEP(cepValue) {
    const url = `https://viacep.com.br/ws/${cepValue}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(json => {
            if (json.logradouro) {
                document.getElementById('inputLog').value = json.logradouro;
                document.getElementById('inputBairro').value = json.bairro;
                document.getElementById('inputCit').value = json.localidade;
                document.getElementById('inputUf').value = json.uf;
            }
        });
}

function checkTelefone(event)
{
    var value = event.target.value;

    var phoneRegex = /^\d{11,}$/;

    if (phoneRegex.test(value)) {
        applyPhoneMask(event);
    }
}



//ANIMAÇÕES
toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
})

function exibeSenha(inputId) {
    var eyeIcon = document.querySelector('#' + inputId + ' + .input-group-append .toggle-password');
    var passwordInput = document.getElementById(inputId);

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.querySelector('i').classList.remove('bi-eye-slash');
        eyeIcon.querySelector('i').classList.add('bi-eye');
    } else {
        passwordInput.type = 'password';
        eyeIcon.querySelector('i').classList.remove('bi-eye');
        eyeIcon.querySelector('i').classList.add('bi-eye-slash');
    }
}






function cadastrarEstabelecimento(){
    event.preventDefault();   
    window.location.href = "aguardandoEmail.html";
}

//LOGINS E RECUPERAÇÃO DE SENHA
function meuLogin()
{
    const userName = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const dados = {
        userName: userName,
        password: password
    };

    fetch('http://aguiadelivery.com.br:6060/api/Autoriza/Login', { 
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },        
        body: JSON.stringify(dados)   

    })
    .then(response => {
        if (!response.ok) {
            document.getElementById('errorUsuario').style.display = 'block';
        }
        return response.json();
    })
    .then(result => {
        localStorage.setItem("token", result.token);
        localStorage.setItem("time", result.expiration);
        alert(localStorage.getItem("token")); 

        if (new Date(localStorage.getItem("time")) > new Date()) { //sem verificar se é estabelecimento ou consumidor
            window.location.href = "dashboard.html";
        }
    })
    .catch(error => console.error('Erro:', error));     
    event.preventDefault();
}    

function recuperarSenha()
{
    document.getElementById('naoTelefone').style.display = 'none';
    var telefone = document.getElementById('username').value;
  
    var regex = /^\([1-9]{2}\) 9[0-9]{4}-[0-9]{4}$/;

    let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(regexEmail.test(telefone))
    {
        event.preventDefault();   
        document.getElementById('mudarSenha').style.display = 'block';
    }
    else{
        if (regex.test(telefone)) {
            event.preventDefault();   
            document.getElementById('mudarSenha').style.display = 'block';
    
            //PUT no cadastro do cliente e encaminha para o cardapio
        } else {
            event.preventDefault();   
            document.getElementById('naoTelefone').style.display = 'block';
        }
    }   
   
}



//FETCH ESTABELECIMENTO
function registraEstabelecimento()
{
       var nome = document.getElementById("inputNome").value;       
       var cnpj_Cpf = document.getElementById("inputCnpj").value;
       var cnpj_Cpf = cnpj_Cpf.replace(/\D/g,'');  
       var ie_Rg = ""; //nao tem no formulario        
       var nomeFantasia = ""; //nao tem no formulario       
       var telefone = document.getElementById("inputTelefone").value;   
       telefone = telefone.replace(/\D/g,'');
       var celular = document.getElementById("inputTelefone").value;    
       celular = celular.replace(/\D/g,'');
       var emailPrincipal = document.getElementById("inputEmail").value;      
       var logradouro = "teste";       
       var bairro = "teste";      
       var cep = "teste";                  
       var numero = "";      
       var cidade_IBGE = "111"; //nao tem no formulario       
       var uf = "SP";      
       var senha = document.getElementById("password").value;       
       var confirmaSenha = document.getElementById("inputConfirmar").value;       
       var observacao = "teste"; //nao tem no formulario        
       var logo = ""; //nao tem no formulario       
       var active = true; //nao tem no formulario
   
        const dados = {
            nome: nome, cnpj_Cpf: cnpj_Cpf, ie_Rg: ie_Rg, nomeFantasia: nomeFantasia,
            telefone: telefone, celular: celular, emailPrincipal: emailPrincipal, logradouro: logradouro,
            bairro: bairro, cep: cep, numero: numero, cidade_IBGE: cidade_IBGE, uf: uf, senha:senha, 
            observacao: observacao, logo: logo, active: active
        };

        if(senha == confirmaSenha)
        {
            fetch('http://aguiadelivery.com.br:6060/api/Estabelecimento', {             
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',               
                },
                body: JSON.stringify(dados)           
            })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));     
            event.preventDefault();   
        }
        else{        
              alert("Caiu no else");            
        }        
}

function buscarEstabelecimentoId(id)
{
    fetch(`http://aguiadelivery.com.br:6060/api/Estabelecimento/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Estabelecimento ID:', data);
    })
    .catch(error => console.error('Erro ao buscar por ID:', error));

    event.preventDefault();
}

function removerEstabelecimento(id)
{
    fetch(`http://aguiadelivery.com.br:6060/api/Estabelecimento/${id}`, {
        method: 'DELETE'
    })
    .then(data => {
        console.log('Estabelecimento ID:', data);
    })
    .catch(error => console.error('Erro ao deletar o ID:', error));

    event.preventDefault();
}


//FETCH CLIENTE
function registraCliente()
{
        var nome = document.getElementById('inputNome').value;      
        var telefone = document.getElementById('inputContato').value;
        telefone = telefone.replace(/\D/g,'');       
        var active = true;      
        var logradouro = document.getElementById('inputLog').value;        
        var bairro = document.getElementById('inputBairro').value;      
        var cep = document.getElementById('inputCep').value;
        cep = cep.replace(/\D/g,'');    
        var numero = document.getElementById('inputNum').value;       
        var cidade_IBGE = "111";        
        var uf = document.getElementById('inputUf').value;          
        var senha = document.getElementById('password').value;        
        var confirmaSenha = document.getElementById('inputConfirmar').value;

        const dados = {
            nome: nome, telefone: telefone, active: active, logradouro: logradouro,
            bairro: bairro, cep: cep, numero: numero, cidade_IBGE: cidade_IBGE, uf: uf,
            senha:senha
        };       
        
        if(senha == confirmaSenha)
        {
            fetch('http://aguiadelivery.com.br:6060/api/Consumidor', {             
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',               
                },
                body: JSON.stringify(dados)           
            })
            .then(response => response.text())
            .then(result => {window.location.href = 'login.html';})
            .catch(error => console.error('Erro:', error));        
            event.preventDefault();
     
        }
        else{          
            event.preventDefault();   
            document.getElementById('senhaDiferenteAlert').style.display = 'block';
        }        
}


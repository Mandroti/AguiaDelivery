const body = document.querySelector('body'),
    sidebar = body.querySelector('nav'),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text");

    
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
                //document.querySelector('input[name=estado]').value = json.uf;
            }
        });
}

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

function meuLogin()
{
    //UM VAI PARA O CARDAPIO E OUTRO PARA A DASHBOARD
    const contato = document.getElementById('username').value;
    const senha = document.getElementById('password').value;
    
    const url = `https://localhost:7221/api/Usuario/Login?contato=${contato}&senha=${senha}`;
    const dados = {
        contato: contato,
        senha: senha
    };

    fetch(url, { 
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },        
    })
    .then(response => {
        if (!response.ok) {
          window.location.href = "registraCliente.html"
        }
        else
            window.location.href = "dashboard.html"
        return response.json();})
    .then(data =>{
     })
    .catch(error => console.error('Erro:', error));
    event.preventDefault();
}    

function registraCliente()
{
        var nome = document.getElementById('inputNome').value;
        var senha = document.getElementById('password').value;
        var confirmaSenha = document.getElementById('inputConfirmar').value;
        var contato = document.getElementById('inputContato').value;
        var cep = document.getElementById('inputCep').value;
        var logradouro = document.getElementById('inputLog').value;
        var bairro = document.getElementById('inputBairro').value;
        var numero = document.getElementById('inputNum').value;
        numero = parseInt(numero);
        var cidade = document.getElementById('inputCit').value;  

        const dados = {
            Nome: nome, Senha: senha, ConfirmaSenha: confirmaSenha,
            Contato: contato, CEP: cep, Logradouro: logradouro,
            Bairro: bairro, Numero: numero, Cidade: cidade
        };       

        if(senha == confirmaSenha)
        {
            //cadastrarEstabelecimento();

            fetch('https://localhost:7221/api/Usuario/Gravar', {             
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',               
                },
                body: JSON.stringify(dados)           
            })
            .then(response => response.json())
            .then(data =>{
                if (!response.ok) {
                    window.location.href = "registraCliente.html"
                  }
                  else
                      window.location.href = "login.html"
                  return response.json();})
            .catch(error => console.error('Erro:', error));        
            event.preventDefault();

            
        }
        else{          
            event.preventDefault();   
            document.getElementById('senhaDiferenteAlert').style.display = 'block';
        }        
}

function checkTelefone(event)
{
    var value = event.target.value;

    var phoneRegex = /^\d{11,}$/;

    if (phoneRegex.test(value)) {
        applyPhoneMask(event);
    }
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

function cadastrarEstabelecimento(){
    event.preventDefault();   
    window.location.href = "aguardandoEmail.html";
}
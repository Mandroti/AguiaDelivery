$(document).ready(function() {
    $('#nav-tab a').on('click', function(e) {
      e.preventDefault()
      $(this).tab('show')
    })
  })

//FETCH -- PERFIL DO ESTABELECIMENTO
function carregarDados(){
    const id = localStorage.getItem("id");
    fetch(apiUrl+`/api/Estabelecimento/${id}`, {             
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }          
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('inputEstabelecimento').value = data.nome;
        document.getElementById('inputFantasia').value = data.nomeFantasia;
        document.getElementById('inputCnpj').value = data.cnpj_Cpf;
        document.getElementById('inputEmail').value = data.emailPrincipal;
        document.getElementById('inputTelefone').value = data.telefone;
        document.getElementById('inputCelular').value = data.celular;
        // (input type="file")
        // document.getElementById('inputImagem').value = data.logo;
        document.getElementById('inputLog').value = data.logradouro;
        document.getElementById('inputBairro').value = data.bairro;
        document.getElementById('inputCep').value = data.cep;
        document.getElementById('inputNumero').value = data.numero;
        document.getElementById('inputEstado').value = data.uf;
        document.getElementById('inputCidade').value = data.cidade_IBGE;
        // document.getElementById('inputInFunc').value = data.nome;
        // document.getElementById('inputFiFunc').value = data.nome;
        document.getElementById('inputDesc').value = data.observacao;    
    })
    .catch(error => console.error('Erro:', error));
}

var imageBase64 = "";

function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
   
      imageBase64 = reader.result;
      
    }
    reader.readAsDataURL(file);
}

function gravarAlteracoes(){
    const id2 = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    var id = id2;
    var nome = document.getElementById("inputEstabelecimento").value;       
    var cnpj_Cpf = document.getElementById("inputCnpj").value;
    var cnpj_Cpf = cnpj_Cpf.replace(/\D/g,'');  
    var ie_Rg = ""; //nao tem no formulario        
    var nomeFantasia = document.getElementById('inputFantasia').value; 
    var telefone = document.getElementById("inputTelefone").value;   
    telefone = telefone.replace(/\D/g,'');
    var celular = document.getElementById("inputCelular").value;    
    celular = celular.replace(/\D/g,'');
    var emailPrincipal = document.getElementById("inputEmail").value;      
    var logradouro = document.getElementById('inputLog').value;       
    var bairro = document.getElementById('inputBairro').value;      
    var cep = document.getElementById('inputCep').value;   
    cep = cep.replace(/\D/g,'');               
    var numero = document.getElementById('inputNumero').value;
    numero = numero.replace(/\D/g,'');     
    var cidade_IBGE = document.getElementById('inputCidade').value;       
    var uf = document.getElementById('inputEstado').value;                 
    var observacao = document.getElementById('inputDesc').value;        
    var logo = imageBase64;  
    var active = true; 
    
    alert(logo)

     const dados = {
         estabelecimentoId: id, nome: nome, cnpj_Cpf: cnpj_Cpf, ie_Rg: ie_Rg, nomeFantasia: nomeFantasia,
         telefone: telefone, celular: celular, emailPrincipal: emailPrincipal, logradouro: logradouro,
         bairro: bairro, cep: cep, numero: numero, cidade_IBGE: cidade_IBGE, uf: uf, 
         observacao: observacao, logo: logo, active: active
     };


    fetch(apiUrl+`/api/Estabelecimento/${id2}`, {             
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`                     
        },
        body: JSON.stringify(dados)           
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao atualizar estabelecimento');
        }
        return response.json();
      })
      .then(data => {
        console.log('Estabelecimento atualizado com sucesso:', data);
      })
      .catch(error => console.error('Erro:', error));
      event.preventDefault();   
}

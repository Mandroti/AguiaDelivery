//FETCH -- PERFIL DO ESTABELECIMENTO
function carregarDados(){
    fetch(`http://aguiadelivery.com.br:6060/api/Estabelecimento/${7}`, {             
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

function gravarAlteracoes(){
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
    var logo = ""; //nao tem no formulario       
    var active = true; //nao tem no formulario
    

     const dados = {
         nome: nome, cnpj_Cpf: cnpj_Cpf, ie_Rg: ie_Rg, nomeFantasia: nomeFantasia,
         telefone: telefone, celular: celular, emailPrincipal: emailPrincipal, logradouro: logradouro,
         bairro: bairro, cep: cep, numero: numero, cidade_IBGE: cidade_IBGE, uf: uf, 
         observacao: observacao, logo: logo, active: active
     };

     var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZXZhbmRyby5wZ0Bob3RtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkVzdGFiZWxlY2ltZW50byIsImV4cCI6MTY5ODg0NTUxMiwiaXNzIjoiQWd1aWFfSXNzdWVyIiwiYXVkIjoiQWd1aWFfQXVkaWVuY2UifQ.XXwnre6XX3qkROEFO6YOwyRv9Cu5KdBwB0JdbObCGuI"

    fetch(`http://aguiadelivery.com.br:6060/api/Estabelecimento/${7}`, {             
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',  
            'Authorization': 'Bearer ' + token,              
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

//FETCH -- CLIENTE
var idCliente = 0;
var clientes = document.getElementById('tabelaClientes');

function buscarCliente()
{
    fetch(`http://aguiadelivery.com.br:6060/api/Consumidor/3`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        var tabela = `<table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Last</th>
                                <th scope="col">Situação</th>
                                <th scope="col">Opções</th>
                            </tr>
                        </thead>
                        <tbody>`;

        for (var i = 0; i < data.length; i++) {
            var card = carregarClientes(data[i]);
            tabela += card;
        }

        tabela += `</tbody></table>`;

        clientes.innerHTML = tabela;
    })
    .catch(error => console.error('Erro:', error));

    event.preventDefault();
}

function carregarClientes(dado){
    var row = `
        <tr>
            <th scope="row">${dado.consumidorId}</th>
            <td>${dado.nome}</td>
            <td>${dado.nome}</td>
            <td>Ativo</td>
            <td>
                <div>
                    <a class="btn table-action" href="#">
                        <i class="action-icon fas fa-edit" onclick="editarCliente(${dado.consumidorId})"></i>
                        <i class="action-icon fas fa-trash" onclick="excluirCliente(${dado.consumidorId})"></i>
                    </a>                         
                </div>
            </td>
        </tr>
    `;

    return row;
}

function editarCliente(id){
    const modal = document.getElementById('modalEditarCliente');
    modal.style.display = 'block';
    carregarDadosCliente(id);
    event.preventDefault();

}

function fecharModalCliente(){
    document.getElementById('modalEditarCliente').style.display = 'none';
}

function carregarDadosCliente(id){
    fetch(`http://aguiadelivery.com.br:6060/api/Consumidor/${id}`, {             
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }          
    })
    .then(response => response.json())
    .then(data => {
        idCliente = data.consumidorId;
        document.getElementById('inputNome').value = data.nome; 
        document.getElementById('inputContato').value = data.telefone;
        document.getElementById('inputCep').value = data.cep;
        document.getElementById('inputLog').value = data.logradouro;
        document.getElementById('inputBairro').value = data.bairro;
        document.getElementById('inputNum').value = data.numero;
        document.getElementById('inputCit').value = data.cidade_IBGE; 
    })
    .catch(error => console.error('Erro:', error));

    event.preventDefault();
}

function registraCliente(){
    var nome = document.getElementById('inputNome').value; 
    var telefone = document.getElementById('inputContato').value;
    telefone = telefone.replace(/\D/g,'');       
    var cep = document.getElementById('inputCep').value;
    cep = cep.replace(/\D/g,'');       
    var logradouro = document.getElementById('inputLog').value;      
    var bairro = document.getElementById('inputBairro').value;      
    var numero = document.getElementById('inputNum').value;      
    var cidade_IBGE = document.getElementById('inputCit').value;   
    var uf = 'SP';     


    const dados = {
        consumidorId: idCliente, nome: nome, telefone: telefone, logradouro: logradouro,
        bairro: bairro, cep: cep, numero: numero, cidade_IBGE: cidade_IBGE, uf: uf
    };       

    fetch('http://aguiadelivery.com.br:6060/api/Consumidor/'+idCliente, {             
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',               
        },
        body: JSON.stringify(dados)           
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao atualizar usuário');
        }
        else{
            window.location.href = "buscarCliente.html"
        }
        return response.text();
      })
      .then(data => {
        console.log('Usuário atualizado com sucesso:', data);
      })
      .catch(error => console.error('Erro:', error));
      event.preventDefault();   
}

function excluirCliente(id) {
   
    const modal = document.getElementById('modalExcluirCliente');
    modal.style.display = 'block';

    idCliente = id;

    const fecharModal = document.getElementById('fecharModalCliente');
    fecharModal.addEventListener('click', function(){
        modal.style.display = 'none';
    });

    const fechar = document.getElementById('fecharModalClientee');
    fechar.addEventListener('click', function(){
        modal.style.display = 'none';
    });
}

function removerCliente() {

    fetch('http://aguiadelivery.com.br:6060/api/Consumidor/'+idCliente, {
        method: 'DELETE'
    })
    .then(data => {
        console.log('Consumidor ID:', data);
    })
    .catch(error => console.error('Erro ao deletar o ID:', error));

    event.preventDefault();
}





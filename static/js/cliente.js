//FETCH -- CLIENTE
var idCliente = 0;

function buscarCliente()
{
    const token = localStorage.getItem("token");
    fetch(apiUrl+'/api/Consumidor/0/a', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  
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

        document.getElementById('tabelaClientes').innerHTML = tabela;
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
                        <i class="action-icon fas fa-edit" onclick="editarCliente(${dado.consumidorId})" style="margin-right: 12px;></i>
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
    document.getElementById('modalAdicionarCliente').style.display = 'none';
}

function carregarDadosCliente(id){    
    const token = localStorage.getItem("token");

    fetch(apiUrl+`/api/Consumidor/${id}`, {             
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  
        }          
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
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
    const token = localStorage.getItem("token");
    
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

    fetch(apiUrl+'/api/Consumidor/'+idCliente, {             
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',    
            'Authorization': `Bearer ${token}`             
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

    const token = localStorage.getItem("token");
    fetch(apiUrl+'/api/Consumidor/'+idCliente, {
        method: 'DELETE',
        headers:{             
            'Authorization': `Bearer ${token}`             
        },
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao excluir Cliente');
        }
        else{
            window.location.href = "buscarCliente.html"
        }
        return response.text();
    })
    .then(data => {
        console.log('Consumidor ID:', data);
    })
    .catch(error => console.error('Erro ao deletar o ID:', error));

    event.preventDefault();
}

function adicionarCliente(){
    const modal = document.getElementById('modalAdicionarCliente');
    modal.style.display = 'block';
    event.preventDefault();
}

function criarCliente(){
    const token = localStorage.getItem("token");
    var nome = document.getElementById('insertNome').value; 
    var telefone = document.getElementById('insertContato').value;
    telefone = telefone.replace(/\D/g,'');      
    telefone = telefone.replace(/\D/g,'');    
    var cep = document.getElementById('insertCep').value;
    cep = cep.replace(/\D/g,'');       
    var logradouro = document.getElementById('insertLog').value;      
    var bairro = document.getElementById('insertBairro').value;      
    var numero = document.getElementById('insertNum').value;      
    var cidade_IBGE = "111";   
    var uf = 'SP';     
    var senha = "123";

    const dados = {
        nome: nome, telefone: telefone, logradouro: logradouro,
        bairro: bairro, cep: cep, numero: numero, cidade_IBGE: cidade_IBGE, uf: uf, senha: senha
    };       

    fetch(apiUrl+'/api/Consumidor/',{             
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`                         
        },
        body: JSON.stringify(dados)           
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao cadastrar usuário');
        }
        else{
            window.location.href = "buscarCliente.html"
        }
        return response.text();
      })
      .then(data => {
        console.log('Usuário cadastrado com sucesso:', data);
      })
      .catch(error => console.error('Erro:', error));
      event.preventDefault();  
}



// //FETCH -- ESTABELECIMENTO
var idCliente = 0;

function buscarEstabelecimento()
{
    const token = localStorage.getItem("token");
    fetch(apiUrl+'/api/Estabelecimento', {
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
                                <th scope="col">Logo</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Telefone</th>
                                <th scope="col">Situaçãao</th>
                                <th scope="col">Excluir</th>
                            </tr>
                        </thead>
                        <tbody>`;

        for (var i = 0; i < data.length; i++) {
            var card = carregarEstabelecimentos(data[i]);
            tabela += card;
        }

        tabela += `</tbody></table>`;

        document.getElementById('tabelaEstabelecimento').innerHTML = tabela;
    })
    .catch(error => console.error('Erro:', error));

    event.preventDefault();
}

function carregarEstabelecimentos(dado){
    var row = `
        <tr>
            <th scope="row">${dado.estabelecimentoId}</th>
            <td>${dado.nome}</td>
            <td>${dado.telefone}</td>
            <td>${dado.active}</td>
            <td>
                <div>
                    <a class="btn table-action" href="#">
                        <i class="action-icon fas fa-trash" onclick="excluirEstabelecimento(${dado.estabelecimentoId})"></i>
                    </a>                         
                </div>
            </td>
        </tr>
    `;

    return row;
}

function modalEditarEstabelecimento(id){
    const modal = document.getElementById('modalEditarEstabelecimento');
    modal.style.display = 'block';
    carregarDadosEstabelecimento(id);
    event.preventDefault();

}

function fecharModalEstabelecimento(){
    document.getElementById('modalEditarEstabelecimento').style.display = 'none';
    document.getElementById('modalAdicionarEstabelecimento').style.display = 'none';
}

// function carregarDadosEstabelecimento(id){    
//     const token = localStorage.getItem("token");

//     fetch(apiUrl+`/api/Consumidor/${id}`, {             
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`  
//         }          
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data)
//         idCliente = data.consumidorId;
//         document.getElementById('inputNome').value = data.nome; 
//         document.getElementById('inputContato').value = data.telefone;
//         document.getElementById('inputCep').value = data.cep;
//         document.getElementById('inputLog').value = data.logradouro;
//         document.getElementById('inputBairro').value = data.bairro;
//         document.getElementById('inputNum').value = data.numero;
//         document.getElementById('inputCit').value = data.cidade_IBGE; 
//     })
//     .catch(error => console.error('Erro:', error));

//     event.preventDefault();
// }

// function registraEstabelecimento(){
//     const token = localStorage.getItem("token");
    
//     var nome = document.getElementById('inputNome').value; 
//     var telefone = document.getElementById('inputContato').value;
//     telefone = telefone.replace(/\D/g,'');       
//     var cep = document.getElementById('inputCep').value;
//     cep = cep.replace(/\D/g,'');       
//     var logradouro = document.getElementById('inputLog').value;      
//     var bairro = document.getElementById('inputBairro').value;      
//     var numero = document.getElementById('inputNum').value;      
//     var cidade_IBGE = document.getElementById('inputCit').value;   
//     var uf = 'SP';     


//     const dados = {
//         consumidorId: idCliente, nome: nome, telefone: telefone, logradouro: logradouro,
//         bairro: bairro, cep: cep, numero: numero, cidade_IBGE: cidade_IBGE, uf: uf
//     };       

//     fetch(apiUrl+'/api/Consumidor/'+idCliente, {             
//         method: 'PUT',
//         headers:{
//             'Content-Type': 'application/json',    
//             'Authorization': `Bearer ${token}`             
//         },
//         body: JSON.stringify(dados)           
//     })
//     .then(response => {
//         if (!response.ok) {
//           throw new Error('Erro ao atualizar usuário');
//         }
//         else{
//             window.location.href = "buscarCliente.html"
//         }
//         return response.text();
//       })
//       .then(data => {
//         console.log('Usuário atualizado com sucesso:', data);
//       })
//       .catch(error => console.error('Erro:', error));
//       event.preventDefault();   
// }
 
function excluirEstabelecimento(id) {
   
    const modal = document.getElementById('modalExcluirEstabelecimento');
    modal.style.display = 'block';

    idCliente = id;

    const fecharModal = document.getElementById('fecharModalEstabelecimento');
    fecharModal.addEventListener('click', function(){
        modal.style.display = 'none';
    });

    const fechar = document.getElementById('fecharModalEstabelecimentoo');
    fechar.addEventListener('click', function(){
        modal.style.display = 'none';
    });
}

function removerEstabelecimento() {

    const token = localStorage.getItem("token");
    alert(idCliente)
    fetch('', {
        method: 'DELETE',
        headers:{             
            'Authorization': `Bearer ${token}`             
        },
    })
    .then(response => {
        console.log(response)
        if (!response.ok) {
          throw new Error('Erro ao excluir Estabelecimento');
        }
        else{
            window.location.href = "buscarEstabelecimento.html"
        }
        return response.text();
    })
    .then(data => {
        console.log('Estabelecimento ID:', data);
    })
    .catch(error => console.error('Erro ao deletar o ID:', error));

    event.preventDefault();
}

function adicionarEstabelecimento(){
    const modal = document.getElementById('modalAdicionarEstabelecimento');
    modal.style.display = 'block';
    event.preventDefault();
}

// function criarCliente(){
//     const token = localStorage.getItem("token");
//     var nome = document.getElementById('insertNome').value; 
//     var telefone = document.getElementById('insertContato').value;
//     telefone = telefone.replace(/\D/g,'');      
//     telefone = telefone.replace(/\D/g,'');    
//     var cep = document.getElementById('insertCep').value;
//     cep = cep.replace(/\D/g,'');       
//     var logradouro = document.getElementById('insertLog').value;      
//     var bairro = document.getElementById('insertBairro').value;      
//     var numero = document.getElementById('insertNum').value;      
//     var cidade_IBGE = "111";   
//     var uf = 'SP';     
//     var senha = "123";

//     const dados = {
//         nome: nome, telefone: telefone, logradouro: logradouro,
//         bairro: bairro, cep: cep, numero: numero, cidade_IBGE: cidade_IBGE, uf: uf, senha: senha
//     };       

//     fetch(apiUrl+'/api/Consumidor/',{             
//         method: 'POST',
//         headers:{
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`                         
//         },
//         body: JSON.stringify(dados)           
//     })
//     .then(response => {
//         if (!response.ok) {
//           throw new Error('Erro ao cadastrar usuário');
//         }
//         else{
//             window.location.href = "buscarCliente.html"
//         }
//         return response.text();
//       })
//       .then(data => {
//         console.log('Usuário cadastrado com sucesso:', data);
//       })
//       .catch(error => console.error('Erro:', error));
//       event.preventDefault();  
// }


function buscarEstabelecimentos(){ 
    var nome = document.getElementById('nomeEstabelecimento').value;

    const token = localStorage.getItem("token");
    fetch(apiUrl+'/api/Estabelecimento/PorNome?Nome=' + nome, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
      
        tabela = `<table class="table table-striped">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Telefone</th>
                            <th scope="col">Situação</th>
                            <th scope="col">Excluir</th>
                            </tr>
                        </thead>
                        <tbody>`;

        for (var i = 0; i < data.length; i++) {
            var card = carregarEstabelecimentos(data[i]);
            tabela += card;
        }

        tabela += `</tbody></table>`;
        document.getElementById('tabelaEstabelecimento').innerHTML = tabela;
    })
    .catch(error => console.error('Erro:', error));

    event.preventDefault();
}
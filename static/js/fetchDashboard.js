$(document).ready(function() {
    $('#nav-tab a').on('click', function(e) {
      e.preventDefault()
      $(this).tab('show')
    })
  })
  
//FETCH -- PRODUTO
function adicionarProduto(){
    const modal = document.getElementById('modalAdicionarProduto');
    modal.style.display = 'block';
    event.preventDefault();
}

function fecharModalProduto(){
    const modal = document.getElementById('modalAdicionarProduto');
    modal.style.display = 'none';
}

function excluirProduto() {
    const modal = document.getElementById('modalExcluirProduto');
    modal.style.display = 'block';

    // Adicionando uma função para fechar o modal
    const fecharModal = document.getElementById('fecharModalProduto');
    fecharModal.addEventListener('click', function(){
        modal.style.display = 'none';
    });

    const fechar = document.getElementById('fecharModalProdutoo');
    fechar.addEventListener('click', function(){
        modal.style.display = 'none';
    });
}

function editarProduto(){
    const modal = document.getElementById('modalEditarProduto');
    modal.style.display = 'block';
    event.preventDefault();

    // Adicionando uma função para fechar o modal
    const fecharModal = document.getElementById('fecharModalEditarProduto');
    fecharModal.addEventListener('click', function(){
        modal.style.display = 'none';
    });

}

function opcaoSelecionada(nome) {
    document.getElementById('opcao').value = nome;
}

function popularCategorias(categorias) {
    var selectCategoria = document.getElementById('inputCategoria');

    selectCategoria.innerHTML = '`<option id="opcao">Selecione uma Opção</option>`';

    categorias.forEach(function (categoria) {
        selectCategoria.innerHTML += `<option value="${categoria.id}" onclick="opcaoSelecionada('${categoria.nome}')">${categoria.nome}</option>`;
    });
}

function fetchCategoria() {
    var id = localStorage.getItem("id");
    var token = localStorage.getItem("token");
    

    fetch(apiUrl + `/api/Categoria/Estabelecimento/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => popularCategorias(data))
        .catch(error => console.error('Erro:', error));
}


var produtos = document.getElementById('tabelaProdutos');

function buscarProdutos()
{
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    fetch(apiUrl+`/api/Produto/Estabelecimento/${id}`, {
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
                                <th scope="col">Valor</th>
                                <th scope="col">Situação</th>
                                <th scope="col">Opções</th>
                            </tr>
                        </thead>
                        <tbody>`;

        for (var i = 0; i < data.length; i++) {
            var card = carregarProdutos(data[i]);
            tabela += card;
        }

        tabela += `</tbody></table>`;

        produtos.innerHTML = tabela;
    })
    .catch(error => console.error('Erro:', error));

    event.preventDefault();
}

function carregarProdutos(dado){
    var row = `
        <tr>
            <th scope="row">${dado.produtoId}</th>
            <td>${dado.nome}</td>
            <td>${dado.preco}</td>
            <td>Ativo</td>
            <td>
                <div>
                    <a class="btn table-action" href="#">
                        <i class="action-icon fas fa-edit" onclick="editarProduto(${dado.produtoId})"></i>
                        <i class="action-icon fas fa-trash" onclick="excluirProduto(${dado.produtoId})"></i>
                    </a>                         
                </div>
            </td>
        </tr>
    `;

    return row;
}

// function criarProduto(){

//     const token = localStorage.getItem("token");

//     var nome = document.getElementById('inputNome').value; 
//     var valor = document.getElementById('inputValor').value;
//     var categoria = document.getElementById('inputNome').value; 
//     var descricao = document.getElementById('inputValor').value;
//     var limite = document.getElementById('inputNome').value; 
//     var observacao = document.getElementById('inputValor').value;
//     var imagem = document.getElementById('inputNome').value; 
//     var complemento = document.getElementById('inputValor').value;
//     var variacao = document.getElementById('inputNome').value; 


//     const dados = {
//         nome: nome, precoVenda: valor
//     };       

//     fetch(apiUrl+'/api/Complemento/',{             
//         method: 'POST',
//         headers:{
//             'Content-Type': 'application/json',    
//             'Authorization': `Bearer ${token}`             
//         },
//         body: JSON.stringify(dados)           
//     })
//     .then(response => {
//         if (!response.ok) {
//           throw new Error('Erro ao cadastrar complemento');
//         }
//         else{
//             window.location.href = "buscarComplemento.html"
//         }
//         return response.text();
//       })
//       .then(data => {
//         console.log('Complemento cadastrado com sucesso:', data);
//       })
//       .catch(error => console.error('Erro:', error));
//       event.preventDefault();  
// }




//LOGIN -- TOKEN
function meuLogin()
{
    const userName = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const dados = {
        userName: userName,
        password: password
    };

    fetch(apiUrl+'/api/Autoriza/Estabelecimento', { 
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
        localStorage.setItem("id",result.id);

        if (new Date(localStorage.getItem("time")) > new Date()) { //sem verificar se é estabelecimento ou consumidor
            window.location.href = "dashboard.html";
        }
    })
    .catch(error => console.error('Erro:', error));     
    event.preventDefault();
}    

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
    var logo = "";  
    var active = true; 
    

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


//FETCH -- CATEGORIA
var idCategoria = 0;

function buscarCat(){
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    fetch(apiUrl+`/api/Categoria/Estabelecimento/${id}`, { 
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
                                <th scope="col">Opções</th>
                            </tr>
                        </thead>
                        <tbody>`;

        for (var i = 0; i < data.length; i++) {
            var card = carregarCategoria(data[i]);
            tabela += card;
        }

        tabela += `</tbody></table>`;
        document.getElementById('tabelaCategoria').innerHTML = tabela;
    })
    .catch(error => console.error('Erro:', error));

    event.preventDefault();
}

function carregarCategoria(data){
    var row = `
        <tr>
            <th scope="row">${data.categoriaId}</th>
            <td>${data.nome}</td>
            <td>
                <div>
                    <a class="btn table-action" href="#">
                        <i class="action-icon fas fa-edit" onclick="editarCategoria(${data.categoriaId})"></i>
                        <i class="action-icon fas fa-trash" onclick="excluirCategoria(${data.categoriaId})"></i>
                    </a>                         
                </div>
            </td>
        </tr>
    `;

    return row;
}

function adicionarCategoria(){
    const modal = document.getElementById('modalAdicionarCategoria');
    modal.style.display = 'block';
    event.preventDefault();
}

function fecharModalCategoria(){
    const modal = document.getElementById('modalAdicionarCategoria');
    modal.style.display = 'none';
}

function criarCategoria(){

    const token = localStorage.getItem("token");

    var nome = document.getElementById('insertNome').value; 
    var imagem = document.getElementById('insertImagem').value;

    const dados = {
        nome: nome, imagem: imagem
    };       

    fetch(apiUrl+'/api/Categoria/',{             
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',    
            'Authorization': `Bearer ${token}`             
        },
        body: JSON.stringify(dados)           
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao cadastrar categoria');
        }
        else{
            window.location.href = "buscarCategoria.html"
        }
        return response.text();
      })
      .then(data => {
        console.log('Categoria cadastrada com sucesso:', data);
      })
      .catch(error => console.error('Erro:', error));
      event.preventDefault();  
}

function excluirCategoria(id) {
    const modal = document.getElementById('modalExcluirCategoria');
    modal.style.display = 'block';


    idCategoria = id;
    alert(idCategoria)

    const fecharModal = document.getElementById('fecharModalCategoria');
    fecharModal.addEventListener('click', function(){
        modal.style.display = 'none';
    });

    const fechar = document.getElementById('fecharModalCategoriaa');
    fechar.addEventListener('click', function(){
        modal.style.display = 'none';
    });
}

function removerCategoria() {
    const token = localStorage.getItem("token");
    fetch(apiUrl+'/api/Categoria/'+idCategoria, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    })
    .then(response => {
            if (!response.ok) {
              throw new Error('Erro ao excluir Categoria');
            }
            else{
                window.location.href = "buscarCategoria.html"
            }
            return response.text();
    })
    .then(data => {
        console.log('Categoria ID:', data);
    })
    .catch(error => console.error('Erro ao deletar o ID:', error));

    event.preventDefault();
}

function editarCategoria(id){
    const modal = document.getElementById('modalEditarCategoria');
    modal.style.display = 'block';
    event.preventDefault();

    carregarDadosCategoria(id);
    idCategoria = id;
    

    const fecharModal = document.getElementById('fecharModalEditarCategoria');
    fecharModal.addEventListener('click', function(){
        modal.style.display = 'none';
    });
}

function carregarDadosCategoria(id){
    fetch(apiUrl+`/api/Categoria/${id}`, {             
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }          
    })
    .then(response => response.json())
    .then(data => {
        idCliente = data.consumidorId;
        document.getElementById('updateNome').value = data.nome; 
    })
    .catch(error => console.error('Erro:', error));

    event.preventDefault();
}

function registraCategoria(){

    const token = localStorage.getItem("token");
    
    var nome = document.getElementById('updateNome').value; 
    var imagem = document.getElementById('updateImagem').value;

    const dados = {
        categoriaId: idCategoria, nome: nome, imagem: imagem
    };       

    fetch(apiUrl+'/api/Categoria/'+idCategoria,{             
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',    
            'Authorization': `Bearer ${token}`             
        },
        body: JSON.stringify(dados)           
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao editar categoria');
        }
        else{
            window.location.href = "buscarCategoria.html"
        }
        return response.text();
      })
      .then(data => {
        console.log('Categoria editada com sucesso:', data);
      })
      .catch(error => console.error('Erro:', error));
      event.preventDefault();  
}



//FETCH -- COMPLEMENTOS
var idComplemento = 0;

function adicionarComplemento(){
    const modal = document.getElementById('modalAdicionarComplemento');
    modal.style.display = 'block';
    event.preventDefault();
}

function fecharModalComplemento(){
    document.getElementById('modalAdicionarComplemento').style.display = 'none';
}

function excluirComplemento(id) {
    const modal = document.getElementById('modalExcluirComplemento');
    modal.style.display = 'block';

    idComplemento = id;
    // Adicionando uma função para fechar o modal
    const fecharModal = document.getElementById('fecharModalComplemento');
    fecharModal.addEventListener('click', function(){
        modal.style.display = 'none';
    });

    const fechar = document.getElementById('fecharModalComplementoo');
    fechar.addEventListener('click', function(){
        modal.style.display = 'none';
    });
}

function editarComplemento(id){
    const modal = document.getElementById('modalEditarComplemento');
    modal.style.display = 'block';
    event.preventDefault();

    carregarDadosComplemento(id);
    idComplemento = id;
    // Adicionando uma função para fechar o modal
    const fecharModal = document.getElementById('fecharModalEditarComplemento');
    fecharModal.addEventListener('click', function(){
        modal.style.display = 'none';
    });

}

function buscarComplementos()
{
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    fetch(apiUrl+`/api/Complemento/Estabelecimento/${id}`, { 
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
                                <th scope="col">Preço</th>
                                <th scope="col">Opções</th>
                            </tr>
                        </thead>
                        <tbody>`;

        for (var i = 0; i < data.length; i++) {
            var card = carregarComplemento(data[i]);
            tabela += card;
        }

        tabela += `</tbody></table>`;

        document.getElementById('tabelaComplementos').innerHTML = tabela;
    })
    .catch(error => console.error('Erro:', error));

    event.preventDefault();
}

function carregarComplemento(dado){
    var row = `
        <tr>
            <th scope="row">${dado.complementoId}</th>
            <td>${dado.nome}</td>
            <td>${dado.precoVenda}</td>
            <td>
                <div>
                    <a class="btn table-action" href="#">
                        <i class="action-icon fas fa-edit" onclick="editarComplemento(${dado.complementoId})"></i>
                        <i class="action-icon fas fa-trash" onclick="excluirComplemento(${dado.complementoId})"></i>
                    </a>                         
                </div>
            </td>
        </tr>
    `;

    return row;
}

function criarComplemento(){

    const token = localStorage.getItem("token");

    var nome = document.getElementById('inputNome').value; 
    var valor = document.getElementById('inputValor').value;

    const dados = {
        nome: nome, precoVenda: valor
    };       

    fetch(apiUrl+'/api/Complemento/',{             
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',    
            'Authorization': `Bearer ${token}`             
        },
        body: JSON.stringify(dados)           
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao cadastrar complemento');
        }
        else{
            window.location.href = "buscarComplemento.html"
        }
        return response.text();
      })
      .then(data => {
        console.log('Complemento cadastrado com sucesso:', data);
      })
      .catch(error => console.error('Erro:', error));
      event.preventDefault();  
}

function registraComplemento(){
    const token = localStorage.getItem("token");   

    var nome = document.getElementById('updateNome').value; 
    var valor = document.getElementById('updateValor').value;
    const dados = {
        complementoId: idComplemento, nome: nome, precoVenda: valor
    };       

    fetch(apiUrl+'/api/Complemento/'+idComplemento,{             
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',    
            'Authorization': `Bearer ${token}`             
        },
        body: JSON.stringify(dados)           
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao editar complemento');
        }
        else{
            window.location.href = "buscarComplemento.html"
        }
        return response.text();
      })
      .then(data => {
        console.log('Complemento editado com sucesso:', data);
      })
      .catch(error => console.error('Erro:', error));
      event.preventDefault();  
}

function carregarDadosComplemento(id){
    const token = localStorage.getItem("token");
    fetch(apiUrl+`/api/Complemento/${id}`, {             
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  
        }          
    })
    .then(response => response.json())
    .then(data => {
        idComplemento = data.complementoId;
        document.getElementById('updateNome').value = data.nome; 
        document.getElementById('updateValor').value = data.precoVenda; 
    })
    .catch(error => console.error('Erro:', error));

    event.preventDefault();
}

function removerComplemento() {
    const token = localStorage.getItem("token");
    fetch(apiUrl+'/api/Complemento/'+idComplemento, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    })
    .then(response => {
            if (!response.ok) {
              throw new Error('Erro ao excluir Complemento');
            }
            else{
                window.location.href = "buscarComplemento.html"
            }
            return response.text();
    })
    .then(data => {
        console.log('Complemento ID:', data);
    })
    .catch(error => console.error('Erro ao deletar o ID:', error));

    event.preventDefault();
}

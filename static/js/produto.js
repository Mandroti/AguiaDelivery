//FETCH -- PRODUTO
var imageBase64 = "";

function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      
        
      imageBase64 = reader.result;
      
      
    }
    reader.readAsDataURL(file);
}

function adicionarProduto(){
    const modal = document.getElementById('modalAdicionarProduto');
    modal.style.display = 'block';
    event.preventDefault();
}

function fecharModalProduto(){
    const modal = document.getElementById('modalAdicionarProduto');
    modal.style.display = 'none';
}

function excluirProduto(id) {

    idProduto = id;
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

var idProduto = 0;

function editarProduto(id){
    const modal = document.getElementById('modalEditarProduto');
    modal.style.display = 'block';
    event.preventDefault();

    carregarDadosProduto(id);
    idProduto = id;
   
    
    // Adicionando uma função para fechar o modal
    const fecharModal = document.getElementById('fecharModalEditarProduto');
    fecharModal.addEventListener('click', function(){
        modal.style.display = 'none';
    });

}


function registrarProduto(){
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");


    var nome = document.getElementById('upNome').value; 
    var valor = document.getElementById('upValor').value;
    var categoria = categoriaSelecionada;    
    var descricao = document.getElementById('upDescricao').value;
    var imagem = imageBase64;   


    const dados = {
        produtoId: idProduto, estabelecimentoId:id, nome: nome, descricao: descricao, imagem: imagem, 
        preco: valor, active: true, categoriaId: categoria
    };       

    fetch(apiUrl+'/api/Produto/'+idProduto,{             
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',    
            'Authorization': `Bearer ${token}`             
        },
        body: JSON.stringify(dados)           
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao editar produto');
        }
        else{
            // window.location.href = "buscarProduto.html"
            console.log(response)
        }
        return response.text();
      })
      .then(data => {
        console.log('Produto editado com sucesso:', data);
      })
      .catch(error => console.error('Erro:', error));
      event.preventDefault();  
}

// function fetchCategoriaEditar(){
//     var id = localStorage.getItem("id");
//     var token = localStorage.getItem("token");

//     fetch(`http://localhost:5252/api/Categoria/Estabelecimento/${id}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         var selectCategoria = document.getElementById('upCategoria');

//         selectCategoria.innerHTML = `<option value="0" disabled>Selecione uma Opção</option>`;

//         data.forEach(function (categoria) {
//             var option = document.createElement('option');
//             option.value = categoria.categoriaId;
//             option.textContent = categoria.nome;

           
        
//             selectCategoria.appendChild(option);
//         });

//         var selectCategoria = document.getElementById('inputCategoria');

//         selectCategoria.innerHTML = `<option value="0" disabled>Selecione uma Opção</option>`;

//         data.forEach(function (categoria) {
//             var option = document.createElement('option');
//             option.value = categoria.categoriaId;
//             option.textContent = categoria.nome;

           
        
//             selectCategoria.appendChild(option);
//         });
//     })
//     .catch(error => console.error('Erro:', error));
// }

function voltar(){
    window.location.href = "buscarProduto.html"
}

function carregarDadosProduto(id){
    fetch(apiUrl+`/api/Produto/${id}`, {             
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }          
    })
    .then(response => response.json())
    .then(data => {
        fetchCategoria();
        document.getElementById('upNome').value = data.nome;
        document.getElementById('upValor').value = data.preco;
        //document.getElementById('upCategoria').value = data.categoriaId;
        document.getElementById('upDescricao').value = data.descricao;
        //document.getElementById('upImagem').value = data.imagem; 
    })
    .catch(error => console.error('Erro:', error));

    event.preventDefault();
}


// var categoriaSelecionada = 0;
// function pegarCat(categoria){
//     alert(nome)
//     categoriaSelecionada = categoria;
//     listarComplementos();
// }

// function fetchCategoria() {
//     var id = localStorage.getItem("id");
//     var token = localStorage.getItem("token");
    

//     fetch(`http://localhost:5252/api/Categoria/Estabelecimento/${id}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         }
//     })
//         .then(response => response.json())
//         .then(data => {
//             var selectCategoria = document.getElementById('inputCategoria');

//             selectCategoria.innerHTML = `<option value="0" disabled>Selecione uma Opção</option>`;


//             data.forEach(function (data) {
//                 selectCategoria.innerHTML += `<option value="${data.categoriaId}" onclick="pegarCat(${data.categoriaId})">${data.nome}</option>`;
//             });
          
//         })
//         .catch(error => console.error('Erro:', error));
// }


var categoriaSelecionada = 0; // Objeto vazio para armazenar a categoria selecionada

function pegarCat(categoria){
    categoriaSelecionada = categoria.categoriaId;
 
    // if(categoria.nome === 'Pizza'){
    //     alert('entrou')
    //     carregaTamanho();
    // }
    // document.getElementById('tamanhoProduto').style.display = 'none';
    // listarComplementos();
}

function fetchCategoria() {
    var id = localStorage.getItem("id");
    var token = localStorage.getItem("token");

    fetch(`http://localhost:5252/api/Categoria/Estabelecimento/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        var selectCategoria = document.getElementById('inputCategoria');

        selectCategoria.innerHTML = `<option value="0" disabled>Selecione uma Opção</option>`;

        data.forEach(function (categoria) {
            var option = document.createElement('option');
            option.value = categoria.categoriaId;
            option.textContent = categoria.nome;

            option.addEventListener('click', function() {
                
                pegarCat(categoria);
            });

            selectCategoria.appendChild(option);
        });

        var selectCategoria = document.getElementById('upCategoria');

        selectCategoria.innerHTML = `<option value="0" disabled>Selecione uma Opção</option>`;

        data.forEach(function (categoria) {
            var option = document.createElement('option');
            option.value = categoria.categoriaId;
            option.textContent = categoria.nome;

            option.addEventListener('click', function() {
                
                pegarCat(categoria);
            });

            selectCategoria.appendChild(option);
        });

    })
    .catch(error => console.error('Erro:', error));
}


function buscarProdutos(){
   
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
       // console.log(data)
        var tabela = `<table class="table table-striped">
                        <thead>
                            <tr>                                
                                <th scope="col">Nome Categorias</th>                                
                            </tr>
                        </thead>
                        <tbody>`;

        for (var i = 0; i < data.length; i++) {
            var card = carregarProdutos(data[i]);
            tabela += card;
        }

        tabela += `</tbody></table>`;
        document.getElementById('tabelaProdutos').innerHTML = tabela;
    })
    .catch(error => console.error('Erro:', error));

    event.preventDefault();
}

function carregarProdutos(data){
    var row = `
        <tr>            
            <td onclick="verProdutos(${data.categoriaId})" style="font-size: large">${data.nome}</td>
        </tr>
        <tr>            
            <td>
                </hr>
            </td>
        </tr>
       
    `;
    return row;
}

function verProdutos(categoria){

    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    fetch(apiUrl+`/api/Produto/Estabelecimento/${id}?CategoriaId=${categoria}&Active=true`, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        }
    })
    .then(response => response.json())
    .then(data => {
        //console.log(data)
        var tabela = `<table class="table table-striped">
                        <thead>
                            <tr>    
                                <th scope="col">#</th>                            
                                <th scope="col">Nome</th>
                                <th scope="col">Valor</th>  
                                <th scope="col">Opções</th> 
                                                           
                            </tr>
                        </thead>
                        <tbody>`;

        for (var i = 0; i < data.length; i++) {
            var card = carregarProd(data[i]);
            tabela += card;
        }

        tabela += `</tbody></table>`;
        document.getElementById('tabelaProdutos').innerHTML = tabela;
    })
    .catch(error => console.error('Erro:', error));


    // const fecharCCButton = document.getElementById('fecharCC');

   
    // fecharCCButton.addEventListener('click', function () {
    //     document.getElementById('listarProdutos').style.display = 'none';
    // });

   
    event.preventDefault();
}

function carregarProd(dado){
    var row = `
        <tr>
            <th scope="row">${dado.produtoId}</th>
            <td>${dado.nome}</td>
            <td>${dado.preco}</td>
            <td>
                <div>
                    <a class="btn table-action" href="#">
                        <i class="action-icon fas fa-edit" onclick="editarProduto(${dado.produtoId})" style="margin-right: 12px;"></i>
                        <i class="action-icon fas fa-trash" onclick="excluirProduto(${dado.produtoId})"></i>
                    </a>                         
                </div>
            </td>
            
        </tr>
    `;

    return row;
}

function listarComplementos(){
    const token = localStorage.getItem("token");
    fetch(apiUrl+`/api/Complemento?CategoriaId=${categoriaSelecionada}`, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        }
    })
    .then(response => response.json())
    .then(data => {
       // console.log(data)
        document.getElementById('listaComplementos').innerHTML = '';

        for (let i = 0; i < data.length; i++) {
            
            var tabela = 
                `<div class="col-md-4">
                    <div>
                        <input type="checkbox" id="${data[i].complementoId}">
                        <label for="${data[i].complementoId}">${data[i].nome}</label>
                    </div>                                                      
                </div>`;

            
            document.getElementById('listaComplementos').innerHTML += tabela;
        }
    })
    .catch(error => console.error('Erro:', error));

    event.preventDefault();
}

function criarProduto(){

    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");


    var nome = document.getElementById('inputNome').value; 
    var valor = document.getElementById('inputValor').value;
    var categoria = categoriaSelecionada;
    var descricao = document.getElementById('inputDescricao').value;
    var imagem =imageBase64;  


    const dados = {
        estabelecimentoId: id, nome: nome, descricao: descricao, imagem: imagem, 
        preco: valor, categoriaId: categoria, active: true
    };       

    fetch(apiUrl+'/api/Produto',{             
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',    
            'Authorization': `Bearer ${token}`             
        },
        body: JSON.stringify(dados)           
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao cadastrar produto');
        }
        else{
            window.location.href = "buscarProduto.html"
            console.log(response)
        }
        return response.text();
      })
      .then(data => {
        console.log('Produto cadastrado com sucesso:', data);
      })
      .catch(error => console.error('Erro:', error));
      event.preventDefault();  
}

// function criaVariacao(){
//     const token = localStorage.getItem("token");
   
//     var titulo = document.getElementById('inputTitulo').value; 
//     var categoriaId = categoriaSelecionada;
      
//     const dados = {
//         titulo: titulo, categoriaId: categoriaId, active: true
//     };           

//     fetch(apiUrl+'/api/Variacao/Grupo',{             
//         method: 'POST',
//         headers:{
//             'Content-Type': 'application/json',    
//             'Authorization': `Bearer ${token}`             
//         },
//         body: JSON.stringify(dados)           
//     })
//     .then(response => {
//         console.log(response.status); 
//         if (!response.ok) {
//           throw new Error('Erro ao cadastrar produto');
//         }
//         else{
//             // window.location.href = "buscarProduto.html"
//             console.log(response)
//             adicionaVariacao();
//         }
//         return response.text();
//       })
//       .then(data => {
//         console.log('Produto cadastrado com sucesso:', data);
//       })
//       .catch(error => console.error('Erro:', error));
//       event.preventDefault();  
// }

// function adicionaVariacao() {
//     const token = localStorage.getItem("token");
//     fetch(apiUrl + '/api/Variacao/Grupo?CategoriaId='+categoriaSelecionada, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             document.getElementById('variacao').innerHTML = ''; 

//             for (let i = 0; i < data.length; i++) {
//                 var tabela = `<div class="input-group mb-3"  style="margin-top: 10px;">
//                                 <label type="text" class="form-control">${data[i].nome}</label>
//                                 <div class="input-group-append">
//                                     <button class="btn btn-outline-success" type="button">+</button>
//                                 </div>
//                             </div> `;

//                 document.getElementById('variacao').innerHTML += tabela; 
//             }
//         })
//         .catch(error => console.error('Erro:', error));
// }

// function carregarVariacao(dado){
//     const token = localStorage.getItem("token");
//     fetch(apiUrl+``, { //procura pelo grupo id
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}` 
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data)
//         document.getElementById('variacao').innerHTML = '';

//         for (let i = 0; i < data.length; i++) {           
//             var row = `<table class="table table-striped">                                    
//                             <tbody>
//                                 <tr>
//                                     <th scope="row">${dado.variacaoId}</th>
//                                     <td>${dado.name}</td>                                            
//                                     <td>
//                                         <div>
//                                             <a class="btn table-action" href="#">                                                       
//                                                 <i class="action-icon fas fa-trash"></i>
//                                             </a>                         
//                                         </div>
//                                     </td>
//                                 </tr>                        
//                             </tbody>
//                         </table>`;
//             return row;
//         }
//     })
//     .catch(error => console.error('Erro:', error));

//     event.preventDefault();
// }

function buscarCategoria(){ 
    var nome = document.getElementById('nomeCategoria').value;
    const token = localStorage.getItem("token");
    fetch(apiUrl+'/api/Categoria/PorNome?Nome='+ nome, { 
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
                                
                                <th scope="col">Nome</th>                                
                                
                            </tr>
                        </thead>
                        <tbody>`;

        for (var i = 0; i < data.length; i++) {
            var card = carregarCategoria(data[i]);
            tabela += card;
        }

        tabela += `</tbody></table>`;
        document.getElementById('tabelaProdutos').innerHTML = tabela;
    })
    .catch(error => console.error('Erro:', error));

    event.preventDefault();
}

function carregarCategoria(data){
    var row = `
        <tr>           
            <td onclick="verProdutos(${data.categoriaId})">${data.nome}</td>            
        </tr>
    `;

    return row;
}

function carregaTamanho() {
    const token = localStorage.getItem("token");
   
    fetch(apiUrl + '/api/Variacao/Grupo?CategoriaId=' + categoriaSelecionada, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);

        fetch(apiUrl+'/api/Variacao?GrupoId=68', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(dado => {
            console.log(dado);

            document.getElementById('tamanhoProduto').style.display = 'block';

            var tabela = '<div class="row">';
            for (let i = 0; i < dado.length; i++) {
                tabela +=
                    `<div class="col-md-4">
                        <label for="${dado[i].variacaoId}" class="form-label">${dado[i].name}</label>
                        <input type="text" class="form-control" id="${dado[i].variacaoId}" placeholder="0.00" required>  
                    </div>`;
            }
            tabela += '</div>';

            document.getElementById('tamanhoProduto').innerHTML = tabela;
        })
        .catch(error => console.error(error));

    })
    .catch(error => console.error(error));
}


function confirmarExclusao(){
    const token = localStorage.getItem("token");
    fetch(apiUrl+'/api/Produto/'+idProduto, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    })
    .then(response => {
            if (!response.ok) {
              throw new Error('Erro ao excluir produto');
            }
            else{
                window.location.href = "buscarProduto.html"
            }
            return response.text();
    })
    .then(data => {
        console.log('Produto ID:', data);
    })
    .catch(error => console.error('Erro ao deletar o ID:', error));

    event.preventDefault();
}


function buscarProduto(){ 
    var nome = document.getElementById('nomeProduto').value;
    const token = localStorage.getItem("token");
    fetch(apiUrl+'/api/Produto/PorNome?Nome='+ nome, { 
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
                                <th scope="col">Imagem</th>
                                <th scope="col">Nome</th>   
                                <th scope="col">Status</th>                              
                                <th scope="col">Opções</th>
                            </tr>
                        </thead>
                        <tbody>`;

        for (var i = 0; i < data.length; i++) {
            var card = carregarProduto(data[i]);
            tabela += card;
        }

        tabela += `</tbody></table>`;
        document.getElementById('tabelaProdutos').innerHTML = tabela;
    })
    .catch(error => console.error('Erro:', error));

    event.preventDefault();
}

function carregarProduto(data){
    var row = `
        <tr>
            <th scope="row">${data.produtoId}</th>
            <td>${data.nome}</td>
            <td>${data.active}</td>
            <td>
                <div>
                    <a class="btn table-action" href="#">
                        <i class="action-icon fas fa-edit" onclick="editarProduto(${data.produtoIdId})" style="margin-right: 12px;"></i>
                        <i class="action-icon fas fa-trash" onclick="excluirProduto(${data.produtoIdId})"></i>
                    </a>                         
                </div>
            </td>
        </tr>
    `;

    return row;
}
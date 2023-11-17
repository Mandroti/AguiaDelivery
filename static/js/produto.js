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

var categoriaSelecionada = 0;
function pegarCat(categoria){
    categoriaSelecionada = categoria;
    listarComplementos();
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


            data.forEach(function (data) {
                selectCategoria.innerHTML += `<option value="${data.categoriaId}" onclick="pegarCat(${data.categoriaId})">${data.nome}</option>`;
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
        console.log(data)
        var tabela = `<table class="table table-striped">
                        <thead>
                            <tr>                                
                                <th scope="col">Nome</th>                                
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
            <td onclick="verProdutos(${data.categoriaId})">${data.nome}</td>
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
        console.log(data)
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
                        <i class="action-icon fas fa-edit" onclick="editarComplemento(${dado.produtoId})" style="margin-right: 12px;></i>
                        <i class="action-icon fas fa-trash" onclick="excluirComplemento(${dado.produtoId})"></i>
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
        console.log(data)
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
    var imagem = document.getElementById('inputImagem').value;    


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
            // window.location.href = "buscarProduto.html"
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

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
                                <th scope="col">Imagem</th>
                                <th scope="col">Nome</th>   
                                <th scope="col">Status</th>                              
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
            <td>${data.active}</td>
            <td>
                <div>
                    <a class="btn table-action" href="#">
                        <i class="action-icon fas fa-edit" onclick="editarCategoria(${data.categoriaId})" style="margin-right: 12px;"></i>
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

var nomeCategoria = '';

function criarCategoria() {
  
    const token = localStorage.getItem('token');
    const nome = document.getElementById('insertNome').value;
    const imagem = document.getElementById('insertImagem').value; 
    const radioButtons = document.getElementsByName('inlineRadioOptions');
    let categoriaSelecionada = '';
    nomeCategoria = document.getElementById('insertNome').value;

  
    radioButtons.forEach(function (radio) {
      if (radio.checked) {
        categoriaSelecionada = radio.value;
      }
    });
  
    if (categoriaSelecionada === 'pizza') {
      categoriaSelecionada = 1;
    } else if (categoriaSelecionada === 'bebida') {
      categoriaSelecionada = 2;
    } else {
      categoriaSelecionada = 0;
    }
  
    const dados = {
      nome: nome,
      imagem: imagem,
      tipo: categoriaSelecionada,
      active: true
    };
  
    fetch(apiUrl + '/api/Categoria', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(dados),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao cadastrar categoria');
      } else {
        
        if (categoriaSelecionada === 1){
            console.log(response);
        }            
        else{
        
           window.location.href = 'buscarCategoria.html';
        }
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
    carregaTamanho();
    

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

const categoriaDiv = document.getElementById('categoriaDiv');
const radios = categoriaDiv.querySelectorAll('input[name="inlineRadioOptions"]');

radios.forEach(radio => {
  radio.addEventListener('change', function() {
    const categoriaSelecionada = this.value;
    // Verifique a categoria selecionada e faça ações com base nela
    if (categoriaSelecionada === 'pizza') {
      document.getElementById('size').style.display = 'block';
      document.getElementById('borda').style.display = 'block';
    } else {
      document.getElementById('size').style.display = 'none';
      document.getElementById('borda').style.display = 'none';
    }
  });
});

function registraCategoria(){

    const token = localStorage.getItem("token");
    
    var nome = document.getElementById('updateNome').value; 
    var imagem = document.getElementById('updateImagem').value;
    var radioButtons = document.getElementsByName('inlineRadioOptions');
    var categoriaSelecionada = '';

    radioButtons.forEach(function (radio) {
        if (radio.checked) {
            categoriaSelecionada = radio.value;
        }
    });

    if(categoriaSelecionada == 'pizza'){        
        categoriaSelecionada = 1;
    }else if(categoriaSelecionada == 'bebida'){
        categoriaSelecionada = 2;
    }else{
        categoriaSelecionada = 0;
    }
   
    const dados = {
        categoriaId: idCategoria,
        nome: nome,
        imagem: imagem,
        tipo: categoriaSelecionada  
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
                                <th scope="col">Imagem</th>
                                <th scope="col">Nome</th>   
                                <th scope="col">Status</th>                              
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

var categoriaSelecionada = 0;

function pegaCategoria(){
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
        
        for (var i = 0; i < data.length; i++) {
            if (data[i].nome === nomeCategoria) {
                categoriaSelecionada = data[i].categoriaId;
                alert(categoriaSelecionada)
                criaVariacao();
            }
        }      
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

// var grupo = 0;

// function adicionaVariacaoGrupo(){

//     const token = localStorage.getItem("token");
   
//     var nome = document.getElementById('insertVariacaoNome').value; 
//     // var valor = document.getElementById('insertVariacaoValor').value; 
      
//     const dados = {
//         name: nome, preco: 0, active: true, grupoId: grupo
//     };           

//     fetch(apiUrl+'/api/Variacao',{             
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
//           throw new Error('Erro ao cadastrar variacao');
//         }
//         else{           
//             console.log(response);    
//             fecharModalVariacao();      
//             adicionaVariacao();
//         }
//         return response.text();
//       })
//       .then(data => {
//         console.log('Variacao cadastrado com sucesso:', data);
//       })
//       .catch(error => console.error('Erro:', error));
//       event.preventDefault();  
// }

// function abremodal(grupoId){
//     document.getElementById('modalVariacao').style.display = 'block';
//     grupo = grupoId;
// }

// function fecharModalVariacao(){
//     document.getElementById('modalVariacao').style.display = 'none';
// }

// function carregarVariacao(dado) {
//     const token = localStorage.getItem("token");
//     return fetch(apiUrl + '/api/Variacao?GrupoId=' + dado.grupoId, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         }
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Erro ao carregar as variações');
//         }
//         return response.json();
//     })
//     .then(variacoes => {
//         console.log(variacoes);

//         let rows = '';
//         for (let i = 0; i < variacoes.length; i++) {
//             const variacao = variacoes[i];
//             rows += `<tr>
//                         <th scope="row">${variacao.variacaoId}</th>
//                         <td>${variacao.name}</td>
//                         <td>
//                             <div>
//                                 <a class="btn table-action" href="#">
//                                     <i class="action-icon fas fa-trash"></i>
//                                 </a>
//                             </div>
//                         </td>
//                     </tr>`;
//         }

//         const tabela = `<table class="table table-striped">       
//                             <thead>
//                                 <tr>
//                                     <th scope="col">#</th>
//                                     <th scope="col">Nome</th>                                
//                                     <th scope="col">Opções</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 ${rows}
//                             </tbody>
//                         </table>`;

//         return tabela;
//     })
//     .catch(error => {
//         console.error('Erro:', error);
//         return '';
//     });
// }

// function adicionaVariacao() {
//     const token = localStorage.getItem("token");
//     fetch(apiUrl + '/api/Variacao/Grupo?CategoriaId=' + categoriaSelecionada, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         document.getElementById('variacao').innerHTML = '';

//         const promises = [];

//         for (let i = 0; i < data.length; i++) {
//             const promise = carregarVariacao(data[i]).then(tableHTML => {
//                 const newDiv = document.createElement('div');
//                 newDiv.innerHTML = `<div class="input-group mb-3" style="margin-top: 10px;">
//                                         <label type="text" class="form-control">${data[i].titulo}</label>
//                                         <div class="input-group-append">
//                                             <button class="btn btn-outline-success" type="button" onclick="abremodal(${data[i].grupoId})">+</button>
//                                         </div>
//                                     </div>${tableHTML}`;

//                 document.getElementById('variacao').appendChild(newDiv);
//             });

//             promises.push(promise);
//         }

//         return Promise.all(promises);
//     })
//     .catch(error => console.error('Erro:', error));
// }


// function carregaTamanho() {
//     const token = localStorage.getItem("token");
    

//     fetch(apiUrl + '/api/Variacao/Grupo?CategoriaId=' + idCategoria, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);

//         fetch(apiUrl+'/api/Variacao?GrupoId=68', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//         .then(response => response.json())
//         .then(dado => {
//             console.log(dado);

//             document.getElementById('tamanhoProduto').style.display = 'block';

//             var tabela = '<div class="row">';
//             for (let i = 0; i < dado.length; i++) {
//                 tabela +=
//                     `<div class="col-md-4">                        
//                         <input type="text" class="form-control" id="${dado[i].variacaoId}" placeholder="${dado[i].name}" disabled>  
//                     </div>`;
//             }
//             tabela += '</div>';

//             document.getElementById('tamanhoProduto').innerHTML = tabela;
//         })
//         .catch(error => console.error(error));

//     })
//     .catch(error => console.error(error));
// }

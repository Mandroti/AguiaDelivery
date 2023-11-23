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

function buscarComplementos(){
   
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
            var card = carregarComplemento(data[i]);
            tabela += card;
        }

        tabela += `</tbody></table>`;
        document.getElementById('tabelaComplementos').innerHTML = tabela;
    })
    .catch(error => console.error('Erro:', error));

    event.preventDefault();
}

function carregarComplemento(data){
    var row = `
        <tr>            
            <td onclick="verCategoriaComplemento(${data.categoriaId})">${data.nome}</td>
        </tr>
    `;
    return row;
}

function verCategoriaComplemento(id){
   
    document.getElementById('listarComplemento').style.display = 'block';

    const token = localStorage.getItem("token");
    fetch(apiUrl+`/api/Complemento?CategoriaId=${id}`, { 
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
            var card = carregarComplementoCategoria(data[i]);
            tabela += card;
        }

        tabela += `</tbody></table>`;
        document.getElementById('tabelaComplementoCategoria').innerHTML = tabela;
    })
    .catch(error => console.error('Erro:', error));


    const fecharCCButton = document.getElementById('fecharCC');

   
    fecharCCButton.addEventListener('click', function () {
        document.getElementById('listarComplemento').style.display = 'none';
    });

   
    event.preventDefault();
}

function carregarComplementoCategoria(dado){
    var row = `
        <tr>
            <th scope="row">${dado.complementoId}</th>
            <td>${dado.nome}</td>
            <td>${dado.precoVenda}</td>
           
            <td>
                <div>
                    <a class="btn table-action" href="#">
                        <i class="action-icon fas fa-edit" onclick="editarComplemento(${dado.complementoId})" style="margin-right: 3px;"></i>
                        <i class="action-icon fas fa-trash" onclick="excluirComplemento(${dado.complementoId})"></i>
                    </a>                         
                </div>
            </td>
        </tr>
    `;

    return row;
}

function registraComplemento(){
    const token = localStorage.getItem("token");   

    var nome = document.getElementById('updateNome').value; 
    var valor = document.getElementById('updateValor').value;
    fetchCategoriaComplemento();
    var updateCategoriaC = categoriaIdSelecionado;
    const dados = {
        complementoId: idComplemento, nome: nome, precoVenda: valor, categoriaId: updateCategoriaC
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

var categoriaIdSelecionado = 0;

function pegaId(id){
    categoriaIdSelecionado = id;
   
}

function fetchCategoriaComplemento() {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    
    fetch(apiUrl + `/api/Categoria/Estabelecimento/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        var selectCategoria = document.getElementById('inputCategoriaC');

        selectCategoria.innerHTML = `<option value="0" disabled>Selecione uma Opção</option>`;

        console.log(data)

        data.forEach(function (categoria) {
            selectCategoria.innerHTML += `<option value="${categoria.categoriaId}" onclick="pegaId(${categoria.categoriaId})">${categoria.nome}</option>`;
        });
        var selectCategoria = document.getElementById('updateCategoriaC');

        selectCategoria.innerHTML = `<option value="0" disabled>Selecione uma Opção</option>`;

        console.log(data)

        data.forEach(function (categoria) {
            selectCategoria.innerHTML += `<option value="${categoria.categoriaId}" onclick="pegaId(${categoria.categoriaId})">${categoria.nome}</option>`;
        });
              
    })
    .catch(error => console.error('Erro:', error));

    event.preventDefault();
}

function criarComplemento(){

    const token = localStorage.getItem("token");
   
    var nome = document.getElementById('inputNome').value; 
    var valor = document.getElementById('inputValor').value;
    var categoriaId = categoriaIdSelecionado;
  
    const dados = {
        categoriaId: categoriaId, nome: nome, precoVenda: valor
    };       
    

    fetch(apiUrl+'/api/Complemento',{             
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
        document.getElementById('tabelaComplementos').innerHTML = tabela;
    })
    .catch(error => console.error('Erro:', error));

    event.preventDefault();
}

function carregarCategoria(data){
    var row = `
        <tr>
           
            <td onclick="verCategoriaComplemento(${data.categoriaId})">${data.nome}</td>
            
        </tr>
    `;

    return row;
}

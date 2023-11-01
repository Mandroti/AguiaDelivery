const body = document.querySelector('body'),
    sidebar = body.querySelector('nav'),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text");



toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
})

document.addEventListener('DOMContentLoaded', function() {
    let dropdownLinks = document.querySelectorAll('.tabela');

    dropdownLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            let dropdownMenu = link.querySelector('.tabela-menu');
            dropdownMenu.style.display = (dropdownMenu.style.display === 'block') ? 'none' : 'block';
        });
    });
});

var dados = [
    {
        nome: "Karolaine Mandroti",
        horario: "03 out 10:42 (há poucos segundos)",
        endereco: "Rua Minas Gerais, 64",
        iconeEndereco: "fas fa-map-pin",
        tipoEntrega: "Delivery",
        iconeEntrega: "fas fa-motorcycle",
        identificador: "card2",
        tipoPagamento: "Cartão de Débito",
        identificador: 1
    },
    {
        nome: "Isabela Mandroti",
        horario: "03 out 10:42 (há poucos segundos)",
        endereco: "Rua Minas Gerais, 64",
        iconeEndereco: "fas fa-map-pin",
        tipoEntrega: "Delivery",
        iconeEntrega: "fas fa-motorcycle",
        identificador: "card2",
        tipoPagamento: "Cartão de Débito",
        identificador: 2
    },
    {
        nome: "Miguel Mandroti",
        horario: "03 out 10:42 (há poucos segundos)",
        endereco: "Rua Minas Gerais, 64",
        iconeEndereco: "fas fa-map-pin",
        tipoEntrega: "Delivery",
        iconeEntrega: "fas fa-motorcycle", //fa-location-arrow fa-map-marked-alt
        identificador: "card3",
        tipoPagamento: "Cartão de Débito",
        identificador: 3
    },
];

var pendentesContainer = document.getElementById('pendentes');

for (var i = 0; i < dados.length; i++) {
    var card = criarCard(dados[i]);
    pendentesContainer.innerHTML += card;
}

function criarCard(dado) {

    // var produtosHTML='';

    // dado.produtos.forEach(function(produtos){
    //     produtosHTML += `
    //     <li>
    //         <div style="display:flex">
    //             <p>${produtos.qtde}X</p>    
    //             <p>${produtos.nome}</p>  
    //         </div>
    //         <div>
    //             <p>${produtos.complemento || ''}</p>
    //         </div>
    //     </li>
    // `;
    // });

    var cardHTML = `
        <div class="card" style="margin-right: -15px; margin-left: -15px">
        <div style="padding: 5px">
            <div style="display: flex;justify-content: space-between; "> 
                <h4 style="margin: 10px 0px 0px 0px;">${dado.nome}</h4>   
            
                <div class="dropdown">
                    <button class="mainmenubtn">
                    <i class="fas fa-bars" style="margin-top: 16px;margin-left: auto; font-size: 24px;"></i> 
                    </button>
                    <div class="dropdown-child">
                        <a href="#" onclick="proximaEtapa()">Pronto</a>     
                        <a href="#" onclick="cancelarPedido()">Cancelar</a>                        
                    </div>
                </div>
                            
            </div>            
            <p style="color: lightgray;">${dado.horario}</p>
            <div style="display: flex;">
                <i class="${dado.iconeEndereco}" style="margin-top: 5px;"></i>
                <p style="color: gray; margin-left: 10px;">${dado.endereco}</p>
            </div>
            <div style="display: flex; align-items: center;">
                <i class="${dado.iconeEntrega}" style="margin-bottom: 14px;"></i>
                <p style="color: gray; margin-left: 10px;">${dado.tipoEntrega}</p>
            </div>
            <div style="display: flex; align-items: center;">
                <i class="fas fa-money-bill-alt" style="margin-bottom: 14px;"></i>
                <p style="color: gray; margin-left: 10px;">${dado.tipoPagamento}</p>
            </div>
            <div style="display: flex; flex-direction: column;">
            <div style="color: gray; margin-left: 10px; text-decoration: underline; cursor: pointer;" onclick="toggleCard('${dado.identificador}')">Ver detalhes do pedido</div>
                <div style="display:none;padding:10px; margin-top: 13px" id="${dado.identificador}">
                    <div class="categoria">
                    <div class="coluna">
                        <h6 style="color: #ffbe33; text-align:start; font-size:18px; margin-left: 30px">Itens do Pedido</h6>
                        <ul class="listaPedidos">
                            <li>
                                <div style="display:flex; margin-bottom: -15px">
                                    <p>1X &emsp;</p>
                                    <p>Hamburguer de Frango</p>
                                </div>
                                <div style="display: none;">
                                    <p style="display: inline; font-size: 12px;">1x&ensp; Bacon&ensp;</p>
                                    <p style="display: inline; font-size: 12px;">1x&ensp; Milho&ensp;</p>
                                    <p style="display: inline; font-size: 12px;">1x&ensp; Calabresa&ensp;</p>
                                    <p style="display: inline; font-size: 12px;">1x&ensp; Bacon&ensp;</p>
                                    <p style="display: inline; font-size: 12px;">1x&ensp; Milho&ensp;</p>
                                    <p style="display: inline; font-size: 12px;">1x&ensp; Calabresa&ensp;</p>
                                    <p style="display: inline; font-size: 12px;">1x&ensp; Bacon&ensp;</p>
                                    <p style="display: inline; font-size: 12px;">1x&ensp; Milho&ensp;</p>
                                    <p style="display: inline; font-size: 12px;">1x&ensp; Calabresa&ensp;</p>
                                </div>                            
                            </li>    
                            <li>
                                <div style="display:flex;  margin-bottom: -15px">
                                    <p>1X &emsp;</p>
                                    <p>Pizza Brócolis</p>
                                </div>
                            </li>        
                            <li>
                                <div style="display:flex; margin-bottom: -15px">
                                    <p>3X &emsp;</p>
                                    <p>Pastel de Queijo</p>
                                </div>
                            </li>      
                            <li>
                                <div style="display:flex;  margin-bottom: -15px">
                                    <p>1X &emsp;</p>
                                    <p>Pizza Brócolis</p>
                                </div>
                            </li>        
                            <li>
                                <div style="display:flex">
                                    <p>3X &emsp;</p>
                                    <p>Pastel de Queijo</p>
                                </div>
                            </li>      
                        </ul>
                    </div>                   
                </div>
                </div>
            </div>
        </div>           
        </div>
    `;

    return cardHTML;
}

function toggleCard(cardId) {
    var cardBody = document.getElementById(cardId);
    if (cardBody.style.display === 'none') {
        cardBody.style.display = 'block';
    } else {
        cardBody.style.display = 'none';
    }
}
// var producaoContainer = document.getElementById('producao');

// for (var i = 0; i < dados.length; i++) {
//     var card = criarCard(dados[i]);
//     producaoContainer.innerHTML += card;
// }

// var disponivelContainer = document.getElementById('disponivel');

// for (var i = 0; i < dados.length; i++) {
//     var card = criarCard(dados[i]);
//     disponivelContainer.innerHTML += card;
// }


// function passarFase(){
//     const modal = document.getElementById('myModal');
//     modal.style.display = 'block';
// }

// function fecharModal() {
//     const modal = document.getElementById('myModal');
//     modal.style.display = 'none';
// }

function pedidosCliente(){
    
}

function cancelarPedido(){
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';

    // Adicionando uma função para fechar o modal
    const fecharModal = document.getElementById('fecharModal');
    fecharModal.addEventListener('click', function(){
        modal.style.display = 'none';
    });

    const fechar = document.getElementById('fechar');
    fechar.addEventListener('click', function(){
        modal.style.display = 'none';
    });
}

function confirmarCancelarProduto(){
   
}

function proximaEtapa(){
    const modal = document.getElementById('myModalEtapa');
    modal.style.display = 'block';

    // Adicionando uma função para fechar o modal
    const fecharModal = document.getElementById('fecharModalEtapa');
    fecharModal.addEventListener('click', function(){
        modal.style.display = 'none';
    });

    const fechar = document.getElementById('fecharEtapa');
    fechar.addEventListener('click', function(){
        modal.style.display = 'none';
    });
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

function adicionarCategoria(){
    const modal = document.getElementById('modalAdicionarCategoria');
    modal.style.display = 'block';
    event.preventDefault();
}

function fecharModalCategoria(){
    const modal = document.getElementById('modalAdicionarCategoria');
    modal.style.display = 'none';
}

function excluirCategoria() {
    const modal = document.getElementById('modalExcluirCategoria');
    modal.style.display = 'block';

    // Adicionando uma função para fechar o modal
    const fecharModal = document.getElementById('fecharModalCategoria');
    fecharModal.addEventListener('click', function(){
        modal.style.display = 'none';
    });

    const fechar = document.getElementById('fecharModalCategoriaa');
    fechar.addEventListener('click', function(){
        modal.style.display = 'none';
    });
}

function editarCategoria(){
    const modal = document.getElementById('modalEditarCategoria');
    modal.style.display = 'block';
    event.preventDefault();

    // Adicionando uma função para fechar o modal
    const fecharModal = document.getElementById('fecharModalEditarCategoria');
    fecharModal.addEventListener('click', function(){
        modal.style.display = 'none';
    });

}

function adicionarCliente(){
    const modal = document.getElementById('modalAdicionarCliente');
    modal.style.display = 'block';
    event.preventDefault();
}

function fecharModalCliente(){
    const modal = document.getElementById('modalAdicionarCliente');
    modal.style.display = 'none';
}

function excluirCliente() {
    const modal = document.getElementById('modalExcluirCliente');
    modal.style.display = 'block';

    // Adicionando uma função para fechar o modal
    const fecharModal = document.getElementById('fecharModalCliente');
    fecharModal.addEventListener('click', function(){
        modal.style.display = 'none';
    });

    const fechar = document.getElementById('fecharModalClientee');
    fechar.addEventListener('click', function(){
        modal.style.display = 'none';
    });
}

function editarCliente(){
    const modal = document.getElementById('modalEditarCliente');
    modal.style.display = 'block';
    event.preventDefault();

    // Adicionando uma função para fechar o modal
    const fecharModal = document.getElementById('fecharModalEditarCliente');
    fecharModal.addEventListener('click', function(){
        modal.style.display = 'none';
    });

}

function adicionarImagem(){
    const modal = document.getElementById('modalAdicionarImagem');
    modal.style.display = 'block';
    event.preventDefault();
}

function fecharModalImagem(){
    const modal = document.getElementById('modalAdicionarImagem');
    modal.style.display = 'none';
}

function excluirImagem() {
    const modal = document.getElementById('modalExcluirImagem');
    modal.style.display = 'block';

    // Adicionando uma função para fechar o modal
    const fecharModal = document.getElementById('fecharModalImagem');
    fecharModal.addEventListener('click', function(){
        modal.style.display = 'none';
    });

    const fechar = document.getElementById('fecharModalImagemm');
    fechar.addEventListener('click', function(){
        modal.style.display = 'none';
    });
}

function editarImagem(){
    const modal = document.getElementById('modalEditarImagem');
    modal.style.display = 'block';
    event.preventDefault();

    // Adicionando uma função para fechar o modal
    const fecharModal = document.getElementById('fecharModalEditarImagem');
    fecharModal.addEventListener('click', function(){
        modal.style.display = 'none';
    });

}


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
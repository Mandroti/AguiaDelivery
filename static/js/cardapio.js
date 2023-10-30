(function ($) {
    "use strict";
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0});
        return false;
    });
    
    
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });
    
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    
    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });
    
    
    // Date and time picker
    $('#date').datetimepicker({
        format: 'L'
    });
    $('#time').datetimepicker({
        format: 'LT'
    });


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        center: true,
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
    
    // Related post carousel
    $(".related-slider").owlCarousel({
        autoplay: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            }
        }
    });
    
})(jQuery);



function openModal() {
    window.location.href = "detalhesProduto.html";
}


function decrementQuantity() {
    
    var quantityLabel = document.getElementById("quantityLabel");
    var currentQuantity = parseInt(quantityLabel.innerText);
    
    if (currentQuantity > 1) {
        quantityLabel.innerText = currentQuantity - 1;
    }
}

function incrementQuantity() {
    var quantityLabel = document.getElementById("quantityLabel");
    var currentQuantity = parseInt(quantityLabel.innerText);
    
    quantityLabel.innerText = currentQuantity + 1;
}

function openModalCarrinho() {
    document.getElementById('myModalCarrinho').style.display = 'block';
}

function closeModalCarrinho() {
    var modal = document.getElementById("myModalCarrinho");
    modal.style.display = "none";
}

function continuarComprando() {
    window.location.href = "cardapioCliente.html";
}

function irParaCarrinho() {
    closeModalCarrinho(); 
    window.location.href = 'carrinho.html'; 
}

const prodsss = [
    {
        nome: "Mini cheese Burger",
        preco: "$9.00",
        descricao: "Lorem ipsum dolor sit amet elit. Phasel nec preti facil",
        imagemSrc: "images/menu-burger.jpg"
    },    {
        nome: "Mini cheese Burger Bacon",
        preco: "$19.00",
        descricao: "Lorem ipsum dolor sit amet elit. Phasel nec preti facil",
        imagemSrc: "images/menu-burger.jpg"
    },   
];

function carregarProdutos(){
    
    const prodsss = [
        {
            nome: "Mini cheese Burger",
            preco: "$9.00",
            descricao: "Lorem ipsum dolor sit amet elit. Phasel nec preti facil",
            imagemSrc: "images/menu-burger.jpg"
        },    {
            nome: "Mini cheese Burger Bacon",
            preco: "$19.00",
            descricao: "Lorem ipsum dolor sit amet elit. Phasel nec preti facil",
            imagemSrc: "images/menu-burger.jpg"
        },   
        {
            nome: "Mini cheese Burger Bacon",
            preco: "$19.00",
            descricao: "Lorem ipsum dolor sit amet elit. Phasel nec preti facil",
            imagemSrc: "images/menu-burger.jpg"
        },   
        {
            nome: "Mini cheese Burger Bacon",
            preco: "$19.00",
            descricao: "Lorem ipsum dolor sit amet elit. Phasel nec preti facil",
            imagemSrc: "images/menu-burger.jpg"
        },   
        {
            nome: "Mini cheese Burger Bacon",
            preco: "$19.00",
            descricao: "Lorem ipsum dolor sit amet elit. Phasel nec preti facil",
            imagemSrc: "images/menu-burger.jpg"
        },   
        {
            nome: "Mini cheese Burger Bacon",
            preco: "$19.00",
            descricao: "Lorem ipsum dolor sit amet elit. Phasel nec preti facil",
            imagemSrc: "images/menu-burger.jpg"
        },   
        {
            nome: "Mini cheese Burger Bacon",
            preco: "$19.00",
            descricao: "Lorem ipsum dolor sit amet elit. Phasel nec preti facil",
            imagemSrc: "images/menu-burger.jpg"
        },   
        {
            nome: "Mini cheese Burger Bacon",
            preco: "$19.00",
            descricao: "Lorem ipsum dolor sit amet elit. Phasel nec preti facil",
            imagemSrc: "images/menu-burger.jpg"
        },   
        {
            nome: "Mini cheese Burger Bacon",
            preco: "$19.00",
            descricao: "Lorem ipsum dolor sit amet elit. Phasel nec preti facil",
            imagemSrc: "images/menu-burger.jpg"
        },   
        {
            nome: "Mini cheese Burger Bacon",
            preco: "$19.00",
            descricao: "Lorem ipsum dolor sit amet elit. Phasel nec preti facil",
            imagemSrc: "images/menu-burger.jpg"
        },   
        {
            nome: "Mini cheese Burger Bacon",
            preco: "$19.00",
            descricao: "Lorem ipsum dolor sit amet elit. Phasel nec preti facil",
            imagemSrc: "images/menu-burger.jpg"
        },   
    ];

    const container = document.querySelector('.tab-content');

    for (const produto of prodsss) {
        const divProduto = document.createElement('div'); 
        divProduto.classList.add('menu-item');

        divProduto.innerHTML = `
            <div class="menu-img">
                <img src="${produto.imagemSrc}" alt="Image" onclick="openModal()">
            </div>
            <div class="menu-text">
                <h3><span>${produto.nome}</span> <strong>${produto.preco}</strong></h3>
                <p>${produto.descricao}</p>
            </div>
        `;

        container.appendChild(divProduto);
    }
}


function carregarOpcoes(){
    const opcoes = [
        {nome: "Pão Brioche"},
        {nome: "Pão Australiano"},
        {nome: "Pão Comum"}
    ]

    const listaOpcoes = document.getElementById('listaOpcoes');
    listaOpcoes.innerHTML = '';

    for(const opcao of opcoes){
        listaOpcoes.innerHTML += `
            <li>
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <label style="word-wrap: break-word;">${opcao.nome}</label>
                    <input type="checkbox" name="preferencia1" value="opcao1">
                </div>
            </li>
        `;
    }
}
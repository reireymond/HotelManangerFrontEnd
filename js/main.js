let sidebarInfoInstance = null;

function verificarLogin() {
  const usuario = sessionStorage.getItem("usuarioLogado");
  const btnLoginLogout = $("#btn-login-logout");

  // Se o usuário está logado
  if (usuario) {
    btnLoginLogout.html('<i class="bi bi-box-arrow-right"></i> Sair');
    btnLoginLogout.attr("href", "#");

    btnLoginLogout.on("click", function (e) {
      e.preventDefault();
      sessionStorage.removeItem("usuarioLogado"); // Apaga sessão
      window.location.reload(); // Recarrega página
    });
  } else {
    // Se não estiver logado, mostra botão de Login
    btnLoginLogout.html('<i class="bi bi-person-circle"></i> Login');

    // Ajusta caminho dependendo da página
    if (window.location.pathname.includes("/html/")) {
      btnLoginLogout.attr("href", "login.html");
    } else {
      btnLoginLogout.attr("href", "html/login.html");
    }
  }
}

function validacaoFormularioContato() {
  const forms = document.querySelectorAll("#form-contato.needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        // Se os campos são inválidos, impede envio
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } 
        else {
          event.preventDefault(); 

          const nome = $("#contato-nome").val();
          const email = $("#contato-email").val();
          const msg = $("#contato-msg").val();

          // Estrutura da mensagem
          const novaMensagem = {
            nome: nome,
            email: email,
            mensagem: msg,
            data: new Date().toLocaleString("pt-BR"),
          };

          // Salva no localStorage
          const mensagens =
            JSON.parse(localStorage.getItem("hotelFenixMensagens")) || [];
          mensagens.push(novaMensagem);
          localStorage.setItem(
            "hotelFenixMensagens",
            JSON.stringify(mensagens)
          );

          alert("Mensagem enviada com sucesso! O administrador receberá em breve.");

          // Limpa o formulário
          form.classList.remove("was-validated");
          form.reset();
        }

        form.classList.add("was-validated"); // Exibe validação visual
      },
      false
    );
  });
}


$(document).ready(function () {
  verificarLogin(); // Atualiza header conforme usuário logado

  if ($("#form-contato").length > 0) {
    validacaoFormularioContato();
  }


  const container = $("#featured-rooms-container");

  if (container.length > 0) {

    // Filtra apenas quartos disponíveis e exibe só 3
    const quartosDestaque = bancoDeDadosQuartos
      .filter((q) => q.disponivel)
      .slice(0, 3);

    if (quartosDestaque.length === 0) {
      container.html(
        '<p class="text-center col-12">Nenhum quarto disponível no momento.</p>'
      );
    } else {
      quartosDestaque.forEach((quarto) => {
        const precoFormatado = quarto.precoPorNoite.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        });

        // Ajuste automático do caminho da imagem
        let caminhoImagem = quarto.imagem;
        if (!window.location.pathname.includes("/html/")) {
          caminhoImagem = caminhoImagem.replace("../", "");
        }

        // Ajusta caminho de reserva conforme página atual
        let linkReserva = "html/quartos.html";
        if (window.location.pathname.includes("/html/")) {
          linkReserva = "quartos.html";
        }

        // Card do quarto
        const cardHtml = `
          <div class="col">
            <div class="card h-100">
              <img src="${caminhoImagem}" class="card-img-top" alt="${quarto.nome}">
              <div class="card-body">
                <h5 class="card-title">${quarto.nome}</h5>
                <p class="card-text mb-2">
                  <i class="bi bi-people"></i> ${quarto.capacidade} Pessoas
                </p>
                <p class="card-text">
                  <i class="bi bi-bed"></i> ${quarto.tipoCama}
                </p>
              </div>
              <div class="card-footer bg-white border-top-0 d-flex justify-content-between align-items-center">
                <span class="fs-5 fw-bold text-primary">${precoFormatado}</span>
                <a href="${linkReserva}" class="btn btn-primary">Reservar</a>
              </div>
            </div>
          </div>
        `;
        container.append(cardHtml);
      });
    }
  }

  const sidebarElement = document.getElementById('sidebarInfo');

  if (sidebarElement) {
    sidebarInfoInstance = new bootstrap.Offcanvas(sidebarElement);
  }

  // Navegação do menu lateral
  $('#sidebarInfo .nav-link').on('click', function(e) {
    const link = $(this);
    let href = link.attr('href');
    const isLocalAnchor = href.startsWith('#');

    e.preventDefault();
    
    if (sidebarInfoInstance) {
        sidebarInfoInstance.hide();
    }

    if (isLocalAnchor) {
      // Se está em outra página dentro /html/
      if (window.location.pathname.includes("/html/") && !window.location.href.includes("index.html")) {
          window.location.href = "../index.html" + href;
          return;
      }

      // Scroll suave
      const targetElement = $(href);
      if (targetElement.length) {
        $('html, body').animate({
          scrollTop: targetElement.offset().top - 56
        }, 500);
      }
    } 
    else {
      setTimeout(() => {
          window.location.href = href;
      }, 400);
    }
  });
});

// GOOGLE MAPS
function initMap() {
  if ($("#mapa").length > 0) {
    const localizacaoHotel = { lat: -20.4663, lng: -45.4287 };

    // Cria mapa
    const mapa = new google.maps.Map(document.getElementById("mapa"), {
      zoom: 15,
      center: localizacaoHotel,
    });

    // Adiciona marcador
    const marker = new google.maps.Marker({
      position: localizacaoHotel,
      map: mapa,
      title: "Hotel Fênix",
    });
  }
}

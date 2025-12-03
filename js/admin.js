// Variável global que guardará a instância do modal do Bootstrap
let modalQuartoBootstrap;

// Carrega reservas armazenadas no LocalStorage
function carregarReservas() {
  const dados = localStorage.getItem("hotelFenixReservas");
  return dados ? JSON.parse(dados) : [];
}

// Salva as reservas no LocalStorage
function salvarReservas(reservas) {
  localStorage.setItem("hotelFenixReservas", JSON.stringify(reservas));
}

// Formata um número como moeda BRL
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}

// Atualiza os contadores/resumos do painel administrativo
function atualizarStats() {
  const totalQuartos = bancoDeDadosQuartos.length;
  const disponiveis = bancoDeDadosQuartos.filter((q) => q.disponivel).length;
  const ocupados = totalQuartos - disponiveis;
  const totalVisitas = localStorage.getItem("hotelFenixVisitas") || 0;

  $("#stat-total-quartos").text(totalQuartos);
  $("#stat-disponiveis").text(disponiveis);
  $("#stat-ocupados").text(ocupados);
  $("#stat-visitas").text(totalVisitas);
}

// Renderiza a tabela de quartos no painel admin
function renderizarTabelaQuartos() {
  const tabelaQuartos = $("#tabela-admin-quartos");
  tabelaQuartos.empty();
  bancoDeDadosQuartos.sort((a, b) => a.id - b.id);

  bancoDeDadosQuartos.forEach((quarto) => {
    const precoFormatado = formatarMoeda(quarto.precoPorNoite);
    const statusBadge = quarto.disponivel
      ? '<span class="badge bg-success">Disponível</span>'
      : '<span class="badge bg-danger">Ocupado</span>';

    const linhaQuarto = `
            <tr data-id="${quarto.id}">
                <td>${quarto.id}</td>
                <td>${quarto.nome}</td>
                <td>${quarto.tipoCama}</td>
                <td>${quarto.capacidade} pessoas</td>
                <td>${precoFormatado}</td>
                <td>${statusBadge}</td>
                <td class="text-center">
                    <button class="btn btn-primary btn-sm btn-alterar" data-id="${quarto.id}" title="Alterar">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-danger btn-sm btn-excluir" data-id="${quarto.id}" title="Excluir">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    tabelaQuartos.append(linhaQuarto);
  });

  atualizarStats();
}

function renderizarTabelaReservas() {
  const tabelaReservas = $("#tabela-reservas");
  tabelaReservas.empty();
  const reservas = carregarReservas();

  if (reservas.length === 0) {
    tabelaReservas.html(
      '<tr><td colspan="7" class="text-center">Nenhuma reserva encontrada.</td></tr>'
    );
    return;
  }

  reservas.forEach((quarto) => {
    const totalFormatado = quarto.totalPagar
      ? formatarMoeda(quarto.totalPagar)
      : "N/A";
    const diarias = quarto.numDiarias || "N/A";

      // Converte strings de data para formato BR
    const checkinFormatado = quarto.checkin
      ? new Date(quarto.checkin + "T00:00:00").toLocaleDateString("pt-BR")
      : "N/A";
    const checkoutFormatado = quarto.checkout
      ? new Date(quarto.checkout + "T00:00:00").toLocaleDateString("pt-BR")
      : "N/A";

    const linhaReserva = `
            <tr data-id="${quarto.id}">
                <td>${quarto.id}</td>
                <td>${quarto.nome}</td>
                <td>${checkinFormatado}</td>
                <td>${checkoutFormatado}</td>
                <td>${diarias}</td>
                <td>${totalFormatado}</td>
                <td class="text-center">
                    <button class="btn btn-warning btn-sm btn-cancelar-reserva" data-id="${quarto.id}" title="Cancelar Reserva">
                        <i class="bi bi-x-lg"></i> Cancelar
                    </button>
                </td>
            </tr>
        `;
    tabelaReservas.append(linhaReserva);
  });
}

// Verifica se o ID já está sendo usado por outro quarto
function isIdDuplicado(idNovo, idAntigo = null) {
  const idNovoNum = parseInt(idNovo);
  return bancoDeDadosQuartos.some((quarto) => {
    if (idAntigo && quarto.id === parseInt(idAntigo)) {
      return false;
    }
    return quarto.id === idNovoNum;
  });
}


$(document).ready(function () {
    // Destaca o item do menu referente à página atual
  function atualizarMenuAtivo() {
    const paginaAtual = window.location.pathname.split("/").pop();
    const menuLinks = $("#admin-menu .nav-link");
    menuLinks.removeClass("active");
    menuLinks.each(function () {
      const linkHref = $(this).attr("href").split("/").pop();
      if (linkHref === paginaAtual) {
        $(this).addClass("active");
      }
    });
  }

  atualizarMenuAtivo();
  carregarDados(); // Carrega quartos do LocalStorage

   // Se a tabela de quartos existe na página, inicializa o modal e renderiza
  if ($("#tabela-admin-quartos").length > 0) {
    modalQuartoBootstrap = new bootstrap.Modal("#modalQuarto");
    renderizarTabelaQuartos();
  }

   // Se a tabela de reservas existe, renderiza
  if ($("#tabela-reservas").length > 0) {
    renderizarTabelaReservas();
  }

  $("#btnAdicionarQuarto").on("click", function () {
    $("#modalQuartoLabel").text("Adicionar Novo Quarto");
    $("#formQuarto").trigger("reset");
    $("#formQuartoIdAntigo").val("");
    $("#formQuartoId").prop("readonly", false);
    $("#formQuarto .form-control").removeClass("is-invalid");
    $("#formQuartoDisponivel").prop("checked", true);
  });

  $("#tabela-admin-quartos").on("click", ".btn-alterar", function () {
    const quartoId = $(this).data("id");
    const quarto = bancoDeDadosQuartos.find((q) => q.id == quartoId);

     // Preenche o formulário com os dados do quarto
    if (quarto) {
      $("#modalQuartoLabel").text("Alterar Quarto");
      $("#formQuartoIdAntigo").val(quarto.id);
      $("#formQuartoId").val(quarto.id);
      $("#formQuarto .form-control").removeClass("is-invalid");
      $("#formQuartoNome").val(quarto.nome);
      $("#formQuartoCamas").val(quarto.tipoCama);
      $("#formQuartoCapacidade").val(quarto.capacidade);
      $("#formQuartoPreco").val(quarto.precoPorNoite);
      $("#formQuartoImagem").val(quarto.imagem);
      $("#formQuartoDisponivel").prop("checked", quarto.disponivel);

      modalQuartoBootstrap.show();
    }
  });

  $("#btnSalvarQuarto").on("click", function () {
    $("#formQuarto .form-control").removeClass("is-invalid");
    let temErro = false;

    const idAntigo = $("#formQuartoIdAntigo").val();
    const idNovo = $("#formQuartoId").val();
    const nome = $("#formQuartoNome").val();
    const capacidade = parseInt($("#formQuartoCapacidade").val());
    const preco = parseFloat($("#formQuartoPreco").val());

    if (!idNovo) {
      $("#formQuartoId").addClass("is-invalid");
      $("#id-error-feedback").text("O Número do Quarto (ID) é obrigatório.");
      temErro = true;
    } else if (isIdDuplicado(idNovo, idAntigo)) {
      $("#formQuartoId").addClass("is-invalid");
      $("#id-error-feedback").text(
        "Este Número de Quarto (ID) já está em uso."
      );
      temErro = true;
    }

    if (!nome || nome.trim() === "") {
      $("#formQuartoNome").addClass("is-invalid");
      temErro = true;
    }

    if (isNaN(capacidade) || capacidade < 1) {
      $("#formQuartoCapacidade").addClass("is-invalid");
      temErro = true;
    }

    if (isNaN(preco) || preco < 0) {
      $("#formQuartoPreco").addClass("is-invalid");
      temErro = true;
    }

    if (temErro) {
      return;
    }

     // Cria o objeto com os dados do quarto
    const dadosQuarto = {
      id: parseInt(idNovo),
      nome: nome,
      tipoCama: $("#formQuartoCamas").val(),
      capacidade: capacidade,
      precoPorNoite: preco,
      imagem: $("#formQuartoImagem").val(),
      disponivel: $("#formQuartoDisponivel").is(":checked"),
    };

    if (idAntigo) {
      const index = bancoDeDadosQuartos.findIndex((q) => q.id == idAntigo);
      if (index !== -1) {
        bancoDeDadosQuartos[index] = dadosQuarto;
      }
    } else {
      bancoDeDadosQuartos.push(dadosQuarto);
    }

    salvarDados();
    modalQuartoBootstrap.hide();
    renderizarTabelaQuartos();
  });

  //Excluir quartos

  $("#tabela-admin-quartos").on("click", ".btn-excluir", function () {
    const quartoId = $(this).data("id");
    if (
      confirm("Tem certeza que deseja excluir o quarto nº " + quartoId + "?")
    ) {
      const index = bancoDeDadosQuartos.findIndex((q) => q.id == quartoId);
      if (index !== -1) {
        bancoDeDadosQuartos.splice(index, 1);
        salvarDados();
        renderizarTabelaQuartos();
      }
    }
  });

  //Cancela reservas
  $("#tabela-reservas").on("click", ".btn-cancelar-reserva", function () {
    const quartoId = $(this).data("id");
    if (
      confirm(
        "Tem certeza que deseja cancelar a reserva do quarto nº " +
          quartoId +
          "?"
      )
    ) {
      const reservas = carregarReservas();
      const novasReservas = reservas.filter((r) => r.id != quartoId);
      salvarReservas(novasReservas);

      alert("Reserva cancelada.");
      renderizarTabelaReservas();
    }
  });
});

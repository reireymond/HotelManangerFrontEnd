// js/main.js

$(document).ready(function () {
  carregarDados();

  const container = $("#featured-rooms-container");

  const quartosDestaque = bancoDeDadosQuartos
    .filter((q) => q.disponivel)
    .slice(0, 3);

  if (quartosDestaque.length === 0) {
    container.html(
      '<p class="text-center col-12">Nenhum quarto disponível no momento.</p>'
    );
    return;
  }

  quartosDestaque.forEach((quarto) => {
    const precoFormatado = quarto.precoPorNoite.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });

    const cardHtml = `
      <div class="col">
        <div class="card h-100">
          <img src="${quarto.imagem}" class="card-img-top" alt="${quarto.nome}">
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
            <a href="quartos.html" class="btn btn-primary">Reservar</a>
          </div>
        </div>
      </div>
    `;

    container.append(cardHtml);
  });
});
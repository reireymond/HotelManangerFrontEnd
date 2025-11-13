// js/bancoDeDados.js

const dadosIniciaisQuartos = [
  {
    id: 101,
    nome: "Suíte Standard",
    tipoCama: "1 Cama de Casal",
    capacidade: 2,
    precoPorNoite: 250.0,
    imagem: "img/quarto-standard.jpg",
    disponivel: true,
  },
  {
    id: 102,
    nome: "Quarto Duplo",
    tipoCama: "2 Camas de Solteiro",
    capacidade: 2,
    precoPorNoite: 220.0,
    imagem: "img/quarto-duplo.jpg",
    disponivel: true,
  },
  {
    id: 201,
    nome: "Suíte Família",
    tipoCama: "1 Cama Casal, 1 Cama Solteiro",
    capacidade: 3,
    precoPorNoite: 350.0,
    imagem: "img/quarto-familia.jpg",
    disponivel: false,
  },
  {
    id: 301,
    nome: "Suíte Presidencial",
    tipoCama: "1 Cama King Size",
    capacidade: 2,
    precoPorNoite: 750.0,
    imagem: "img/quarto-presidencial.jpg",
    disponivel: true,
  },
];

let bancoDeDadosQuartos = [];

function salvarDados() {
  localStorage.setItem(
    "hotelFenixQuartos",
    JSON.stringify(bancoDeDadosQuartos)
  );
}

function carregarDados() {
  const dadosSalvos = localStorage.getItem("hotelFenixQuartos");

  if (dadosSalvos) {
    bancoDeDadosQuartos = JSON.parse(dadosSalvos);
  } else {
    bancoDeDadosQuartos = dadosIniciaisQuartos;
    salvarDados();
  }
}
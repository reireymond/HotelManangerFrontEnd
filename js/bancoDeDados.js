// ======================================================
// NOSSO BANCO DE DADOS FICTÍCIO DE QUARTOS
// ======================================================

// Este é o estado "padrão" do banco de dados,
// usado apenas se o localStorage estiver vazio (primeira vez que o site abre)
const bancoDeDadosQuartosDefault = [
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

// Esta será nossa variável "viva" que armazena os quartos.
// Ela será preenchida pela função carregarDados().
let bancoDeDadosQuartos = [];

/**
 * Salva o estado atual do array 'bancoDeDadosQuartos' no localStorage.
 */
function salvarDados() {
  try {
    localStorage.setItem(
      "hotelFenixQuartos",
      JSON.stringify(bancoDeDadosQuartos)
    );
  } catch (e) {
    console.error("Falha ao salvar dados no localStorage:", e);
    alert(
      "Erro: Não foi possível salvar os dados. O localStorage pode estar cheio ou desabilitado."
    );
  }
}

/**
 * Carrega os dados do localStorage para o array 'bancoDeDadosQuartos'.
 * Se não houver nada salvo, usa os dados padrão.
 */
function carregarDados() {
  const dadosSalvos = localStorage.getItem("hotelFenixQuartos");

  if (dadosSalvos) {
    try {
      bancoDeDadosQuartos = JSON.parse(dadosSalvos);
    } catch (e) {
      console.error("Falha ao ler dados do localStorage:", e);
      // Se os dados salvos estiverem corrompidos, usa o padrão
      bancoDeDadosQuartos = bancoDeDadosQuartosDefault;
      salvarDados(); // E salva a versão correta
    }
  } else {
    // Primeira vez que o site é aberto, usa o padrão
    bancoDeDadosQuartos = bancoDeDadosQuartosDefault;
    salvarDados(); // Salva o padrão no localStorage
  }
}

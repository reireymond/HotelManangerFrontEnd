/* Banco de Dados dos Quartos */
const bancoDeDadosQuartos = [
    {
        id: 101,
        nome: "Suíte Standard",
        tipoCama: "1 Cama de Casal",
        capacidade: 2,
        precoPorNoite: 250.00,
        imagem: "img/quarto-standard.jpg",
        disponivel: true
    },
    {
        id: 102,
        nome: "Quarto Duplo",
        tipoCama: "2 Camas de Solteiro",
        capacidade: 2,
        precoPorNoite: 220.00,
        imagem: "img/quarto-duplo.jpg",
        disponivel: true
    },
    {
        id: 201,
        nome: "Suíte Família",
        tipoCama: "1 Cama Casal, 1 Cama Solteiro",
        capacidade: 3,
        precoPorNoite: 350.00,
        imagem: "img/quarto-familia.jpg",
        disponivel: false
    },
    {
        id: 301,
        nome: "Suíte Presidencial",
        tipoCama: "1 Cama King Size",
        capacidade: 2,
        precoPorNoite: 750.00,
        imagem: "img/quarto-presidencial.jpg",
        disponivel: true
    }
];
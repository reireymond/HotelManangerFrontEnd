function validacaoFormularioContato() {
  const forms = document.querySelectorAll("#form-contato.needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault();

          const nome = $("#contato-nome").val();
          const email = $("#contato-email").val();
          const msg = $("#contato-msg").val();

          const novaMensagem = {
            nome: nome,
            email: email,
            mensagem: msg,
            data: new Date().toLocaleString("pt-BR"),
          };

          const mensagens =
            JSON.parse(localStorage.getItem("hotelFenixMensagens")) || [];
          mensagens.push(novaMensagem);
          localStorage.setItem(
            "hotelFenixMensagens",
            JSON.stringify(mensagens)
          );

          alert("Mensagem enviada com sucesso! O administrador receberá em breve.");
          
          form.classList.remove("was-validated");
          form.reset();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
}

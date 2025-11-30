document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const loginError = document.getElementById("login-error");
  const usuarioInput = document.getElementById("usuario");

  if (usuarioInput) {
    usuarioInput.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número
      
      if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos

      if (value.length > 9) {
        value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2}).*/, "$1.$2.$3-$4");
      } else if (value.length > 6) {
        value = value.replace(/^(\d{3})(\d{3})(\d{0,3}).*/, "$1.$2.$3");
      } else if (value.length > 3) {
        value = value.replace(/^(\d{3})(\d{0,3}).*/, "$1.$2");
      }
      
      e.target.value = value;
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      loginError.classList.remove("show");

      const usuarioDigitado = document.getElementById("usuario").value;
      const password = document.getElementById("password").value;

      const usuarioLimpo = usuarioDigitado.replace(/\D/g, "");

      if (usuarioDigitado.toLowerCase() === "admin" && password === "fenix") {
        window.location.href = "html/admin.html";
        return;
      }

      if (
        (usuarioDigitado === "teste" && password === "123") ||
        (usuarioLimpo === "12345678900" && password === "123")
      ) {
        sessionStorage.setItem("usuarioLogado", usuarioDigitado);
        window.location.href = "html/main.html";
        return;
      }

      loginError.classList.add("show");
    });
  }
});
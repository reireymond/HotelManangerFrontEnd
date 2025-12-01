document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const loginError = document.getElementById("login-error");
  const usuarioInput = document.getElementById("usuario");
  
  const btnSenha = document.getElementById("btn-senha");
  const inputSenha = document.getElementById("password");

  if (btnSenha && inputSenha) {
    btnSenha.addEventListener("click", function () {
      if (inputSenha.type === "password") {
        inputSenha.type = "text";
        btnSenha.classList.remove("bi-eye-slash");
        btnSenha.classList.add("bi-eye");
      } else {
        inputSenha.type = "password";
        btnSenha.classList.remove("bi-eye");
        btnSenha.classList.add("bi-eye-slash");
      }
    });
  }

  if (usuarioInput) {
    usuarioInput.addEventListener("input", function (e) {
      let value = e.target.value;
      const temLetras = /[a-zA-Z]/.test(value);

      if (!temLetras) {
        let numbers = value.replace(/\D/g, "");
        if (numbers.length > 11) numbers = numbers.slice(0, 11);
        if (numbers.length > 9) {
          numbers = numbers.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2}).*/, "$1.$2.$3-$4");
        } else if (numbers.length > 6) {
          numbers = numbers.replace(/^(\d{3})(\d{3})(\d{0,3}).*/, "$1.$2.$3");
        } else if (numbers.length > 3) {
          numbers = numbers.replace(/^(\d{3})(\d{0,3}).*/, "$1.$2");
        }
        e.target.value = numbers;
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      loginError.classList.remove("show");

      const usuarioDigitado = document.getElementById("usuario").value;
      const password = document.getElementById("password").value;
      const usuarioLimpo = usuarioDigitado.replace(/\D/g, "");

      if (
        (usuarioDigitado.toLowerCase() === "admin" || usuarioDigitado === "111") && 
        password === "fenix"
      ) {
        window.location.href = "admin.html";
        return;
      }

      if (
        (usuarioDigitado === "00000000000" && password === "123") ||
        (usuarioLimpo === "12345678900" && password === "123")
      ) {
        sessionStorage.setItem("usuarioLogado", usuarioDigitado);
        window.location.href = "../index.html"; 
        return;
      }

      loginError.classList.add("show");
    });
  }
});

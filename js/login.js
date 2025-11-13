document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const loginError = document.getElementById("login-error");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      loginError.classList.remove("show");

      const usuario = document.getElementById("usuario").value;
      const password = document.getElementById("password").value;

      if (usuario === "admin" && password === "fenix") {
        window.location.href = "admin.html";
        return;
      }

      if (
        (usuario === "kaua" && password === "123") ||
        (usuario === "camily" && password === "123")
      ) {
        window.location.href = "main.html";
        return;
      }

      loginError.classList.add("show");
    });
  }
});
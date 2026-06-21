document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var mobile = document.querySelector(".nav-mobile");
  if (toggle && mobile) {
    toggle.addEventListener("click", function () {
      mobile.classList.toggle("open");
      var expanded = mobile.classList.contains("open");
      toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
    mobile.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobile.classList.remove("open");
      });
    });
  }

  // Contact form: lightweight client-side confirmation (no backend wired yet)
  var form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = document.querySelector("#form-note");
      var name = document.querySelector("#cf-nom");
      if (note) {
        note.textContent =
          "Merci" + (name && name.value ? " " + name.value.split(" ")[0] : "") +
          ", votre demande est enregistrée. (Formulaire de démonstration — à connecter à votre boîte mail ou CRM.)";
        note.style.display = "block";
      }
      form.reset();
    });
  }
});

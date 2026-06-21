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

  // Contact form: ouvre le client mail de l'utilisateur, pré-rempli vers ImmoLeads
  var form = document.querySelector("#contact-form");
  if (form) {
    var CONTACT_EMAIL = "raphaelmagnaux@gmail.com";
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      function val(id) {
        var el = document.querySelector(id);
        return el && el.value ? el.value.trim() : "";
      }

      var nom = val("#cf-nom");
      var agence = val("#cf-agence");
      var ville = val("#cf-ville");
      var tel = val("#cf-tel");
      var email = val("#cf-email");
      var message = val("#cf-message");

      var subject = "Demande d'appel découverte" + (agence ? " — " + agence : "");
      var bodyLines = [
        "Nom et prénom : " + nom,
        "Agence : " + agence,
        "Ville / zone : " + ville,
        "Téléphone : " + tel,
        "Email : " + email,
        "",
        "Situation actuelle :",
        message
      ];
      var mailto =
        "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(bodyLines.join("\n"));

      window.location.href = mailto;

      var note = document.querySelector("#form-note");
      if (note) {
        note.textContent =
          "Merci" + (nom ? " " + nom.split(" ")[0] : "") +
          ", votre logiciel de messagerie vient de s'ouvrir avec votre demande pré-remplie. " +
          "Il ne vous reste plus qu'à l'envoyer. Vous pouvez aussi nous écrire directement à " +
          CONTACT_EMAIL + ".";
        note.style.display = "block";
      }
    });
  }
});

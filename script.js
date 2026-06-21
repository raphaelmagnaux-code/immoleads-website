/* ===================================================================
   En Toute Sérénité 74 — interactions & animations
=================================================================== */
document.addEventListener("DOMContentLoaded", function () {

  /* ----- Lien de réservation à connecter -----
     Remplacez l'URL ci-dessous par votre vrai lien (Resalib, Planity,
     Doctolib…). Tous les boutons "Réserver" pointant vers #reservations
     restent internes ; le bouton principal ouvre ce lien externe.        */
  var BOOKING_URL = "";        // ex. "https://www.resalib.fr/praticien/..."
  var GOOGLE_REVIEW_URL = "";  // ex. "https://g.page/r/XXXX/review"

  var bookingBtn = document.getElementById("bookingBtn");
  if (bookingBtn) {
    if (BOOKING_URL) {
      bookingBtn.setAttribute("href", BOOKING_URL);
      bookingBtn.setAttribute("target", "_blank");
      bookingBtn.setAttribute("rel", "noopener");
    } else {
      bookingBtn.addEventListener("click", function (e) {
        e.preventDefault();
        alert("Lien de réservation à configurer dans script.js (variable BOOKING_URL).");
      });
    }
  }
  if (GOOGLE_REVIEW_URL) {
    document.querySelectorAll(".btn-add-review").forEach(function (a) {
      a.setAttribute("href", GOOGLE_REVIEW_URL);
    });
  }

  /* ----- Header : compact au scroll ----- */
  var header = document.getElementById("header");
  var onScroll = function () {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ----- Menu mobile ----- */
  var toggle = document.querySelector(".nav-toggle");
  var mobile = document.getElementById("navMobile");
  if (toggle && mobile) {
    toggle.addEventListener("click", function () {
      mobile.classList.toggle("open");
      toggle.classList.toggle("open");
      toggle.setAttribute("aria-expanded", mobile.classList.contains("open"));
    });
    mobile.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobile.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ----- Apparition au scroll (reveal) ----- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ----- Nav : surlignage de la section active ----- */
  var navLinks = document.querySelectorAll(".nav-links a");
  var sections = [];
  navLinks.forEach(function (l) {
    var id = l.getAttribute("href");
    if (id && id.charAt(0) === "#") {
      var sec = document.querySelector(id);
      if (sec) sections.push({ link: l, sec: sec });
    }
  });
  var spy = function () {
    var pos = window.scrollY + 120;
    var current = null;
    sections.forEach(function (s) {
      if (s.sec.offsetTop <= pos) current = s;
    });
    navLinks.forEach(function (l) { l.classList.remove("active"); });
    if (current) current.link.classList.add("active");
  };
  spy();
  window.addEventListener("scroll", spy, { passive: true });

  /* ----- Carrousel du hero ----- */
  var carousel = document.getElementById("carousel");
  if (carousel) {
    var slides = Array.prototype.slice.call(carousel.querySelectorAll(".slide"));
    var dotsWrap = document.getElementById("dots");
    var idx = 0, timer;

    // Si une vraie image existe (data-img), on la charge en fond
    slides.forEach(function (s) {
      var src = s.getAttribute("data-img");
      if (src) {
        var probe = new Image();
        probe.onload = function () {
          s.style.backgroundImage = "url('" + src + "')";
          var ic = s.querySelector(".ph-icon");
          if (ic) ic.style.display = "none";
        };
        probe.src = src;
      }
    });

    // Pastilles
    slides.forEach(function (_, i) {
      var b = document.createElement("button");
      b.setAttribute("aria-label", "Voir la photo " + (i + 1));
      if (i === 0) b.classList.add("active");
      b.addEventListener("click", function () { go(i); restart(); });
      dotsWrap.appendChild(b);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    function go(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle("is-active", i === idx); });
      dots.forEach(function (d, i) { d.classList.toggle("active", i === idx); });
    }
    function next() { go(idx + 1); }
    function restart() { clearInterval(timer); timer = setInterval(next, 5000); }

    carousel.parentElement.querySelector(".next").addEventListener("click", function () { next(); restart(); });
    carousel.parentElement.querySelector(".prev").addEventListener("click", function () { go(idx - 1); restart(); });
    restart();
  }

  /* ----- Chargement des images placeholder (frames .portrait, etc.) ----- */
  document.querySelectorAll("[data-img]").forEach(function (el) {
    if (el.classList.contains("slide")) return; // déjà géré
    var src = el.getAttribute("data-img");
    var probe = new Image();
    probe.onload = function () {
      el.style.backgroundImage = "url('" + src + "')";
      var ic = el.querySelector(".ph-icon");
      if (ic) ic.style.display = "none";
    };
    probe.src = src;
  });
});

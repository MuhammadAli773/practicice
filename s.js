
 
document.addEventListener('DOMContentLoaded', function () {
 
  // ---- Envoi dyal formulaire dyal devis ----
  const form = document.querySelector('#contact form');
 
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // wa9ef l page bach ma t3awadch t'reload
 
      const submitBtn = form.querySelector('.form-submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Envoi en cours...';
      submitBtn.disabled = true;
 
      //  formspree.io
      fetch('https://formspree.io/f/xrpzlaqe', {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            submitBtn.textContent = 'Demande envoyée ✓';
            form.reset();
          } else {
            submitBtn.textContent = 'Erreur, réessayez';
          }
        })
        .catch(function () {
          submitBtn.textContent = 'Erreur, réessayez';
        })
        .finally(function () {
          setTimeout(function () {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, 3000);
        });
    });
  }
 
});
 // ---- Slider (photos + vidéos) ----
document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.slider');
  if (!slider) return;
 
  const track = slider.querySelector('.slider-track');
  const slides = Array.from(slider.querySelectorAll('.slide'));
  const dotsWrap = slider.querySelector('.slider-dots');
  const prevBtn = slider.querySelector('.slider-btn.prev');
  const nextBtn = slider.querySelector('.slider-btn.next');
  let index = 0;
 
  // Bni les dots automatiquement
  slides.forEach(function (_, i) {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Aller à la diapositive ' + (i + 1));
    dot.addEventListener('click', function () { goTo(i); });
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.querySelectorAll('.dot'));
 
  function pauseAllVideos() {
    slides.forEach(function (s) {
      const v = s.querySelector('video');
      if (v) v.pause();
    });
  }
 
  function goTo(i) {
    pauseAllVideos();
    index = (i + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + (index * 100) + '%)';
    dots.forEach(function (d, di) { d.classList.toggle('active', di === index); });
  }
 
  prevBtn.addEventListener('click', function () { goTo(index - 1); });
  nextBtn.addEventListener('click', function () { goTo(index + 1); });
});
 
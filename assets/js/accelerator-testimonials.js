// Manual navigation only; without JavaScript all participant feedback stays readable.
document.querySelectorAll('.accelerator-testimonials').forEach(function (carousel) {
  if (carousel.dataset.ready) return;
  carousel.dataset.ready = 'true';
  var slides = Array.from(carousel.querySelectorAll('.accelerator-testimonials__card'));
  var controls = carousel.querySelector('.accelerator-testimonials__controls');
  var position = carousel.querySelector('.accelerator-testimonials__position');
  var narrow = window.matchMedia('(max-width: 767px)');
  var page = 0;
  var perPage = 1;
  var pages = 1;
  if (!slides.length) return;
  function render() {
    slides.forEach(function (slide, number) {
      slide.hidden = Math.floor(number / perPage) !== page;
    });
    position.textContent = (page + 1) + ' / ' + pages;
    controls.querySelectorAll('button').forEach(function (button) {
      button.disabled = pages < 2;
    });
  }
  function resize() {
    var firstVisible = page * perPage;
    perPage = narrow.matches ? 1 : Number(carousel.dataset.perPage) || 1;
    pages = Math.ceil(slides.length / perPage);
    page = Math.min(Math.floor(firstVisible / perPage), pages - 1);
    render();
  }
  controls.hidden = false;
  controls.querySelectorAll('button').forEach(function (button) {
    button.addEventListener('click', function () {
      page = (page + Number(button.dataset.direction) + pages) % pages;
      render();
    });
  });
  narrow.addEventListener('change', resize);
  resize();
});

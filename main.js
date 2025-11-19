const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', (!expanded).toString());
});

const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox img');
const lightboxCaption = document.querySelector('.lightbox-caption');

if (lightbox) {
  document.querySelectorAll('.gallery-tile').forEach((tile) => {
    tile.addEventListener('click', () => {
      const img = tile.querySelector('img');
      lightboxImg.src = img?.src ?? '';
      lightboxImg.alt = img?.alt ?? '';
      lightboxCaption.textContent = tile.dataset.caption ?? '';
      lightbox.classList.add('is-visible');
    });
  });

  const closeModal = () => lightbox.classList.remove('is-visible');
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeModal();
    }
  });
  document.querySelector('.lightbox-close')?.addEventListener('click', closeModal);
}

const enquiryForm = document.querySelector('#enquiry-form');
const feedbackBanner = document.querySelector('.form-feedback');

if (enquiryForm && feedbackBanner) {
  enquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(enquiryForm);
    const requiredFields = ['name', 'email', 'eventType', 'eventDate'];
    const invalid = requiredFields.some((field) => !(formData.get(field)?.toString().trim()));

    if (invalid) {
      feedbackBanner.textContent = 'Please complete all required fields.';
      feedbackBanner.dataset.state = 'error';
      feedbackBanner.hidden = false;
      return;
    }

    const name = formData.get('name');
    feedbackBanner.textContent = Thank you ! We will confirm availability within 24 hours.;
    feedbackBanner.dataset.state = 'success';
    feedbackBanner.hidden = false;
    enquiryForm.reset();
  });
}

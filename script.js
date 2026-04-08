const categorySelect = document.getElementById('category');
const form = document.getElementById('applyForm');
const steps = Array.from(document.querySelectorAll('.form-step'));
const progressSteps = Array.from(document.querySelectorAll('.progress-step'));
const progressFill = document.getElementById('progressFill');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const programCards = document.querySelectorAll('.program-card');
const programForm = document.getElementById('programForm');
const crewDetail = document.getElementById('crewDetail');
const crewName = document.getElementById('crewName');
const crewDesc = document.getElementById('crewDesc');
const cancelBtn = document.getElementById('cancelBtn');
const programSuccessMessage = document.getElementById('programSuccessMessage');
const raceCategoryCards = document.querySelectorAll('.race-category-card');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.getElementById('mobileMenu');

let currentStep = 1;
const validCategories = new Set(['male2', 'female2', 'mixed4']);

function closeMobileMenu() {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.classList.remove('is-open');
  mobileMenu.classList.remove('open');
  document.body.classList.remove('menu-open');
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 640) {
      closeMobileMenu();
    }
  });
}

function updateProgress() {
  if (!progressFill || !prevBtn || !nextBtn || !submitBtn || !steps.length || !progressSteps.length) {
    return;
  }
  progressSteps.forEach((step, index) => {
    step.classList.toggle('active', index + 1 <= currentStep);
  });
  progressFill.style.width = `${(currentStep / 2) * 100}%`;
  prevBtn.disabled = currentStep === 1;
  nextBtn.classList.toggle('hidden', currentStep === 2);
  submitBtn.classList.toggle('hidden', currentStep !== 2);
  steps.forEach(step => step.classList.toggle('active', Number(step.dataset.step) === currentStep));
}

function validateCurrentStep() {
  const activeStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
  if (!activeStep) return true;
  const fields = activeStep.querySelectorAll('input, select, textarea');
  for (const field of fields) {
    if (!field.checkValidity()) {
      field.reportValidity();
      return false;
    }
  }
  return true;
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    if (validateCurrentStep() && currentStep < 2) {
      currentStep += 1;
      updateProgress();
    }
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    if (currentStep > 1) {
      currentStep -= 1;
      updateProgress();
    }
  });
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateCurrentStep()) return;
    form.classList.add('hidden');
    successMessage.classList.remove('hidden');
    window.scrollTo({ top: successMessage.offsetTop - 100, behavior: 'smooth' });
  });

  const params = new URLSearchParams(window.location.search);
  const selectedCategory = params.get('category');
  if (categorySelect && validCategories.has(selectedCategory)) {
    categorySelect.value = selectedCategory;
  }

  updateProgress();
}

if (programCards.length && programForm && crewDetail && crewName && crewDesc && cancelBtn && programSuccessMessage) {
  programCards.forEach(card => {
    card.addEventListener('click', () => {
      const crew = card.dataset.crew;
      const desc = card.dataset.desc;
      crewName.textContent = crew;
      crewDesc.textContent = desc;
      crewDetail.classList.remove('hidden');
      programSuccessMessage.classList.add('hidden');
      programForm.classList.remove('hidden');
      programForm.reset();
      crewDetail.scrollIntoView({ behavior: 'smooth' });
    });
  });

  cancelBtn.addEventListener('click', () => {
    crewDetail.classList.add('hidden');
    programForm.reset();
  });

  programForm.addEventListener('submit', (e) => {
    e.preventDefault();
    programForm.classList.add('hidden');
    programSuccessMessage.classList.remove('hidden');
    window.scrollTo({ top: programSuccessMessage.offsetTop - 100, behavior: 'smooth' });
  });
}

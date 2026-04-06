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
const programFeedback = document.getElementById('program-feedback');
const programForm = document.getElementById('programForm');
const raceCategoryCards = document.querySelectorAll('.race-category-card');

let currentStep = 1;

function updateProgress() {
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
  const fields = activeStep.querySelectorAll('input, select, textarea');
  for (const field of fields) {
    if (!field.checkValidity()) {
      field.reportValidity();
      return false;
    }
  }
  return true;
}

prevBtn.addEventListener('click', () => {
  if (currentStep > 1) {
    currentStep -= 1;
    updateProgress();
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validateCurrentStep()) return;
  form.classList.add('hidden');
  successMessage.classList.remove('hidden');
  window.scrollTo({ top: successMessage.offsetTop - 100, behavior: 'smooth' });
});

programCards.forEach(card => {
  card.addEventListener('click', () => {
    programFeedback.textContent = `${card.dataset.program} 신청 폼입니다.`;
    programForm.classList.remove('hidden');
    programForm.scrollIntoView({ behavior: 'smooth' });
  });
});

programForm.addEventListener('submit', (e) => {
  e.preventDefault();
  programForm.classList.add('hidden');
  programFeedback.textContent = '신청이 완료되었습니다.';
});

raceCategoryCards.forEach(card => {
  card.addEventListener('click', () => {
    const category = card.dataset.category;
    categorySelect.value = category;
    document.getElementById('apply').scrollIntoView({ behavior: 'smooth' });
  });
});

updateProgress();

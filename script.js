const resumeModal = document.getElementById('resumeModal');
const resumeButtons = [
  document.getElementById('resumeBtn'),
  document.getElementById('resumeBtnSecondary'),
].filter(Boolean);
const closeResume = document.getElementById('closeResume');
const cursorGlow = document.querySelector('.cursor-glow');

for (const button of resumeButtons) {
  button.addEventListener('click', () => resumeModal.showModal());
}

closeResume.addEventListener('click', () => resumeModal.close());
resumeModal.addEventListener('click', (event) => {
  const dialogBounds = resumeModal.getBoundingClientRect();
  const clickedOutside =
    event.clientX < dialogBounds.left ||
    event.clientX > dialogBounds.right ||
    event.clientY < dialogBounds.top ||
    event.clientY > dialogBounds.bottom;

  if (clickedOutside) {
    resumeModal.close();
  }
});

document.addEventListener('pointermove', (event) => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && resumeModal.open) {
    resumeModal.close();
  }
});

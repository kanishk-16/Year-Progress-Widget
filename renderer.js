// === renderer.js ===

// Format date nicely
function formatDate(date) {
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

// Calculate year progress
function calculateYearProgress() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const end = new Date(now.getFullYear() + 1, 0, 1);
  const progress = ((now - start) / (end - start)) * 100;
  return progress;
}

// Update UI
function updateUI() {
  const now = new Date();
  const progress = calculateYearProgress();

  document.getElementById('date').textContent = formatDate(now);
  document.getElementById('percent').textContent = `${progress.toFixed(2)}% of the year has passed`;

  const progressBar = document.getElementById('progress-bar');
  progressBar.style.width = `${progress.toFixed(2)}%`;

  // Show random quote
  const quotes = [
    "He who is brave is free. – Seneca",
    "We suffer more in imagination than in reality. – Seneca",
    "You could leave life right now. Let that determine what you do. – Marcus Aurelius",
    "Don’t explain your philosophy. Embody it. – Epictetus",
    "Waste no more time arguing what a good man should be. Be one. – Marcus Aurelius",
  ];
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('quote').textContent = quote;
}

// Run on load
updateUI();

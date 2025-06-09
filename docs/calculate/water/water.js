document.getElementById('waterForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const weight = parseFloat(document.getElementById('weight').value);
  const result = document.getElementById('result');

  if (weight <= 0) {
    result.textContent = "Geçerli bir kilo girin.";
    return;
  }

  const waterNeed = (weight * 35) / 1000; 
  result.textContent = `Günlük su ihtiyacınız: ${waterNeed.toFixed(2)} litre`;

  // Chart.js ile günlük su ihtiyacı grafiği
  const ctx = document.getElementById('waterChart').getContext('2d');
  if (window.waterChartInstance) window.waterChartInstance.destroy();

  const weights = [weight - 10, weight, weight + 10];
  const waterNeeds = weights.map(w => (w * 35) / 1000);

  window.waterChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: weights.map(w => w.toFixed(1) + ' kg'),
      datasets: [{
        label: 'Günlük Su İhtiyacı (litre)',
        data: waterNeeds,
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
        title: {
          display: true,
          text: `Günlük Su İhtiyacı: ${waterNeed.toFixed(2)} litre`
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Su İhtiyacı (litre)' }
        }
      }
    }
  });
});

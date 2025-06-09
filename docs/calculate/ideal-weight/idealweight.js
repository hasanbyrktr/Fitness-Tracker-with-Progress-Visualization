document.getElementById('idealForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const gender = document.getElementById('gender').value;
  const height = parseInt(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const age = parseInt(document.getElementById('age').value);
  const resultDiv = document.getElementById('result');

  // Negatif ve sıfır değer kontrolü
  if (!gender || height <= 0 || weight <= 0 || age <= 0) {
    resultDiv.textContent = "Lütfen geçerli bir boy, kilo ve yaş giriniz.";
    return;
  }

  let idealWeight;

  if (gender === "male") {
    idealWeight = 50 + 2.3 * ((height / 2.54) - 60);
  } else {
    idealWeight = 45.5 + 2.3 * ((height / 2.54) - 60);
  }

  idealWeight = parseFloat(idealWeight.toFixed(1));

  const diff = parseFloat((weight - idealWeight).toFixed(1));
  let comment = "";

  if (diff > 3) {
    comment = `İdeal kilonuz ${idealWeight} kg. Mevcut kilonuzun ${diff} kg üzerindesiniz.`;
  } else if (diff < -3) {
    comment = `İdeal kilonuz ${idealWeight} kg. Mevcut kilonuzun ${Math.abs(diff)} kg altındasınız.`;
  } else {
    comment = `Tebrikler! İdeal kilonuzdasınız. (${idealWeight} kg)`;
  }

  resultDiv.textContent = comment;

  // Chart.js ile +-3kg aralığı ve mevcut kilo gösterimi
  const ctx = document.getElementById('idealChart').getContext('2d');
  if (window.idealChartInstance) window.idealChartInstance.destroy();

  const lower = idealWeight - 3;
  const upper = idealWeight + 3;
  const xLabels = ['İdeal-3', 'İdeal', 'İdeal+3'];
  const idealData = [lower, idealWeight, upper];
  const currentData = [weight, weight, weight];

  window.idealChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: xLabels,
      datasets: [
        {
          label: 'İdeal Kilo Aralığı',
          data: idealData,
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Mevcut Kilo',
          data: currentData,
          borderColor: '#FF6384',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: false,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
        title: {
          display: true,
          text: `İdeal Kilo: ${idealWeight.toFixed(1)} kg, Mevcut Kilo: ${weight.toFixed(1)} kg`
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Kilo (kg)' }
        }
      }
    }
  });
});

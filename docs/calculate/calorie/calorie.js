document.getElementById('calorieForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const gender = document.getElementById('gender').value;
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  const age = parseInt(document.getElementById('age').value);
  const activity = document.getElementById('activity').value;
  const result = document.getElementById('result');

  if (!gender || weight <= 0 || height <= 0 || age <= 0 || !activity) {
    result.textContent = "Tüm bilgileri doğru şekilde doldurun.";
    return;
  }

  let bmr;

  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  let activityMultiplier;
  switch(activity) {
    case 'sedentary':
      activityMultiplier = 1.2;  // Hareketsiz
      break;
    case 'light':
      activityMultiplier = 1.375; // Düşük
      break;
    case 'moderate':
      activityMultiplier = 1.55;  // Orta
      break;
    case 'high':
      activityMultiplier = 1.725; // Yüksek
      break;
    case 'veryHigh':
      activityMultiplier = 1.9;   // Çok Yüksek
      break;
    default:
      activityMultiplier = 1.2;
  }

  const dailyCalories = bmr * activityMultiplier; 

  result.textContent = `Günlük kalori ihtiyacınız yaklaşık ${dailyCalories.toFixed(0)} kcal.`;

  // Chart.js ile makrolar cinsinden donut grafik
  const ctx = document.getElementById('calorieChart').getContext('2d');
  if (window.calorieChartInstance) window.calorieChartInstance.destroy();

  const protein = weight * 2.2; // Kilo başına 2.2g protein
  const proteinCalories = protein * 4; // 1g protein = 4 kcal
  const remainingCalories = dailyCalories - proteinCalories;
  const carbs = (remainingCalories * 0.6) / 4; // Kalan kalorinin %60'ı karbonhidrat
  const fat = (remainingCalories * 0.4) / 9;   // Kalan kalorinin %40'ı yağ

  window.calorieChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Protein', 'Karbonhidrat', 'Yağ'],
      datasets: [{
        data: [protein, carbs, fat],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
        title: {
          display: true,
          text: `Makrolar (g)`
        }
      }
    }
  });
});

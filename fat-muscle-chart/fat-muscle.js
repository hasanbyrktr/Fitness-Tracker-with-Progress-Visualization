    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const hipField = document.getElementById("hipField");

    genderInputs.forEach(input => {
      input.addEventListener("change", () => {
        hipField.classList.toggle("hidden", input.value !== "female");
      });
    });

    document.getElementById("bodyForm").addEventListener("submit", function(e) {
      e.preventDefault();

      const gender = document.querySelector('input[name="gender"]:checked').value;
      const height = parseFloat(document.getElementById("height").value);
      const waist = parseFloat(document.getElementById("waist").value);
      const neck = parseFloat(document.getElementById("neck").value);
      const hip = parseFloat(document.getElementById("hip").value);

      let bodyFat;

      if (gender === "male") {
        bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
      } else {
        if (isNaN(hip)) {
          alert("Lütfen kalça çevresini girin.");
          return;
        }
        bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
      }

      const fatPercent = bodyFat.toFixed(2);
      const musclePercent = (75 - bodyFat).toFixed(2);
      const otherPercent = (100 - bodyFat - musclePercent).toFixed(2);

      document.getElementById("result").innerHTML = `
        <p><strong>Vücut Yağ Oranı:</strong> %${fatPercent}</p>
        <p><strong>Tahmini Kas Oranı:</strong> %${musclePercent}</p>
        <p><strong>Diğer (Kemik/Su):</strong> %${otherPercent}</p>
      `;

      const ctx = document.getElementById("chartCanvas").getContext("2d");
      if (window.bodyChart) window.bodyChart.destroy();

      window.bodyChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Yağ (%)', 'Kas (%)', 'Diğer (%)'],
          datasets: [{
            data: [fatPercent, musclePercent, otherPercent],
            backgroundColor: ['#FFCE56','#FF6384', '#36A2EB' ]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    });
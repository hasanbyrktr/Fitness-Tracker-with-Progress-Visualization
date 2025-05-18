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

  idealWeight = idealWeight.toFixed(1);

  const diff = (weight - idealWeight).toFixed(1);
  let comment = "";

  if (diff > 3) {
    comment = `İdeal kilonuz ${idealWeight} kg. Mevcut kilonuzun ${diff} kg üzerindesiniz.`;
  } else if (diff < -3) {
    comment = `İdeal kilonuz ${idealWeight} kg. Mevcut kilonuzun ${Math.abs(diff)} kg altındasınız.`;
  } else {
    comment = `Tebrikler! İdeal kilonuzdasınız. (${idealWeight} kg)`;
  }

  resultDiv.textContent = comment;
});

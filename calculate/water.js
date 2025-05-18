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
});

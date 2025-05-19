document.getElementById('calorieForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const gender = document.getElementById('gender').value;
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  const age = parseInt(document.getElementById('age').value);
  const result = document.getElementById('result');

  if (!gender || weight <= 0 || height <= 0 || age <= 0) {
    result.textContent = "Tüm bilgileri doğru şekilde doldurun.";
    return;
  }

  let bmr;

  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const dailyCalories = bmr * 1.55; 

  result.textContent = `Günlük kalori ihtiyacınız yaklaşık ${dailyCalories.toFixed(0)} kcal.`;
});

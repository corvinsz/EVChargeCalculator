import { Car, cars } from './car.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calculatorForm');
  const resultDiv = document.getElementById('result');
  const capacityInputType = document.getElementById('capacityInputType');
  const carSelect = document.getElementById('carSelect');

  // Populate car options
  cars.forEach((car, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = car.name;
    carSelect.appendChild(option);
  });

  carSelect.addEventListener('selectionchange', () => {
    selectedCar = cars[carSelect.value]
    alert(selectedCar)
  });

  capacityInputType.addEventListener('change', () => {
    const selectedType = capacityInputType.value;
    if (selectedType === 'percentage') {
      capacityUnit.textContent = 'Enter as a percentage';
    } else if (selectedType === 'km') {
      capacityUnit.textContent = 'Enter in kilometers';
    }
  });

   form.addEventListener('submit', (event) => {
    event.preventDefault();

        const selectedCarIndex = carSelect.value;
        if (selectedCarIndex === '') {
          resultDiv.innerHTML = '<div class="alert alert-danger">Please select a car.</div>';
          return;
        }

        const selectedCar = cars[selectedCarIndex];

    const maxRange = parseFloat(document.getElementById('maxRange').value);
    const currentCapacity = parseFloat(document.getElementById('currentCapacity').value);
    const chargingRate = parseFloat(document.getElementById('chargingRate').value);
    const selectedType = capacityInputType.value;

    if (isNaN(maxRange) || isNaN(currentCapacity) || isNaN(chargingRate)) {
      resultDiv.innerHTML = '<div class="alert alert-danger">Please enter valid numbers in all fields.</div>';
      return;
    }

    let currentRange;
    if (selectedType === 'percentage') {
      currentRange = (currentCapacity / 100) * maxRange;
    } else if (selectedType === 'km') {
      currentRange = currentCapacity;
    }

    const rangeToFullCharge = maxRange - currentRange;
    const timeToFullCharge = rangeToFullCharge / chargingRate;
    const timeToFullChargeMinutes = Math.round(timeToFullCharge * 60);

    const now = new Date();
    const doneChargingDate = new Date(now.getTime() + timeToFullChargeMinutes * 60000);

    const doneChargingDateString = doneChargingDate.toLocaleString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const hoursLeft = Math.floor(timeToFullCharge);
    const minutesLeft = Math.round((timeToFullCharge - hoursLeft) * 60);

    const timeLeftString = `${hoursLeft.toString().padStart(2, '0')}:${minutesLeft.toString().padStart(2, '0')}h left`;

    resultDiv.innerHTML = `<div class="alert alert-info">Done charging: ${doneChargingDateString} (${timeLeftString})</div>`;
  });
});

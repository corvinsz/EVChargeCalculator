import { Cars } from "./car/carProvider.js";

function populateCarDropdown() {
  const carDropdown = document.getElementById('carDropdown') as HTMLSelectElement;
  // Clear existing options
  carDropdown.innerHTML = '<option selected>Choose...</option>';

  // Add new options from the cars array
  Cars.forEach(car => {
      const option = document.createElement('option');
      option.value = car.name; // Use the car's name as the value
      option.text = `${car.name} (Range: ${car.maxRange}km)`; // Display name and max range
      carDropdown.appendChild(option);
  });
}

function calculateTime(event: Event) {
  event.preventDefault(); // Prevent form from submitting and refreshing the page

  const resultDiv = document.getElementById('result') as HTMLDivElement;
  const capacityInputType = document.getElementById('capacityInputType') as HTMLSelectElement;

  const maxRange = parseFloat((document.getElementById('maxRange') as HTMLInputElement).value);
    const currentCapacity = parseFloat((document.getElementById('currentCapacity') as HTMLInputElement).value);
    const chargingRate = parseFloat((document.getElementById('chargingRate') as HTMLInputElement).value);
    const selectedType = capacityInputType.value;

    if (isNaN(maxRange) || isNaN(currentCapacity) || isNaN(chargingRate)) {
      resultDiv.innerHTML = '<div class="alert alert-danger">Please enter valid numbers in all fields.</div>';
      return;
    }

    let currentRange: number;
    if (selectedType === '%') {
      currentRange = (currentCapacity / 100) * maxRange;
    } else if (selectedType === 'km') {
      currentRange = currentCapacity;
    } else {
      resultDiv.innerHTML = '<div class="alert alert-danger">Please select a valid capacity input type.</div>';
      return;
    }

    const missingRange = maxRange - currentRange;
    const timeToFullCharge = missingRange / chargingRate;
    const timeToFullChargeMinutes = Math.round(timeToFullCharge * 60);

    const now = new Date();
    const doneChargingDate = new Date(now.getDate() + timeToFullChargeMinutes * 60000);

    const doneChargingDateString: string = doneChargingDate.toLocaleString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const hoursLeft = Math.floor(timeToFullCharge);
    const minutesLeft = Math.round((timeToFullCharge - hoursLeft) * 60);

    //const timeLeftString = `${hoursLeft.toString().pad(2, '0')}:${minutesLeft.toString().padStart(2, '0')}h left`;
    const timeLeftString = `${hoursLeft.toString()}:${minutesLeft.toString()}h left`;

    resultDiv.innerHTML = `<div class="alert alert-info">Done charging: ${doneChargingDateString} (${timeLeftString})</div>`;
}

function onCarSelected(event: Event) {
  const tbMaxRange = document.getElementById('maxRange') as HTMLInputElement;
  const selectedDropdownItem = event.target as HTMLSelectElement;

  const selectedCar = Cars.find(x => x.name === selectedDropdownItem.value);
  if (selectedCar === undefined)
  {
    return;
  }
  
  tbMaxRange.value = selectedCar.maxRange.toString();
}

function onMaxRangeChanged(this: HTMLInputElement, ev: Event) {
  const carDropdown = document.getElementById('carDropdown') as HTMLSelectElement;
  carDropdown.selectedIndex = 0;
}



function initData() {
  const tbMaxRange = document.getElementById('maxRange') as HTMLInputElement;
  tbMaxRange.addEventListener('input', onMaxRangeChanged);


  const carDropdown = document.getElementById('carDropdown') as HTMLSelectElement;
  carDropdown.addEventListener('change', onCarSelected);
  populateCarDropdown();

  const form = document.getElementById('calculatorForm') as HTMLFormElement;
  form.addEventListener('submit', calculateTime);

}

document.addEventListener('DOMContentLoaded', initData);

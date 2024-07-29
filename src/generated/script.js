import { Cars } from "./car/carProvider.js";
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calculatorForm');
    const resultDiv = document.getElementById('result');
    const capacityInputType = document.getElementById('capacityInputType');
    const carSelect = document.getElementById('carSelect');
    // Populate car options
    // cars.forEach((car, index) => {
    //   const option = document.createElement('option');
    //   option.value = index.toString();
    //   option.textContent = car.name;
    //   carSelect.appendChild(option);
    // });
    // carSelect.addEventListener('selectionchange', () => {
    //   selectedCar = cars[carSelect.value]
    //   alert(selectedCar)
    // });
    const carouselContent = document.getElementById('carouselContent');
    alert("populating content");
    carouselContent.innerHTML = Cars.map((car, index) => createCarouselItem(car, index === 0)).join('');
    function createCarouselItem(car, isActive) {
        return `
      <div class="carousel-item ${isActive ? 'active' : ''}">
        <img src="${car.image}" class="d-block w-100" alt="${car.name}">
        <div class="carousel-caption d-none d-md-block">
          <h5>${car.name}</h5>
          <p>Max Range: ${car.maxRange} miles</p>
        </div>
      </div>
    `;
    }
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form from submitting and refreshing the page
        // const selectedCarIndex = carSelect.value;
        // if (selectedCarIndex === '') {
        //   resultDiv.innerHTML = '<div class="alert alert-danger">Please select a car.</div>';
        //   return;
        // }
        // const selectedCar = cars[selectedCarIndex];
        const maxRange = parseFloat(document.getElementById('maxRange').value);
        const currentCapacity = parseFloat(document.getElementById('currentCapacity').value);
        const chargingRate = parseFloat(document.getElementById('chargingRate').value);
        const selectedType = capacityInputType.value;
        if (isNaN(maxRange) || isNaN(currentCapacity) || isNaN(chargingRate)) {
            resultDiv.innerHTML = '<div class="alert alert-danger">Please enter valid numbers in all fields.</div>';
            return;
        }
        let currentRange;
        if (selectedType === '%') {
            currentRange = (currentCapacity / 100) * maxRange;
        }
        else if (selectedType === 'km') {
            currentRange = currentCapacity;
        }
        else {
            resultDiv.innerHTML = '<div class="alert alert-danger">Please select a valid capacity input type.</div>';
            return;
        }
        const missingRange = maxRange - currentRange;
        const timeToFullCharge = missingRange / chargingRate;
        const timeToFullChargeMinutes = Math.round(timeToFullCharge * 60);
        const now = new Date();
        const doneChargingDate = new Date(now.getDate() + timeToFullChargeMinutes * 60000);
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
        //const timeLeftString = `${hoursLeft.toString().pad(2, '0')}:${minutesLeft.toString().padStart(2, '0')}h left`;
        const timeLeftString = `${hoursLeft.toString()}:${minutesLeft.toString()}h left`;
        resultDiv.innerHTML = `<div class="alert alert-info">Done charging: ${doneChargingDateString} (${timeLeftString})</div>`;
    });
});

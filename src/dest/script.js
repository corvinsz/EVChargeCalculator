import { calculator } from "./calculator.js";
import { Cars } from "./car/carProvider.js";
function populateCarDropdown() {
    const carDropdown = document.getElementById("carDropdown");
    // Clear existing options
    carDropdown.innerHTML = "<option selected>Choose...</option>";
    // Add new options from the cars array
    Cars.forEach((car) => {
        const option = document.createElement("option");
        option.value = car.name; // Use the car's name as the value
        option.text = `${car.name} (Range: ${car.maxRange}km)`; // Display name and max range
        carDropdown.appendChild(option);
    });
}
function calculateTime(event) {
    event.preventDefault(); // Prevent form from submitting and refreshing the page
    const resultDiv = document.getElementById("result");
    const capacityInputType = document.getElementById("capacityInputType");
    const maxRange = parseFloat(document.getElementById("maxRange").value);
    const currentCapacity = parseFloat(document.getElementById("currentCapacity").value);
    const chargingRate = parseFloat(document.getElementById("chargingRate").value);
    const selectedType = capacityInputType.value;
    if (isNaN(maxRange) || isNaN(currentCapacity) || isNaN(chargingRate)) {
        resultDiv.innerHTML =
            '<div class="alert alert-danger">Please enter valid numbers in all fields.</div>';
        return;
    }
    let currentRange;
    if (selectedType === "%") {
        currentRange = (currentCapacity / 100) * maxRange;
    }
    else if (selectedType === "km") {
        currentRange = currentCapacity;
    }
    else {
        resultDiv.innerHTML =
            '<div class="alert alert-danger">Please select a valid capacity input type.</div>';
        return;
    }
    const timeLeft = calculator.calculateChargingTime(maxRange, currentRange, chargingRate);
    const now = new Date();
    const doneChargingDate = new Date(now.getTime() + timeLeft.totalMinutes * 60000);
    // console.log(doneChargingDate.toDateString());
    // console.log(doneChargingDate.toISOString());
    // console.log(doneChargingDate.toJSON());
    // console.log(doneChargingDate.toLocaleDateString());
    // console.log(doneChargingDate.toLocaleString());
    // console.log(doneChargingDate.toLocaleTimeString());
    // console.log(doneChargingDate.toString());
    // console.log(doneChargingDate.toTimeString());
    // console.log(doneChargingDate.toUTCString());
    // const doneChargingDateString: string = doneChargingDate.toLocaleString(
    //   "en-GB",
    //   {
    //     year: "numeric",
    //     month: "2-digit",
    //     day: "2-digit",
    //     hour: "2-digit",
    //     minute: "2-digit",
    //     hour12: false,
    //   }
    // );
    //const timeLeftString = `${hoursLeft.toString().pad(2, '0')}:${minutesLeft.toString().padStart(2, '0')}h left`;
    const timeLeftString = `${timeLeft.hours}:${timeLeft.minutes}h left`;
    resultDiv.innerHTML = `<div class="alert alert-info">Done charging: ${doneChargingDate.toLocaleString()} (${timeLeftString})</div>`;
}
function onCarSelected(event) {
    const tbMaxRange = document.getElementById("maxRange");
    const selectedDropdownItem = event.target;
    const selectedCar = Cars.find((x) => x.name === selectedDropdownItem.value);
    if (selectedCar === undefined) {
        return;
    }
    tbMaxRange.value = selectedCar.maxRange.toString();
}
function onMaxRangeChanged(ev) {
    const carDropdown = document.getElementById("carDropdown");
    carDropdown.selectedIndex = 0;
}
function initData() {
    const tbMaxRange = document.getElementById("maxRange");
    tbMaxRange.addEventListener("input", onMaxRangeChanged);
    const carDropdown = document.getElementById("carDropdown");
    carDropdown.addEventListener("change", onCarSelected);
    populateCarDropdown();
    const form = document.getElementById("calculatorForm");
    form.addEventListener("submit", calculateTime);
}
document.addEventListener("DOMContentLoaded", initData);

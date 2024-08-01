// car.js
// class Car {
//     constructor(name: string, maxRange: number, imageSource: string) {
//       this.name = name;
//       this.maxRange = maxRange;
//       this.imageSource = imageSource;
//     }

//     calculateChargingTime(currentCapacity) {
//       const currentRange = (currentCapacity / 100) * this.maxRange;
//       const rangeToFullCharge = this.maxRange - currentRange;
//       const timeToFullCharge = rangeToFullCharge / this.chargingRate;
//       return timeToFullCharge;
//     }
//   }

//   const cars = [
//     new Car('Tesla Model Y LR 2023', 525),
//     new Car('Nissan Leaf', 270),
//     new Car('BMW i3', 300)
//     // Add more cars as needed
//   ];

interface Car {
  name: string;
  maxRange: number;
}

export { Car };

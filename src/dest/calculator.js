import { TimeSpan } from "./timeSpan.js";
export class calculator {
    static calculateChargingTime(maxRange, currentRange, chargingRate) {
        const missingRange = maxRange - currentRange;
        const timeToFullCharge = missingRange / chargingRate;
        const timeToFullChargeMinutes = Math.round(timeToFullCharge * 60);
        return TimeSpan.fromMinutes(timeToFullChargeMinutes);
    }
}

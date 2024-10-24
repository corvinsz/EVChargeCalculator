import { TimeSpan } from "./timeSpan.js";

export class calculator {
  public static calculateChargingTime(
    maxRange: number,
    currentRange: number,
    chargingRate: number
  ): TimeSpan {
    const missingRange = maxRange - currentRange;
    const timeToFullCharge = missingRange / chargingRate;
    const timeToFullChargeMinutes = Math.round(timeToFullCharge * 60);

    return TimeSpan.fromMinutes(timeToFullChargeMinutes);
  }
}

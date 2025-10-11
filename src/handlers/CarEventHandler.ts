import { MileageEventArgs } from "../events/EventArgs";
import { Car } from "@model/Car";

export class CarEventHandler {
    public static onMaxMileageReached(sender: Car, args: MileageEventArgs): void {
        console.log(
            `⚠️ Event: maximum mileage reached! (${args.currentMileage}/${args.maxMileage})`
        );
    }
}
import { MileageEventArgs } from "../events/EventArgs";
import BaseEntity from "@model/BaseEntity";

export class Car extends BaseEntity {
    private mileage: number = 0;
    private readonly maxMileage: number;

    private onMaxMileageReachedHandlers: ((sender: Car, args: MileageEventArgs) => void)[] = [];

    constructor(maxMileage: number) {
        super();
        this.maxMileage = maxMileage;
    }

    public addOnMaxMileageReached(handler: (sender: Car, args: MileageEventArgs) => void): void {
        this.onMaxMileageReachedHandlers.push(handler);
    }

    public removeOnMaxMileageReached(handler: (sender: Car, args: MileageEventArgs) => void): void {
        this.onMaxMileageReachedHandlers = this.onMaxMileageReachedHandlers.filter(h => h !== handler);
    }

    private triggerMaxMileageReached(): void {
        const args = new MileageEventArgs(this.mileage, this.maxMileage);
        for (const handler of this.onMaxMileageReachedHandlers) {
            handler(this, args);
        }
    }

    public drive(distance: number): void {
        this.mileage += distance;
        console.log(`The car has driven ${distance} km. Current mileage: ${this.mileage}`);

        if (this.mileage >= this.maxMileage) {
            this.triggerMaxMileageReached();
        }
    }
}

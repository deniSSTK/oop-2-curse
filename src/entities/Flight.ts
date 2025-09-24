import BaseEntity from "@entity/BaseEntity";

class Flight extends BaseEntity {
    readonly number: string;
    readonly departure: Date;
    readonly to: string;
    readonly from: string;
    readonly arrivalTime: Date | null;

    constructor(
        number: string,
        departure: Date,
        to: string,
        from: string,
        arrivalTime: Date | null
    ) {
        super();
        this.number = number;
        this.departure = departure;
        this.to = to;
        this.from = from;
        this.arrivalTime = arrivalTime;
    }

    flightDuration() {
        if (this.arrivalTime) {
            return this.arrivalTime.getTime() - this.departure.getTime();
        }
        return 0;
    }

    timeElapsedSinceFlightCompletion() {
        if (this.arrivalTime) {
            return new Date().getTime() - this.arrivalTime.getTime();
        }
        return 0;
    }

    override getAll() {
        return {
            ...super.getAll(),
            number: this.number,
            departure: this.departure,
            to: this.to,
            from: this.from,
            arrivalTime: this.arrivalTime
        }
    }
}

export default Flight;
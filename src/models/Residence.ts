import BaseEntity from "@model/BaseEntity";

class Residence extends BaseEntity {
    readonly address: string;
    readonly city: string;
    readonly zipCode: string;
    readonly country: string;

    constructor(
        address: string,
        city: string,
        zipCode: string,
        country: string,
    ) {
        super();
        this.address = address;
        this.city = city;
        this.zipCode = zipCode;
        this.country = country;
    }
}

export default Residence;
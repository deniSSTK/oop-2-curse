import { CarEventHandler } from "../../handlers/CarEventHandler";
import { Car } from "@model/Car";
import { anonymousMethod, lambdaExpression } from "../../delegates";

const text = "Hello, world!";
const char = "o";

console.log("🔹 Call via anonymous method:", anonymousMethod(text, char));
console.log("🔹 Call via lambda expression:", lambdaExpression(text, char));

const car = new Car(100);

car.addOnMaxMileageReached(CarEventHandler.onMaxMileageReached);

car.addOnMaxMileageReached((sender, args) => {
    console.log(`🔥 Lambda handler: the car exceeded mileage ${args.currentMileage} km!`);
});

car.drive(30);
car.drive(50);
car.drive(20);

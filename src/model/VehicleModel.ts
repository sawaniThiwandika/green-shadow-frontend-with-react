export class VehicleModel {
    vehicleId: string;
    type: string;
    model: string;
    licensePlate: string;
    assignedField: string;

    constructor(vehicleId: string, type: string, model: string, licensePlate: string, assignedField: string) {
        this.vehicleId = vehicleId;
        this.type = type;
        this.model = model;
        this.licensePlate = licensePlate;
        this.assignedField = assignedField;
    }
}
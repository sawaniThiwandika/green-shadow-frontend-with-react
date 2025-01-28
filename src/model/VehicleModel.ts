export class VehicleModel {
    vehicleId: string;
    type: string;
    model: string;
    licensePlate: string;
    assignedStaff: string[];

    constructor(vehicleId: string, type: string, model: string, licensePlate: string, assignedStaff: string []) {
        this.vehicleId = vehicleId;
        this.type = type;
        this.model = model;
        this.licensePlate = licensePlate;
        this.assignedStaff = assignedStaff;
    }
}
export class EquipmentModel {
    equipmentId: string;
    equipmentName: string;
    equipmentType: string;
    equipmentStatus: string;
    equipmentAssignedField: string;

    constructor(
        id: string,
        name: string,
        type: string,
        status: string,
        assignedField: string
    ) {
        this.equipmentId = id;
        this.equipmentName = name;
        this.equipmentType = type;
        this.equipmentStatus = status;
        this.equipmentAssignedField = assignedField;
    }

}
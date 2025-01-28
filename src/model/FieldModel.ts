
export class FieldModel {

    fieldCode: string;
    fieldName: string;
    fieldLocation: string;
    fieldSize: string;
    fieldImage1: string;
    crops: string[];
    staff: string[];
    equipment: string[];


    constructor(fieldCode: string, fieldName: string, fieldLocation: string, fieldSize: string, fieldImage1: string,  crops: string[], staff: string[] , equipment:string[]) {
        this.fieldCode = fieldCode;
        this.fieldName = fieldName;
        this.fieldLocation = fieldLocation;
        this.fieldSize = fieldSize;
        this.fieldImage1 = fieldImage1;
        this.crops = crops;
        this.staff = staff;
        this.equipment=equipment;

    }


}
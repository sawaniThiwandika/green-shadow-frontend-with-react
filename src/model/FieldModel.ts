
export class FieldModel {

    fieldCode: string;
    fieldName: string;
    fieldLocation: string;
    fieldSize: string;
    fieldImage1: string;
    cropCode: string;
    staff: string[];
    equipment: string[];
    log:string[]


    constructor(fieldCode: string, fieldName: string, fieldLocation: string, fieldSize: string, fieldImage1: string,  crop: string, staff: string[] , equipment:string[],log:string[]) {
        this.fieldCode = fieldCode;
        this.fieldName = fieldName;
        this.fieldLocation = fieldLocation;
        this.fieldSize = fieldSize;
        this.fieldImage1 = fieldImage1;
        this.cropCode = crop;
        this.staff = staff;
        this.equipment=equipment;
        this.log=log;

    }


}
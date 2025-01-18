
export class FieldModel {

    fieldCode: string;
    fieldName: string;
    fieldLocation: string;
    fieldSize: string;
    fieldImage1: string;
    fieldImage2: string;
    crops: string[];
    staff: string[];


    constructor(fieldCode: string, fieldName: string, fieldLocation: string, fieldSize: string, fieldImage1: string, fieldImage2: string, crops: string[], staff: string[]) {
        this.fieldCode = fieldCode;
        this.fieldName = fieldName;
        this.fieldLocation = fieldLocation;
        this.fieldSize = fieldSize;
        this.fieldImage1 = fieldImage1;
        this.fieldImage2 = fieldImage2;
        this.crops = crops;
        this.staff = staff;

    }


}

export class FieldModel {

    fieldCode: string;
    fieldName: string;
    fieldLocation: string;
    fieldSize: number;
    fieldImage1: string;
    fieldImage2: string;
    crops: string[];
    staff: string[];
    equipments: string[];
    logs: string[];

    constructor(fieldCode: string, fieldName: string, fieldLocation: string, fieldSize: number, fieldImage1: string, fieldImage2: string, crops: string[], staff: string[], equipments: string[], logs: string[]) {
        this.fieldCode = fieldCode;
        this.fieldName = fieldName;
        this.fieldLocation = fieldLocation;
        this.fieldSize = fieldSize;
        this.fieldImage1 = fieldImage1;
        this.fieldImage2 = fieldImage2;
        this.crops = crops;
        this.staff = staff;
        this.equipments = equipments;
        this.logs = logs;
    }


}
export class LogModel {

    logCode: string;
    logDate: string;
    logDetails: string;
    observedImage: string;
    relevantFields: string[];
    relevantCrops: string[];
    relevantStaff: string[];

    constructor(
        logCode: string,
        logDate: string,
        logDetails: string,
        relevantFields: string[],
        relevantCrops: string[],
        relevantStaff: string[],
        observedImage: string
    ) {
        this.logCode = logCode;
        this.logDate = logDate;
        this.logDetails = logDetails;
        this.relevantFields = relevantFields;
        this.relevantCrops = relevantCrops;
        this.relevantStaff = relevantStaff;
        this.observedImage = observedImage;
    }

}
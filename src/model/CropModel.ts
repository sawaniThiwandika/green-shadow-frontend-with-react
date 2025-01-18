export class CropModel {
    cropCode: string;
    commonName: string;
    scientificName: string;
    image: string;
    category: string;
    season: string;
    fieldDetails: string;

    constructor(
        cropCode: string,
        commonName: string,
        scientificName: string,
        image: string,
        category: string,
        season: string,
        fieldDetails: string
    ) {
        this.cropCode = cropCode;
        this.commonName = commonName;
        this.scientificName = scientificName;
        this.image = image;
        this.category = category;
        this.season = season;
        this.fieldDetails = fieldDetails;
    }
}

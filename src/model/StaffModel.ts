export class StaffModel {
    staffId: string;
    firstName: string;
    lastName: string;
    address: string;
    designation: string;
    gender: string;
    contact: string;
    email: string;
    field: string;
    vehicle: string;


    constructor(staffId: string, firstName: string, lastName: string, address: string, designation: string, gender: string, contact: string, email: string,field: string,vehicle: string) {
        this.staffId = staffId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.designation = designation;
        this.gender = gender;
        this.contact = contact;
        this.email = email;
        this.field=field;
        this.vehicle=vehicle;
    }
}
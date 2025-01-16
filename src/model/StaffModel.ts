export class StaffModel {
    staffId: string;
    firstName: string;
    lastName: string;
    address: string;
    designation: string;
    gender: string;
    contact: string;
    email: string;


    constructor(staffId: string, firstName: string, lastName: string, address: string, designation: string, gender: string, contact: string, email: string) {
        this.staffId = staffId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.designation = designation;
        this.gender = gender;
        this.contact = contact;
        this.email = email;
    }
}
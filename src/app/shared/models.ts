export interface User{
    email: string;
    orgId: string;
    org: Org;
}

export interface Org{
    id: string;
    name: string;
}

export interface Orphan{
    id: string;
    orgId: string;
    idNo: string;
    staredIdNo?: string;
    staredName?: string;
    firstName: string;
    secondName: string;
    thirdName: string;
    title: string;
    fullName?: string;
    adopted: boolean;
    sex: string;
    adopterId?: string;
    adopter?: Adopter;
    adopterName: string;
    adoption?: Adoption;
}

export interface Adopter{
    id?: string;
    name: string;
    city: string;
    mobile: string;
}

export interface Adoption{
    adopterId: string;
    expireDate: any;
    duration: number; //total of months
}

export interface Total{
    male: number;
    female: number;
    zCQ3Dhxv5dQza3qKxhrV?: number;
}

export interface Message{
    message: string;
}
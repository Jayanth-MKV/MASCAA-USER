export interface Test {
  testSecret: string;
  keywords?: string[];
}

export interface Register{
  email:string;
  password:string;
  roll:string;
  department:string;
  }

  export interface EditTestType {
    title: string;
    instructions: string;
    guidelines: string;
    tandc: string;
    testSecret: string;
    keywords: string[];
    durationMinutes: number;
    startTime: string; // You may want to use a Date type here
    endTime: string; // You may want to use a Date type here
 }

 export interface inviteMail{
  to:string;
  subject:string;
  name:string;
  link:string;

 }
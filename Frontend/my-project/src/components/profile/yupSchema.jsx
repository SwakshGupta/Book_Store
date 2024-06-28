// here we are going to define the schema for the yup for the form validation

import * as Yup from "yup";

export const FormSchema = Yup.object({  // this is the schema which i have defined 
  name: Yup.string()
    .min(3, "too short")
    .max(20, "too long")
    .required("name is must"),

  image: Yup.string(),

  year: Yup.string().min(3, "enter more detail").max(9, "too long"),

  hostelOrRoom: Yup.string()
    .min(5, "enter more detail")
    .max(30, "too long")
    .required("Please fill your hostel and room number"),

  branch: Yup.string().min(5, "Please elaborate").max(25, "too long"),
  
  email:Yup.string()
});

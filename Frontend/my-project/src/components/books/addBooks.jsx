import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { useMutation, gql } from "@apollo/client";
import * as Yup from "yup";
import "tailwindcss/tailwind.css";

// GraphQL mutation
const ADD_BOOKS = gql`
  mutation AddBooks($input: AddBooksInput!) {
    addBooks(input: $input) {
      year
      branch
      image
      notesIncluded
      _id
      books {
        author
        price
        title
      }
    }
  }
`;

// Yup validation schema
const FormSchema = Yup.object().shape({
  year: Yup.string().required("Year is required"),
  branch: Yup.string().required("Branch is required"),
  books: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required("Title is required"),
      author: Yup.string(),
      price: Yup.number()
        .required("Price is required")
        .positive("Price must be positive"),
    })
  ),
  notesIncluded: Yup.boolean().required("Notes included is required"),
  image: Yup.mixed().required("Image is required"),
});

const AddBooks = () => {
  const [formData, setFormData] = useState({});
  const [addBooks] = useMutation(ADD_BOOKS);

  const handleImageUpload = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFieldValue("image", reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <Formik
        initialValues={{
          year: "",
          branch: "",
          books: [{ title: "", author: "", price: "" }],
          notesIncluded: false,
          image: null,
        }}
        validationSchema={FormSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Form Values:", values); // Debug log for form values
          const input = { ...values };
          console.log("Form Values again:", input); // Debug log for form values
          addBooks({ variables: { input } })
            .then((response) => {
              console.log("Response:", response); // Debug log for response
              setFormData(response.data.addBooks);
              setSubmitting(false);
            })
            .catch((error) => {
              console.error("Error adding books:", error);
              setSubmitting(false); // Ensure setSubmitting is called on error
            });
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700"
                >
                  Year
                </label>
                <Field
                  type="text"
                  name="year"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                <ErrorMessage
                  name="year"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="branch"
                  className="block text-sm font-medium text-gray-700"
                >
                  Branch
                </label>
                <Field
                  as="select"
                  name="branch"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="" label="Select branch" />
                  <option value="CSE" label="Computer Science" />
                  <option value="ECE" label="Electronics and Communication" />
                  <option value="ME" label="Mechanical" />
                  <option value="CE" label="Civil" />
                  <option value="EE" label="Electrical" />
                  <option value="IT" label="Information Technology" />
                  <option value="Other" label="Other" />
                </Field>
                <ErrorMessage
                  name="branch"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Books
              </label>
              <FieldArray name="books">
                {({ insert, remove, push }) => (
                  <div className="space-y-4">
                    {values.books.length > 0 &&
                      values.books.map((book, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                        >
                          <div>
                            <label
                              htmlFor={`books.${index}.title`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Title
                            </label>
                            <Field
                              name={`books.${index}.title`}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                            <ErrorMessage
                              name={`books.${index}.title`}
                              component="div"
                              className="text-red-600 text-sm"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor={`books.${index}.author`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Author
                            </label>
                            <Field
                              name={`books.${index}.author`}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                            <ErrorMessage
                              name={`books.${index}.author`}
                              component="div"
                              className="text-red-600 text-sm"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor={`books.${index}.price`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Price
                            </label>
                            <Field
                              name={`books.${index}.price`}
                              type="number"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                            <ErrorMessage
                              name={`books.${index}.price`}
                              component="div"
                              className="text-red-600 text-sm"
                            />
                          </div>
                        </div>
                      ))}
                    <div className="flex justify-end mt-4">
                      <button
                        type="button"
                        className="bg-green-600 text-white py-2 px-4 rounded-md"
                        onClick={() =>
                          push({ title: "", author: "", price: "" })
                        }
                      >
                        Add Book
                      </button>
                    </div>
                  </div>
                )}
              </FieldArray>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="notesIncluded"
                  className="block text-sm font-medium text-gray-700"
                >
                  Notes Included
                </label>
                <Field
                  type="checkbox"
                  name="notesIncluded"
                  className="mt-1 block"
                />
                <ErrorMessage
                  name="notesIncluded"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Image
              </label>
              <input
                type="file"
                onChange={(event) => handleImageUpload(event, setFieldValue)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBooks;


/**  in formik the field component automatically handles state for us  
 
 1. when we  initialize formik with initial value it sets up  state for each field

 2. in the Field component we have name prop  say if name ="year" then  the formik automatically tells 
    to use the value from initialValues.year

 3. FieldArray: This component from Formik is used to manage an array of fields

 4.   {({ insert, remove, push }) => (
  <div className="space-y-4">
    // JSX content here
  </div>
)}  

this is the render prop function the field array component provide us methods to manipulate the array 

5. {condition ? <ComponentIfTrue /> : <ComponentIfFalse />} then  we  are using conditional rendering 

6. {values.books.length > 0 &&
  values.books.map((book, index) => (
    <div
      key={index}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
    >
     if there is anything in the array then it starts mapping 


7. <div className="flex justify-end mt-4">
  <button
    type="button"
    className="bg-green-600 text-white py-2 px-4 rounded-md"
    onClick={() =>
      push({ title: "", author: "", price: "" })
    }
  >
    Add Book
  </button>
</div>

type button means it is not a submit button is a regular button 

then when we click on the add book button then it pushes to create a new array for the book and then we are using map method 

to map elemets 

8. <button
  type="submit"
  disabled={isSubmitting}
  className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
>
  {isSubmitting ? "Submitting..." : "Submit"}
</button>

this type submit means when the button is clicked then it will trigger on submit function 

9. disabled={isSubmitting}:

This prop disables the button while the form is being submitted (isSubmitting is true). 
This prevents multiple submissions by disabling the button during the submission process.

10. {isSubmitting ? "Submitting..." : "Submit"}  this will change the  button label if it is true then 

it will return submitting otherwise it will return submit 










 */

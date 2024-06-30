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
      name
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
  name: Yup.string().required("Name is required"),
  image: Yup.mixed().required("Image is required"),
});

const AddBooks = () => {
  const [formData, setFormData] = useState({});
  const [addBooks] = useMutation(ADD_BOOKS);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <Formik
        initialValues={{
          year: "",
          branch: "",
          books: [{ title: "", author: "", price: "" }],
          notesIncluded: false,
          name: "",
          image: null,
        }}
        validationSchema={FormSchema}
        onSubmit={(values, { setSubmitting }) => {
          const input = {
            ...values,
            image: values.image ? URL.createObjectURL(values.image) : "",
          };
          addBooks({ variables: { input } })
            .then((response) => {
              console.log("Books added:", response.data.addBooks);
              setFormData(response.data.addBooks);
            })
            .catch((error) => {
              console.error("Error adding books:", error);
            })
            .finally(() => {
              setSubmitting(false);
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

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                <ErrorMessage
                  name="name"
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
                name="image"
                accept="image/*"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                onChange={(event) => {
                  setFieldValue("image", event.currentTarget.files[0]);
                }}
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

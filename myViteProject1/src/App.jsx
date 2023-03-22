import { useState } from "react";
import "./App.css";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { TextError } from "./component/TextError";

function App() {
  const [saveData, setSaveData] = useState(null)
  const initialValues = {
    name: "",
    email: "",
    socialMedia: {
      facebook: "",
      instagram: "",
    },
    familyMembers: [""],
  };

  const onSubmit = (values, onSubmitProps) => {
    console.log("Submit Props", onSubmitProps);
    onSubmitProps.resetForm();
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(formik) => {
        console.log("formik Props", formik);
        return (
          <Form>
            <label for="name">Name</label>
            <div>
              <Field name="name" id="name" placeholder="Full Name" />
              <ErrorMessage name="name" component={TextError} />
            </div>
            <label for="email">Email</label>
            <div>
              <Field name="email" id="email" placeholder="Email" />
              <ErrorMessage name="email" component={TextError} />
            </div>
            <label for="facebook">Facebook</label>
            <div>
              <Field
                name="socialMedia.facebook"
                id="facebook"
                placeholder="Facebook"
              />
              <ErrorMessage name="socialMedia.facebook" component={TextError} />
            </div>
            <label for="instagram">Instagram</label>
            <div>
              <Field
                name="socialMedia.instagram"
                id="instagram"
                placeholder="Instagram"
              />
              <ErrorMessage
                name="socialMedia.instagram"
                component={TextError}
              />
            </div>
            <div>
              <label>Family Members</label>
              <FieldArray name="familyMembers">
                {(fieldArrayProps) => {
                  const { form, push, remove } = fieldArrayProps;
                  const { values } = form;
                  const { familyMembers } = values;
                  return (
                    <div>
                      {familyMembers.map((familyMember, index) => (
                        <div key={index}>
                          <Field
                            name={`familyMembers[${index}]`}
                            placeholder="Family Member"
                          />
                          {index > 0 && (
                            <button type="button" onClick={() => remove(index)}>
                              {" "}
                              -{" "}
                            </button>
                          )}
                          <button type="button" onClick={() => push("")}>
                            {" "}
                            +{" "}
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default App;

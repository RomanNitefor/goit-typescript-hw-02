import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

const validationSchema = Yup.object().shape({
  topic: Yup.string()
    .min(3, "Minimum 3 letters")
    .required("This field is required"),
});

interface SearchBarProps {
  onSearch: (topic: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className={css.formik}>
      <Formik
        initialValues={{ topic: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          const trimmedTopic = values.topic.trim();
          if (trimmedTopic === "") {
            toast.error("Can not be empty");
          } else if (trimmedTopic.length < 3) {
            toast.error("Minimum 3 letters");
          } else {
            onSearch(trimmedTopic);
            actions.resetForm();
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
            <Field
              className={css.input}
              type="text"
              name="topic"
              placeholder="Search images and photos"
            />
            <button className={css.btn} type="submit">
              Search
            </button>
            {errors.topic && touched.topic ? (
              <div className={css.error}>{errors.topic}</div>
            ) : null}
          </Form>
        )}
      </Formik>
      <Toaster />
    </div>
  );
}

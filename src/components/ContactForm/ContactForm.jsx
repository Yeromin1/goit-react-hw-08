import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import s from './ContactForm.module.css';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';

const ContactForm = () => {
  const dispatch = useDispatch();
  const nameId = useId();
  const numberId = useId();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .max(50, 'Name must be less than 50 characters')
      .required('Name is required'),
    number: Yup.string()
      .matches(
        /^\d{3}-\d{2}-\d{2}$/,
        'Phone number must be in the format XXX-XX-XX'
      )
      .required('Number is required'),
  });

  const formatPhone = phoneValue => {
    phoneValue = phoneValue.replace(/\D/g, '');
    if (phoneValue.length <= 3) {
      return phoneValue.replace(/(\d{3})(\d{0,2})/, '$1-$2');
    } else if (phoneValue.length <= 5) {
      return phoneValue.replace(/(\d{3})(\d{2})(\d{0,2})/, '$1-$2-$3');
    } else {
      return phoneValue
        .slice(0, 9)
        .replace(/(\d{3})(\d{2})(\d{2})(\d{0,2})/, '$1-$2-$3');
    }
  };

  const handlePhoneChange = (e, setFieldValue) => {
    let phoneValue = formatPhone(e.target.value);
    setFieldValue('number', phoneValue);
  };

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addContact(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className={s.form}>
          <label htmlFor={nameId}>Name</label>
          <Field
            type="text"
            name="name"
            className={s.input}
            id={nameId}
            autoComplete="name"
          />
          <ErrorMessage name="name" component="div" className={s.error} />

          <label htmlFor="number">Number</label>
          <Field
            type="text"
            name="number"
            className={s.input}
            id={numberId}
            onChange={e => handlePhoneChange(e, setFieldValue)}
            autoComplete="tel"
          />
          <ErrorMessage name="number" component="div" className={s.error} />

          <button type="submit" className={s.button}>
            Add Contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;

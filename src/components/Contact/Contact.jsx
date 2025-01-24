import { useDispatch } from "react-redux";
import { ContactRound, Phone } from "lucide-react";
import { deleteContact } from "../../redux/contactsOps";
import styles from "./Contact.module.css";

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <li className={styles.contact}>
      <p className={styles.text}>
        <span className={styles.name}>
          <ContactRound className={styles.icon} /> {name}
        </span>
        <span className={styles.number}>
          <Phone className={styles.icon} /> {number}
        </span>
      </p>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default Contact;

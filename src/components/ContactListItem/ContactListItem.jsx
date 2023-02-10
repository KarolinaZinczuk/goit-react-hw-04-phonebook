import PropTypes from "prop-types";
import styles from "./ContactListItem.module.css";

const ContactListItem = ({ id, name, number, handleRemove }) => {
    return (
        <li className={styles.item}>
            {name}: {number}
            <button
                className={styles.button}
                onClick={() => handleRemove(id)}>
                Delete
            </button>
        </li>
    )
};

ContactListItem.propTypes = {
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    handleRemove: PropTypes.func,
}

export default ContactListItem ;
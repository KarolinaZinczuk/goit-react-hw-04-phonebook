import { useState } from 'react';

import { nanoid } from 'nanoid';
import PropTypes from "prop-types";
import styles from "./ContactForm.module.css";

const ContactForm = ({onSubmitData }) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    
    const handleChange = e => {
        const { name, value } = e.target;
        setName(prevName => ({ ...prevName, [name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        const data = { id: nanoid(), ...{ name, number } }
        onSubmitData({data});
        inputClean();
    }

    const inputClean = () => {
        setName('');
        setNumber('');
    };

    return (
        <div className={styles.section}>
            <form onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Name
                    <input
                        className={styles.input}
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        value={name}
                        onChange={handleChange}
                    />
                </label>
                <label className={styles.label}>
                    Number
                    <input
                        className={styles.input}
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        value={number}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit" className={styles.button}>
                    Add contact
                </button>
            </form>
        </div>
    );
};

ContactForm.propTypes = {
    onSubmitData: PropTypes.func.isRequired,
}

export default ContactForm;
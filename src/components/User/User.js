import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

const User = ({firstName, lastName, imageUrl, id}) => (
    <a className='User-person' href={`/users/${id}`}>
        <img src={imageUrl} alt={firstName + ' ' + lastName} />
        <h3>{firstName} {lastName}</h3>
    </a>
);

User.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default User;
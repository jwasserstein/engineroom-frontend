import React from 'react';
import PropTypes from 'prop-types';
import './Car.css';

const Car = ({name, imageUrl, userId}) => (
    <a className='Car-car' href={`/users/${userId}/cars`}>
        <img src={imageUrl} alt={name} />
        <h3>{name}</h3>
    </a>
);

Car.propTypes = {
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired
};

export default Car;
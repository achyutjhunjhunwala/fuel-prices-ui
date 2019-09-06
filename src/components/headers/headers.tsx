import React from 'react';
import Providers from './providers';
import FuelTypes from './fuel-types';
import './headers.css';

const Header: React.FC = () => {
    return (
        <div className="panel-heading">
            <Providers/>
            <FuelTypes/>
        </div>
    );
};

export default Header;

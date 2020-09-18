import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './footer.scss';
const forioLogo = require('img/forio_logo.svg');

const Footer = () => (
    <footer id="footer">
        <span>Copyright &copy; 2020 &nbsp;</span>
        <span>Developed in partnership with <a target="_blank" href="http://forio.com" ><img className="forio-logo" alt="link to forio.com" src={forioLogo} /></a></span>
    </footer>
);

Footer.propTypes = {

};

export default Footer;

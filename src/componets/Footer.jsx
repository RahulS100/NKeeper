import React from 'react';

//--------------Getting a Year Data Dynamically
let date = new Date();
let year = date.getFullYear();



function Footer() {
    return (<div className="footer"><p className="footer-cr">Copyright &copy; {year}</p></div>);
}

export default Footer;
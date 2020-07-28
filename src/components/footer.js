import React from 'react';

const Footer = () => {
    const data = new Date();
    return(
        <div className="footer">
            <div className="year">
                OLSfotware {data.getFullYear()}
            </div>
        </div>
    )
}

export default Footer;
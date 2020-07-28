import React from 'react';

import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';

const Admin = () => {
    const [bar, setBar] = React.useState(true);
    return(
        <div className="admin">
            <Sidebar setBar={setBar} bar={bar} />
            <Navbar setBar={setBar} bar={bar} />
        </div>
    )
}


export default Admin;
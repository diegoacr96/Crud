import React from 'react';

import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import Users from '../components/users';
import SearchBar from '../components/searchbar';
import Footer from '../components/footer';

const Admin = () => {
    const [bar, setBar] = React.useState(true);
    const [search, setSearch] = React.useState(false);
    return(
        <div className="admin">
            <Sidebar setBar={setBar} bar={bar} />
            <Navbar setBar={setBar} bar={bar} />
            <Users bar={bar} />
            <SearchBar setSearch={setSearch} search={search} />
            <Footer />
        </div>
    )
}


export default Admin;
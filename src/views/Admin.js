import React from 'react';

import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import Users from '../components/users';
import SearchBar from '../components/searchbar';

const Admin = () => {
    const [bar, setBar] = React.useState(true);
    const [search, setSearch] = React.useState(false);
    return(
        <div className="admin">
            <Sidebar setBar={setBar} bar={bar} />
            <Navbar setBar={setBar} bar={bar} />
            <Users />
            <SearchBar setSearch={setSearch} search={search} />
        </div>
    )
}


export default Admin;
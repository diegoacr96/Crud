import React from 'react';

import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import Users from '../components/users';
import SearchBar from '../components/searchbar';
import Footer from '../components/footer';

const Admin = ({db, firebase}) => {
    const desktop =  window.matchMedia("(min-width: 900px)");
    const [bar, setBar] = React.useState(desktop.matches);

/*     React.useEffect(() => {
        if(desktop.matches){
            setBar(true);
        }
    }, [bar]) */
    
    const [search, setSearch] = React.useState(false);
    return(
        <div className="admin">
            <Sidebar setBar={setBar} bar={bar} />
            <Navbar setBar={setBar} bar={bar} db={db} firebase={firebase} />
            <Users bar={bar} db={db} firebase={firebase} />
            <SearchBar setSearch={setSearch} search={search} db={db} />
            <Footer />
        </div>
    )
}


export default Admin;
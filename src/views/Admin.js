import React from 'react';

import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import Users from '../components/users';
import SearchBar from '../components/searchbar';
import Footer from '../components/footer';

import {useDispatch} from 'react-redux';

import {fetchingUsers} from '../redux/actionCreator';


const Admin = ({db, firebase}) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          window.location.replace("/");
        }
    })
    const desktop =  window.matchMedia("(min-width: 900px)");
    const [bar, setBar] = React.useState(desktop.matches);
    
    const [search, setSearch] = React.useState(false);
    const [filters, setFilters] = React.useState(false);
    const dispatch = useDispatch();

    const searchHandler = (event) => {
        setSearch(false);
        event.preventDefault();
        setFilters(event.target);
        dispatch(fetchingUsers(db, event.target));
    }
    return(
        <div className="admin">
            <Sidebar setBar={setBar} bar={bar} />
            <Navbar setBar={setBar} bar={bar} db={db} firebase={firebase} />
            <Users bar={bar} db={db} firebase={firebase} filters={filters} />
            <SearchBar setSearch={setSearch} search={search} db={db} searchHandler={searchHandler} />
            <Footer />
        </div>
    )
}


export default Admin;


  
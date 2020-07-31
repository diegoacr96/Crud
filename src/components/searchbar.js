import React from 'react';
import {useDispatch} from 'react-redux';

import {fetchingUsers} from '../redux/actionCreator';

const SearchBar = ({setSearch, search, db, searchHandler}) => {
    const dispatch = useDispatch();

    return(
        <div className={search? "searchbar searchbar-open": "searchbar searchbar-collapse"}>
            <div className="search-icon">
                <i className="fas fa-search" onClick={()=> setSearch(!search)}></i>
            </div>
            <div className= "searchbar-header">
                <i className="fas fa-user-plus"></i>
                <span className="searchbar-title">Filtrar búsqueda</span>
            </div>
            <div className="searchbar-body">
                <form onSubmit={searchHandler}>
                    <label htmlFor="nombre">Nombres</label>
                    <input type="text" name="nombre" />
                    <label htmlFor="lastname">Apellidos</label>
                    <input type="text" name="lastname" />
                    <label htmlFor="id">Identificación(C.C)</label>
                    <input type="text" name="id" />
                    <label htmlFor="rol">Rol asociado</label>
                    <select type="select" name="rol">
                        <option></option>
                        <option>Administrador</option>
                        <option>Conductor</option>
                        <option>Recolector</option>
                    </select>
                    <label htmlFor="state">Estado</label>
                    <select type="select" name="state">
                        <option></option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                    <label htmlFor="pass">Contraseña</label>
                    <input type="password" name="pass" />
                    <label htmlFor="tel">Telefono</label>
                    <input type="tel" name="tel" />
                    <label htmlFor="email">Correo electrónico</label>
                    <input type="email" name="email" />
                    <div className="button-group">
                        <button type="submit" className="filtrar">Filtrar</button>
                        <button type="button" className="Limpiar" onClick={() => {dispatch(fetchingUsers(db, false))}}>Limpiar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SearchBar;
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries';

export const Sidebar = () => {

    const dispatch = useDispatch();
    
    //Obtención del nombre del usuario que accedio a la JournalScreen desde el store
    const { name } = useSelector( state => state.auth );

    //Configuración del Logout
    const handleLogout = () => {
        dispatch( startLogout() );
    };

    // Función para añadir una nueva nota con interacciones en la base de datos de firestore
    const handleAddNew = () => {
        dispatch( startNewNote() );
    };

    return (
        <aside className="journal__sidebar">

            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-moon"></i> {/* Elementos del Font-Awesome - CDN */}
                    <span> { name }</span>
                </h3>

                <button 
                    className="btn"
                    onClick={ handleLogout }
                >
                    Logout
                </button>
            </div>

            <div 
                className="journal__new-entry"
                onClick={ handleAddNew }
            >
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">New entry</p>
            </div>

            <JournalEntries />

        </aside>
    )
}

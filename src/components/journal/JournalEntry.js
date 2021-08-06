import React from 'react';
import { useDispatch } from 'react-redux';

import moment from 'moment';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({  id, date, title, body, url }) => {

    const dispatch = useDispatch();

    // Aplicación de la libreria "Moment.js" que ayuda a la manipulación de fechas
    const nodeDate = moment(date);

    // Función que dispara la acción para abrir la nota seleccionada en la parte del Sidebar
    const handleEntryCilck = () => {
        dispatch( activeNote(id, {
                date, title, body, url
            }) 
        );
    };

    return (
        <div 
            className="journal__entry pointer animate__animated animate__fadeIn animate__faster"
            onClick={ handleEntryCilck }
        >
            
            {
                url &&

                <div 
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${ url })`
                    }}
                >
                </div>
            }    

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    { title }
                </p>

                <p className="journal__entry-content">
                    { body }
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span> { nodeDate.format('dddd') } </span>
                <h4> { nodeDate.format('Do') } </h4>
            </div>
        </div>
    );
};

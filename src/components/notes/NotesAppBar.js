import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes)

    // Función para guardar los cambios de una nota
    const handleSave = () => {
        dispatch( startSaveNote( active ) );
    };

    //Función para cargar una imagen a una nota
    const handlePictureUpload = () => {
        document.querySelector('#fileSelector').click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if ( file ) {
            dispatch( startUploading( file ) );
        }
    };

    return (
        <div className="notes__appbar">
            <span>{ moment().format('MMMM Do YYYY')}</span>

        {/* Tipo de input para subida de archivos (escondido para el usuario) */}
            <input 
                id="fileSelector"
                type="file"
                name="file"
                style={{ display: 'none' }}
                onChange={ handleFileChange }
            />

            <div>
                
                <button 
                    className="btn"
                    onClick={ handlePictureUpload }
                >
                    Picture
                </button>

                <button 
                    className="btn"
                    onClick={ handleSave }
                >
                    Save
                </button>

            </div>
        </div>
    );
};

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';

import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
    
    const dispatch = useDispatch();
    const { active:note } = useSelector( state => state.notes );
    const [ formValues, handleInputChange, reset ] = useForm( note );
    const { body, title, id } = formValues;

    // Cambiar la nota activa al cambiar la selección por medio de un efecto e implementando el useRef
    const activeId = useRef( note.id );

    useEffect(() => {
        
        if ( note.id !== activeId.current ){
            reset( note );
            activeId.current = note.id
        }

    }, [ note, reset ]);

    //Efecto encargado de actualizar el state con la correspondiente información de los formularios en tiempo real
    useEffect(() => {
       
        dispatch( activeNote( formValues.id, { ...formValues }) );

    }, [ formValues, dispatch ]);

    //Fución encargada de eliminar una nota
    const handleDelete = () => {
        dispatch( startDeleting( id ) );
    };


    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">
              
                    <input 
                        type="text"
                        placeholder="Some awesome title"
                        className="notes__title-input"
                        autoComplete="off"
                        name="title"
                        value={ title }
                        onChange={ handleInputChange }
                    />

                    <textarea
                        placeholder="Today I did something awesome..."
                        className="notes__textarea"
                        name="body"
                        value={ body }
                        onChange={ handleInputChange }
                    ></textarea>

                    {
                        (note.url)
                        && (
                            <div className="notes__image">
                                <img
                                    src={ note.url }
                                    alt="Elemento"
                                />
                            </div>)
                    }

            </div>

            <button 
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Delete note
            </button>

        </div>
    );
};

import Swal from 'sweetalert2';

import { db } from "../firebase/firebase-config";
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from "../helpers/loadNotes";
import { types } from '../types/types';

//Acción encargada de la autenticación del Login personalizada 
export const startNewNote = () => {
    return async ( dispatch, getState ) => {   // getState - función que permite acceder al state sin necesidad de utilizar el useSelector

        const uid = getState().auth.uid;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        };

        const docRef = await db.collection(`${ uid }/journal/notes`).add( newNote )

        dispatch( activeNote( docRef.id, newNote ) );
        dispatch( addNewNote( docRef.id, newNote) );
    };
};


// Acción para declarar una nota activa
export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});


// Añade una nueva nota
export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
});


//Acción que inicia la carga de las notas que tiene un usuario a partir de un uid
export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {

        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
        
    };
};


//Acción encargada de establecer las notas a traves de un id dado
export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});


// Acción para guardar una nota en la base de datos de firestore
export const startSaveNote = ( note ) => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;

        if( !note.url ){
            delete note.url
        };

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        await db.doc(`/${ uid }/journal/notes/${ note.id }`).update( noteToFirestore );
        
        dispatch( refreshNote( note.id, noteToFirestore ) );
        Swal.fire('Saved', note.title, 'success');
    };
};


// Acción que actualiza del store a la nota que en ese momento esta cambiando 
export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload:{
        id,
        note:{
            id,
            ...note
        }
    }
});


// Acción para subir una imagen a Cloudinary
export const startUploading = ( file ) => {
    return async ( dispatch, getState ) => {
        
        const { active:activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
        });
        
        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;

        dispatch( startSaveNote( activeNote ) );

        Swal.close();
    };
};


// Acción para eliminar una nota desde la base de datos de firestore
export const startDeleting = ( id ) => {
    return async ( dispatch, getState ) => {
        
        const { uid } = getState().auth;
        await db.doc(`${ uid }/journal/notes/${ id }`).delete();
        
        //A través de la función de abajo también se elimina en el sitio web del proyecto
        dispatch( deleteNote( id ) );
        
    }
};


// Acción para eliminar una nota 
export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
});


// Acción que depura las notas cuando un usuario hace un logout
export const noteLogout = () => ({
    type: types.notesLoadoutCleaning
});
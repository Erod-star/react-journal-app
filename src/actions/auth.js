import Swal from 'sweetalert2';

import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import { noteLogout } from './notes';
import { finishLoading, startLoading } from './ui';


//Acción encargada de la autenticación del Login personalizada
export const startLoginEmailPassword = (email, password) => {  
    return (dispatch) => {
        
        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then( ({ user }) => {
                dispatch( 
                    login(user.uid, user.displayName) );
                
                dispatch(finishLoading());
            })
            .catch( e => {
                console.log(e);
                dispatch(finishLoading());
                Swal.fire('Error', e.message, 'error');
            });
    };
};


//Acción encargada de la autenticación del registro
export const startRegisterWithEmailPasswordName = ( email, password, name ) => { 
    return(dispatch) => {

        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async({ user }) => {

                await user.updateProfile({ displayName: name }); //retorna un objeto con el nombre y fotografía del usuario
                dispatch(
                    login( user.uid, user.displayName )
                );
            })
            .catch( e => {
                console.log(e);
                Swal.fire('Error', e.message, 'error');
            });
    };
};


//Acción encargada de la autenticación del registro por medio de Google Accounts
export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => {
                dispatch(
                    login( user.uid, user.displayName )
                );
            });
    };
};

//El type "Login" del authReducer
export const login = (uid, displayName) => ({
        type: types.login,
        payload: {
            uid,
            displayName
        }
});

//El type "Logout" del authReducer
export const logout = () => ({
    type: types.logout,
});

//Acción encargada del Logout del usuario
export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();

        dispatch( logout() );
        dispatch( noteLogout() );
    };
};
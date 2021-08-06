import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
  } from 'react-router-dom';
  
  import { firebase } from '../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';


// Router de navegación principal entre las pantallas de "Inicio de sesión" y la pantalla "Journal"
export const AppRouter = () => {

    const dispatch = useDispatch();

    //setStates que identifica a que ruta se mandara el usuario dependiendo de si esta autenticado o no
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);



    //Efecto que asegura la autenticación del usuario al refrescar la página o cambiar de vista
    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( (user) => {

            if( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn( true );
                dispatch( startLoadingNotes( user.uid ) );

            } else {
                setIsLoggedIn( false );
            };

            setChecking(false);

        });

    }, [ dispatch, setChecking ]);

    if ( checking ){
        return(
            <h1> Loading... </h1>
        );
    };

    return (
        <Router>
            <div>  
                <Switch>

                    {/* Ruta pública */}
                    <PublicRoute 
                        path="/auth" 
                        component={ AuthRouter }
                        isAuthenticated={ isLoggedIn } 
                        
                    />
                    
                    {/* Ruta privada */}
                    <PrivateRoute
                        exact path="/" 
                        component={ JournalScreen }
                        isAuthenticated={ isLoggedIn }
                    />

                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>

    )
}

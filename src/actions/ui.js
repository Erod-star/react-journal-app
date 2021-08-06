import { types } from '../types/types';


//Acción encargada validaciones dentro de la pantalla de registros en caso de error (setea el error).
export const setError = ( err ) => ({
    type: types.uiSetError,
    payload: err
});


//Acción encargada validaciones dentro de la pantalla de registros en caso de error (remueve en caso de error).
export const removeError = () => ({
    type: types.uiRemoveError
});


// Acción encargada de las validaciones de carga a través del Login (inicia la carga).
export const startLoading = () => ({
    type: types.uiStartLoading
});


// Acción encargada de las validaciones de carga a través del Login (termina la carga).
export const finishLoading = () => ({
    type: types.uiFinishLoading
});

//Archivo que gestiona el tipo de elemento que se manda a los reducers
export const types = {

    //Types para el authReducer
    login: '[Auth] Login',
    logout: '[Auth] Logout',

    //Types para el ui.Reducer
    uiSetError: '[UI] Set Error',
    uiRemoveError: '[UI] Remove Error',

    uiStartLoading: '[UI] Start loading',
    uiFinishLoading: '[UI] Finish loading',

    //Types para el notesReducer
    notesAddNew: '[Notes] New note',
    notesActive: '[Notes] Set active note',
    notesLoad: '[Notes] Load notes',
    notesUpdated: '[Notes] Update note',
    notesFileUrl: '[Notes] Update image url',
    notesDelete: '[Notes] Delete note',
    notesLoadoutCleaning: '[Notes]  LogoutCleaning',

};
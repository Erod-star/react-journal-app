import { useState } from "react";

// Hook personalizado para el uso de formularios que recibe los valores en forma de objeto,
// para posteriormente ejecutarlos en este.

export const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const reset = ( newFormState = initialState ) => {
        setValues(newFormState);
    };

    const handleInputChange = ({ target }) => {
        
        setValues({
            ...values,
            [ target.name ]: target.value,
        });

    };

    return [ values, handleInputChange, reset ];
};
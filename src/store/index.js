import { configureStore } from '@reduxjs/toolkit';

const reducerFn = (state = { language: 'pt' }, action) => {
    switch (action.type) {
        case 'CHANGE_LANGUAGE':
        return { ...state, language: action.payload };
        default:
        return state;
    }
}

const store = configureStore({ reducer: reducerFn });

export default store;

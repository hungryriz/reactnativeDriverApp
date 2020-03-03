import React, { createContext } from 'react';

export const AuthContext = React.createContext();
export const reducer = (prevState, action) => {
     console.log('context '); console.log(action);
      switch(action.type){
        case 'SIGN_IN':
          return {
            ...prevState,
            loggedIn: true,
            token: action.token,
            isLoading: action.isLoading
          }
        case 'SIGN_OUT':
          return {
            ...prevState,
            loggedIn: false,
            token: null,
            isLoading: action.isLoading
          }
        case 'SAVE_TOKEN':
          return {
              ...prevState,
              token: action.token,
              isLoading: action.isLoading
          }
      }
    };
export const prevState = { isLoading: true, loggedOut: true };
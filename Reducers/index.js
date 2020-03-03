import React, { useReducer } from 'react';


  const [state, dispatch] = useReducer(
    (prevState, action)=>{
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
            token: null
          }
        case 'SAVE_TOKEN':
          return {
              ...prevState,
              token: action.token,
              isLoading: action.isLoading
          }
      }
    },
    {
      isLoading: true,
      loggedOut: true
    }
  );

  export default { state, dispatch }
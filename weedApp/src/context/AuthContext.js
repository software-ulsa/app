import * as React from 'react';
import * as SecureStore from 'expo-secure-store';

export default function AuthProvider({ navigation }) {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };

            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null
        }
    );

    React.useEffect(() => {
        const bootstrapAsync = async () => {
          let userToken;
    
          try {
            userToken = await SecureStore.getItemAsync('auth-token');
          } catch (e) {
            console.log(e);
        }
          dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };
    
        bootstrapAsync();
      }, []);
}
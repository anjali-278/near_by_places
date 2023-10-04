import React, {useEffect} from 'react';
import {enableLatestRenderer} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import { login, logout } from './src/modules/login/redux/authSlice';
import { Login } from './src/modules';
import { Loader } from './src/components';

import {useDispatch, useSelector, Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store from './src/redux/store';
import { persistor } from './src/redux/store';

import TabNavigation from './src/navigation/Tab';



const App = () => {

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const checkToken = async () =>{
      try {
        const existingToken = await AsyncStorage.getItem("token");
        if(existingToken){
          dispatch(login(existingToken))
        } else {
          dispatch(logout());
        }
      }catch (e) {
        console.error("error ckecking existing token", error)
      }
    };
    checkToken();
  },[])
  
  enableLatestRenderer();
  return (
    <>
    {token ?
    <TabNavigation/> :
    <Login/>}
    <Toast/>
    </>
  )
}

export default () => (
  <Provider store={store}>
    <PersistGate loading={
      <Loader/>
    } persistor={persistor}>
   <App />
   </PersistGate>
  </Provider>
)
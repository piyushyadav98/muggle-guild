import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'

/* firebase setup */

import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAkBwa2ttodIe-JaTDt46ud709vwN5-Us8",
  authDomain: "muggle-guild.firebaseapp.com",
  projectId: "muggle-guild",
  storageBucket: "muggle-guild.appspot.com",
  messagingSenderId: "98313449172",
  appId: "1:98313449172:web:cd8ea4436a30a9e4349541",
  measurementId: "G-Z4LK202J5J"
};

if(firebase.apps.length===0){
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({ experimentalForceLongPolling: true });
}

// connect app to redux

import { Provider } from 'react-redux';
import {createStore,applyMiddleware} from 'redux'
import rootReducer from './redux/reducer'
import thunk from 'redux-thunk';
const store=createStore(rootReducer,applyMiddleware(thunk))



import Homescreen from './screens/homescreen';
import Second from './screens/secondscreen';
import LoginSceeen from './screens/loginscreen';
import Register from './screens/register';
import MainScreen from './screens/main';
import Add from './screens/main/add';
import SaveScreen from './screens/main/save'
import Comment from './screens/main/Comment';
import Profileimage from './screens/main/profileimage';

const Stack =createNativeStackNavigator()

const App=() =>{
  const [loaded,setloaded]=useState(false)
  const [loggedin,setloggedin]=useState(false)

  const componentDidMount=()=> {
    firebase.auth().onAuthStateChanged((user)=>{
      if(!user){
        setloaded(true)
        setloggedin(false)
      }else{
        setloaded(true)
        setloggedin(true)
      }
    })
  }

  useEffect(() => {
    componentDidMount();
  })

    if(!loaded){
      return(
      <View style={styles.main}>
        <Text>loading</Text>
      </View>
      )
    }
  
    if(!loggedin){
      return(
        <NavigationContainer>
          <Stack.Navigator initialRouteName='home'>
            <Stack.Screen name='home' component={Homescreen} options={{headerShown:false}}/>
            <Stack.Screen name='login' component={LoginSceeen} options={{headerShown:false}}/>
            <Stack.Screen name='register' component={Register} options={{headerShown:false}}/>
          </Stack.Navigator>
        </NavigationContainer>
      )
    }
    if(loggedin){

      return(
        <Provider store={store}>
          {/* <MainScreen style={styles.Main}/> */}
          <NavigationContainer>
            <Stack.Navigator initialRouteName='main'>
              <Stack.Screen name='main' component={MainScreen} 
              options={{headerShown:false}}
              />
              <Stack.Screen name='Add' component={Add} />
              <Stack.Screen name='Save' component={SaveScreen} navigation={NavigationContainer.navigation}/>
              <Stack.Screen name='Comment' component={Comment} navigation={NavigationContainer.navigation}/>
              {/* <Stack.Screen name='profileImage' component={Profileimage} navigation={NavigationContainer.navigation}/> */}
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
       
    )}
    
    
    
}

const styles=StyleSheet.create({
  Main:{
    flex:1,
    justifyContent:'center',
  }
})

export default App;

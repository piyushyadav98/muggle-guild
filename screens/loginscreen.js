import React,{useReducer} from 'react';
import {View,Text,TextInput,StyleSheet} from 'react-native';
import { useState } from 'react/cjs/react.development';
import firebase from 'firebase';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';


   const initialState={
    // username:'',
    password:'',
    email:''
}

const reducer=(state,action)=>{
    if(action.type==='inputchange'){
        return({...state,
        [action.value]:action.input
        })
    }
    else{
        return(state)
    }
}

const LoginSceeen =()=>{
    
    const[user,setuser]=useState()
    const [state, dispatch] = useReducer(reducer, initialState)

 
    
    
    const changehandler=(inputidentifier,name)=>{
        dispatch({
            type:'inputchange',
            input:name,
            value:inputidentifier
        });
    };

    const submitdetails=()=>{
        
        const {password,email}=state;
        console.log(password,email);
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then((result)=>{console.log(result)})
        .catch((error)=>{console.log(error)})
    }
   
    return(
        <View style={styles.container}>
            {/* <TextInput
            value={state.username}
            placeholder='enter username'
            onChangeText={changehandler.bind(this,'username')}
            /> */}

            <Text style={styles.header}>Login</Text>
           
            <View style={styles.input}>
            <TextInput
            style={styles.upperinput}
            value={state.email}
            placeholder='Enter Email ID'
            onChangeText={changehandler.bind(this,'email')}
            />
             <TextInput
             style={styles.lowerinput}
            value={state.password}
            placeholder='Enter Passsword'
            onChangeText={changehandler.bind(this,'password')}
            />
            </View>
            <Button style={styles.button} title='Submit' onPress={submitdetails}/>

        </View>
    )
}

const styles=StyleSheet.create({
    
    container:{
        flex:1,
        // alignItems:'center',
        justifyContent:'center',
        borderWidth:6,
        borderColor:'orange',
        // borderRadius:43,
        backgroundColor:'white'
    },
    
    input:{
    
        // // flex:1,
        // padding:10,
        // margin:10,
        // borderWidth:3,
        // // backgroundColor:'white',
        // fontSize:15,
        // fontWeight:'bold',
        // alignContent:'center',
        // alignItems:'center',
        // textAlign:'center',
        // backgroundColor:'white',
        // borderRadius:20,
        
    },
    upperinput:{
        padding:10,
        marginHorizontal:10,
        borderWidth:3,
        marginBottom:10,
        // backgroundColor:'white',
        fontSize:15,
        fontWeight:'bold',
        alignContent:'center',
        alignItems:'center',
        textAlign:'center',
        backgroundColor:'white',
        borderRadius:20,

    },
    lowerinput:{
        padding:10,
        marginHorizontal:10,
        borderWidth:3,
        // backgroundColor:'white',
        fontSize:15,
        fontWeight:'bold',
        alignContent:'center',
        alignItems:'center',
        textAlign:'center',
        backgroundColor:'white',
        borderRadius:20,
    },
    button:{
        color:'orange',
        fontSize:30,
        justifyContent:'center',
        alignItems:'center',
        paddingTop:20,
        marginTop:40
    },
     header:{
        textAlign:'center',
        fontWeight:'900',
        color:'orange',
        fontSize:30,
        paddingBottom:40

    }
})


export default LoginSceeen;
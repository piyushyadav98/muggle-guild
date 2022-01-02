import React,{useReducer} from 'react';
import {View,Text,TextInput, StyleSheet} from 'react-native';
import { useState } from 'react/cjs/react.development';
import firebase from 'firebase';

import { Button } from 'react-native-elements';

   const initialState={
    username:'',
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

const Register =()=>{
    
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
        
        const {username,password,email}=state;
        console.log(username,password,email);
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((result)=>{
            firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
                username,
                email
            })
            console.log(result)
        })
        .catch((error)=>{console.log(error)})
    }
   
    return(
        <View style={styles.container}>
            
            <Text style={styles.header}>Register</Text>
            <TextInput
            style={styles.input}
            value={state.username}
            placeholder='enter username'
            onChangeText={changehandler.bind(this,'username')}
            />
            <TextInput
            style={styles.input}
            value={state.password}
            placeholder='enter passsword'
            onChangeText={changehandler.bind(this,'password')}
            />
            <TextInput
            style={styles.input}
            value={state.email}
            placeholder='enter email id'
            onChangeText={changehandler.bind(this,'email')}
            />
            <View style={styles.button}>
            <Button  title='submit' onPress={submitdetails}/>
            </View>

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
        // borderRadius:43
    },
    input:{
        padding:10,
        margin:5,
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
    marginTop:20,
    alignItems:'center'
    },

    header:{
        textAlign:'center',
        fontWeight:'900',
        color:'orange',
        fontSize:30,
        paddingBottom:40

    }
})

export default Register;
import React, { useState } from 'react';
import {Text,TextInput,View,FlatList,TouchableOpacity,StyleSheet} from 'react-native';

import { SearchBar } from 'react-native-elements';

import firebase from 'firebase';
require ('firebase/firestore');

export default function Search (props){
    const [users,setusers]=useState([])

    const fetchUsers =(search)=>{
        firebase.firestore()
        .collection('users')
        .where('username','>=',search)
        .get()
        .then((snapshot)=>{
             let users=snapshot.docs.map(doc=>{
                const data=doc.data();
                const id=doc.id;
                return{id,...data}
            })
            setusers(users)
        })
    }
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Search</Text>
            <TextInput style={styles.input} placeholder={'search profile by name'} onChangeText={(search)=>fetchUsers(search)}/>
            <FlatList
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({item})=>(
                    <TouchableOpacity onPress={()=>props.navigation.navigate("profile",{uid:item.id})}>
                        <Text style={styles.name}>{item.username}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles=StyleSheet.create({
    input:{
        // flex:1,
        padding:10,
        margin:10,
        borderWidth:3,
        // backgroundColor:'white',
        fontSize:15,
        fontWeight:'bold',
        alignContent:'center',
        alignItems:'center',
        textAlign:'center',
        backgroundColor:'white',
        borderRadius:20
        
    },
    container:{
        flex:1,
        backgroundColor:'white',
        paddingTop:40,
        borderColor:'orange',
        borderWidth:6,
        // borderTopLeftRadius:43,
        // borderTopRightRadius:43
    },
    name:{
        margin:1,
        paddingTop:5,
        fontSize:15,
        fontWeight:'bold',
        textAlign:'center'
    },

    header:{
        textAlign:'center',
        fontWeight:'900',
        color:'orange',
        fontSize:30

    }
})

//resolve search update problem
import React,{useState} from "react";
import {View,Image,TextInput,StyleSheet} from "react-native";

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

import firebase from 'firebase'
require("firebase/firestore")
require("firebase/firebase-storage")

export default function Save(props){
    console.log(props.route.params.image)
    const[caption,setCaption]=useState("")

    const uploadImage=async()=>{
        const uri=props.route.params.image;
        const childPath=`post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`

        const response= await fetch(uri)
        const blob= await response.blob()

        const task=firebase
        .storage()
        .ref()
        .child(childPath)
        .put(blob)

        const taskProgress =snapshot=>{
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted =()=>{
            task.snapshot.ref.getDownloadURL().then((snapshot)=>{
                savePost(snapshot)
                console.log(snapshot)
            })
        }

        const taskError=snapshot=>{
            console.log(snapshot)

        }

        task.on("state_changed",taskProgress,taskError,taskCompleted);
    }

    const savePost=(downloadURL)=>{
        firebase.firestore()
        .collection('posts')
        .doc(firebase.auth().currentUser.uid)
        .collection("userPosts")
        .add({
            downloadURL,
            caption,
            likesCount:0,
            creation:firebase.firestore.FieldValue.serverTimestamp()
        }).then((function(){
           props.navigation.popToTop()
        }))
    }

    return(
        <View style={styles.container}>
            <Image source={{uri:props.route.params.Image}}/>
            <TextInput
                style={styles.input}
                placeholder="enter a caption"
                onChangeText= {(caption)=>setCaption(caption)}
            />
            <View style={styles.button}>
            <Button
                icon={
                    <Icon
                    name="upload"
                    size={45}
                    color="white"
                    />
                }
                // title="UPLOAD"
                type='clear'
                onPress={()=>uploadImage()}
            />
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:'center',
        borderWidth:6,
        borderColor:'orange',
        borderBottomLeftRadius:43,
        borderBottomRightRadius:43
    },
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
        borderRadius:20,
        width:'90%',
     },
     button:{
         backgroundColor:'orange',
         borderWidth:2,
         borderRadius:40,
         height:75,
         width:75,
         borderColor:'white'
     }
})

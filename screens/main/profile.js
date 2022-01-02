import React, { useEffect, useState } from 'react'
import {Text,View,FlatList,Image,StyleSheet,TouchableOpacity} from 'react-native';

import {connect} from 'react-redux'

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

import firebase from 'firebase'
require('firebase/firestore')

function profile(props) {

    const[user,setuser]=useState(null)
    const[userposts,setuserposts]=useState([])
    const[following,setfollowing]=useState(null)

    useEffect(()=>{
        const{currentUser,posts}=props;
        console.log({currentUser,posts})

        if(props.route.params.uid===firebase.auth().currentUser.uid){
            setuser(currentUser)
            setuserposts(posts)
        }

        else{
            firebase.firestore()
            .collection("users")
            .doc(props.route.params.uid)
            .get()
            .then((snapshot)=>{
                if(snapshot.exists){
                    setuser(snapshot.data())
                }
                else{
                    console.log('does not exits')
             }
            })
            firebase.firestore()
            .collection("posts")
            .doc(props.route.params.uid)
            .collection("userPosts")
            .orderBy("creation","asc")
            .get()
            .then((snapshot)=>{
                let posts=snapshot.docs.map(doc=>{
                    const data=doc.data();
                    const id=doc.id;
                    return{id,...data}
                })

        //    console.log(posts)
                setuserposts(posts)
        })
        }

        if(props.following.indexOf(props.route.params.uid)>-1){
            setfollowing(true);
        }else{
            setfollowing(false);
        }
    },[props.route.params.uid,props.following])
    
    const onUnfollow=()=>{
        firebase.firestore()
        .collection("folowing")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFollowing")
        .doc(props.route.params.uid)
        .delete()
    }   
    
     const onFollow=()=>{
        firebase.firestore()
        .collection("folowing")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFollowing")
        .doc(props.route.params.uid)
        .set({})
    }
    
    const onLogout=()=>{
        firebase.auth().signOut();
    }
    
    if(user===null){
        return <View/>
    }



    
    
    
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Profile</Text>
            <View style={styles.infoContainer}>
                
                <Text style={styles.username}>{user.username}</Text>
                {props.route.params.uid!==firebase.auth().currentUser.uid?(
                    <View>
                        {following?(
                            <Button
                            title='Disconnect'
                            onPress={()=> onUnfollow()}
                            />
                        ):(
                            <Button
                            title='connect'
                            onPress={()=>onFollow()}
                            />
                        )}
                    </View>
                ):<Button
                    style={styles.logout}
                    icon={
                        <Icon
                            name="sign-out-alt"
                            size={35}
                            color="black"
                        />}
                    type='clear'
                    // title="Logout"
                    onPress={()=>onLogout()}
                />}
            </View>
            <View style={styles.galleryContainer}>
                    <FlatList
                        numColumns={3}
                        horizontal={false}
                        data={userposts}
                        renderItem={({item})=>(
                            <TouchableOpacity 
                                // onPress={()=>props.navigation.navigate('profileImage')}
                                style={styles.pictureContainer}>
                                <Image style={styles.image}
                                    source={{uri:item.downloadURL}}
                                />
                            
                            </TouchableOpacity>
                        )}
                    />
            </View>
        </View>
    )
}

const mapStateToProps=(store)=>({
    currentUser:store.userState.currentUser,
    posts:store.userState.posts,
    following:store.userState.following,
})

const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingTop:6,
        borderWidth:6,
        borderColor:'orange',
        // borderTopLeftRadius:43,
        // borderTopRightRadius:43,
        backgroundColor:'white'
    },
    infoContainer:{
        margin:40,
        // paddingTop:30,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    pictureContainer:{
        flex:1/3,
        flexDirection:'column'
    },
    galleryContainer:{
        flex:1,
        margin:5
    },
    image:{
        flex:1,
        aspectRatio:1/1,
        borderColor:'white',
        borderWidth:2
    },
    header:{
        marginTop:35,
        textAlign:'center',
        fontWeight:'900',
        color:'orange',
        fontSize:30
    },
    username:{
        flex:1,
        fontSize:25,
        fontWeight:'bold',
        alignItems:'center',
        justifyContent:'center',
        paddingTop:7
    },
    logout:{
        backgroundColor:'orange',
        borderRadius:30
    }
})
export default connect(mapStateToProps,null)(profile)
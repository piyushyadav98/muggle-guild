import React, { useEffect, useState } from 'react'
import {Text,View,FlatList,Image,StyleSheet} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { Button } from 'react-native-elements';
import {icon} from 'react-native-vector-icons/MaterialIcons'

import {connect} from 'react-redux'

import firebase from 'firebase'
require('firebase/firestore')

function Feed(props) {

    const[posts,setposts]=useState([]);

    const onLikePress = (userId, postId) => {
        firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .set({})
    }
    const onDislikePress = (userId, postId) => {
        firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .delete()
    }



    useEffect(()=>{
    //    let posts=[];
    //    console.log(props)
       if(props.usersFollowingLoaded==props.following.length  && props.following.length!==0){
        //    for(let i=0;i<props.following.length;i++){
        //         const user=props.users.find(el=>el.uid===props.following[i]);
        //         if(user!=undefined){
        //         posts=[...posts,...user.posts]
        //     }
        //    }
            console.log('helu')
           props.feed.sort(function(x,y){
                return x.creation - y.creation;
           })
           setposts(props.feed)
           
       }
    //    console.log(posts)
    },[props.usersFollowingLoaded,props.feed])
    

    return (
        <View style={styles.container}>
            <View style={styles.galleryContainer}>
                    <Text style={styles.header}>Muggle-Guild</Text>
                    <FlatList
                        numColumns={1}
                        horizontal={false}
                        data={posts}
                        renderItem={({item})=>(
                            <View style={styles.pictureContainer}>
                                <Text style={styles.feedcontainer} >{item.user.username}</Text>
                                
                                <Image style={styles.image}
                                    source={{uri:item.downloadURL}}
                                />
                                <Text>caption-{item.caption}</Text>
                                <View style={styles.likesContainer}>
                                { item.currentUserLike ?
                                (
                                    <Button
                                        icon={{
                                            name:'grade',
                                            size:35,
                                            color:'orange',
                                        }}
                                        // title= "dislike"
                                        type="clear"
                                        // color="black"
                                        onPress={() => onDislikePress(item.user.uid, item.id)} />
                                )
                                :
                                (
                                    <Button
                                        icon={{
                                            name:'grade',
                                            size:35,
                                            color:'black',
                                        }}
                                        // title="Like"
                                        type="clear"
                                        color="black"
                                        onPress={() => onLikePress(item.user.uid, item.id)} />
                                )
                            }
                                <Button
                                // title='Comments'
                                icon={{
                                            name:'comment',
                                            size:30,
                                            color:'black',
                                        }}
                                type="clear" 
                                onPress={()=>props.navigation.navigate('Comment',{postId:item.id,uid:item.user.uid})}>
                                 Comments
                                </Button>
                                </View>
                            
                            </View>
                            
                        )}
                    />
                    
            </View>
        </View>
    )
}

const mapStateToProps=(store)=>({
    currentUser:store.userState.currentUser,
    following:store.userState.following,
    feed:store.usersState.feed,
    usersFollowingLoaded:store.usersState.usersFollowingLoaded
})

const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingTop:30,
        borderWidth:6,
        borderColor:'orange',
        // borderTopRightRadius:43,
        // borderTopLeftRadius:43,
        backgroundColor:'white'
    },
    feedcontainer:{
        // flex:1,
        fontWeight:'bold',
        fontSize:15
    },
    infoContainer:{
        margin:40,
        // flexDirection:'row'
    },
    pictureContainer:{
        flex:1/3,
        // flexDirection:'column'
        marginBottom:30
    },
    galleryContainer:{
        flex:1,
        margin:5
    },
    likesContainer:{
        flexDirection:'row'
    },
    image:{
        flex:1,
        aspectRatio:1/1,
        resizeMode:'center',
        marginTop:10,
        marginBottom:10
    },
    header:{
        textAlign:'center',
        fontWeight:'bold',
        color:'orange',
        fontSize:30,
        paddingBottom:40

    }
})
export default connect(mapStateToProps,null)(Feed)

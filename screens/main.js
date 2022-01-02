import React, { Component, useEffect } from 'react'
import { View,Text,StyleSheet } from 'react-native'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser,fetchUserPosts,fetchUserFollowing ,fetchUsersData,fetchUsersFollowingPosts,clearData} from '../redux/actions/index'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Feed from './main/feed'
import profile from './main/profile'
import Search from './main/search'
import { NavigationContainer } from '@react-navigation/native'

import firebase from 'firebase'

const Tab = createMaterialBottomTabNavigator();

const fake=()=>{
    return(null)
}

export class Main extends Component {

    
    
    componentDidMount(){
        this.props.clearData();
        this.props.fetchUser();
        this.props.fetchUserPosts();
        this.props.fetchUserFollowing();
        // this.props.fetchUsersData();
        // this.props.fetchUsersFollowingPosts();
        
    }
    render() {
        const {currentUser}=this.props;

        console.log(currentUser)
        return (
            <Tab.Navigator initialRouteName="home" labeled={false} barStyle={{backgroundColor:'orange'}} inactiveColor='white'>
                <Tab.Screen name="home" component={Feed}
                options={{
                    tabBarIcon:({color,size})=>(
                        <MaterialCommunityIcons name="home" color={color} size={26}/>
                    ),
                }}
                />
                 <Tab.Screen name="search" component={Search} navigation={NavigationContainer.navigation}
                options={{
                    tabBarIcon:({color,size})=>(
                        <MaterialCommunityIcons name="magnify" color={color} size={26}/>
                    )
                }}/>

                 <Tab.Screen name="AddContainer" component={fake}
                 listeners={({navigation})=>({
                     tabPress:event=>{
                         event.preventDefault();
                         navigation.navigate("Add")
                     }
                 })
                 }
                options={{
                    tabBarIcon:({color,size})=>(
                        <MaterialCommunityIcons name="plus-circle" color={color} size={26}/>
                    )
                }}/>

                <Tab.Screen name="profile" component={profile}
                listeners={({navigation})=>({
                     tabPress:event=>{
                         event.preventDefault();
                         navigation.navigate("profile",{uid:firebase.auth().currentUser.uid,navigation:NavigationContainer.navigation})
                     }
                 })}
                options={{
                    tabBarIcon:({color,size})=>(
                        <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
                    )
                }}/>
            </Tab.Navigator>
        )
    }
}




const mapStatetoProps =(store)=>({
    currentUser:store.userState.currentUser
})

const styles=StyleSheet.create({
  Main:{
    flex:1,
    justifyContent:'center',
  }
})

const mapDispatchProps =(dispatch) => bindActionCreators({fetchUser,fetchUserPosts,fetchUserFollowing
    // ,fetchUsersData,fetchUsersFollowingPosts
    ,clearData},dispatch);
export default connect(mapStatetoProps,mapDispatchProps)(Main);

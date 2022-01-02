import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import {StyleSheet,View,Text} from 'react-native';
import Register from "./register";

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Homescreen=({navigation})=>{
    return(
    <View style={styles.maincontainer}>
        <Text style={styles.header}>Muggle-Guild</Text>
        <View style={styles.button}>
        <Button
        style={styles.buttonmain}
        icon={
           <Icon
            name="sign-in-alt"
            size={45}
            color="white"
            />
        }
        type="solid"
        title="   Login    "
        onPress={()=>navigation.navigate('login')}
        />
        <Button
        icon={
           <Icon
            name="user-plus"
            size={45}
            color="white"
            />
        }
        title=" Sign up "
        onPress={()=>navigation.navigate('register')}/>
        </View>
    </View>
    )
}

const styles= StyleSheet.create({
    maincontainer:{
        flex:1,
        borderColor:'orange',
        borderWidth:6,
        // borderRadius:43,
        paddingTop:50,
        // alignItems:"center",
        justifyContent:'center',
        backgroundColor:'white'
    },
     header:{
        textAlign:'center',
        fontWeight:'bold',
        color:'orange',
        fontSize:45,
        paddingBottom:60

    },
    button:{
        flexDirection:'row',
        justifyContent:'space-around',
        color:'orange',

    },
    buttonmain:{
    }
})

export default Homescreen;
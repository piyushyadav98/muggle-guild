import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { NavigationContainer } from '@react-navigation/native';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function App({navigation}) {
  const [hascameraPermission, setHascameraPermission] = useState(null);
  const [hasgalleryPermission, setHasgalleryPermission] = useState(null);
  const [camera,setcamera]=useState(null)
  const [image,setimage]=useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const camerastatus = await Camera.requestPermissionsAsync();
      setHascameraPermission(camerastatus.status === 'granted');

      const gallerystatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasgalleryPermission(gallerystatus.status === 'granted');
    })();
  }, []);

  const takepicture=async()=>{
      if(camera){
          const data=await camera.takePictureAsync(null);
          setimage(data.uri);
      }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setimage(result.uri);
    }
  };

  if (hascameraPermission === null || hasgalleryPermission===null) {
    return <View />;
  }
  if (hascameraPermission === false || hasgalleryPermission===false) {
    return <Text>No access to camera</Text>;
  }
  return (
   <View style={{flex:1}}>
   <View style={styles.camcontainer}>
      {image ? 
      (
        <Image source={{uri:image}} style={{flex:1,aspectratio:1/1}}/>
      ):(
         <Camera 
        ref={ref =>setcamera(ref)}
        style={styles.ratio} 
        type={type}
        ratio={'1:1'}/>
      )}

     
        
    </View>
    
    <View style={styles.buttons}>
    <View style={styles.button1}>
    <Button
         icon={{
            name:'flip',
            size:45,
            color:'white',
            }}

        // title="Flip Image"
        type='clear'
        onPress={() => {
            setType(
            type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
              );
            }}>
    </Button>
    <Button
        icon={
           <Icon
            name="camera"
            size={45}
            color="white"
            />
        }
        // title='click picture'
        type='clear'
        onPress={()=>takepicture()}
        />
      </View>
      <View style={styles.button1}>
      <Button
        icon={
           <Icon
            name="image"
            size={45}
            color="white"
            />
        }
        // title='choose image from library'
        type='clear'
        onPress={()=>pickImage()}
        />
      <Button
        icon={
           <Icon
            name="upload"
            size={45}
            color="white"
            />
        }
        // title='Save'
        type='clear'
        onPress={()=>navigation.navigate('Save',{image})}
        />
        </View>
      </View>
      {/* {image && <Image source={{uri:image}} style={{flex:1,aspectratio:1/1}}/>} */}
      
    
    </View>
  );
}

const styles=StyleSheet.create({
    camcontainer:{
        flex:1,
        flexDirection:'row'
    },
    ratio:{
        flex:1,
        aspectRatio:1/1,
        padding:5,
        borderWidth:4,
        borderColor:'black',
    },
    buttons:{
      flex:1,
      // flexDirection:'row',
      paddingTop:30,
      justifyContent:'space-around',
      // marginTop:50,
      backgroundColor:'orange',
      borderColor:'white',
      borderWidth:7,
      borderBottomRightRadius:43,
      borderBottomLeftRadius:43

    },
    button1:{
      flexDirection:'row',
      justifyContent:'space-around'

    }
})
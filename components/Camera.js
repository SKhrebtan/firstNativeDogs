import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, StyleSheet, } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from 'expo-file-system';
import { useDispatch } from "react-redux"
import { updateAvatar } from "../redux/auth/operations";
import { MaterialIcons } from '@expo/vector-icons';
export default function CustomCamera({setShowCamera,setShowEnum}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const dispatch = useDispatch()
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View 
    // style={styles.container}
    >
      <Camera
        style={styles.camera}
        type={type}
        ref={setCameraRef}
      >
        <View 
        // style={styles.photoView}
        >
          <TouchableOpacity
          style={{position:'absolute',top:15, left:15}}
            // style={styles.flipContainer}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.front
                  ? Camera.Constants.Type.back
                  : Camera.Constants.Type.front
              );
            }}
          >
            <View >
            <MaterialIcons name="flip-camera-ios" size={50} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{position:'absolute',top:15, right:15}}
            onPress={async () => {
              if (cameraRef) {
                const { uri } = await cameraRef.takePictureAsync();
                const photo = await MediaLibrary.createAssetAsync(uri);
                const fileInfo = await FileSystem.getInfoAsync(uri);
                const formData = new FormData();
                formData.append('file', {
                    uri: fileInfo.uri,
                    type: 'image/jpg',
                    name: 'photo.jpg',
                  });
               
                dispatch(updateAvatar(formData))
                setShowCamera(false)
                setShowEnum(false)
              }
            }}
          >
            <View style={styles.takePhotoOut}>
              <View style={styles.takePhotoInner}></View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //  flex: 1,
    position:'relative',
     width: 200
     },
  camera: { 
    position:'relative',
    height:400,
    width: 320
 },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },

  flipContainer: {
    flex: 0.1,
    alignSelf: "flex-end",
  },

  button: { alignSelf: "center" },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
  },
});

import React, { FC, useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Alert, Image } from 'react-native';
import { Camera, Constants } from 'expo-camera';
import { Ionicons } from "@expo/vector-icons";
import { usePitScout } from '../Stores';

interface CameraProps {
    navigation: any,
    route: any
}

const PitScoutCamera: FC<CameraProps> = ({ navigation, route }) => {

    const { index } = route?.params?.index;
    const pitScoutFields = usePitScout((state) => state.pitScoutFields);
    const setPitScoutFields = usePitScout((state) => state.setPitScoutFields);
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [camera, setCamera] = useState<any>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync({ quality: 0.3, base64: true });
            // Alert.alert(data.uri);
            // console.log(data.base64);
            let imgData = {
                name: "Robot Pic",
                value: data.base64
            }
            let prevData = [...pitScoutFields];
            prevData[index] = imgData;
            setPitScoutFields(prevData);
            navigation?.goBack();
        }
    }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    // if (image) {
    //     return <Image source={{ uri: image }} style={{ flex: 1 }} />;
    // }

    return (
        <View>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row'
                }}
            >
                <Camera
                    ref={ref => setCamera(ref)}
                    style={{ flex: 1, aspectRatio: 1, }}
                    type={Camera.Constants.Type.back}
                    ratio={'1:1'}
                />
            </View>
            <TouchableOpacity
                onPress={() => {
                    takePicture();
                }}
            >
                <Ionicons
                    name='ellipse'
                    size={64}
                    color="white"
                    style={{
                        alignSelf: 'center',
                    }}
                />
            </TouchableOpacity>
        </View>
    );
}

export default PitScoutCamera;
import { Text, TouchableOpacity, View, Alert, Image } from 'react-native';
import React, { FC, useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { Ionicons } from "@expo/vector-icons";
import { usePitScout } from '../Stores';
import { storage } from '../firebase';
import { Spinner } from '@ui-kitten/components';
import Toast from 'react-native-toast-message';

interface CameraProps {
    navigation: any,
    route: any
}

const PitScoutCamera: FC<CameraProps> = ({ navigation, route }) => {

    const { year, teamNum } = route?.params;
    const pitScoutFields = usePitScout((state) => state.pitScoutFields);
    const setPitScoutFields = usePitScout((state) => state.setPitScoutFields);
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [camera, setCamera] = useState<Camera | null>();
    const [image, setImage] = useState<string>('');

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync({ base64: true });
            setImage(data.uri);
            const response = await fetch(data.uri);
            const blob = await response.blob();
            const imgRef = storage.ref().child(`robotImages/${year}/${teamNum}`);
            // Alert.alert(`Image base 64: ${data.base64}`);
            // await imgRef.put(blob);
            Toast.show({ type: 'success', text1: 'Successfully stored Image' });
        }
    }

    if (hasPermission === null) {
        return <Spinner />;
    }
    if (hasPermission === false) {
        return <Text>Please enable access to Camera</Text>;
    }

    if (image.length > 0) {
        return (
            <View
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                }}
            >
                <Image source={{ uri: image }} style={{ maxWidth: '100%', maxHeight: undefined, aspectRatio: 1 }} />
            </View>
        );
    }

    return (
        <>
            <Toast position='top' topOffset={20} />
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row'
                    }}
                >
                    <Camera
                        ref={ref => setCamera(ref)}
                        style={{ flex: 1 }}
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
                        color="black"
                        style={{
                            alignSelf: 'center',
                        }}
                    />
                </TouchableOpacity>
            </View>
        </>
    );

}
export default PitScoutCamera;
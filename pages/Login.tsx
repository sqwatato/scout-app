import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationState, RouteProp } from "@react-navigation/native";
import React, { FC, useEffect, useRef, useState } from "react";
import { NavigationScreenProp, NavigationParams } from "react-navigation";
import { Alert
    , View
    , Text
    , StyleSheet, KeyboardAvoidingView
    , TextInput
    , TouchableOpacity } from "react-native";
import { db, auth } from "../firebase";

const Tab = createBottomTabNavigator();

type RootStackParamList = {
  data: { data: string };
};

type DataProp = RouteProp<RootStackParamList, "data">;

interface MatchProps {
  route: DataProp;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Login: FC<MatchProps> = ({ route, navigation }) => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user) navigation.navigate("Home");
        });
    }, [])
    const handleLogin = () => {
        auth.
        signInWithEmailAndPassword(email, password).then(
            () => Alert.alert("Sign in successful")
        ).catch((error) => {
            if (error.code === 'auth/invalid-email')
                Alert.alert('You did not enter a valid Email');
            else if (error.code === 'auth/user-not-found')
                Alert.alert('This user could not be found');
            else if (error.code === 'auth/wrong-password')
                Alert.alert('Wrong password');
        });
        navigation.navigate("Home");
    }
    return(
        <>
            <KeyboardAvoidingView 
                style = { styles.container }
                behavior='padding'
            >
                <View style = { styles.inputContainer }>
                    <TextInput 
                        placeholder = "Enter email"
                        value = {email.toLowerCase()}
                        onChangeText={text => setEmail(text.toLowerCase())}
                        style = {styles.input}
                    />
                    <TextInput 
                        placeholder = "Password"
                        value = {password}
                        onChangeText={text => setPassword(text)}
                        style = {styles.input}
                        secureTextEntry
                    />
                </View>
                <View style = { styles.buttonContainer }>
                    <TouchableOpacity
                        onPress={() => handleLogin()}
                        style = { styles.button }
                    >
                        <Text style = { styles.buttonText }>Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
    )
};

export default Login;

const styles = StyleSheet.create({
    container : {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer : {
        width : '80%',
    }, 
    input : {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer : {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button : {
        backgroundColor: "#0782F9",
        width: '100%',
        padding: 15, 
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: "#0782F9",
        borderWidth: 2,
    }, 
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText : {
        color: "#0782F9",
        fontWeight: '700',
        fontSize: 16,
    }
});
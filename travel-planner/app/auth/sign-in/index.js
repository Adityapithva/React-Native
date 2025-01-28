import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "./../../../configs/FirebaseConfig";

export default function SignIn() {
    const navigation = useNavigation();
    const router = useRouter();
    const[email,setEmail] = useState();
    const[password,setPassword] = useState();
    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const onSignIn = () => {

        if(!email&&!password){
            ToastAndroid.show('Please enter Email & Password',ToastAndroid.SHORT);
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                router.replace('/mytrip')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if(errorCode == 'auth/invalid-credential'){
                    ToastAndroid.show('Invalid Credentials',ToastAndroid.LONG);
                }
            });
    }

    return (
        <View style={{
            padding: 25,
            backgroundColor: Colors.white,
            height: '100%',
            paddingTop: 50
        }}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 30,
                marginTop: 30
            }}>Let's Sign You In</Text>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 30,
                color: Colors.gray,
                marginTop: 20
            }}>Welcome Back</Text>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 30,
                color: Colors.gray,
                marginTop: 10
            }}>You've been missed</Text>

            <View style={{
                marginTop: 50
            }}>
                <Text style={{
                    fontFamily: 'outfit'
                }}>Email</Text>
                <TextInput placeholder='Enter Email' style={styles.input} onChangeText={(val) => setEmail(val)}/>
            </View>
            <View style={{
                marginTop: 20
            }}>
                <Text style={{
                    fontFamily: 'outfit'
                }}>Password</Text>
                <TextInput placeholder='Enter Password' secureTextEntry={true} style={styles.input} onChangeText={(val) => setPassword(val)}/>
            </View>

            <TouchableOpacity style={{
                padding: 20,
                backgroundColor: Colors.primary,
                borderRadius: 15,
                marginTop: 50
            }} onPress={onSignIn}>
                <Text style={{
                    color: Colors.white,
                    textAlign: 'center'
                }}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => router.replace('auth/sign-up')}
                style={{
                    padding: 20,
                    backgroundColor: Colors.white,
                    borderRadius: 15,
                    marginTop: 20,
                    borderWidth: 1
                }}>
                <Text style={{
                    color: Colors.primary,
                    textAlign: 'center'
                }}>Create Account</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 15,
        borderRadius: 15,
        borderColor: Colors.gray,
        borderWidth: 1,
        fontFamily: 'outfit'
    }
});
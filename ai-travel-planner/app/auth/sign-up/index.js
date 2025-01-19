import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "./../../../configs/FirebaseConfig";

export default function SignUp() {

    const nav = useNavigation();
    const router = useRouter();
    const[email,setEmail] = useState();
    const[password,setPassword] = useState();
    const[fullName,setFullName] = useState();

    useEffect(() => {
        nav.setOptions({
            headerShown: false
        })
    }, []);

    const onCreateAccount = () => {

        if(!email&&!password&&!fullName){
            ToastAndroid.show('Please enter all details',ToastAndroid.SHORT);
            return;
        } 
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => { 
                const user = userCredential.user;
                console.log(user);
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode,errorMessage);
            });
    }
    return (
        <View style={{
            padding: 25,
            paddingTop: 50,
            backgroundColor: Colors.white,
            height: '100%'
        }}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 30,
                marginTop: 30
            }}>Create New Account</Text>

            <View style={{
                marginTop: 50
            }}>
                <Text style={{
                    fontFamily: 'outfit'
                }}>Full Name</Text>
                <TextInput placeholder='Enter Full Name' style={styles.input}  onChangeText={(val)=>setFullName(val)}/>
            </View>
            <View style={{
                marginTop: 20
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
                <TextInput placeholder='Enter Password' secureTextEntry={true} style={styles.input}  onChangeText={(val) => setPassword(val)}/>
            </View>

            <TouchableOpacity style={{
                padding: 20,
                backgroundColor: Colors.primary,
                borderRadius: 15,
                marginTop: 50
            }} onPress={onCreateAccount}>
                <Text style={{
                    color: Colors.white,
                    textAlign: 'center'
                }}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => router.replace('auth/sign-in')}
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
                }}>Sign In</Text>
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
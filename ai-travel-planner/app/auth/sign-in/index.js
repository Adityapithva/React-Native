import { View, Text, TextInput,StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import {Colors} from '../../../constants/Colors';

export default function SignIn() {
    const navigation = useNavigation();
    const router = useRouter();
    useEffect(() => {
        navigation.setOptions({
            headerShown:false
        })
    },[])


    return (
        <View style={{
            padding:25,
            backgroundColor:Colors.white,
            height:'100%',
            paddingTop:50
        }}>
            <Text style={{
                fontFamily:'outfit-bold',
                fontSize:30,
            }}>Let's Sign You In</Text>
            <Text style={{
                fontFamily:'outfit',
                fontSize:30,
                color:Colors.gray,
                marginTop:20
            }}>Welcome Back</Text>
            <Text style={{
                fontFamily:'outfit',
                fontSize:30,
                color:Colors.gray,
                marginTop:10
            }}>You've been missed</Text>

            <View style={{
                marginTop:50
            }}>
                <Text style={{
                    fontFamily:'outfit'
                }}>Email</Text>
                <TextInput placeholder='Enter Email' style={styles.input}/>
            </View>
            <View style={{
                marginTop:20
            }}>
                <Text style={{
                    fontFamily:'outfit'
                }}>Password</Text>
                <TextInput placeholder='Enter Password' secureTextEntry={true} style={styles.input}/>
            </View>

            <View style={{
                padding:20,
                backgroundColor:Colors.primary,
                borderRadius:15,
                marginTop:50
            }}>
                <Text style={{
                    color:Colors.white,
                    textAlign:'center'
                }}>Sign In</Text>
            </View>

            <TouchableOpacity 
            onPress={() => router.replace('auth/sign-up')}
            style={{
                padding:20,
                backgroundColor:Colors.white,
                borderRadius:15,
                marginTop:20,
                borderWidth:1
            }}>
                <Text style={{
                    color:Colors.primary,
                    textAlign:'center'
                }}>Create Account</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    input:{
        padding:15,
        borderRadius:15,
        borderColor:Colors.gray,
        borderWidth:1,
        fontFamily:'outfit'
    }
});
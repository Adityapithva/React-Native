import { View, Text, Image,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function Login() {
    const router = useRouter();
    return (
        <View>
            <Image source={require('./../assets/images/login.jpg')}
                style={{
                    width:'100%',
                    height:550
                }}
            />
            <View style={styles.container}>
                <Text style={{
                    fontSize:28,
                    fontFamily:'outfit-bold',
                    textAlign:'center',
                    marginTop:10
                }}>AI Travel Planner</Text>
                <Text style={{
                    fontFamily:'outfit',
                    fontSize:17,
                    textAlign:'center',
                    color:Colors.gray,
                    marginTop:20
                }}>Discover your next adventure effortlessy.Personalized itineraries at your fingertips.Travel smater with AI-Driven insights.</Text>
                <TouchableOpacity style={styles.button}
                onPress={() => router.push('auth/sign-in')}
                >
                    <Text style={{
                        color:Colors.white,
                        textAlign:'center',
                        fontFamily:'outfit',
                        fontSize:17
                    }}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.white,
        marginTop:-20,
        height:'100%',
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        padding:25
    },
    button:{
        padding:15,
        backgroundColor:Colors.primary,
        borderRadius:99,
        marginTop:'25%'
    }
});
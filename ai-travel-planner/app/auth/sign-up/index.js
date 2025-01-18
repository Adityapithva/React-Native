import { View, Text, StyleSheet, TextInput,TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../../constants/Colors';
export default function SignUp() {

    const nav = useNavigation();
    const router = useRouter();
    useEffect(() => {
        nav.setOptions({
            headerShown: false
        })
    }, [])
    return (
        <View style={{
            padding: 25,
            paddingTop: 50,
            backgroundColor:Colors.white,
            height:'100%'
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 30
            }}>Create New Account</Text>

            <View style={{
                marginTop: 50
            }}>
                <Text style={{
                    fontFamily: 'outfit'
                }}>Full Name</Text>
                <TextInput placeholder='Enter Full Name' style={styles.input} />
            </View>
            <View style={{
                marginTop: 20
            }}>
                <Text style={{
                    fontFamily: 'outfit'
                }}>Email</Text>
                <TextInput placeholder='Enter Email' style={styles.input} />
            </View>
            <View style={{
                marginTop: 20
            }}>
                <Text style={{
                    fontFamily: 'outfit'
                }}>Password</Text>
                <TextInput placeholder='Enter Password' secureTextEntry={true} style={styles.input} />
            </View>

            <View style={{
                padding: 20,
                backgroundColor: Colors.primary,
                borderRadius: 15,
                marginTop: 50
            }}>
                <Text style={{
                    color: Colors.white,
                    textAlign: 'center'
                }}>Create Account</Text>
            </View>

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
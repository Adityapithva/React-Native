import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import Colors from './../../constants/Colors';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db,auth } from '../../config/FirebaseConfig';
import { setDoc,doc } from 'firebase/firestore';
import { UserDetailContext } from '../../context/UserDetailContext';

export default function SignUp() {
    const router = useRouter();
    const [fullName,setFullName] = useState();
    const [password,setPassword] = useState();
    const [email,setEmail] = useState();
    const {userDetail,setUserDetail} = useContext(UserDetailContext);
    const createNewAccount = () => {
        createUserWithEmailAndPassword(auth,email,password)
        .then(async(res) => {
            const user = res.user;
            console.log(user);
            await saveUser(user);
        })
        .catch(err => {
            console.log(err);
        })

    }
    const saveUser = async(user) => {
        const data = {
            name:fullName,
            email:email,
            member:false,
            uid:user?.uid
        }
        await setDoc(doc(db,'users',email),data);
        setUserDetail(data);
    }
    return (
        <View style={{
            display: 'flex',
            paddingTop: 100,
            alignItems: 'center',
            flex: 1,
            backgroundColor: Colors.white,
            padding: 25
        }}>
            <Image source={require('./../../assets/images/logo.png')}
                style={{
                    width: 180,
                    height: 180
                }}
            />
            <Text style={{
                fontSize: 30,
                fontFamily: 'outfit-bold'
            }}>Create New Account</Text>
            <TextInput placeholder='Full Name' style={styles.textInput} onChangeText={(val) => setFullName(val)}/>
            <TextInput placeholder='Email' style={styles.textInput} onChangeText={(val) => setEmail(val)}/>
            <TextInput placeholder='Password' style={styles.textInput} secureTextEntry={true} onChangeText={(val) => setPassword(val)}/>
            <TouchableOpacity style={{
                padding: 15,
                backgroundColor: Colors.primary,
                width: '100%',
                marginTop: 25,
                borderRadius: 10
            }} onPress={createNewAccount}>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 20,
                    color: Colors.white,
                    textAlign: 'center'
                }}>Create Account</Text>
            </TouchableOpacity>
            <View style={{
                display:'flex',
                flexDirection:'row',
                gap:5,
                marginTop:20
            }}>
                <Text style={{
                    fontFamily:'outfit'
                }}>
                    Already have an Account? </Text>
                <Pressable onPress={() => router.push('/auth/signIn')}>
                    <Text style={{
                        color:Colors.primary,
                        fontFamily:'outfit-bold'
                    }}>Sign In Here</Text>
                </Pressable>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        width: '100%',
        padding: 15,
        fontSize: 18,
        marginTop: 20,
        borderRadius: 8
    }
});
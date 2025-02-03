import { View, Text, StyleSheet,Image,TextInput,TouchableOpacity,Pressable, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import Colors from './../../constants/Colors';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../config/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { UserDetailContext } from '../../context/UserDetailContext';

export default function SignIn() {
    const router = useRouter();
    const[email,setEmail] = useState();
    const[password,setPassword] = useState();
    const {userDetail,setUserDetail} = useContext(UserDetailContext);
    const[loading,setLoading] = useState(false);
    const onSignInClick = () => {
        setLoading(true);
        signInWithEmailAndPassword(auth,email,password)
        .then(async(res) => {
            const user = res.user;
            await getUserDetail();
            setLoading(false);
            router.replace('/(tabs)/home');
        })
        .catch(err=> {
            setLoading(false);
            console.log(err);
            ToastAndroid.show('Incorrect Email & Password',ToastAndroid.BOTTOM);
        })
    }
    const getUserDetail = async() => {
        const result = await getDoc(doc(db,'users',email));
        console.log(result.data());
        setUserDetail(result.data());
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
            }}>Welcome Back</Text>
            <TextInput placeholder='Email' style={styles.textInput} onChangeText={(val) => setEmail(val)}/>
            <TextInput placeholder='Password' style={styles.textInput} secureTextEntry={true}  onChangeText={(val) => setPassword(val)}/>
            <TouchableOpacity style={{
                padding: 15,
                backgroundColor: Colors.primary,
                width: '100%',
                marginTop: 25,
                borderRadius: 10
            }} onPress={onSignInClick}
            disabled={loading}
            >
                {!loading ? <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 20,
                    color: Colors.white,
                    textAlign: 'center'
                }}>Sign In</Text> : <ActivityIndicator size={'large'} color={Colors.white}/> }
            </TouchableOpacity>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 5,
                marginTop: 20
            }}>
                <Text style={{
                    fontFamily: 'outfit'
                }}>
                    Don't have an account?</Text>
                <Pressable onPress={() => router.push('/auth/signUp')}>
                    <Text style={{
                        color: Colors.primary,
                        fontFamily: 'outfit-bold'
                    }}>Create New Here</Text>
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
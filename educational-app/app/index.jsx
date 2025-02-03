import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';
import { useRouter } from "expo-router";
import {onAuthStateChanged} from 'firebase/auth'
import {auth, db} from './../config/FirebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import { useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";

export default function Index() {
  const router = useRouter();
  const{userDetail,setUserDetail} = useContext(UserDetailContext);
  onAuthStateChanged(auth,async(user) => {
    if(user){
      const result = await getDoc(doc(db,'users',user?.email));
      setUserDetail(result.data());
      router.replace('/(tabs)/home');
    }
  })
  return (
    <View style={{
      flex: 1,
      backgroundColor: Colors.white
    }}>
      <Image source={require("./../assets/images/landing.png")}
        style={{
          width: '100%',
          height: 350,
          marginTop: 70
        }}
      />
      <View style={{
        padding: 25,
        backgroundColor: Colors.primary,
        height: '100%',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35
      }}>
        <Text style={{
          fontSize: 30,
          textAlign: 'center',
          color: Colors.white,
          fontFamily: 'outfit-bold'
        }}>Welcome to Coaching Guru</Text>
        <Text style={{
          fontSize: 20,
          color: Colors.white,
          marginTop: 20,
          textAlign: 'center',
          fontFamily: 'outfit'
        }}>Transform your ideas into engaging educational content,effortlessly with All📚🤖</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/auth/signUp')}>
          <Text style={[styles.buttonText, { color: Colors.primary }]}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {
          backgroundColor: Colors.primary,
          borderWidth: 1,
          borderColor: Colors.white
        }]} onPress={() => router.push('/auth/signIn')}>
          <Text style={[styles.buttonText, { color: Colors.white }]}>Already have an Account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: Colors.white,
    marginTop: 20,
    borderRadius: 10
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'outfit'
  }
});
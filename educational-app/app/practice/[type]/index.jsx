import { View, Text, Image, Pressable } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { imageAssets, PracticeOption } from '../../../constants/Option';
import Colors from '../../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../config/FirebaseConfig';
import { UserDetailContext } from '../../../context/UserDetailContext';

export default function PracticeTypeHomeScreen() {
    const{type} = useLocalSearchParams();
    const router = useRouter();
    const{userDetail,setUserDetail} = useContext(UserDetailContext);
    const option = PracticeOption.find(item=> item.name==type);
    useEffect(()=>{
        userDetail&&getCourseList();
    },[userDetail])
    const getCourseList = async() => {
        const q = query(collection(db,'Courses'),where('createdBy','==',userDetail?.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
        })
    }
    return (
        <View>
            <Image source={option.image} style={{
                height:200,
                width:'100%'
            }}/>
            <View style={{
                position:'absolute',
                padding:10,
                display:'flex',
                flexDirection:'row',
                gap:10,
                alignItems:'center'
            }}>
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black" style={{
                        backgroundColor:Colors.white,
                        padding:8,
                        borderRadius:10
                    }}/>
                </Pressable>
                <Text style={{
                    fontFamily:'outfit-bold',
                    fontSize:35,
                    color:Colors.white
                }}>{type}</Text>
            </View>
        </View>
    )
}
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function StartNewTripCard() {

    const router = useRouter();
    return (
        <View style={{
            padding:20,
            marginTop:50,
            display:'flex',
            alignItems:'center',
            gap:25
        }}>
            <Ionicons name="location-sharp" size={30} color="black" />
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize:25,
            }}>No trips planned yet</Text>
            <Text style={{
                fontFamily:'outfit',
                fontSize:20,
                textAlign:'center',
                color:Colors.gray
            }}>Looks like its time to plan a new travel experience! Get Started below</Text>
            <TouchableOpacity style={{
                padding:15,
                backgroundColor:Colors.primary,
                borderRadius:15,
                paddingHorizontal:30,
            }} onPress={() => router.push('/create-trip/search-place')}>
                <Text style={{
                    color:Colors.white,
                    fontFamily:'outfit-medium',
                    fontSize:17
                }}>Start a new trip</Text>
            </TouchableOpacity>
        </View>
    )
}
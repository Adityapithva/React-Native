import { View, Text, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { CreateTripContext } from '../../context/CreateTripContext';
import { AI_PROMPT } from '../../constants/Options';
import { chatSession } from '../../configs/AiModel';
import { useRouter } from 'expo-router';

export default function GenerateTrip() {
    const {tripData,setTripData} = useContext(CreateTripContext);
    const[loading,setLoading] = useState(false);
    const router = useRouter();
    useEffect(() => {
        tripData && GenerateAiTrip()
    },[tripData]);
    const GenerateAiTrip = async() => {
        setLoading(true);
        const FINAL_PROMPT = AI_PROMPT.replace('{location}',tripData.locationInfo?.name)
        .replaceAll('{totalDay}',tripData.totalNoOfDays)
        .replaceAll('{totalNight}',tripData.totalNoOfDays-1)
        .replace('{traveler}',tripData?.traveler?.title)
        .replace('{budget}',tripData.budget);
        console.log(FINAL_PROMPT);
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        console.log(result.response.text());
        setLoading(false);
        router.push('(tabs)/mytrip');
    }
    return (
        <View style={{
            padding:25,
            paddingTop:75,
            backgroundColor:Colors.white,
            height:'100%'
        }}>
            <Text style={{
                fontFamily:'outfit-bold',
                fontSize:35,
                textAlign:'center'
            }}>Please Wait...</Text>
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize:20,
                textAlign:'center',
                marginTop:40
            }}>We are working to generate your dream trip</Text>
            <Image source={require('./../../assets/images/plane.gif')}
                style={{
                    width:'100%',
                    height:200,
                    objectFit:'contain'
                }}
            />
            <Text style={{
                fontFamily:'outfit',
                fontSize:20,
                color:Colors.gray,
                textAlign:'center',
                marginTop:20
            }}>Do not Go Back</Text>
        </View>
    )
}
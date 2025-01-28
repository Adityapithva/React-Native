import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SelectDates() {
    const nav = useNavigation();
    const[startDate,setStartDate] = useState();
    const[endDate,setEndDate] = useState();
    const {tripData,setTripData} = useContext(CreateTripContext);
    const router = useRouter();
    useEffect(() => {
        nav.setOptions({
            headerShown:true,
            headerTransparent:true,
            headerTitle:''
        })
    })
    const onDateChange = (date,type) => {
        if(type == 'START_DATE'){
            setStartDate(moment(date));
        }else{
            setEndDate(moment(date));
        }
    }
    const onDateSelectionContinue = () => {
        if(!startDate&&!endDate){
            ToastAndroid.show('Please select start & end dates',ToastAndroid.LONG);
            return;
        }
        const totalNoOfDays = endDate.diff(startDate,'days');
        console.log(totalNoOfDays+1);
        setTripData({
            ...tripData,
            startDate:startDate,
            endDate:endDate,
            totalNoOfDays:totalNoOfDays+1
        });
        router.push('/create-trip/select-budget');
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
                marginTop:20
            }}>Travel Dates</Text>
            <View style={{
                marginTop:30,
            }}>
                <CalendarPicker
                onDateChange={onDateChange}
                    allowRangeSelection={true}
                    minDate={new Date()}
                    maxRangeDuration={15}
                    selectedRangeStyle={{
                        backgroundColor:Colors.primary,
                    }}
                    selectedDayTextStyle={{
                        color:Colors.white
                    }}
                />
            </View>
            <TouchableOpacity 
            onPress={onDateSelectionContinue}
            style={{
                padding:15,
                backgroundColor:Colors.primary,
                borderRadius:15,
                marginTop:35
            }}>
                <Text style={{
                    fontFamily:'outfit-medium',
                    textAlign:'center',
                    color:Colors.white,
                    fontSize:20
                }}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}
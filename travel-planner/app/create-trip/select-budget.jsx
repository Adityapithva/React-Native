import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigation, useRouter } from 'expo-router'
import { SelectBudgetOptions } from '../../constants/Options';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SelectBudget() {
    const nav = useNavigation();
    const [selectedOption, setSelectedOption] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext);
    const router = useRouter();
    useEffect(() => {
        nav.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ''
        })
    })
    useEffect(() => {
        selectedOption && setTripData({
            ...tripData,
            budget: selectedOption?.title
        })
    }, [selectedOption]);
    const onClickContinue = () => {
        if(!selectedOption){
            ToastAndroid.show('Select your budget',ToastAndroid.LONG);
            return;
        }
        router.push('create-trip/review-trip');
    }
    return (
        <View style={{
            paddingTop: 75,
            padding: 25,
            backgroundColor: Colors.white,
            height: '100%'
        }}>
            <Text style={{
                fontSize: 35,
                marginTop: 20,
                fontFamily: 'outfit-bold'
            }}>Budget</Text>
            <View style={{
                marginTop: 20
            }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 20
                }}>Choose spending habits for your trip</Text>
                <FlatList
                    data={SelectBudgetOptions}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={{
                            marginVertical: 10
                        }} onPress={() => setSelectedOption(item)}>
                            <OptionCard option={item} selectedOption={selectedOption} />
                        </TouchableOpacity>
                    )}
                />
            </View>
            <TouchableOpacity
                onPress={onClickContinue}
                style={{
                    padding: 15,
                    backgroundColor: Colors.primary,
                    borderRadius: 15,
                    marginTop: 20
                }}>
                    <Text style={{
                        textAlign: 'center',
                        color: Colors.white,
                        fontFamily: 'outfit-medium',
                        fontSize: 20
                    }}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}
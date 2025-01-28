import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors';
import { SelectTravelerList } from './../../constants/Options';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SelectTraveler() {
    const nav = useNavigation();
    const [selectTraveler, setSelectTraveler] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext);
    useEffect(() => {
        nav.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ''
        })
    }, [])

    useEffect(() => {
        setTripData({
            ...tripData,
            traveler: selectTraveler
        })
    }, [selectTraveler])
    return (
        <View style={{
            padding: 25,
            paddingTop: 75,
            backgroundColor: Colors.white,
            height: '100%'
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                marginTop: 20,
                fontSize: 35
            }}>Who's Traveling</Text>
            <View style={{
                marginTop: 20
            }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 23
                }}>Choose your tarvelers</Text>

                <FlatList
                    data={SelectTravelerList}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => setSelectTraveler(item)}
                            style={{
                                marginVertical: 10
                            }}>
                            <OptionCard option={item} selectedOption={selectTraveler} />
                        </TouchableOpacity>
                    )}
                />
            </View>

            <TouchableOpacity
                style={{
                    padding: 15,
                    backgroundColor: Colors.primary,
                    borderRadius: 15,
                    marginTop: 20
                }}>
                <Link href={'/create-trip/select-dates'} style={{
                    width: '100%',
                    textAlign:'center'
                }}>
                    <Text style={{
                        textAlign: 'center',
                        color: Colors.white,
                        fontFamily: 'outfit-medium',
                        fontSize: 20
                    }}>Continue</Text>
                </Link>
            </TouchableOpacity>

        </View>
    )
}
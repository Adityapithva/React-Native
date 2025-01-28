import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CreateTripContext } from "./../../context/CreateTripContext";
import {EXPO_PUBLIC_GOOGLE_MAP_KEY} from '@env';

export default function SearchPlace() {
    const nav = useNavigation();
    const router = useRouter();
    const { tripData, setTripData } = useContext(CreateTripContext);
    useEffect(() => {
        nav.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: 'Search'
        })
    }, [])
    useEffect(() => {
        console.log(tripData);
    }, [tripData])

    return (
        <View style={{
            padding: 25,
            paddingTop: 75,
            backgroundColor: Colors.white,
            height: '100%'
        }}>
            <GooglePlacesAutocomplete
                fetchDetails={true}
                placeholder='Search Place'
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    setTripData({
                        locationInfo: {
                            name: data.description,
                            coordinates: details.geometry.location,
                            photoRef: details.photos?.[0].photo_refernce || null,
                            url: details.url
                        }
                    })
                    router.push('/create-trip/select-traveler');
                }}
            
                query={{
                    key: EXPO_PUBLIC_GOOGLE_MAP_KEY,
                    language: 'en',
                }}

                styles={{
                    textInputContainer:{
                        borderWidth:1,
                        borderRadius:5,
                        marginTop:25
                    }
                }}
            />
        </View>
    )
}
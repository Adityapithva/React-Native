import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {PracticeOption} from '../../constants/Option';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function PracticeSection() {
    const router = useRouter();
    return (
        <View style={{
            marginTop:10
        }}>
            <Text style={{
                fontFamily:'outfit-bold',
                fontSize:25
            }}>Practice</Text>
            <View>
                <FlatList
                    data={PracticeOption}
                    numColumns={3}
                    renderItem={({item,index})=> (
                        <TouchableOpacity key={index} style={{
                            flex:1,
                            margin:5,
                            aspectRatio:1
                        }} onPress={() => router.push('/practice/'+item.name)}>
                            <Image source={item?.image} style={{
                                width:'100%',
                                height:'100%',
                                maxHeight:160,
                                borderRadius:15
                            }}/>
                            <Text style={{
                                position:'absolute',
                                padding:15,
                                fontSize:15,
                                fontFamily:'outfit',
                                color:Colors.white
                            }}>{item?.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    )
}
import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import {PracticeOption} from '../../constants/Option';
import Colors from '../../constants/Colors';

export default function PracticeSection() {
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
                        <View key={index} style={{
                            flex:1,
                            margin:5,
                            aspectRatio:1
                        }}>
                        {console.log(item.image)}
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
                        </View>
                    )}
                />
            </View>
        </View>
    )
}
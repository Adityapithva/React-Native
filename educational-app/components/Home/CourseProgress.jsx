import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { imageAssets } from '../../constants/Option'
import Colors from '../../constants/Colors'
import * as Progress from 'react-native-progress';
import CourseProgressCard from '../Shared/CourseProgressCard';

export default function CourseProgress({courseList}) {

    
    return (
        <View style={{
            marginTop:10
        }}>
            <Text style={{
                fontFamily:'outfit-bold',
                fontSize:25,
            }}>Progress</Text>
            <FlatList
                data={courseList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item,index}) => (
                    <View key={index}>
                    <CourseProgressCard item={item}/>
                    </View>
                )}
            />
        </View>
    )
}
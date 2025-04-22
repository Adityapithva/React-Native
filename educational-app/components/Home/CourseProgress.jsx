import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { imageAssets } from '../../constants/Option'
import Colors from '../../constants/Colors'
import * as Progress from 'react-native-progress';

export default function CourseProgress({courseList}) {

    const GetCompletedChapters =(course)=>{
        const completedChapter = course?.completedChapter?.length;
        const per = completedChapter/course?.chapters.length;
        return per;
    }
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
                    <View style={{
                        margin:7,
                        padding:15,
                        backgroundColor:Colors.bg_gray,
                        borderRadius:15,
                        width:280
                    }}>
                        <View style={{
                            display:'flex',
                            flexDirection:'row',
                            gap:8
                        }}>
                            <Image source={imageAssets[item?.banner_image]}
                                style={{
                                    width:80,
                                    height:60,
                                    borderRadius:8
                                }}
                            />
                            <View style={{
                                flex:1
                            }}>
                                <Text style={{
                                    fontFamily:'outfit-bold',
                                    fontSize:19,
                                    flexWrap:'wrap'
                                }} numberOfLines={2}>{item?.courseTitle}</Text>
                                <Text style={{
                                    fontFamily:'outfit',
                                    fontSize:15
                                }}>{item?.chapters?.length} Chapter</Text>
                            </View>
                        </View>
                        <View style={{
                            marginTop:10
                        }}>
                            <Progress.Bar progress={GetCompletedChapters(item)} width={250} />
                            <Text style={{
                                marginTop:2,
                                fontFamily:'outfit'
                            }}>{item?.completedChapter?.length ?? 0} Out of {item?.chapters?.length} Completed</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}
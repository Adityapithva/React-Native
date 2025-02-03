import { View, Text, FlatList ,StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function Chapters({course}) {
    const router = useRouter();
    return (
        <View style={{
            padding:20
        }}>
            <Text style={{
                fontFamily:'outfit-bold',
                fontSize:25
            }}>Chapters</Text>
            <FlatList
                data={course?.chapters}
                renderItem={({item,index}) => (
                    <TouchableOpacity style={{
                        padding:18,
                        borderWidth:0.5,
                        borderRadius:15,
                        marginTop:10,
                        display:'flex',
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center'
                    }} onPress={() => router.push({
                        pathname:'/ChapterView',
                        params:{
                            chapterParams:JSON.stringify(item),
                            docId:item?.docId,
                            chapterIndex:index
                        }
                    })}>
                        <View style={{
                            display:'flex',
                            flexDirection:'row',
                            gap:10
                        }}>
                            <Text style={styles.chapterText}>{index+1}.</Text>
                            <Text style={styles.chapterText}>{item.chapterName}</Text>
                        </View>
                        <Ionicons name="play" size={24} color={Colors.primary} />
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    chapterText:{
        fontFamily:'outfit',
        fontSize:17
    }
});
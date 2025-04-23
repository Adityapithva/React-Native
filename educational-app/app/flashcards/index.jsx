import { View, Text, Pressable, FlatList, Dimensions ,StyleSheet} from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import FlipCard from 'react-native-flip-card';

const FlashCard = () => {
    const { courseParams } = useLocalSearchParams();
    const course = JSON.parse(courseParams);;
    const flashcard = course?.flashcards;
    const [currPage,setCurrPage] = useState(0);
    const width = Dimensions.get('screen').width;
    const onScroll=(event)=>{
        const index = Math.round(event?.nativeEvent?.contentOffset.x/width);
        setCurrPage(index);
    }
    return (
        <View>
            <View style={{
                padding: 25,
                position: 'absolute',
                width: '100%'
            }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Pressable>
                        <Ionicons name="arrow-back" size={30} color="black" />
                    </Pressable>
                    <Text style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 25,
                    }}>{currPage+1} of {flashcard?.length}</Text>
                </View>
                <FlatList
                data={flashcard}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                onScroll={onScroll}
                renderItem={({item,index})=> (
                    <View key={index} style={{
                        height:500,
                        marginTop:60
                    }}>
                        <FlipCard style={styles.flipCardStyle}>
                            <View style={styles.frontCard}>
                                <Text style={{
                                    fontFamily:'outfit-bold',
                                    fontSize:28
                                }}>{item?.front}</Text>
                            </View>
                            <View style={styles.backCard}>
                                <Text style={{
                                    width:Dimensions.get('screen').width * 0.78,
                                    padding:28,
                                    textAlign:'center',
                                    fontFamily:'outfit',
                                    fontSize:28,
                                    color:Colors.white
                                }}>{item?.back}</Text>
                            </View>
                        </FlipCard>
                    </View>
                )}
            />
            </View>
            
        </View>
    )
}

export default FlashCard

const styles = StyleSheet.create({
    frontCard:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'100%',
        borderRadius:20
    },
    backCard:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'100%',
        backgroundColor:Colors.primary,
        borderRadius:20
    },
    flipCardStyle:{
        width:Dimensions.get('screen').width*0.78,
        height:400,
        backgroundColor:Colors.white,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
        marginHorizontal:Dimensions.get('screen').width*0.05
    }
});
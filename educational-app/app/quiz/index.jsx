import { View, Text, Image, Pressable, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Progress from 'react-native-progress'
import Colors from '../../constants/Colors';
import Button from './../../components/Shared/Button';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';

export default function Quiz() {
    const { courseParams } = useLocalSearchParams();
    const course = JSON.parse(courseParams);
    const [currPage, setCurrPage] = useState(0);
    const quiz = course.quiz;
    const [selectedOption, setSelectedOption] = useState();
    const [result, setResult] = useState([]);
    const [loading,setLoading] = useState(false);
    const router = useRouter();
    const GetProgress = (currentPage) => {
        const per = (currentPage / quiz?.length);
        return per;
    }
    const OnOptionSelect = (selectedChoice) => {
        setResult(prev => ({
            ...prev, [currPage]: {
                userChoice: selectedChoice,
                isCorrect: quiz[currPage]?.correctAns == selectedChoice,
                question: quiz[currPage]?.question,
                correctAns: quiz[currPage]?.correctAns
            }
        }))
    }
    const onQuizFinish = async () => {
        setLoading(true);
        try {
            await updateDoc(doc(db, 'Courses', course.docId), {
                quizResult: result
            })
            router.replace({
                pathname:'/quiz/summary',
                params:{
                    quizResultParam:JSON.stringify(result)
                }
            })
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
        setLoading(false);
    }
    return (
        <View style={{
            padding: 25,
            position:'absolute',
            width:'100%'
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Pressable onPress={()=> router.back()}>
                    <Ionicons name="arrow-back" size={30} color="black" />
                </Pressable>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 25,
                }}>{currPage + 1} of {quiz?.length}</Text>
            </View>
            <View style={{
                marginTop: 20
            }}>
                <Progress.Bar progress={GetProgress(currPage)} width={Dimensions.get('window').width * 0.85} color={Colors.green} height={10} />
            </View>
            <View style={{
                padding: 25,
                backgroundColor: Colors.white,
                marginTop: 30,
                height: Dimensions.get('screen').height * 0.65,
                elevation: 1,
                borderRadius: 20
            }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    textAlign: 'center',
                    fontSize: 25
                }}>{quiz[currPage]?.question}</Text>
                {quiz[currPage]?.options?.map((item, index) => (
                    <TouchableOpacity onPress={() => { setSelectedOption(index); OnOptionSelect(item) }} key={index} style={{
                        padding: 15,
                        borderWidth: 1,
                        borderRadius: 15,
                        marginTop: 8,
                        borderColor: selectedOption == index ? Colors.green : null,
                        backgroundColor: selectedOption == index ? Colors.light_green : null
                    }}>
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 20
                        }}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            {(selectedOption?.toString() && quiz?.length - 1 > currPage) && <Button text={'Next'} onPress={() => { setCurrPage(currPage + 1); setSelectedOption(null) }} />}
            {(selectedOption?.toString() && quiz?.length - 1 == currPage) && <Button text={'Finish'} onPress={() => onQuizFinish()} loading={loading}/>}
        </View>
    )
}
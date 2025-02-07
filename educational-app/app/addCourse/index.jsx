import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import Colors from '../../constants/Colors'
import Button from '../../components/Shared/Button';
import { GenerateCourseAiModel, GenerateTopicsAIModel } from '../../config/AiModel';
import Prompt from '../../constants/Prompt';
import {doc, setDoc} from 'firebase/firestore'
import {db} from './../../config/FirebaseConfig';
import { UserDetailContext } from '../../context/UserDetailContext';
import { useRouter } from 'expo-router';

export default function AddCourse() {
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState();
    const [topics, setTopics] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const{userDetail,setUserDetail} = useContext(UserDetailContext);
    const router = useRouter();
    const onTopicSelect = (topic) => {
        setSelectedTopics((prev) => {
            if (prev.includes(topic)) {
                return prev.filter(item => item !== topic);
            } else {
                return [...prev, topic];
            }
        });
        console.log(selectedTopics);
    };

    const onGenerateTopic = async () => {
        setLoading(true)
        const PROMPT = input + Prompt.IDEA;
        const aiRes = await GenerateTopicsAIModel.sendMessage(PROMPT);
        const topicIdea = JSON.parse(aiRes.response.text());
        setTopics(topicIdea?.course_titles);
        setLoading(false);
    }

    const onGenerateCourse = async() => {
        console.log("clicked")
        setLoading(true);
        const PROMPT = selectedTopics+Prompt.COURSE;
        const aiRes = await GenerateCourseAiModel.sendMessage(PROMPT);
        const resp = JSON.parse(aiRes.response.text());
        console.log(resp);
        const courses = resp.courses;
        
        courses?.forEach(async(course) => {
            const docId = Date.now().toString()
            await setDoc(doc(db,'Courses',docId),{
                ...course,
                createdOn:new Date(),
                createdBy:userDetail?.email,
                docId:docId
            })
        })
        router.push('/(tabs)/home')
        setLoading(false);
    };

    const isTopicSelected = (topic) => selectedTopics.includes(topic);
    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
            <View style={{
                padding: 25,
                backgroundColor: Colors.white,
                flex: 1
            }}>
                <Text style={{ fontFamily: 'outfit-bold', fontSize: 30 }}>Create new Course</Text>
                <Text style={{ fontFamily: 'outfit', fontSize: 30 }}>What do you want to learn today?</Text>
                <Text style={{ fontFamily: 'outfit', fontSize: 20, marginTop: 8, color: Colors.gray }}>
                    Write what course you want to create (Ex. Learn React Js, Digital Marketing Guide, 10th Science Chapter)
                </Text>
                <TextInput 
                    placeholder='(Ex. Learn Python, Learn 12th Chemistry)' 
                    style={styles.textInput} 
                    numberOfLines={3} 
                    multiline={true} 
                    onChangeText={(val) => setInput(val)} 
                />
                <Button text={'Generate Topic'} type='outline' onPress={onGenerateTopic} loading={loading} />
                <View style={{ marginTop: 15, marginBottom: 10 }}>
                    <Text style={{ fontFamily: 'outfit', fontSize: 20 }}>Select all topics you want to add in the course</Text>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 10,
                        marginTop: 6
                    }}>
                        {topics.map((item, index) => (
                            <Pressable key={index} onPress={() => onTopicSelect(item)}>
                                <Text style={{
                                    padding: 7,
                                    borderWidth: 0.4,
                                    borderRadius: 99,
                                    paddingHorizontal: 15,
                                    backgroundColor: isTopicSelected(item) ? Colors.primary : null,
                                    color: isTopicSelected(item) ? Colors.white : Colors.primary
                                }}>{item}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
                {selectedTopics?.length > 0 && (
                    <Button text={'Generate Course'} onPress={() => onGenerateCourse()} loading={loading} />
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    textInput: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 15,
        height: 100,
        marginTop: 10,
        fontSize: 18
    }
});

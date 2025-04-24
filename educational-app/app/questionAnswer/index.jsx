import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Colors from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'

const QuestionAnswer = () => {
    const { courseParams } = useLocalSearchParams();
    const course = JSON.parse(courseParams);
    const qaList = course?.qa;
    const [selectedQuestion, setSelectedQuestion] = useState();
    const router = useRouter();

    const OnQuestionSelect = (index) => {
        setSelectedQuestion(selectedQuestion === index ? null : index);
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.headerRow}>
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={30} color="black" />
                </Pressable>
                <Text style={styles.title}>Question & Answer</Text>
            </View>
            <Text style={styles.subtitle}>{course?.courseTitle}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <FlatList
                data={qaList}
                keyExtractor={(_, index) => index.toString()}
                ListHeaderComponent={renderHeader}
                contentContainerStyle={{ padding: 20 }}
                renderItem={({ item, index }) => (
                    <Pressable style={styles.card} onPress={() => OnQuestionSelect(index)}>
                        <Text style={styles.questionText}>{item.question}</Text>
                        {selectedQuestion === index && (
                            <View style={styles.answerContainer}>
                                <Text style={styles.answerText}>Answer: {item?.answer}</Text>
                            </View>
                        )}
                    </Pressable>
                )}
            />
        </View>
    );
};

export default QuestionAnswer;

const styles = StyleSheet.create({
    header: {
        marginBottom: 20,
    },
    headerRow: {
        flexDirection: 'row',
        gap: 7,
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontFamily: 'outfit-bold',
        fontSize: 28,
    },
    subtitle: {
        fontFamily: 'outfit',
        fontSize: 20,
    },
    card: {
        padding: 20,
        backgroundColor: Colors.white,
        marginBottom: 15,
        borderRadius: 15,
        elevation: 1,
    },
    questionText: {
        fontFamily: 'outfit-bold',
        fontSize: 20,
    },
    answerContainer: {
        borderTopWidth: 0.4,
        marginTop: 10,
    },
    answerText: {
        fontFamily: 'outfit',
        fontSize: 17,
        color: Colors.green,
        marginTop: 10,
    },
});

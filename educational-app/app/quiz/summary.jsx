import { View, Text, Image, StyleSheet,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Colors from '../../constants/Colors';
import Button from '../../components/Shared/Button';
export default function QuizSummary() {
    const { quizResultParam } = useLocalSearchParams();
    const quizResult = JSON.parse(quizResultParam);
    const [correctAns, setCorrectAns] = useState(0);
    const [totalQuestion, setTotalQuestion] = useState(0);
    const router = useRouter();

    useEffect(() => {
        quizResult && CalculateResult();
    }, [quizResult])

    const CalculateResult = () => {
        if (quizResult !== undefined) {
            const correctAns_ = Object.entries(quizResult)?.filter(([key, value]) => value?.isCorrect == true);
            const totalQues_ = Object.keys(quizResult).length;
            setCorrectAns(correctAns_.length);
            setTotalQuestion(totalQues_);
        }
    }

    const GetPerMark = () => {
        return ((correctAns / totalQuestion) * 100).toFixed(0);
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: 35 }}>
            <Text style={styles.title}>Quiz Summary</Text>

            <View style={styles.card}>
                <Image source={require('./../../assets/images/trophy.jpg')} style={styles.image} />
                <Text style={styles.congratsText}>{GetPerMark() > 60 ? 'Congratulations!' : 'Try Again!'}</Text>
                <Text style={styles.scoreText}>You have {GetPerMark()}% Correct Answer</Text>

                <View style={styles.scoreRow}>
                    <View style={styles.resulttextContainer}>
                        <Text style={styles.resultText}>Q {totalQuestion}</Text>
                    </View>
                    <View style={styles.resulttextContainer}>
                        <Text style={styles.resultText}>✅ {correctAns}</Text>
                    </View>
                    <View style={styles.resulttextContainer}>
                        <Text style={styles.resultText}>❌ {totalQuestion - correctAns}</Text>
                    </View>
                </View>
            </View>

            <Button text={'Back To Home'} onPress={() => router.replace('/(tabs)/home')} />

            <View style={{ marginTop: 25 }}>
                <Text style={styles.summaryTitle}>Summary</Text>
                {Object.entries(quizResult).map(([key, value], index) => (
                    <View key={key} style={{
                        padding: 15,
                        borderWidth: 1,
                        marginTop: 5,
                        borderRadius: 15,
                        backgroundColor: value?.isCorrect ? Colors.light_green : Colors.light_red,
                        borderColor: value?.isCorrect ? Colors.green : Colors.red
                    }}>
                        <Text style={{ fontFamily: 'outfit', fontSize: 20 }}>{value.question}</Text>
                        <Text style={{ fontFamily: 'outfit', fontSize: 15 }}>Ans: {value?.correctAns}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        fontFamily: 'outfit-bold',
        fontSize: 30,
        textAlign: 'center'
    },
    card: {
        backgroundColor: Colors.white,
        padding: 20,
        borderRadius: 20,
        marginTop: 60,
        alignItems: 'center'
    },
    image: {
        width: 100,
        height: 100,
        marginTop: -60
    },
    congratsText: {
        fontFamily: 'outfit-bold',
        fontSize: 26,
    },
    scoreText: {
        fontFamily: 'outfit',
        color: Colors.gray,
        fontSize: 17
    },
    scoreRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: '100%'
    },
    resultText: {
        fontFamily: 'outfit',
        fontSize: 20
    },
    resulttextContainer: {
        padding: 15,
        backgroundColor: Colors.white,
        elevation: 1,
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 5
    },
    summaryTitle: {
        fontFamily: 'outfit-bold',
        fontSize: 25
    }
});
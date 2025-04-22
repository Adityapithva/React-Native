import { View, Text, Dimensions, StyleSheet,ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import * as Progress from 'react-native-progress'
import Colors from '../../constants/Colors';
import Button from '../../components/Shared/Button';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';

export default function ChapterView() {
    const { chapterParams, docId, chapterIndex } = useLocalSearchParams();
    const [currPage, setCurrPage] = useState(0);
    const chapters = JSON.parse(chapterParams);
    const router = useRouter();
    const [loader, setLoader] = useState(false);
    const GetProgress = (currPage) => {
        const per = (currPage / chapters?.content?.length);
        return per;
    }
    const onChapterComplete = async () => {
        setLoader(true);
        await updateDoc(doc(db, 'Courses', docId), {
            completedChapter: arrayUnion(chapterIndex)
        })
        setLoader(false);
        router.replace('/courseView/' + docId);
    }
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <Progress.Bar
                progress={GetProgress(currPage)}
                width={Dimensions.get('screen').width * 0.85}
                style={{ alignSelf: 'center', marginTop: 25 }}
            />
            <ScrollView contentContainerStyle={{ padding: 25, paddingBottom: 100 }}>
                <Text style={{ fontFamily: 'outfit-bold', fontSize: 25 }}>
                    {chapters?.content[currPage]?.topic}
                </Text>
                <Text style={{ fontFamily: 'outfit', fontSize: 20, marginTop: 7 }}>
                    {chapters?.content[currPage]?.explain}
                </Text>
                {chapters?.content[currPage]?.code && (
                    <Text
                        style={[
                            styles.codeExampleText,
                            { backgroundColor: Colors.black, color: Colors.white },
                        ]}
                    >
                        {chapters?.content[currPage]?.code}
                    </Text>
                )}
                {chapters?.content[currPage]?.example && (
                    <Text style={styles.codeExampleText}>
                        {chapters?.content[currPage]?.example}
                    </Text>
                )}
            </ScrollView>

            <View
                style={{
                    position: 'absolute',
                    bottom: 10,
                    width: '100%',
                    paddingHorizontal: 25,
                }}
            >
                {chapters?.content?.length - 1 != currPage ? (
                    <Button text={'Next'} onPress={() => setCurrPage(currPage + 1)} />
                ) : (
                    <Button text={'Finish'} onPress={() => onChapterComplete()} loading={loader} />
                )}
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    codeExampleText: {
        padding: 15,
        backgroundColor: Colors.gray,
        fontFamily: 'outfit',
        fontSize: 18,
        marginTop: 15
    }
});
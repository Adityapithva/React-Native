import { View, Text, Dimensions, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Progress from 'react-native-progress';
import Colors from '../../constants/Colors';
import Button from '../../components/Shared/Button';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';

export default function ChapterView() {
    const { chapterParams, docId, chapterIndex } = useLocalSearchParams();
    const chapters = JSON.parse(chapterParams);
    const [currPage, setCurrPage] = useState(0);
    const[loading,setLoading] = useState(false);
    const router = useRouter();
    const getProgress = (currPage) => {
        const per = (currPage / chapters?.content?.length);
        return per;
    };

    const currentChapter = chapters?.content[currPage];
    const onChapterComplete = async() => {
        setLoading(true);
        await updateDoc(doc(db,'Courses',docId),{
            completedChapter:arrayUnion(chapterIndex)
        })
        setLoading(false);
        router.back();
    }
    return (
        <View style={{ padding: 25, backgroundColor: Colors.white, flex: 1 }}>
            <Progress.Bar progress={getProgress(currPage)} width={Dimensions.get('screen').width * 0.85} />
            <View style={{ marginTop: 20 }}>
                <Text style={{ fontFamily: 'outfit-bold', fontSize: 25 }}>{currentChapter?.topic}</Text>
                <Text style={{ fontFamily: 'outfit', fontSize: 20, marginTop: 7 }}>{currentChapter?.explain}</Text>

                {currentChapter?.code!== 'null' && (
                    <Text style={[styles.codeExampleText, { backgroundColor: Colors.black,color:Colors.white }]}>
                        {currentChapter?.code}
                    </Text>
                )}

                {currentChapter?.example!== 'null' && (
                    <Text style={styles.codeExampleText}>{currentChapter?.example}</Text>
                )}
            </View>
            <View style={{
                position:'absolute',
                bottom:10,
                left:25,
                width:'100%'
            }}>
                {chapters?.content?.length-1!= currPage ? <Button text={'Next'} onPress={() => setCurrPage(currPage + 1)} /> : 
                    <Button text={'Finish'} onPress={() => onChapterComplete()} loading={loading}/>}
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    codeExampleText: {
        padding: 15,
        backgroundColor: Colors.bg_gray,
        borderRadius: 15,
        fontFamily: 'outfit',
        fontSize: 18,
        marginTop: 15,
    }
});

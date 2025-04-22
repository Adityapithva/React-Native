import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function Chapters({ course }) {
    const router = useRouter();

    const isChapterCompleted = (index) => {
        const isCompleted = course?.completedChapter.find(item => item == index);
        return isCompleted ? true : false;
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 25 }}>Chapters</Text>

            <FlatList
                data={course?.chapters}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={styles.chapterItem}
                        onPress={() =>
                            router.push({
                                pathname: '/ChapterView',
                                params: {
                                    chapterParams: JSON.stringify(item),
                                    docId: course?.docId,
                                    chapterIndex: index,
                                },
                            })
                        }
                    >
                        <View style={styles.chapterTextContainer}>
                            <Text style={styles.chapterText}>{index + 1}.</Text>
                            <Text style={styles.chapterText} numberOfLines={2}>
                                {item.chapterName}
                            </Text>
                        </View>
                        <Ionicons
                            name={isChapterCompleted(index) ? "checkmark-circle" : "play"}
                            size={24}
                            color={isChapterCompleted(index) ? Colors.green : Colors.primary}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    chapterItem: {
        padding: 18,
        borderWidth: 0.5,
        borderRadius: 15,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    chapterTextContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        paddingRight: 10,
    },
    chapterText: {
        fontFamily: 'outfit',
        fontSize: 17,
        flexShrink: 1,
    },
    icon: {
        marginLeft: 10,
        marginTop: 4,
    },
});

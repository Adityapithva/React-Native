import { View, Text, FlatList,TouchableOpacity,Image ,StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { query, collection, where, orderBy, getDocs } from 'firebase/firestore'
import { db } from './../../config/FirebaseConfig'
import { useRouter } from 'expo-router';
import { imageAssets } from '../../constants/Option';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import CourseList from '../Home/CourseList';

export default function CourseListByCategory({ category }) {
    const [courseList, setCourseList] = useState([]);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        GetCourseListByCategory();
    }, [])
    const GetCourseListByCategory = async () => {
        setCourseList([]);
        setLoading(true);
        try{
        const q = query(collection(db, 'Courses'), where('category', '==', category), orderBy('createdOn', 'desc'));
        const querySnapShot = await getDocs(q);

        querySnapShot?.forEach((doc) => {
            setCourseList(prev => [...prev, doc.data()])
        })
    }catch(e){
        console.log(e);
        setLoading(false);
    }
        setLoading(false);
    }
    return(
        <View>
            { courseList?.length>0 &&<CourseList courseList={courseList} heading={category}/>}
        </View>
    )
}
const styles = StyleSheet.create({
    courseContainer: {
        padding: 10,
        backgroundColor: Colors.bg_gray,
        margin: 6,
        borderRadius: 15,
        width: 260,
    }
});
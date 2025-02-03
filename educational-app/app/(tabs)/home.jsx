import { View, Text, Platform, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Home/Header'
import Colors from './../../constants/Colors';
import NoCourse from '../../components/Home/NoCourse';
import { db } from './../../config/FirebaseConfig';
import { getDocs, where, collection, query } from 'firebase/firestore';
import { UserDetailContext } from '../../context/UserDetailContext';
import CourseList from '../../components/Home/CourseList';
import PracticeSection from '../../components/Home/PracticeSection';
import CourseProgress from '../../components/Home/CourseProgress';

export default function Home() {
    const [courseList, setCourseList] = useState([]);
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const getCourseList = async () => {
        setCourseList([]);
        const q = query(collection(db, 'Courses'), where("createdBy", "==", userDetail?.email));
        const querySnapShot = await getDocs(q);
        let newCourses = [];
        querySnapShot.forEach((doc) => {
            newCourses.push(doc.data());
        });
        setCourseList(newCourses); 
    };
    useEffect(() => {
        userDetail && getCourseList();
    }, [userDetail])
    return (
        <FlatList
            data={[]}
            ListHeaderComponent={
                <View style={{
            padding: 25,
            paddingTop: Platform.OS == 'ios' && 45,
            flex: 1,
            backgroundColor: Colors.white,
            height:'100%'
        }}>
            <Header />
            {courseList?.length == 0 ? 
                <NoCourse /> : 
                    <View>
                        <CourseProgress courseList={courseList}/>
                        <PracticeSection/>
                        <CourseList courseList={courseList} /> 
                    </View>}

        </View>
            }
        />
    )
}
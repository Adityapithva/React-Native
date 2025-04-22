import { View, Text, Platform, FlatList, Image } from 'react-native'
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
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        userDetail && getCourseList();
    }, [userDetail])
    const getCourseList = async () => {
        setLoading(true);
        setCourseList([]);
        const q = query(collection(db, 'Courses'), where("createdBy", "==", userDetail?.email));
        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc) => {
            setCourseList(prev => [...prev, doc.data()])
        });
        setLoading(false);
    };
    return (
        <FlatList
            data={[]}
            onRefresh={() => getCourseList()}
            refreshing={loading}
            ListHeaderComponent={
                    <View style={{
                        padding: 25,
                        paddingTop: Platform.OS == 'ios' && 45,
                        backgroundColor:Colors.white,
                        flex:1
                    }}>
                        <Header />
                        {courseList?.length == 0 ?
                            <NoCourse /> :
                            <View>
                                <CourseProgress courseList={courseList} />
                                <PracticeSection />
                                <CourseList courseList={courseList} />
                            </View>}

                    </View>
            }
        />
    )
}
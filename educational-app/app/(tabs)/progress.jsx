import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CourseProgressCard from '../../components/Shared/CourseProgressCard';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './../../config/FirebaseConfig';
import { UserDetailContext } from '../../context/UserDetailContext';
import { useRouter } from 'expo-router';
import Colors from '../../constants/Colors';

export default function Progress() {
  const [courseList, setCourseList] = useState([]);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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
    <View style={{
      flex:1,
      backgroundColor:Colors.white,
    }}>
      <View style={{
        width: '100%',
        position: 'absolute',
        padding: 20,
        
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 30,
          marginBottom: 10,
          marginTop: 20
        }}>Course Progress</Text>
        <FlatList
          data={courseList}
          showsVerticalScrollIndicator={false}
          onRefresh={() => getCourseList()}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => router.push({
              pathname: '/courseView/' + item?.docId,
              params: {
                courseParams: JSON.stringify(item)
              }
            })}>
              <CourseProgressCard item={item} width={'97%'} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}
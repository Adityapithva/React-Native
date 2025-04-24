import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useContext } from 'react'
import Colors from '../../constants/Colors'
import { UserDetailContext } from '../../context/UserDetailContext'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { ProfileMenu } from './../../constants/Option'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/FirebaseConfig'

export default function Profile() {
    const { userDetail, setUserDetail } = useContext(UserDetailContext)
    const router = useRouter()

    const onMenuClick = (menu) => {
        if (menu.name === 'Logout') {
            signOut(auth)
                .then(() => {
                    setUserDetail(null)
                    router.push('/')
                })
                .catch((error) => {
                    console.error('Logout Error:', error)
                })
        } else if (menu.path) {
            router.push(menu.path)
        }
    }

    return (
        <View style={{
            backgroundColor: Colors.white,
            flex: 1,
            padding: 25
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 30,
            }}>Profile</Text>

            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 25,
                marginTop: 10,
                textAlign: 'center'
            }}>{userDetail?.name}</Text>

            <Text style={{
                fontFamily: 'outfit',
                fontSize: 20,
                color: Colors.gray,
                marginTop: 5,
                textAlign: 'center'
            }}>{userDetail?.email}</Text>

            <FlatList
                data={ProfileMenu}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: 30 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => onMenuClick(item)}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 15,
                            borderBottomWidth: 1,
                            borderColor: Colors.lightGray
                        }}
                    >
                        <Ionicons name={item.icon} size={24} color={Colors.primary} />
                        <Text style={{
                            marginLeft: 15,
                            fontFamily: 'outfit',
                            fontSize: 18
                        }}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

import { Tabs } from "expo-router";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
export default function DashBoardlayout(){
    return (
        <Tabs screenOptions={{
            headerShown:false
        }}>
            <Tabs.Screen name="index" options={{
                title:"Home",
                tabBarIcon : ({color,size}) => {
                    return <FontAwesome name="home" color={color} size={size} />;
                }
            }}/>
            <Tabs.Screen name="add-todo" options={{
                title:"Add Todo",
                tabBarIcon : ({color,size}) => {
                    return <FontAwesome name="plus" color={color} size={size}/>;
                }
            }}/>
        </Tabs>
    )
}
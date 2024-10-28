import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import tw from 'twrnc';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

export default function AddTodo() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleAddTodo = async() => {
        try{
            const token = await AsyncStorage.getItem("token");
            const response = await axios.post("http://192.168.167.19:4000/todo/add",{
                title,description,deadline
            },{
                headers:{
                    "Authorization" : `Bearer ${token}`
                }
            });
            Alert.alert("todo added successful");
            setDeadline(null);
            setTitle("");
            setDescription("");
        }catch(err){
            Alert.alert("error adding todo ",err.message);
        }
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDeadline(selectedDate);
        }
    };

    return (
        <View style={tw`flex-1 justify-center px-6 bg-gray-100`}>
            <Text style={tw`text-2xl font-bold mb-6 text-center`}>Add a New Todo</Text>
            
            <View style={tw`mb-4`}>
                <Text style={tw`text-gray-600 mb-2`}>Title</Text>
                <TextInput
                    style={tw`bg-white p-3 rounded-lg shadow-md`}
                    placeholder="Enter the title"
                    value={title}
                    onChangeText={setTitle}
                />
            </View>

            <View style={tw`mb-4`}>
                <Text style={tw`text-gray-600 mb-2`}>Description</Text>
                <TextInput
                    style={tw`bg-white p-3 rounded-lg shadow-md`}
                    placeholder="Enter the description"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />
            </View>

            <View style={tw`mb-6`}>
                <Text style={tw`text-gray-600 mb-2`}>Deadline</Text>
                <TouchableOpacity
                    style={tw`bg-white p-3 rounded-lg shadow-md`}
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text style={tw`text-gray-800`}>
                        {deadline ? deadline.toLocaleDateString() : 'Select a deadline'}
                    </Text>
                </TouchableOpacity>
                
                {showDatePicker && (
                    <DateTimePicker
                        value={deadline || new Date()}
                        minimumDate={new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'inline' : 'default'}
                        onChange={handleDateChange}
                    />
                )}
            </View>

            <TouchableOpacity
                onPress={handleAddTodo}
                style={tw`bg-blue-600 p-4 rounded-lg shadow-lg`}
            >
                <Text style={tw`text-center text-white font-semibold text-lg`}>
                    Add Todo
                </Text>
            </TouchableOpacity>
        </View>
    );
}

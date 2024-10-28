import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTodos = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.get("http://192.168.167.19:4000/todo/user", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            setTodos(response.data);
        } catch (error) {
            Alert.alert("Error", "Could not retrieve todos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const renderTodoItem = ({ item }) => (
        <View style={tw`bg-white p-4 mb-4 rounded-lg shadow-md border-l-4 ${item.isCompleted ? 'border-green-500' : 'border-blue-500'}`}>
            <View style={tw`flex-row justify-between items-center`}>
                <Text style={tw`text-lg font-semibold`}>{item.title}</Text>
                <TouchableOpacity
                    onPress={() => handleToggleCompletion(item._id)}
                    style={tw`w-6 h-6 border-2 rounded-full ${item.isCompleted ? 'bg-green-500 border-green-500' : 'bg-white border-gray-400'}`}
                />
            </View>
            <Text style={tw`text-gray-600 mt-1`}>{item.description}</Text>
            <Text style={tw`text-gray-500 mt-2 text-sm`}>Deadline: {new Date(item.deadline).toLocaleDateString()}</Text>
        </View>
    );

    const handleToggleCompletion = async (todoId) => {
        try {
            const token = await AsyncStorage.getItem("token");
            await axios.put(`http://192.168.167.19:4000/todo/${todoId}/toggle`, {}, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            setTodos(prevTodos => prevTodos.map(todo => 
                todo._id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
            ));
        } catch (error) {
            Alert.alert("Error", "Could not update todo completion status.");
        }
    };

    return (
        <View style={tw`flex-1 bg-gray-100 p-4`}>
            <Text style={tw`text-3xl font-bold text-center text-blue-600 mb-6`}>Your Todos</Text>
            {loading ? (
                <Text style={tw`text-center text-gray-500`}>Loading...</Text>
            ) : (
                <FlatList
                    data={todos}
                    keyExtractor={item => item._id}
                    renderItem={renderTodoItem}
                    ListEmptyComponent={<Text style={tw`text-center text-gray-500`}>No todos found.</Text>}
                />
            )}
        </View>
    );
}

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import axios from "axios";
import { Link, useRouter } from 'expo-router';

export default function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const handleRegister = async() => {
        try{
            const response = await axios.post(`http://192.168.3.19:4000/auth/register`,{
                username,email,password
            });
            Alert.alert("Login successfull");
            router.push("/Login");
        }catch(err){
            console.error(err)
        }
    };

    return (
        <View style={tw`flex-1 justify-center px-6 bg-gray-100`}>
            <View style={tw`mb-4`}>
                <Text style={tw`text-gray-600 mb-2`}>Username</Text>
                <TextInput
                    style={tw`bg-white p-3 rounded-lg shadow-md`}
                    placeholder="Enter your username"
                    value={username}
                    onChangeText={setUsername}
                />
            </View>

            <View style={tw`mb-4`}>
                <Text style={tw`text-gray-600 mb-2`}>Email</Text>
                <TextInput
                    style={tw`bg-white p-3 rounded-lg shadow-md`}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>

            <View style={tw`mb-6`}>
                <Text style={tw`text-gray-600 mb-2`}>Password</Text>
                <TextInput
                    style={tw`bg-white p-3 rounded-lg shadow-md`}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            <TouchableOpacity
                onPress={handleRegister}
                style={tw`bg-blue-600 p-4 rounded-lg shadow-lg`}
            >
                <Text style={tw`text-center text-white font-semibold text-lg`}>
                    Sign Up
                </Text>
            </TouchableOpacity>

            <View style={tw`flex-row justify-center mt-4`}>
                <Text style={tw`text-gray-500`}>Already have an account?</Text>
                <Link href="/Login">
                    <Text style={tw`text-blue-600 font-semibold ml-2`}>Log in</Text>
                </Link>
            </View>
        </View>
    );
}

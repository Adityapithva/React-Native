import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const handleLogin = () => {
        console.log('Login button pressed');
    };

    return (
        <View style={tw`flex-1 justify-center px-6 bg-gray-100`}>
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
                onPress={handleLogin}
                style={tw`bg-blue-600 p-4 rounded-lg shadow-lg`}
            >
                <Text style={tw`text-center text-white font-semibold text-lg`}>
                    Log In
                </Text>
            </TouchableOpacity>

            <View style={tw`flex-row justify-center mt-4`}>
                <Text style={tw`text-gray-500`}>Don't have an account?</Text>
                <Link href="/Register">
                    <Text style={tw`text-blue-600 font-semibold ml-2`}>Sign up</Text>
                </Link>
            </View>
        </View>
    );
}

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Link } from 'expo-router';

export default function MainPage() {
  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
      <Text style={tw`text-4xl font-bold text-blue-600 mb-10`}>Welcome to My App</Text>
      <Text style={tw`text-lg text-gray-600 mb-6`}>Manage your tasks efficiently!</Text>

      <Link href="/Login" asChild>
        <TouchableOpacity style={tw`bg-blue-600 px-6 py-3 rounded-lg shadow-lg`}>
          <Text style={tw`text-white font-semibold text-lg`}>Get Started</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

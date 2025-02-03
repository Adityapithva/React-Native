import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'

export default function Button({ text, type = "fill", onPress, loading }) {
    return (
        <TouchableOpacity style={{
            padding: 15,
            width: '100%',
            borderRadius: 15,
            marginTop: 15,
            borderWidth: 1,
            borderColor: Colors.primary,
            backgroundColor: type == 'fill' ? Colors.primary : Colors.white,
        }} onPress={onPress} disabled={loading}>
            {!loading ? <Text style={{
                textAlign: 'center',
                fontSize: 18,
                color: type == 'fill' ? Colors.white : Colors.primary
            }}>{text}</Text> : <ActivityIndicator size={'small'} color={type == 'fill' ? Colors.white : Colors.primary} />}
        </TouchableOpacity>
    )
}
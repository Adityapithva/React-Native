// screens/EncodePage.tsx
import React, { useState } from 'react';
import { View, Text, Button, TextInput, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function EncodePage() {
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.uri);
        }
    };

    const encodeText = () => {
        // Implement LSB algorithm to encode the text into the image here.
        console.log('Text to encode:', text);
        console.log('Image URI:', image);
    };

    return (
        <View style={styles.container}>
            <Button title="Pick an Image" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <TextInput
                style={styles.input}
                placeholder="Enter text to encode"
                value={text}
                onChangeText={setText}
            />
            <Button title="Encode Text" onPress={encodeText} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    image: { width: 200, height: 200, alignSelf: 'center', margin: 10 },
    input: { borderWidth: 1, padding: 10, marginVertical: 20 },
});

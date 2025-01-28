// screens/DecodePage.tsx
import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function DecodePage() {
    const [image, setImage] = useState(null);
    const [decodedText, setDecodedText] = useState('');

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.uri);
            decodeText(result.uri);
        }
    };

    const decodeText = (imageUri) => {
        // Implement LSB algorithm to decode the text from the image here.
        console.log('Image URI:', imageUri);
        setDecodedText('Decoded text goes here');
    };

    return (
        <View style={styles.container}>
            <Button title="Pick an Image" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={styles.image} />}
            {decodedText ? <Text style={styles.text}>Decoded Text: {decodedText}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    image: { width: 200, height: 200, alignSelf: 'center', margin: 10 },
    text: { marginTop: 20, fontSize: 16, textAlign: 'center' },
});

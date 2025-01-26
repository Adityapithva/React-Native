// screens/MainPage.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

export default function MainPage() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎨 Image Steganography Tool</Text>

      <Text style={styles.description}>
        Welcome to the Image Steganography Tool! This application is my 
        <Text style={styles.bold}> final year project</Text>, showcasing the implementation of 
        <Text style={styles.bold}> steganography</Text>, a technique of hiding secret messages 
        within images using the <Text style={styles.bold}>Least Significant Bit (LSB)</Text> algorithm.
      </Text>

      <View style={styles.section}>
        <Text style={styles.subtitle}>📌 Project Overview:</Text>
        <Text style={styles.text}>
          The primary goal of this project is to demonstrate how modern technology can be 
          leveraged to enhance <Text style={styles.bold}>data security and privacy</Text>. 
          Steganography offers a creative way to transmit data without drawing attention.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>✨ Features:</Text>
        <Text style={styles.list}>
          - <Text style={styles.bold}>Encode text:</Text> Hide secret messages within an image.
        </Text>
        <Text style={styles.list}>
          - <Text style={styles.bold}>Decode text:</Text> Extract hidden messages from an image.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>💡 About the Project:</Text>
        <Text style={styles.text}>
          I developed this project as part of my academic curriculum, blending theoretical 
          concepts of <Text style={styles.bold}>data security</Text> with practical implementation. 
          It's a step toward showcasing my skills in 
          <Text style={styles.bold}> React Native</Text> and implementing advanced algorithms in real-world applications.
        </Text>
      </View>

      <Text style={styles.footer}>
        Explore the app to learn more about steganography and experience its practical usage!
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#4a90e2',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'justify',
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  section: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  list: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginLeft: 20,
  },
  footer: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center',
    color: '#4a4a4a',
  }
});

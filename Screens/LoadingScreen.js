import React, { useEffect, useState } from 'react';
import { View, Text, Animated, Easing, Image } from 'react-native';

const LoadingIndicator = () => {
    const [dots, setDots] = useState('');
    const fadeAnim = new Animated.Value(0);
    const glowAnim = new Animated.Value(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            ])
        ).start();
    }, []);

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(glowAnim, {
                    toValue: 1.5,
                    duration: 700,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
                Animated.timing(glowAnim, {
                    toValue: 1,
                    duration: 700,
                    easing: Easing.linear,
                    useNativeDriver: false,
                })
            ])
        ).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={{ uri: 'https://media.istockphoto.com/id/1131186254/vector/woman-with-smartphone-concept-illustration-texting-messaging-chatting-social-media-customer.jpg?s=612x612&w=0&k=20&c=uXqeg1uFIJJT9v9_H7xEfDxOFx3HejK6vZOpJh7fBAY=' }}
                style={[styles.image, { opacity: fadeAnim }]}
            />
            <Animated.Text style={[styles.loadingText, { textShadowRadius: glowAnim }]}>Loading{dots}</Animated.Text>
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 100,
        height: 100,
    },
    loadingText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        textShadowColor: 'rgba(0, 255, 0, 0.9)',
        textShadowOffset: { width: 0, height: 0 },
    },
};

export default LoadingIndicator;

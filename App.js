import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, StatusBar } from 'react-native';

const App = () => {
    const [timer, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const countRef = useRef(null); 
    const borderColor = useRef(new Animated.Value(0)).current; 
    const animationRef = useRef(null); 

    const startAnimation = () => {
        animationRef.current = Animated.loop(
            Animated.timing(borderColor, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false,
            })
        );
        animationRef.current.start();
    };

    const stopAnimation = () => {
        if (animationRef.current) {
            animationRef.current.stop();
            borderColor.setValue(0); 
        }
    };

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
        startAnimation(); 
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1);
        }, 1000);
    };

    const handlePause = () => {
        clearInterval(countRef.current);
        setIsPaused(true);
        stopAnimation(); 
    };

    const handleContinue = () => {
        setIsPaused(false);
        startAnimation();
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1);
        }, 1000);
    };

    const handleReset = () => {
        clearInterval(countRef.current);
        setIsActive(false);
        setIsPaused(false);
        setTimer(0);
        stopAnimation(); 
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const animatedBorderColor = borderColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['black', 'red'], 
    });

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'#353940'}/>
            <View style={styles.timerContainer}>
                <Animated.View style={[styles.timerBorder, { borderColor: animatedBorderColor }]}>
                    <Text style={styles.timer}>{formatTime(timer)}</Text>
                </Animated.View>
            </View>
            <View style={styles.buttonContainer}>
                {!isActive && !isPaused ? (
                    <TouchableOpacity style={styles.button} onPress={handleStart}>
                        <Text style={styles.buttonText}>Start</Text>
                    </TouchableOpacity>
                ) : (
                    <>
                        <TouchableOpacity style={styles.button} onPress={handlePause}>
                            <Text style={styles.buttonText}>Pause</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleReset}>
                            <Text style={styles.buttonText}>Reset</Text>
                        </TouchableOpacity>
                        {isPaused && (
                            <TouchableOpacity style={styles.button} onPress={handleContinue}>
                                <Text style={styles.buttonText}>Continue</Text>
                            </TouchableOpacity>
                        )}
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#353940',
        alignItems: 'center',
        paddingTop:200
        // justifyContent: 'center',
    },
    timerContainer: {
        width: 250,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timerBorder: {
        borderWidth: 10,
        borderRadius: 125, 
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timer: {
        fontSize: 50,
        color: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 30,
    },
    button: {
        width: 110,
        height: 50,
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    buttonText: {
        fontSize: 20,
        color: 'black',
        fontWeight:'bold'
    },
});

export default App;
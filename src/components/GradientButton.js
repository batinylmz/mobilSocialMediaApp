import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SIZES } from '../constants/theme';

const GradientButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            <LinearGradient
                // theme.js dosyasındaki doğru isimleri çağırdık
                colors={[COLORS.gradientBlue, COLORS.gradientBlackPaylas, COLORS.gradientRed]}
                locations={[0.1, 0.5, 0.9]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    button: {
        width: '100%', // Artık her ekrana tam oturacak
        height: SIZES.buttonHeight, // 60
        borderRadius: SIZES.buttonRadius, // 10
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600'
    },
});


export default GradientButton;
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/theme';

const BottomNavBar = () => {
    return (
        <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navIconContainer}>
                <Icon name="home" size={26} color="#000000"/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navIconContainer}>
                <Icon name="compass" size={26} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navIconContainer}>
                <Icon name="add-circle" size={30} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navIconContainer}>
                <Icon name="person" size={26} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navIconContainer}>
                <Icon name="settings" size={26} color="#000000" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomNav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 400,
        height: 40,
        alignSelf: 'center',
        paddingHorizontal: 20,
        backgroundColor: COLORS.background,
        paddingBottom: 5,
    },
    navIconContainer: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

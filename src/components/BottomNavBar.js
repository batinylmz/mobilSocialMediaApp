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

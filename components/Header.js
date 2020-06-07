import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'

import Color from '../Constant/Color';
import TitleText from './TitleText';

const Header = props => {
    return (
        <View style={{
            ...styles.headerBase,
            ...Platform.select({
                ios: styles.headerIOS,
                android: styles.headerAndroid
            })
        }}>
            <TitleText style={styles.title}>{props.title}</TitleText>
        </View>
    );

};

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        paddingTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headeriOS: {
        backgroundColor: 'white',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0
    },
    headerAndroid: {
        backgroundColor: Color.primary,
        borderBottomColor: 'transparent',
        borderBottomWidth: 0
    },
    headerTitle: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    },
    title: {
        color: Platform.OS === 'ios' ? Color.primary : 'white'
    }
});

export default Header;
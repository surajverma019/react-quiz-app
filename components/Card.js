import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
    return <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
}

const styles = StyleSheet.create({
    card: {
        //Shadow property only works on iOS
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 5, //works only in android
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    }
});

export default Card;
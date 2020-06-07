import React from 'react';
import { View, StyleSheet, Text, Image, Button, Dimensions, ScrollView } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Color from '../Constant/Color';

const GameOverScreen = props => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>The Game is Over</TitleText>
                <View style={styles.imageContainer}>
                    <Image
                        //source={require('../assets/success.png')}
                        source={{ uri: 'https://www.yourdictionary.com/images/definitions/lg/12337.summit.jpg' }}
                        style={styles.image}
                        resizeMode='cover'></Image>
                </View>
                <View style={styles.resultContainer}>
                    <BodyText style={styles.resultText}>Your phone need{' '}
                        <Text style={styles.highlight}>{props.roundTaken}</Text>
                        {' '}round to guess the number{' '}
                        <Text style={styles.highlight}>{props.userNumber}</Text>
                    </BodyText>
                </View>
                <Button title="New Game" onPress={props.onRestart}></Button>
            </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,// to make perfect circle on android border radius should be half of width and height
        borderWidth: 2,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 60
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Color.primary
    }
});

export default GameOverScreen;
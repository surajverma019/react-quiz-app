import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Dimensions
} from 'react-native'

import Card from '../components/Card';
import Color from '../Constant/Color';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    // this const has been declare in case device orientation is changed
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));//g over is globally which mean entire text
    }

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || (chosenNumber <= 0 || chosenNumber > 99)) {
            Alert.alert('Invalid Number !', 'Number has to be between 1 to 99',
                [{ text: 'Okey !', style: 'destructive', onPress: resetInputHandler }]);
            return;
        }

        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    }
    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You Selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>Start Game</MainButton>
            </Card>
        );
    }

    useEffect(() => {
        const updateLayour = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        }

        //this event get called whenever orientation is changed
        Dimensions.addEventListener('change', updateLayour);

        return () => {
            Dimensions.removeEventListener('change', updateLayour);
        };
    });

    return (
        <ScrollView>
            {/* //"padding" works best on Android and "position" work bets on iOS */}
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss();
                }}>
                    <View style={styles.screen}>
                        <Text style={styles.title}>
                            Start a New Game !!
                        </Text>
                        <Card style={styles.inputContainer}>
                            <Text>Select a Number</Text>
                            <Input style={styles.input}
                                keyboardType="number-pad"
                                blurOnSubmit
                                value={enteredValue}
                                onChangeText={numberInputHandler}
                                maxLength={2}></Input>
                            <View style={styles.buttonContainer}>
                                <View style={{ width: buttonWidth }}><Button title="Cancel" onPress={resetInputHandler} color={Color.accent} /></View>
                                <View style={{ width: buttonWidth }}><Button title="Confirm" onPress={confirmInputHandler} color={Color.primary} /></View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        // width: 300,
        // maxWidth: '80%',
        width: '80%',
        minWidth: 300,
        maxWidth: '95%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15

    },
    // button: {
    //     width: 100
    // },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginVertical: 10,
        alignItems: 'center'
    }
});

export default StartGameScreen
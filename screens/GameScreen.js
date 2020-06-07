import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert,
    ScrollView,
    FlatList,
    Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../Constant/default-styles';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';


//default argument is automatically passed by react at last argument
const renderListItem = (listLength, itemData) => {
    return (
        <View style={styles.listItem}>
            <BodyText>#{listLength - itemData.index}</BodyText>
            <BodyText>{itemData.item}</BodyText>
        </View>
    );
}

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const GameScreen = props => {

    //expo version to check screen orientation. once called will be applicable for all screen
    //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
        Dimensions.get('window').width
    );
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
        Dimensions.get('window').height
    );

    //useRef will initialize only once value until you dont re-assign it.
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    // reference holder so that we dont need to user like prop.userChoice etc for property od GameScreen
    const { userChoice, onGameOver } = props;

    const nextGuessHandler = direction => {
        console.log('currentGuess : ' + currentGuess + ' | ' + props.userChoice);

        if ((direction === 'lower' && currentGuess < props.userChoice ||
            direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert("Don't cheat", 'You know that this was wrong!', [{ text: 'Sorry!', style: 'cancel' }]);
            return;
        }


        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        }
        else {
            currentLow.current = currentGuess + 1;
        }

        console.log('Next set : ' + currentLow.current + ' | ' + currentHigh.current + ' | ' + currentGuess);
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        //setRound(curRound => curRound + 1);
        setPastGuesses(currPastGuesses => [nextNumber.toString(), ...currPastGuesses]);
        console.log('pastGuesses.length : ' + pastGuesses.length);
    };

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        };

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    //will get call every time at end when view is rendered.
    useEffect(() => {
        console.log('useEffect got called!');

        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);
    // if second argument specified then effect will only run when value or any changes has been done on specified [] argument
    // over nowUseEffect will only get called if there is any dependency changes , currentGuess, userChoice, onGameOver are dependency over here


    let listContainerStyle = styles.listContainer;

    if (availableDeviceWidth < 350) {
        listContainerStyle = styles.listContainerBig;
    }

    if (availableDeviceHeight < availableDeviceWidth) {
        return (
            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>Opponent's Guess</Text>
                <View style={styles.controls}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name="md-remove" size={24} color="white" />
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name="md-add" size={24} color="white" />
                    </MainButton>
                </View>
                <View style={listContainerStyle}>
                    {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
        </ScrollView> */}
                    <FlatList
                        keyExtractor={item => item}
                        data={pastGuesses}
                        renderItem={renderListItem.bind(this, pastGuesses.length)}
                        contentContainerStyle={styles.list}
                    />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white"></Ionicons>
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white"></Ionicons>
                </MainButton>
            </Card>
            <View style={listContainerStyle}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => (renderListItem(guess, pastGuesses.length - index)))}
                </ScrollView> */}
                <FlatList
                    keyExtractor={item => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
                ></FlatList>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 400,
        maxWidth: '90%',
        justifyContent: 'space-around'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end'
    },
    listContainer: {
        flex: 1, // since it was not scrolling on android. it will wrap around the scroll view
        width: '60%'
    },
    listContainerBig: {
        flex: 1, // since it was not scrolling on android. it will wrap around the scroll view
        width: '80%'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
});

export default GameScreen;
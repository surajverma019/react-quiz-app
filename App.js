import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {

  //  Returns a stateful value, and a function to update it.
  const [userNumber, setUserNumber] = useState();
  const [guessRound, setGuessRound] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(error) => console.log(error)}>
      </AppLoading>
    );
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = numOfRound => {
    setGuessRound(numOfRound);
  }

  const configureNewGameHandler = () => {
    setGuessRound(0);
    setUserNumber(null);
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  // content = <GameOverScreen
  //   roundTaken={1}
  //   userNumber={1}
  //   onRestart={configureNewGameHandler}>
  // </GameOverScreen>;

  if (userNumber && guessRound <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
  }
  else if (guessRound > 0) {
    content = <GameOverScreen
      roundTaken={guessRound}
      userNumber={userNumber}
      onRestart={configureNewGameHandler}>
    </GameOverScreen>
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a Number"></Header>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

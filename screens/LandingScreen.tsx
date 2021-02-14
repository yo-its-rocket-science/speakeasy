import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Text, View } from '../components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SpeakEasy</Text>
      <Button mode="contained" style={styles.button} color="black" onPress={() => console.log()}>Log in</Button>
      <Button mode="contained" style={styles.button} color="black" onPress={() => console.log()}>Sign up</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '30%',
    marginTop: '10px',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
    marginTop: '10%',
    marginBottom: '10%'
  },
});

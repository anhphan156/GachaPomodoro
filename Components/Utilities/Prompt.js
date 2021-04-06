import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native'

const Prompt = props => {
    return (
        <View>
            <TextInput style={styles.textInput} placeholder={props.placeholder} maxLength={25}/>
        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        fontSize: 30,
        textAlign: 'center'
    }
});

export { Prompt };
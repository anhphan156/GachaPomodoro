import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native'

const Prompt = props => {
    return (
        <View>
            <TextInput 
                style={styles.textInput} 
                placeholder={props.placeholder} 
                maxLength={25}
                onChangeText={props.onChangeText}
            />
        </View>
    );
};

const PasswordPrompt = props => {
    return (
        <View>
            <TextInput 
                textContentType='password' 
                secureTextEntry={true}
                placeholder={props.placeholder}
                maxLength={25}
                onChangeText={props.onChangeText}
                style={styles.textInput}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        fontSize: 30,
        textAlign: 'center'
    }
});

export { Prompt, PasswordPrompt };
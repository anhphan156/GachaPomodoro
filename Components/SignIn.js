import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, Button } from 'react-native';
import { useState } from 'react/cjs/react.development';

import { Prompt, PasswordPrompt } from './Utilities/Prompt';
import { useAuth } from '../Contexts/AuthContext';

const SignIn = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    
    const { signin } = useAuth();

    const handleSubmit = async () => {
        try {
            setError(''); 
            await signin(email,password);
        }catch {
            setError('Failed to log in');
        }
    };
    
    return (
        <SafeAreaView style={styles.centeredView}>
            <View>
                <Text>{error}</Text>
            </View>
            <View style={{marginTop: 20}}>
                <Prompt onChangeText={setEmail} placeholder='Enter Email'/> 
            </View>
            <View style={{marginTop: 20}}>
                <PasswordPrompt onChangeText={setPassword} placeholder='Enter Password'/> 
            </View>
            <View style={{marginTop: 20}}>
                <Button 
                    title="Sign In" 
                    onPress={handleSubmit} 
                />
            </View>
            <View style={{marginTop: 20}}>
                <Text onPress={() => props.navigation.navigate('Sign Up')}>Or Sign Up?</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        justifyContent:'center',
        alignItems: 'center',
        flex: 1
    }
});

export default SignIn;
import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, Button } from 'react-native';
import { useState } from 'react/cjs/react.development';

import { Prompt, PasswordPrompt } from './Utilities/Prompt';
import { useAuth } from '../Contexts/AuthContext';

const SignUp = props => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('');
    
    const { signup } = useAuth();

    const handleSubmit = async () => {
        if(password !== confirmPassword){
            setError('Passwords do not match');
            return;
        }

        try {
            setError('');            
            await signup(email,password);
        }catch {
            setError('Failed to sign up');
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
                <PasswordPrompt onChangeText={setConfirmPassword} placeholder='Confirm Password'/> 
            </View>
            <View style={{marginTop: 20}}>
                <Button 
                    title="Sign Up" 
                    onPress={handleSubmit} 
                />
            </View>
            <View style={{marginTop: 20}}>
                <Text onPress={() => props.navigation.navigate('Sign In')}>Or Login</Text>
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

export default SignUp;
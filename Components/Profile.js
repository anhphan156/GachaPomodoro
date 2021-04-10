import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuth } from '../Contexts/AuthContext';

const Profile = () => {

    const { logout } = useAuth();

    return (
        <View style={styles.centeredView}>
            <Text>Profile</Text>
            <Button 
                title="Log Out"
                onPress={() => {
                    logout();
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        justifyContent:'center',
        alignItems: 'center',
        flex: 1
    }
});

export default Profile;
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Animated } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

import { Images } from  './Utilities/LoadImage';

const ImageLoader = props => {
    const [opacity, setOpacity] = useState(new Animated.Value(0));

    const onLoad = () => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    };

    return (
        <Animated.Image 
            onLoad={onLoad} 
            {...props} 
            style={[
                {
                    opacity,
                    transform: [
                        {
                            scale: opacity.interpolate({
                                inputRange: [0,1],
                                outputRange: [0.55, 1]
                            })
                        }
                    ]
                },
                props.style
            ]}
        />
    );
};

const ItemShow = ({ route, navigation}) => {

    const item = route.params.item;

    return (
        <TouchableHighlight onPress={navigation.goBack} underlayColor='white'>
            <View style={styles.containter}>
                <Text style={{fontSize:30, marginBottom: 50, textAlign: 'center'}}>{item.name}</Text>
                {
                    item.rarity == 3?
                        (
                            <View>
                                <ImageLoader style={{width: 200, height: 200}} source={Images['gold']} />
                                <ImageLoader style={{width: 200, height: 200}} source={Images['book']} />
                            </View>
                        ):
                        (<ImageLoader style={{width: 200, height: 200}} source={Images[item.name.toLowerCase()]} />)
                }
            </View>
        </TouchableHighlight>
    );
};

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
    containter:{
        justifyContent: 'center',
        alignItems: 'center',
        height
    }
});

export default ItemShow;
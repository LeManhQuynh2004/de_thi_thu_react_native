import { Image, View } from 'react-native';
import React, { useEffect } from 'react';

const Banner = ({ uri }) => {
    return (
        <View>
            <Image
                resizeMode='contain'
                style={{
                    width: "100%",
                    height: 200,
                }}
                source={{
                    uri: uri
                }} >
            </Image>
        </View>
    );
}

export default Banner;
import React, { useState } from 'react';
import { Animated } from 'react-native';
// import { TypingAnimation } from 'react-native-typing-animation'
import { useUpdateLayoutEffect } from './hooks/useUpdateLayoutEffect';
const TypingIndicator = (props) => {
    const [yCoords] = useState(new Animated.Value(200));
    const [heightScale] = useState(new Animated.Value(0));
    const [marginScale] = useState(new Animated.Value(0));
    // on isTyping fire side effect
    useUpdateLayoutEffect(() => {
        if (props.isTyping) {
            slideIn();
        }
        else {
            slideOut();
        }
    }, [props.isTyping]);
    // side effect
    const slideIn = () => {
        Animated.parallel([
            Animated.spring(yCoords, {
                toValue: 0,
            }),
            Animated.timing(heightScale, {
                toValue: 35,
                duration: 250,
            }),
            Animated.timing(marginScale, {
                toValue: 8,
                duration: 250,
            }),
        ]).start();
    };
    // side effect
    const slideOut = () => {
        Animated.parallel([
            Animated.spring(yCoords, {
                toValue: 200,
            }),
            Animated.timing(heightScale, {
                toValue: 0,
                duration: 250,
            }),
            Animated.timing(marginScale, {
                toValue: 0,
                duration: 250,
            }),
        ]).start();
    };
    return (<Animated.View style={[
        {
            transform: [
                {
                    translateY: yCoords,
                },
            ],
            height: heightScale,
            marginLeft: 8,
            marginBottom: marginScale,
            width: 45,
            borderRadius: 15,
            backgroundColor: '#f0f0f0',
        },
    ]}>
      
    </Animated.View>);
};
export default TypingIndicator;
//# sourceMappingURL=TypingIndicator.js.map
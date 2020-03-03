import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';

import { Small, Original } from './styles';

const OriginalAnimated = Animated.createAnimatedComponent(Original);

export default function LazyImage({ smallSource, source, ratio, shouldLoad }) {
  const opacity = new Animated.Value(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (shouldLoad) {
      setLoaded(true);
    }
  }, [shouldLoad]);

  const handleAnimate = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <Small
        source={smallSource}
        ratio={ratio}
        resizemode="contain"
        blurRadius={2}>
        {loaded && (
          <OriginalAnimated
            style={{ opacity }}
            source={source}
            ratio={ratio}
            resizemode="contain"
            onLoadEnd={handleAnimate}
          />
        )}
      </Small>
    </>
  );
}

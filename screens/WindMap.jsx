import React, { useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

const WindMap = () => {
  const webViewRef = useRef(null);
  const options = {
    key: '2hG82DRFAKAzB4ulrv3LLitAMuf4b1Dw', // Replace with your Windy API key
    lat: 50.4,
    lon: 14.3,
    zoom: 5,
  };

  const initializeWindy = () => {
    console.log('Initializing Windy...');
    webViewRef.current.injectJavaScript(`
      console.log('Injecting JavaScript...');
      windyInit(${JSON.stringify(options)}, (windyAPI) => {
        console.log('Windy initialized');
        const { map } = windyAPI;
        L.popup()
          .setLatLng([50.4, 14.3])
          .setContent('Hello World')
          .openOn(map);
      });
    `);
  };

  useEffect(() => {
    console.log('Calling initializeWindy...');
    initializeWindy();
  }, []);

  const handleWebViewError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('WebView error: ', nativeEvent);
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={require('./WindyTest.html')} // Replace with the path to your HTML file
        style={styles.webView}
        javaScriptEnabled={true}
        originWhitelist={['*']}
        onError={handleWebViewError}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  webView: {
    flex: 1,
  },
});

export default WindMap;
import React from 'react';
import MapView, {Marker} from 'react-native-maps';

const WindMap = () => {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 33.8938,
        longitude: 35.5018,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        coordinate={{ latitude: 50.4, longitude: 14.3 }}
        title="Lebanon"
      />
    </MapView>
  );
};

export default WindMap;
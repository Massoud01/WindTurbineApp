import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const WindMap = () => {
  const [windData, setWindData] = useState(null);
  const [windSpeed, setWindSpeed] = useState(0);
  const [windDirection, setWindDirection] = useState(0);
  const city = "Beirut";

  useEffect(() => {
    const fetchWindData = async () => {
      try {
        const apiKey = "730fbafb13c733562e64b889e96c3c88";
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        setWindSpeed(response.data.wind.speed);
        setWindDirection(response.data.wind.deg);
        setWindData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchWindData();
  }, []);

  const getColorForWindSpeed = (speed) => {
    if (windSpeed < 2) return 'green';
    if (windSpeed < 5) return 'yellow';
    return 'red';
  };

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
      {windData && (
        <Marker
          coordinate={{ latitude: windData.coord.lat, longitude: windData.coord.lon }}
        >
          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 10,
              backgroundColor: getColorForWindSpeed(windSpeed),
            }}
          />
        </Marker>
      )}
    </MapView>
  );
};

export default WindMap;
import React from 'react';
import { View, Text, StyleSheet,SafeAreaView, } from 'react-native';

const Controller = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Controller</Text>
          <View style={[styles.headerAction, { alignItems: "flex-end" }]}>
            
    </View>
    </View>
    </View>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      padding: 0,
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      paddingHorizontal: 16,
    },
    headerAction: {
      width: 40,
      height: 40,
      alignItems: "flex-start",
      justifyContent: "center",
    },
    headerTitle: {
      fontSize: 19,
      fontWeight: "600",
      color: "black",
      fontFamily: "Poppins_400Regular",
    },
});

export default Controller;
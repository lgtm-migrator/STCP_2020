import React, { useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, FlatList } from "react-native";

import Card from "../components/Card/Card";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

import { defaultColor } from "../constants";

export default function App() {
  const { stops } = useSelector((state: RootState) => state);

  return (
    <View style={styles.container}>
      {stops?.length > 0 ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          style={styles.list}
          data={stops}
          renderItem={({ item }) => (
            <Card
              code={item.code}
              provider={item.provider}
              customName={item.customName}
            />
          )}
          keyExtractor={(_, index) => String(index)}
          onViewableItemsChanged={(info) => console.log(info)}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
            minimumViewTime: 200,
          }}
        />
      ) : (
        <View style={styles.list}>
          <Text>Add Some Stops! :)</Text>
        </View>
      )}

      <MapView style={styles.mapStyle} />
    </View>
  );
}

const headerSize = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  list: {
    position: "absolute",
    display: "flex",
    zIndex: 2,
    bottom: "5%",
    width: "100%",
    height: "40%",
    flexDirection: "row",
  },
  header: {
    backgroundColor: defaultColor,
    height: `${headerSize + 0.1}%`,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    backgroundColor: "#FFFFFF",
    height: `${100 - headerSize}%`,
    width: "100%",
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

import { Component } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default class LoadingView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} size="large" color="#FFD700" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#0000",
    justifyContent: "center",
    alignItems: "center",
  },
});

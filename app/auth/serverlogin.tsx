import { StyleSheet, View, Text } from "react-native";

function ServerLoginScreen() {
  return (
    <View style={styles.container}>
      <Text>ServerLoginScreen</Text>
    </View>
  );
}

export default ServerLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

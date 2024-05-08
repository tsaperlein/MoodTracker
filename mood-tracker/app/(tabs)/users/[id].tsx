import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  const { id } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text>Hello React Native!!! - {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

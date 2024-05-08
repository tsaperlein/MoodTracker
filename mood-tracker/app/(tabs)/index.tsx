import { router } from "expo-router";
import { Text, View, StyleSheet, Pressable } from "react-native";

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text>Hello React Native!!!</Text>
      <Pressable
        onPress={() =>
          router.push({
            pathname: "users/[id]",
            params: { id: 1 },
          })
        }
      >
        <Text>Go to user 1</Text>
      </Pressable>
      <Pressable
        onPress={() =>
          router.push({
            pathname: "users/[id]",
            params: { id: 2 },
          })
        }
      >
        <Text>Go to user 2</Text>
      </Pressable>
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

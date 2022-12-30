import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <View style={styles.buttonBox}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Javascript</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>React</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Coding Test</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.todoWrapper}>
        <Text>신나는 실행 컨텍스트 공부</Text>
        <View style={styles.icons}>
          <AntDesign name="checksquare" size={24} color="black" />
          <Feather
            style={{ marginLeft: 10 }}
            name="edit"
            size={24}
            color="black"
          />
          <AntDesign
            style={{ marginLeft: 10 }}
            name="delete"
            size={24}
            color="black"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  buttonBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    width: "30%",
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontWeight: "600",
  },

  inputWrapper: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 15,
    marginTop: 15,
    marginBottom: 15,
  },

  input: {
    borderWith: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  todoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: "gray",
  },

  icons: {
    flexDirection: "row",
  },
});

import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [category, setCategory] = useState("js");
  const [text, setText] = useState("");

  const newTodo = {
    id: Date.now(),
    text,
    isDone: false,
    isEdit: false,
    category,
  };

  const addTodo = () => {
    setTodos((prev) => [...prev, newTodo]);
    setText("");
  };

  const setDone = (id) => {
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    newTodos[idx].isDone = !newTodos[idx].isDone;
    setTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <View style={styles.buttonBox}>
        <TouchableOpacity
          onPress={() => setCategory("js")}
          style={{
            ...styles.button,
            backgroundColor: category === "js" ? "#0FBCF9" : "gray",
          }}
        >
          <Text style={styles.buttonText}>Javascript</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCategory("react")}
          style={{
            ...styles.button,
            backgroundColor: category === "react" ? "#0FBCF9" : "gray",
          }}
        >
          <Text style={styles.buttonText}>React</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCategory("ct")}
          style={{
            ...styles.button,
            backgroundColor: category === "ct" ? "#0FBCF9" : "gray",
          }}
        >
          <Text style={styles.buttonText}>Coding Test</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Enter your task"
          value={text}
          style={styles.input}
          onChangeText={setText}
          onSubmitEditing={addTodo}
        />
      </View>
      <ScrollView>
        {todos.map((todo) => {
          if (category === todo.category) {
            return (
              <View key={todo.id} style={styles.todoWrapper}>
                <Text
                  style={{
                    textDecorationLine: todo.isDone ? "line-through" : "none",
                  }}
                >
                  {todo.text}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={() => setDone(todo.id)}>
                    <AntDesign name="checksquare" size={24} color="black" />
                  </TouchableOpacity>
                  <Feather
                    style={{ marginLeft: 10 }}
                    name="edit"
                    size={24}
                    color="black"
                  />
                  <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
                    <AntDesign
                      style={{ marginLeft: 10 }}
                      name="delete"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }
        })}
      </ScrollView>
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
    marginHorizontal: 10,
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
    marginHorizontal: 10,
  },

  input: {
    borderWidth: 1,
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
    marginHorizontal: 10,

    backgroundColor: "lightgray",
  },
});

import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");

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
    Alert.alert("Todo 삭제", "정말 삭제하시겠습니까?", [
      {
        text: "Cancel",
        onPress: () => console.log("취소 버튼!"),
      },
      {
        text: "OK",
        onPress: () => {
          const newTodos = todos.filter((todo) => todo.id !== id);
          setTodos(newTodos);
        },
      },
    ]);
  };

  const setEdit = (id) => {
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    newTodos[idx].isEdit = !newTodos[idx].isEdit;
    setTodos(newTodos);
  };

  const editTodo = (id) => {
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    newTodos[idx].text = editText;
    newTodos[idx].isEdit = false;
    setTodos(newTodos);
    setEditText("");
  };

  const setCat = async (cat) => {
    setCategory(cat);
    await AsyncStorage.setItem("category", cat);
  };

  useEffect(() => {
    const saveTodos = async () => {
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
    };
    if (todos.length > 0) saveTodos();
  }, [todos]);

  useEffect(() => {
    const getDate = async () => {
      const resp_todos = await AsyncStorage.getItem("todos");
      const resp_cat = await AsyncStorage.getItem("category"); // undefined / null

      setTodos(JSON.parse(resp_todos) ?? []);
      setCategory(resp_cat ?? "js");
    };
    getDate();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <View style={styles.buttonBox}>
        <TouchableOpacity
          onPress={() => setCat("js")}
          style={{
            ...styles.button,
            backgroundColor: category === "js" ? "#0FBCF9" : "gray",
          }}
        >
          <Text style={styles.buttonText}>Javascript</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCat("react")}
          style={{
            ...styles.button,
            backgroundColor: category === "react" ? "#0FBCF9" : "gray",
          }}
        >
          <Text style={styles.buttonText}>React</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCat("ct")}
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
                {todo.isEdit ? (
                  <TextInput
                    onSubmitEditing={() => editTodo(todo.id)}
                    value={editText}
                    onChangeText={setEditText}
                    style={{ backgroundColor: "white", flex: 1 }}
                  />
                ) : (
                  <Text
                    style={{
                      textDecorationLine: todo.isDone ? "line-through" : "none",
                    }}
                  >
                    {todo.text}
                  </Text>
                )}

                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={() => setDone(todo.id)}>
                    <AntDesign name="checksquare" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setEdit(todo.id)}>
                    <Feather
                      style={{ marginLeft: 10 }}
                      name="edit"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
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

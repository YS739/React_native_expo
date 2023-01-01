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
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { dbService } from "./Firebase";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [category, setCategory] = useState("js");
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");

  useEffect(() => {
    getTodos();
  }, [todos]);

  const getTodos = async () => {
    const array = [];
    const querySnapshot = await getDocs(collection(dbService, "todoList"));
    querySnapshot.forEach((doc) => {
      array.push({ ...doc.data(), docId: doc.id });
    });
    return setTodos(array);
  };

  const addTodo = async () => {
    try {
      const docRef = await addDoc(collection(dbService, "todoList"), {
        id: Date.now(),
        text,
        isDone: false,
        isEdit: false,
        category,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setText("");
  };

  const setDone = async (id) => {
    const index = todos.findIndex((todo) => todo.docId === id);
    const todoRef = doc(dbService, "todoList", id);
    await updateDoc(todoRef, {
      isDone: !todos[index].isDone,
    });
  };

  const deleteTodo = (id) => {
    Alert.alert("Todo 삭제", "정말 삭제하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
        onPress: () => console.log("취소 버튼!"),
      },
      {
        text: "삭제",
        style: "destructive",
        onPress: async () => {
          await deleteDoc(doc(dbService, "todoList", id));
        },
      },
    ]);
  };

  const setEdit = async (id) => {
    const index = todos.findIndex((todo) => todo.docId === id);
    const todoRef = doc(dbService, "todoList", id);
    await updateDoc(todoRef, {
      isEdit: !todos[index].isEdit,
    });
  };

  const editTodo = async (id) => {
    const todoRef = doc(dbService, "todoList", id);
    await updateDoc(todoRef, {
      text: editText,
      isEdit: false,
    });
    setEditText("");
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
        {todos?.map((todo) => {
          if (category === todo.category) {
            return (
              <View key={todo.id} style={styles.todoWrapper}>
                {todo.isEdit ? (
                  <TextInput
                    onSubmitEditing={() => editTodo(todo.docId)}
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
                  <TouchableOpacity onPress={() => setDone(todo.docId)}>
                    <AntDesign name="checksquare" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setEdit(todo.docId)}>
                    <Feather
                      style={{ marginLeft: 10 }}
                      name="edit"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteTodo(todo.docId)}>
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

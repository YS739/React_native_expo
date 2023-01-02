import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { dbService } from "./Firebase";
import Buttons from "./components/Buttons";
import Todo from "./components/Todo";

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
      <Buttons setCategory={setCategory} category={category} />
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
              <Todo
                key={todo.id}
                todo={todo}
                setDone={setDone}
                setEdit={setEdit}
                editTodo={editTodo}
                editText={editText}
                setEditText={setEditText}
                deleteTodo={deleteTodo}
              />
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
});

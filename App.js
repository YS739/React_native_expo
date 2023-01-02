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
  onSnapshot,
  query,
  collection,
  doc,
  orderBy,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { dbService } from "./Firebase";
import Buttons from "./components/Buttons";
import Todo from "./components/Todo";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");

  const newTodo = {
    text,
    isDone: false,
    isEdit: false,
    category,
    createdAt: Date.now(),
  };

  const addTodo = async () => {
    await addDoc(collection(dbService, "todoList"), newTodo);
    setText("");
  };

  const setDone = async (id) => {
    const idx = todos.findIndex((todo) => todo.id === id);
    await updateDoc(doc(dbService, "todoList", id), {
      isDone: !todos[idx].isDone,
    });
  };

  const setEdit = async (id) => {
    const idx = todos.findIndex((todo) => todo.id === id);
    await updateDoc(doc(dbService, "todoList", id), {
      isEdit: !todos[idx].isEdit,
    });
  };

  const editTodo = async (id) => {
    await updateDoc(doc(dbService, "todoList", id), {
      text: editText,
      isEdit: false,
    });
    setEditText("");
  };

  const deleteTodo = (id) => {
    Alert.alert("Todo 삭제", "정말 삭제하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
        onPress: () => console.log("취소"),
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

  // category 위치 저장하기
  const setCat = async (cat) => {
    setCategory(cat);
    await updateDoc(doc(dbService, "category", "currentCategory"), {
      category: cat,
    });
  };

  // firebase에서 getData
  useEffect(() => {
    const q = query(
      collection(dbService, "todoList"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      const newTodos = snapshot.docs.map((doc) => {
        const newTodo = {
          id: doc.id,
          ...doc.data(),
        };
        return newTodo;
      });
      setTodos(newTodos);
    });

    // category 위치 불러오기
    const getCategory = async () => {
      const snapshot = await getDoc(
        doc(dbService, "category", "currentCategory")
      );
      setCategory(snapshot.data().category);
    };
    getCategory();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <Buttons setCat={setCat} category={category} />
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
              <Todo
                key={todo.id}
                setEditText={setEditText}
                editText={editText}
                todo={todo}
                editTodo={editTodo}
                setDone={setDone}
                setEdit={setEdit}
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

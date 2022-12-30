import { StatusBar } from "expo-status-bar";
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
  Alert,
  TextInput,
} from "react-native";
import styled from "@emotion/native";
import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  // Add todo
  const [todos, setTodos] = useState([]);
  // 버튼 눌렀을 때 색 변경, 새로고침 시 유지
  const [category, setCategory] = useState(""); //js, react, ct
  // input에 입력된 내용 받아오기
  const [text, setText] = useState("");
  // 수정하기
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

  // 완료 상태 변경
  const setDone = (id) => {
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    newTodos[idx].isDone = !newTodos[idx].isDone;
    setTodos(newTodos);
  };

  // 삭제하기
  const deleteTodo = (id) => {
    Alert.alert("Todo 삭제", "정말 삭제하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
        onPress: () => console.log("취소 클릭!"),
      },
      {
        text: "삭제",
        style: "destructive",
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
    const inx = newTodos.findIndex((todo) => todo.id === id);
    newTodos[idx].text = editText;
    newTodos[idx].isEdit = false;
    setTodos(newTodos);
  };

  // 새로고침해도 유지
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
    const getData = async () => {
      const resp_todos = await AsyncStorage.getItem("todos");
      const resp_cat = await AsyncStorage.getItem("category");

      setTodos(JSON.parse(resp_todos));
      setCategory(resp_cat ?? "js");
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      {/* Category buttons */}
      <ButtonBox>
        <Buttons
          style={{
            backgroundColor: category === "js" ? "skyblue" : "gray",
          }}
          onPress={() => setCat("js")}
        >
          <ButtonText>Javascript</ButtonText>
        </Buttons>
        <Buttons
          style={{
            backgroundColor: category === "react" ? "skyblue" : "gray",
          }}
          onPress={() => setCat("react")}
        >
          <ButtonText>React</ButtonText>
        </Buttons>
        <Buttons
          style={{
            backgroundColor: category === "ct" ? "skyblue" : "gray",
          }}
          onPress={() => setCat("ct")}
        >
          <ButtonText>Coding Test</ButtonText>
        </Buttons>
      </ButtonBox>
      <BorderLine />
      {/* Text input */}
      <StyledTextInput
        value={text}
        placeholder="    Enter your task"
        onChangeText={setText}
        onSubmitEditing={addTodo}
      />
      <BorderLine />
      <View></View>
      {/* Todo List */}
      <ScrollView>
        {todos.map((todo) => {
          if (category === todo.category) {
            return (
              <ToDo key={todo.id}>
                {todo.isEdit ? (
                  <TextInput
                    onSubmitEditing={() => editTodo(todo.id)}
                    onChangeText={setEditText}
                    value={editText}
                    style={{ backgroundColor: "white", flex: 1 }}
                  />
                ) : (
                  <ToDoText
                    style={{
                      textDecorationLine: todo.isDone ? "line-through" : "none",
                    }}
                  >
                    {todo.text}
                  </ToDoText>
                )}
                <IconBox>
                  <TouchableOpacity onPress={() => setDone(todo.id)}>
                    <Ionicons
                      name="ios-checkbox-sharp"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setEdit(todo.id)}>
                    <SimpleLineIcons name="note" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
                    <FontAwesome name="trash-o" size={24} color="black" />
                  </TouchableOpacity>
                </IconBox>
              </ToDo>
            );
          }
        })}
      </ScrollView>
      {/* <ScrollView>
        {todos.map((todo) => {
          console.log(todos);
          if (category === todo.category) {
            return (
              <View key={todo.id}>
                <Text>{todo.text}</Text>
                <IconBox>
                  <Ionicons name="ios-checkbox-sharp" size={24} color="black" />
                  <SimpleLineIcons name="note" size={24} color="black" />
                  <FontAwesome name="trash-o" size={24} color="black" />
                </IconBox>
              </View>
            );
          }
        })}
      </ScrollView> */}
    </SafeAreaView>
  );
}

// Buttons
const ButtonBox = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const Buttons = styled.TouchableOpacity`
  width: 110px;
  height: 50px;
  color: black;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

// Input 위, 아래 border
const BorderLine = styled.View`
  border: 0.7px solid black;
  margin: 20px 10px;
`;

// text input
const StyledTextInput = styled.TextInput`
  width: 90%;
  height: 50px;
  margin: 0 auto;
  border: 1.5px solid black;
`;

const ToDoList = styled.View`
  justify-content: center;
  align-items: center;
`;

const ToDo = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
  background-color: lightgray;
  padding: 0 10px;
`;

const ToDoText = styled.Text`
  font-weight: 600;
`;

// icons
const IconBox = styled.View`
  flex-direction: row;
  width: 80px;
  justify-content: space-around;
`;

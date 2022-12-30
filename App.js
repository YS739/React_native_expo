import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Alert,
} from "react-native";
import styled from "@emotion/native";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function App() {
  // input에 입력된 내용 받아오기
  const [text, setText] = useState("");
  // Add todo
  const [todos, setTodos] = useState([]);
  // 버튼 눌렀을 때 색 변경
  const [category, setCategory] = useState("js"); //js, react, ct

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
    Alert.alert("Todo 삭제", "정말 삭제하시겠습니까?"),
      [
        {
          text: "취소",
          style: "cancel",
          onPress: () => console.log("취소 클릭!"),
        },
        {
          text: "삭제",
          onPress: () => {
            const newTodos = todos.filter((todo) => todo.id !== id);
            setTodos(newTodos);
          },
        },
      ];
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      {/* Category buttons */}
      <ButtonBox>
        <Buttons
          style={{
            backgroundColor: category === "js" ? "skyblue" : "gray",
          }}
          onPress={() => setCategory("js")}
        >
          <ButtonText>Javascript</ButtonText>
        </Buttons>
        <Buttons
          style={{
            backgroundColor: category === "react" ? "skyblue" : "gray",
          }}
          onPress={() => setCategory("react")}
        >
          <ButtonText>React</ButtonText>
        </Buttons>
        <Buttons
          style={{
            backgroundColor: category === "ct" ? "skyblue" : "gray",
          }}
          onPress={() => setCategory("ct")}
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
              <View key={todo.id} style={styles.task}>
                <Text
                  style={{
                    textDecorationLine: todo.isDone ? "line-through" : "none",
                  }}
                >
                  {todo.text}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={() => setDone(todo.id)}>
                    <Ionicons
                      name="ios-checkbox-sharp"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                  <SimpleLineIcons name="note" size={24} color="black" />
                  <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
                    <FontAwesome name="trash-o" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
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

const styles = StyleSheet.create({
  task: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

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
  /* background-color: gray; */
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

// // Todo List
// const ToDoList = styled.View`
//   justify-content: center;
//   align-items: center;
// `;

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

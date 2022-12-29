import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import styled from "@emotion/native";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function App() {
  // input에 입력된 내용 받아오기
  const [text, setText] = useState();

  const onChangeText = (text) => {
    setText(text);
  };

  const [state, setState] = useState({
    selectedButton: "",
  });

  return (
    <SafeAreaView>
      {/* Category buttons */}
      <ButtonBox>
        <Buttons
          style={{
            backgroundColor:
              state.selectedButton === "button1" ? "skyblue" : "gray",
          }}
          onPress={() => setState({ selectedButton: "button1" })}
        >
          <ButtonText>Javascript</ButtonText>
        </Buttons>
        <Buttons
          style={{
            backgroundColor:
              state.selectedButton === "button2" ? "skyblue" : "gray",
          }}
          onPress={() => setState({ selectedButton: "button2" })}
        >
          <ButtonText>React</ButtonText>
        </Buttons>
        <Buttons
          style={{
            backgroundColor:
              state.selectedButton === "button3" ? "skyblue" : "gray",
          }}
          onPress={() => setState({ selectedButton: "button3" })}
        >
          <ButtonText>Coding Test</ButtonText>
        </Buttons>
      </ButtonBox>
      <BorderLine />
      {/* Text input */}
      <StyledTextInput
        value={text}
        placeholder="    Enter your task"
        onChangeText={onChangeText}
      />
      <BorderLine />
      <View>
        <StatusBar style="auto" />
      </View>
      {/* Todo List */}
      <ScrollView>
        <ToDoList>
          <ToDo>
            <ToDoText>신나는 실행컨텍스트 공부</ToDoText>
            <IconBox>
              <Ionicons name="checkbox-sharp" size={24} color="black" />
              <SimpleLineIcons name="note" size={24} color="black" />
              <FontAwesome name="trash-o" size={24} color="black" />
            </IconBox>
          </ToDo>
          <ToDo>
            <ToDoText>너무 좋은 실행컨텍스트 공부</ToDoText>
            <IconBox>
              <Ionicons name="checkbox-sharp" size={24} color="black" />
              <SimpleLineIcons name="note" size={24} color="black" />
              <FontAwesome name="trash-o" size={24} color="black" />
            </IconBox>
          </ToDo>
        </ToDoList>
      </ScrollView>
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

// Todo List
const ToDoList = styled.View`
  justify-content: center;
  align-items: center;
`;

const ToDo = styled.View`
  flex-direction: row;
  width: 90%;
  height: 50px;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
  background-color: lightgray;
  padding: 0 10px;
  font-weight: 900;
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

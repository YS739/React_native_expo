import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const Todo = ({
  todo,
  setDone,
  setEdit,
  editTodo,
  setEditText,
  deleteTodo,
}) => {
  return (
    <View key={todo.id} style={styles.todoWrapper}>
      {todo.isEdit ? (
        <TextInput
          onSubmitEditing={() => editTodo(todo.id)}
          defaultValue={todo.text}
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
};

export default Todo;

const styles = StyleSheet.create({
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

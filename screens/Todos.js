import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import DisplayTask from "../components/DisplayTask";
import { getData, storeData } from "../Util";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [change, setChange] = useState(false);

  async function getTodos() {
    let todo = await getData("todos");
    if (todo) setTodos(todo);
  }

  async function markTodo(key) {
    console.log("key ", key);

    let tempo = todos;
    tempo[key].status = true;

    await storeData("todos", tempo);

    setChange(!change);
    console.log("  --", todos);
  }

  async function unmarkTodo(key) {
    console.log("key ", key);

    let tempo = todos;
    tempo[key].status = false;

    await storeData("todos", tempo);
    setChange(!change);
  }

  async function deleteTodo(key) {
    console.log("key ", key);

    let tempo = todos;
    tempo.splice(key, 1);

    await storeData("todos", tempo);
    setChange(!change);
  }

  useEffect(() => {
    getTodos();
    console.log("todo monté");

    return () => console.log("todo démonté");
  }, [change]);

  return (
    <View style={styles.container}>
      <Text>TODO here</Text>
      <ScrollView style={styles.scrollView}>
        {todos.length > 0 &&
          todos.map((item, id) => {
            return (
              <DisplayTask
                markTodo={markTodo}
                unmarkTodo={unmarkTodo}
                deleteTodo={deleteTodo}
                todo={item}
                id={id}
                key={id}
              />
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  scrollView: {
    // marginHorizontal: 20,
  },
});

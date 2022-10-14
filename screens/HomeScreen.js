import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { getData, storeData } from "../Util";

const HomeScreen = () => {
  const [count, setCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, onChangeName] = useState("");
  const [description, onChangeDescription] = useState("");
  const counter = () => {
    setCount(count + 1);
  };

  const storeTodo = async () => {
    let oldTodos = await getData("todos");
    let newTodos = {};
    if (oldTodos) {
      newTodos = [...oldTodos, { name, description, status: false }];
    } else newTodos = [{ name, description, status: false }];

    storeData("todos", newTodos);
    setModalVisible(!modalVisible);
  };

  const showModal = async () => {
    setModalVisible(!modalVisible);
    console.log(await getData("todos"));
  };

  return (
    <View style={styles.container}>
      <Text>home app here</Text>

      <View style={styles.top} />
      <View style={styles.middle} />
      <View style={styles.bottom}>
        <FontAwesome
          style={styles.icon}
          name="plus-circle"
          size={50}
          color="green"
          onPress={showModal}
        />
      </View>
      <Button title="Press me" onPress={counter} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Ajouter une tache ici </Text>

            <SafeAreaView>
              <Text style={styles.modalText}>Nom </Text>
              <TextInput
                style={styles.input}
                onChangeText={(e) => onChangeName(e)}
                value={name}
              />
              <Text style={styles.modalText}>Description </Text>

              <TextInput
                style={styles.input}
                onChangeText={(e) => onChangeDescription(e)}
                value={description}
              />
            </SafeAreaView>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Pressable
                  style={styles.btn}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                    Cancel
                  </Text>
                </Pressable>

                <Pressable style={styles.btnActif}>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontWeight: "bold",
                    }}
                    onPress={storeTodo}
                  >
                    Save
                  </Text>
                </Pressable>
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  btn_container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",

    borderRadius: 20,
  },

  btn: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "oldlace",

    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
  },

  btnActif: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "green",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",

    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
  },

  icon: {
    flex: 0.3,

    top: 70,
  },

  top: {
    flex: 0.3,
    // backgroundColor: "grey",
    // borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  middle: {
    flex: 0.3,
    // backgroundColor: "beige",
    // borderWidth: 5,
  },
  bottom: {
    flex: 0.3,
    // backgroundColor: "pink",
    // borderWidth: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 100,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  input: {
    width: 290,
    height: 40,
    margin: 12,
    borderWidth: 0,
    borderRadius: 20,
    backgroundColor: "gray",
    padding: 8,
  },
});

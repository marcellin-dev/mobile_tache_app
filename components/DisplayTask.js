import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";

const DisplayTask = (props) => {
  const { todo, id } = props;

  const [modalVisible, setModalVisible] = useState(false);

  const setDelete = () => {
    setModalVisible(true);

    // props.deleteTodo(id);
  };

  const handleDelete = () => {
    props.deleteTodo(id);

    setModalVisible(false);
  };
  return (
    <>
      {console.log("-- --", todo)}
      <View style={styles.container}>
        <View style={styles.text}>
          <Text style={styles.text_element}>{todo.name}</Text>
          <Text style={styles.text_element}>{todo.description}</Text>
        </View>

        <View style={styles.action}>
          {todo.status === true ? (
            <>
              <FontAwesome
                style={styles.icon}
                name="check-circle"
                size={40}
                color="green"
                onPress={() => props.unmarkTodo(id)}
              />
              <FontAwesome
                name="trash-o"
                size={35}
                color="red"
                onPress={setDelete}
              />
            </>
          ) : (
            <>
              <FontAwesome
                name="check-circle-o"
                size={40}
                color="gray"
                onPress={() => props.markTodo(id)}
              />
              <FontAwesome
                name="trash-o"
                size={35}
                color="red"
                onPress={setDelete}
              />
            </>
          )}
        </View>
      </View>

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
            <Text style={styles.modalText}>
              Voulez vous vraiment supprimer {todo.name} ?
            </Text>

            <View style={{ marginBottom: 50 }}></View>

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
                    Annuler
                  </Text>
                </Pressable>

                <Pressable style={styles.btnActif} onPress={handleDelete}>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Supprimer
                  </Text>
                </Pressable>
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};
export default DisplayTask;

const styles = StyleSheet.create({
  container: {
    flex: 3,
    width: 350,
    minHeight: 100,
    margin: 10,
    borderRadius: 10,
    // backgroundColor: "gray",
    borderColor: "gray",
    borderWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "80%",
  },
  text_element: {
    margin: 10,
  },

  action: {
    marginRight: 5,
  },

  icon: {
    marginBottom: 10,
  },

  //modal -----------
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
    backgroundColor: "red",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
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

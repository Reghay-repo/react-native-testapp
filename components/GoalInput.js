import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const GoalInput = (props) => {
  const [goal, setGoal] = useState("");

  // get the value from the input and set it to goal variable
  const onChangeHandler = (enteredGoal) => {
    setGoal(enteredGoal);
  };

  const addGoalFunc = () => {
    props.onAddGoal(goal);
    setGoal("");
  };
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Write your goals here !"
        value={goal}
        onChangeText={onChangeHandler}
      />
      <Button title="Add goal" onPress={addGoalFunc} color="#023047" />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    borderBottomWidth: 1,
    alignItems: "center",
    borderColor: "#ccccc",
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    borderColor: "#ccccc",
    width: "80%",
    marginRight: 8,
    padding: 8,
  },
});
export default GoalInput;

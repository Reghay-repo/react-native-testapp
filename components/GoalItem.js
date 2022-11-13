import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const GoalItem = (props) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.goalStyle}
        onPress={props.onDelete.bind(this, props.id)}
      >
        <Text>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  goalStyle: {
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
    padding: 15,
    marginVertical: 3,
  },
});

export default GoalItem;

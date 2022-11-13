import { View, TouchableOpacity, StyleSheet, Button } from "react-native";

const ClearAllButton = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Button title="clear all" onPress={props.onClear} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default ClearAllButton;

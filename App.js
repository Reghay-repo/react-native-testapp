import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    flex: 1,
    paddingHorizontal: 16,
  },
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
  goalsContainer: {
    flex: 3,
  },
  textHeader: {
    fontSize: 23,
    marginBottom: 10,
  },
  goalStyle: {
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
    padding: 15,
    marginVertical: 3,
  },
});

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
export default function App() {
  const [goal, setGoal] = useState("");

  const [goalsList, setGoalsList] = useState([]);

  // get the value from the input and set it to goal variable
  const onChangeHandler = (enteredGoal) => {
    setGoal(enteredGoal);
  };

  // onpress evennt to log the goal on console
  const addGoal = () => {
    const newGoal = { key: Date.now().toString(), text: goal };
    setGoalsList((currentGoals) => [...currentGoals, newGoal]);
    setGoal("");
  };

  // splash logic
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.appContainer} onLayout={onLayoutRootView}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Write your goals here !"
          value={goal}
          onChangeText={onChangeHandler}
        />
        <Button title="Add Note" onPress={addGoal} color="#023047" />
      </View>
      <View style={styles.goalsContainer}>
        <Text style={styles.textHeader}>List of goals : </Text>
        <FlatList
          data={goalsList}
          keyExtractor={(item, index) => item.key}
          renderItem={(itemData) => (
            <View>
              <TouchableOpacity style={styles.goalStyle}>
                <Text>{itemData.item.text}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
// {goalsList.map((goal) => (
//   <TouchableOpacity key={goal.id} style={styles.goalStyle}>
//     <Text>{goal.text}</Text>
//   </TouchableOpacity>
// ))}

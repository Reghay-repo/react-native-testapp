import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import ClearAllButton from "./components/ClearAllButton";

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    flex: 1,
    paddingHorizontal: 16,
  },

  goalsContainer: {
    flex: 3,
  },
  textHeader: {
    fontSize: 23,
    marginBottom: 10,
  },
});

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
export default function App() {
  const [goalsList, setGoalsList] = useState([
    { id: "23123", text: "todoitem" },
    { id: "2324", text: "another item" },
  ]);

  // onpress evennt to log the goal on console
  const addGoalHandler = (goalText) => {
    const newGoal = { id: Date.now().toString(), text: goalText };
    setGoalsList((currentGoals) => [...currentGoals, newGoal]);
  };

  function clearAll() {
    setGoalsList([]);
  }

  function deleteItemHandler(id) {
    setGoalsList((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== id);
    });
  }

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
      <GoalInput onAddGoal={addGoalHandler} />
      <View style={styles.goalsContainer}>
        <ClearAllButton onClear={clearAll} />
        <Text style={styles.textHeader}>List of goals : </Text>
        <FlatList
          data={goalsList}
          keyExtractor={(item, index) => item.id}
          renderItem={(itemData) => (
            <GoalItem
              text={itemData.item.text}
              onDelete={deleteItemHandler}
              id={itemData.item.id}
            />
          )}
          alwaysBounceVertical={false}
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

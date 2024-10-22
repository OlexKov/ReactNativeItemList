
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Category } from './models/Category';
import axios from 'axios';
import { CategoryCard } from './components/CategoryCard';



function App(): React.JSX.Element {
  const [data, setData] = useState<Category[]>([]);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useEffect(() => {
    (async () => {
      const result = await axios.get<Category[]>("http://3.72.67.233:5088/get");
      if (result.status === 200) {
        setData(result.data)
      }
    })()
  }, [])

  return (
    <SafeAreaView style={[backgroundStyle, { height: "100%", width: "100%" }]}>
      <Text style={[styles.sectionTitle]}>Категорії</Text>
      <ScrollView style={{ height: "100%", width: "100%" }} >
        <View style={[styles.sectionContainer]}>
          {data.map(x => <CategoryCard key={x.id} category={x} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'space-between',
    width: "90%",
    marginLeft: "5%",
    alignItems: "center",
    gap: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: "center"
  }
});

export default App;

import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Pressable
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

import { useSelector, useDispatch } from 'react-redux';
import PlaceCard from './PlaceCard';
import Loader from './Loader';



const Places = () => {

  const places = useSelector(state => state.places.places);
  const placesLoading = useSelector(state => state.places.loading);
  const placesError = useSelector(state => state.places.error);

  // console.log("----------places-------->",places)

  const dataPerPage = 7;
  const [data, setData] = useState(places.slice(0, dataPerPage))
  
  const [currentPage, setCurrentPage] = useState(1);
  const totalPagesCount = Math.ceil(places.length / dataPerPage);

  useEffect(() => {
    setData(places.slice(0, dataPerPage));
    setCurrentPage(1);
  },[places])

  const onEndReached = () => {
    if (currentPage < totalPagesCount) {
      const newData = [...data, ...places.slice(currentPage * dataPerPage, (currentPage + 1) * dataPerPage)];
      setData(newData);
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  // console.log("-------data------->",data)

  // const paginationButtons = [];
  // for (let i = 1; i <= totalPagesCount; i++) {
  //   paginationButtons.push(
  //     <Pressable
  //       key={String(i)}
  //       style={[
  //         styles.movingButton,
  //         {
  //           backgroundColor: i === currentPage ? "#020035" : "#FFFFFF",
  //         },
  //       ]}
  //       onPress={() => setCurrentPage(i)}
  //     >
  //       <Text
  //         style={[
  //           styles.buttonText,
  //           {
  //             color: i === currentPage ? "#FFFFFF" : "#020035",
  //           },
  //         ]}
  //       >
  //         {i}
  //       </Text>
  //     </Pressable>)
  // }

  return (
    placesLoading ?
      <Loader /> :
      placesError ?
        <View>
          <Text>{placesError}</Text>
        </View>
        :
        <SafeAreaView style={styles.container}>

          <FlatList
            data={data || []}
            renderItem={({ item }) =>
              <PlaceCard place={item} />}
            keyExtractor={(item, index) => String(index)}
            initialNumToRender={dataPerPage}
            onEndReachedThreshold={0.75}
            onEndReached={onEndReached}
          />

          {/* {totalPagesCount > 1 &&
              <Pressable
                disabled={currentPage < 2}
                onPress={() => setCurrentPage(prevState => prevState - 1)}
                style={styles.movingButtonIcon}>
                <AntDesign name="leftcircleo" size={26} />
              </Pressable>
            } */}
          {/* {paginationButtons}
            {totalPagesCount > 1 &&
              <Pressable
                disabled={currentPage === totalPagesCount}
                onPress={() => setCurrentPage(prevState => prevState + 1)}
                style={styles.movingButtonIcon}>
                <AntDesign name="rightcircleo" size={26} />
              </Pressable>
            } */}

        </SafeAreaView>
  );
};

export default Places;

const styles = StyleSheet.create({
  container: {
    zIndex: -1,
    flex: 1,
  },
  paginationButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 1,
  },
  movingButton: {
    backgroundColor: "#FFFFFF",
    margin: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#020035",
  },
  movingButtonIcon: {
    margin: 8,
  },
  buttonText: {
    color: "#020035"
  }
})


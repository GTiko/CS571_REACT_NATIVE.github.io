import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Rating (){
  const [rating, setRating] = useState(0);
  
  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  const renderStar = (starNumber) => {
    return (
      <TouchableWithoutFeedback onPress={() => handleRating(starNumber)}>
        <Icon
          name={rating >= starNumber ? 'star' : 'star-o'}
          size={30}
          color="#FFD700"
        />
      </TouchableWithoutFeedback>
    );
  };
  
  return (
    <View style={{ flexDirection: 'row' }}>
      {renderStar(1)}
      {renderStar(2)}
      {renderStar(3)}
      {renderStar(4)}
      {renderStar(5)}
    </View>
  );
};

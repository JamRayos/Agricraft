import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

const StarRating = ({ maxStars = 5, onRate }) => {
    const [rating, setRating] = useState(0);

    const handlePress = (star) => {
        setRating(star);
        if (onRate) onRate(star); // callback to parent
    };

    return (
        <View style={{ flexDirection: "row" }}>
            {Array.from({ length: maxStars }, (_, index) => {
                const starNumber = index + 1;
                return (
                    <TouchableOpacity key={index} onPress={() => handlePress(starNumber)}>
                        <FontAwesome
                            name={starNumber <= rating ? "star" : "star"}
                            size={40}
                            color={starNumber <= rating ? "#FFA500" : "rgba(196,195,195,0.51)"}
                            style={{ marginHorizontal: 4 }}
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default StarRating;

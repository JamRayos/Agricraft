import ImagePicker from 'react-native-image-crop-picker';
import {Alert} from "react-native";

const pickMultipleImages = async () => {
    try {
        const images = await ImagePicker.openPicker({
            multiple: true,
            maxFiles: 10,
            mediaType: 'photo',
            cropping: false, // Set to false for multiple images
            compressImageQuality: 0.8,
        });

        const newImages = images.map(image => ({
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
        }));

        setSelectedImages(prev => [...prev, ...newImages]);
    } catch (error) {
        if (error.code !== 'E_PICKER_CANCELLED') {
            console.log('Error picking images:', error);
            Alert.alert('Error', 'Failed to pick images');
        }
    }
};

const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
};

export default pickMultipleImages();
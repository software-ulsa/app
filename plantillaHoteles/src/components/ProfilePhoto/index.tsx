import * as React from 'react';
import { View, Image, TouchableOpacity, ImageProps } from 'react-native';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import { Images } from '../../theme';
import styles from './Styles/index';

export interface Props {
  navigation: any;
}

interface AvatarProps extends ImageProps {
  onChange?: (image: ImageOrVideo) => void;
}

function ProfilePhoto(props: AvatarProps) {
  const [uri, setUri] = React.useState(props.source?.uri || undefined);

  const pickPicture = () => {
    ImagePicker.openPicker({
      width: 110,
      height: 110,
      cropping: true
    }).then((image) => {
      setUri(image.path);
      props.onChange?.(image);
    });
  };
  return (
    <>
      <View style={styles.profileEditContent}>
        <Image
          source={uri ? { uri } : Images.UserImage}
          resizeMode="cover"
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.userEditImageBtn} onPress={pickPicture}>
          <Image
            source={Images.EditIcon}
            resizeMode="contain"
            style={styles.userEditImage}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

export default ProfilePhoto;

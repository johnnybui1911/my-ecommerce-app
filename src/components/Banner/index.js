import React, {useContext} from 'react';
import {Image, View} from 'react-native';
import Modal from 'react-native-modal';
import {BannerContext} from '../../contexts/BannerContext';

export default function Banner({data}) {
  const context = useContext(BannerContext);
  const {isModalVisible, toggleModal, banner} = context;
  return (
    <Modal
      isVisible={isModalVisible && !!banner}
      coverScreen
      useNativeDriver
      onBackdropPress={toggleModal}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{backgroundColor: 'white', width: 200, height: 200}}>
        <Image
          source={{uri: banner?.image ?? ''}}
          style={{width: 200, height: 200}}
          resizeMode="cover"
        />
      </View>
    </Modal>
  );
}

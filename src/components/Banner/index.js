import React, {useCallback, useEffect, useState} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import apiRequest from '../../api';
import {STORAGE_BANNER_KEY} from '../../constants/configs';
import {getData, removeData, storeData} from '../../utils/asyncStorage';

export default function Banner() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [banner, setBanner] = useState(null);
  const [visitedBanners, setVisitedBanners] = useState(null);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const fetchBanners = useCallback(async () => {
    try {
      // await removeData(STORAGE_BANNER_KEY);
      const res = await apiRequest({
        url: '/banners',
      });
      const {data} = res;

      // Only store the banner if user close the banner, otherwise, this banner still can appear again
      if (data.length) {
        // retrieve storaged promotion hashMap
        const storagedBanners = await getData(STORAGE_BANNER_KEY);

        // convert list of promotion banner to hash map
        // key: id , value: is showed in Home or not
        const bannerMap = {};

        for (let item of data) {
          let key = item.id;
          let isShow = false;
          if (storagedBanners) {
            isShow = storagedBanners.hasOwnProperty(key);
          }

          bannerMap[key] = {
            ...item,
            isShow,
          };
        }

        let toShowBanner = null;

        for (let key in bannerMap) {
          if (!bannerMap[key].isShow) {
            bannerMap[key] = {
              ...bannerMap[key],
              isShow: true,
            };
            toShowBanner = bannerMap[key];
            break;
          }
        }

        // create hash map that contain elements that is shown
        // replace the current storaged banner with the new one
        // -> prevent storage size increasing all the time and out of memory issue
        // -> storage is always updated with new object
        let shownBanners = {};
        for (let key in bannerMap) {
          if (bannerMap[key].isShow) {
            shownBanners[key] = bannerMap[key];
          }
        }

        console.log({toShowBanner});
        if (toShowBanner) {
          onShowBanner(toShowBanner);
          setVisitedBanners(shownBanners);
        }
      }
    } catch (error) {
      console.log({error});
    }
  }, [onShowBanner]);

  // !!! Only store visited banners (hash map) into persistent storage if user close the banner
  const onCloseBanner = useCallback(async () => {
    try {
      console.log('clear');
      setModalVisible(false);
      await storeData(STORAGE_BANNER_KEY, visitedBanners);
    } catch (e) {
      //
    }
  }, [visitedBanners]);

  const onShowBanner = useCallback(
    (showBanner) => {
      setModalVisible(true);
      setBanner(showBanner);
    },
    [setModalVisible, setBanner],
  );

  return (
    <Modal
      isVisible={isModalVisible && !!banner}
      coverScreen
      useNativeDriver
      onBackdropPress={onCloseBanner}
      style={styles.modalStyle}>
      <View style={styles.banner}>
        {banner ? (
          <Image
            source={{uri: banner?.image ?? ''}}
            style={styles.image}
            resizeMode="cover"
          />
        ) : null}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalStyle: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  banner: {backgroundColor: 'white', width: 200, height: 200},
  image: {width: 200, height: 200},
});

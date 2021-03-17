import {useCallback, useEffect} from 'react';
import apiRequest from '../api';
import {getData, storeData} from '../utils/asyncStorage';
const STORAGE_BANNER_KEY = 'banners';

export default function useShowBanner(onShowBanner) {
  useEffect(() => {
    fetchPromotions();
  }, [fetchPromotions]);

  const fetchPromotions = useCallback(async () => {
    try {
      const res = await apiRequest({
        url: '/banners',
      });
      const {data} = res;

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

        if (toShowBanner) {
          onShowBanner(toShowBanner);
          await storeData(STORAGE_BANNER_KEY, shownBanners);
        }
      }
    } catch (error) {
      console.log({error});
    }
  }, [onShowBanner]);

  return null;
}

import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import {sizes, WINDOW_WIDTH} from '../../constants/sizes';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background_gray},
  tabItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.white,
    marginVertical: 4,
    width: 100,
    height: 120,
    marginRight: 4,
    alignItems: 'center',
    borderWidth: 1,
  },
  veritcalListColumnWrapper: {
    justifyContent: 'space-evenly',
    marginBottom: 4,
  },
  verticalListItem: {
    backgroundColor: colors.white,
    width: WINDOW_WIDTH / 2 - sizes.small,
  },
  verticalListImage: {
    width: WINDOW_WIDTH / 2 - sizes.small,
    height: WINDOW_WIDTH / 2 - sizes.small,
  },
  verticalListContent: {padding: sizes.small},
  verticalListContainer: {
    paddingTop: 16,
  },
  tabSceneContainer: {
    flex: 1,
    backgroundColor: colors.background_gray,
  },
  listLoading: {textAlign: 'center', color: colors.shopee_orange},
});

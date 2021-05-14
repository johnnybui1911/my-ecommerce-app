import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import {WINDOW_WIDTH, sizes, STATUS_BAR_HEIGHT} from '../../constants/sizes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background_gray,
  },
  headerAnimationContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.white,
    paddingLeft: sizes.medium,
    flexDirection: 'row',
    zIndex: 1,
    height: 40 + STATUS_BAR_HEIGHT + 16 * 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.1,
    alignItems: 'center',
  },
  headerInput: {flex: 1, height: 40},
  headerContainer: {
    flex: 1,
    backgroundColor: colors.background_gray,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listFooter: {justifyContent: 'center', alignItems: 'center'},
  fourItemContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fourItemStyle: {
    width: Math.floor(WINDOW_WIDTH / 2 - sizes.medium),
    padding: sizes.medium,
  },
  fourItemText: {flex: 1},
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
});

export default styles;

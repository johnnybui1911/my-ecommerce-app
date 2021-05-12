import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import {SCREEN_WIDTH, space, STATUS_BAR_HEIGHT} from '../../constants/sizes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background_gray,
  },
  headerAnimationContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.white,
    paddingLeft: space.medium,
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
    width: Math.floor(SCREEN_WIDTH / 2 - space.medium),
    padding: space.medium,
  },
  fourItemText: {flex: 1},
  veritcalListColumnWrapper: {
    justifyContent: 'space-evenly',
    marginBottom: 4,
  },
  verticalListItem: {
    backgroundColor: colors.white,
    width: SCREEN_WIDTH / 2 - space.small,
  },
  verticalListImage: {
    width: SCREEN_WIDTH / 2 - space.small,
    height: SCREEN_WIDTH / 2 - space.small,
  },
  verticalListContent: {padding: space.small},
});

export default styles;

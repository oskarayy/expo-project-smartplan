import { StyleSheet } from 'react-native';

import { Colors } from '../../../constants/Colors';

export const ICONS = {
  ARROW_DOWN: require('../../../assets/icons/chevron-down.png'),
  ARROW_UP: require('../../../assets/icons/chevron-up.png'),
  TICK: require('../../../assets/icons/checkmark.png'),
  CLOSE: require('../../../assets/icons/close.png')
};

export default StyleSheet.create({
  container: {
    width: '100%'
  },
  style: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    minHeight: 50,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#EA372955',
    borderColor: Colors.gray200
  },
  label: {
    flex: 1,
    fontSize: 15,
    color: Colors.gray500
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  arrowIcon: {
    width: 20,
    height: 20
  },
  tickIcon: {
    width: 20,
    height: 20
  },
  closeIcon: {
    width: 30,
    height: 30
  },
  badgeStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  badgeDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    marginRight: 8,
    backgroundColor: Colors.gray100
  },
  badgeSeparator: {
    width: 5
  },
  listBody: {
    height: '100%'
  },
  listBodyContainer: {
    flexGrow: 1,
    alignItems: 'center'
  },
  dropDownContainer: {
    position: 'absolute',
    backgroundColor: Colors.gray10,
    borderRadius: 8,
    borderColor: Colors.gray100,
    borderWidth: 1,
    width: '100%',
    overflow: 'hidden',
    zIndex: 1000
  },
  modalContentContainer: {
    flexGrow: 1
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 40
  },
  listItemLabel: {
    flex: 1,
    fontSize: 15,
    color: Colors.gray400
  },
  iconContainer: {
    marginRight: 10
  },
  arrowIconContainer: {
    marginLeft: 10
  },
  tickIconContainer: {
    marginLeft: 10
  },
  closeIconContainer: {
    marginLeft: 10
  },
  listParentLabel: {},
  listChildLabel: {},
  listParentContainer: {},
  listChildContainer: {
    paddingLeft: 40
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: Colors.gray100,
    borderBottomWidth: 1
  },
  searchTextInput: {
    flexGrow: 1,
    flexShrink: 1,
    margin: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderColor: Colors.gray100,
    borderWidth: 1,
    color: Colors.gray500
  },
  itemSeparator: {
    height: 1,
    backgroundColor: Colors.gray300
  },
  flatListContentContainer: {
    flexGrow: 1
  },
  customItemContainer: {},
  customItemLabel: {
    fontStyle: 'italic'
  },
  listMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  listMessageText: {
    color: Colors.gray400
  },
  selectedItemContainer: {},
  selectedItemLabel: {},
  modalTitle: {
    fontSize: 18,
    color: Colors.gray400
  },
  extendableBadgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  },
  extendableBadgeItemContainer: {
    marginVertical: 3,
    marginEnd: 7
  }
});

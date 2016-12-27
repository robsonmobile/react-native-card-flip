import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');
const MARGIN = 5;
const CARD_WIDTH = (window.width - MARGIN * 8) / 4;

const GREY = '#3b3c40';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderWidth: 2,
    borderColor: GREY,
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.5,
    margin: MARGIN,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GREY,
  },
  cardSelected: {
    borderColor: '#057705',
    backgroundColor: 'transparent',
  },
  cardText: {
    fontSize: 18,
    color: GREY,
  },
  timer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 20,
  },
  success: {
    backgroundColor: 'rgba(5, 119, 5, 0.7)',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  failed: {
    backgroundColor: 'rgba(146, 0, 0, 0.7)',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
});

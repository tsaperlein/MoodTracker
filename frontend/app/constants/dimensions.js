import { Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const headerHEIGHT = (HEIGHT * 12) / 100;

export { WIDTH, HEIGHT, headerHEIGHT };

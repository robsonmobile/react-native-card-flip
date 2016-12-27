import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import styles from './styles';

const INITIAL_TIME = 60;
const CARD_TYPES = [
  'Dasher',
  'Dasher',
  'Rudolph',
  'Rudolph',
  'Blitzen',
  'Blitzen',
  'Prancer',
  'Prancer',
  'Vixen',
  'Vixen',
  'Comet',
  'Comet',
  'Cupid',
  'Cupid',
  'Donner',
  'Donner',
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeRemaining: INITIAL_TIME,
      first: null,
      second: null,
      data: [],
      matches: {},
      matchedIn: null,
      timeExpired: false,
    };
  }

  componentDidMount() {
    this.generateData();
    this.timer = setInterval(() => {
      if (this.state.timeRemaining > 0) {
        this.setState({
          timeRemaining: this.state.timeRemaining - 1,
        });
      } else {
        this.setState({
          timeExpired: true,
        });
        clearInterval(this.timer);
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  generateData = () => {
    const data = [];
    _.times(16, (index) => {
      data.push({
        name: CARD_TYPES[index],
      });
    });
    this.setState({
      data: _.shuffle(data),
    });
  };

  handlePress = (index) => {
    const { first, second, data } = this.state;
    if (second === null && first !== null) {
      if (data[first].name === data[index].name) {
        const matches = {
          ...this.state.matches,
          [data[first].name]: true,
        };
        const newState = {
          matches,
          first: null,
          second: null,
        };

        if (_.keys(matches).length === data.length / 2) {
          newState.matchedIn = INITIAL_TIME - this.state.timeRemaining;
          clearInterval(this.timer);
        }

        this.setState(newState);
      } else {
        this.setState({
          second: index,
        });
      }
    } else {
      this.setState({
        first: index,
        second: null,
      });
    }
  };

  render() {
    const { timeRemaining, first, second, data, matches, matchedIn, timeExpired } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <StatusBar hidden />
          {
            _.map(data, (cardInfo, index) => {
              const cardStyle = [styles.card];
              const matched = matches[cardInfo.name] !== undefined;
              if (index === first || index === second || matched) {
                cardStyle.push(styles.cardSelected);
              }
              return (
                <TouchableOpacity
                  onPress={() => this.handlePress(index)}
                  style={cardStyle}
                  key={index}
                  activeOpacity={0.1}
                  disabled={matched}
                >
                  <Text style={styles.cardText}>
                    {cardInfo.name}
                  </Text>
                </TouchableOpacity>
              );
            })
          }
        </View>
        <View style={styles.timer}>
          <Text style={styles.timerText}>
            {timeRemaining} Seconds Remaining
          </Text>
        </View>
        {matchedIn ?
          <View style={styles.success}>
            <Text style={styles.modalText}>
              Success!
            </Text>
            <Text style={styles.modalText}>
              Matched in {matchedIn.toString()} seconds.
            </Text>
          </View>
        : null}
        {timeExpired ?
          <View style={styles.failed}>
            <Text style={styles.modalText}>
              Failed!
            </Text>
            <Text style={styles.modalText}>
              Step yo game up.
            </Text>
          </View>
        : null}
      </View>
    );
  }
}

export default App;

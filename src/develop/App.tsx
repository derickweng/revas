import * as React from 'react';
import { View, Text, AnimatedValue, timing, AnimatedTiming, Touchable } from '../revas';
import Intro from './Intro';
import Timeline from './Timeline';
import Player from './Player';


export default class App extends React.Component {
  state = {
    route: 'timeline'
  };

  render() {
    switch (this.state.route) {
      case 'intro':
        return <Intro />;
      case 'timeline':
        return <Timeline />;
      case 'player':
        return <Player />;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Revas Examples</Text>
        <View style={styles.cards}>
          <Card color="#9254DE" text="Intro" tap={() => this.setState({ route: 'intro' })} />
          <Card color="#F759AB" text="Timeline" tap={() => this.setState({ route: 'timeline' })} />
          <Card color="#597EF7" text="Player" tap={() => this.setState({ route: 'player' })} />
        </View>
      </View>
    );
  }
}

interface CardProps {
  color: string;
  text: string;
  tap: Function;
}

class Card extends React.Component<CardProps> {
  animated = new AnimatedValue(30);
  animating?: AnimatedTiming;

  style = [styles.card, {
    backgroundColor: this.props.color,
    shadowColor: `${this.props.color }90`,
    shadowBlur: this.animated,
    shadowOffsetY: this.animated.interpolate(
      [4, 30],
      [1, 5]
    ),
    animated: true
  }];

  onPress = () => {
    this.animating?.stop();
    this.animating = timing(this.animated, {
      to: 4,
      duration: (this.animated.getValue() - 4) * 10,
    }).start();
  };

  onPressOut = () => {
    this.animating?.stop();
    this.animating = timing(this.animated, {
      to: 30,
      duration: (30 - this.animated.getValue()) * 10,
    }).start();
  };

  render() {
    return (
      <Touchable activeOpacity={1} style={this.style} onPress={this.props.tap} onPressIn={this.onPress} onPressOut={this.onPressOut}>
        <Text style={styles.text}>{this.props.text}</Text>
      </Touchable>
    );
  }
}


const styles = {
  container: {
    justifyContent: 'center',
    flex: 1
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '500',
    color: '#000',
    opacity: 0.56,
    marginBottom: 20,
    fontFamily: "'Avenir Next', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'"
  },
  cards: {
    alignItems: 'center',
  },
  card: {
    height: 130, width: 280,
    shadowOffsetX: 0,
    borderRadius: 15,
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '500',
    color: '#fff',
    fontFamily: "'Avenir Next', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'"
  },
};
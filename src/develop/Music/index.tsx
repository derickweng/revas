import * as React from 'react';
import { View, Text, LinearGradient, Image, ScrollView, RevasScrollEvent } from '../../revas';
import { ABS_FULL, DEFAULT_TEXT } from './styles';
import { MUSICS, MusicItemData } from './data';
import Player from './Player';
import Back from '../common/back';

export default class MusicApp extends React.Component {
  state = { index: 0 };

  checkIndex = (e: RevasScrollEvent) => {
    const index = Math.round(e.y / 113);
    this.setState({ index });
  };

  renderMusic = (item: MusicItemData, index: number) => (
    <View style={styles.musicItem} key={index}>
      <Image style={styles.musicCover} src={item.cover} />
      <View style={styles.musicInfo}>
        <Text style={styles.musicName}>{item.name}</Text>
        <Text style={styles.musicSinger}>{item.singer}</Text>
        <View style={styles.line} />
      </View>
    </View>
  );
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.list} paging={113} onScrollEnd={this.checkIndex}>
          <View style={styles.inner} cache>
            {MUSICS.map(this.renderMusic)}
          </View>
        </ScrollView>
        <LinearGradient
          style={styles.top}
          colors={['#EFF5F400', '#EBF1F0']}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0.15 }}
          pointerEvents="none"
        />
        <LinearGradient
          style={styles.bottom}
          colors={['#EBF1F0', '#FCFDFD00']}
          start={{ x: 0, y: 0.85 }}
          end={{ x: 0, y: 0 }}
          pointerEvents="none"
        />
        <Player music={MUSICS[this.state.index]} />
        <Back {...this.props} />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  top: {
    ...ABS_FULL,
    bottom: '60%',
  },
  bottom: {
    ...ABS_FULL,
    top: '60%',
  },
  list: {
    flex: 1,
    marginLeft: 20,
  },
  inner: {
    marginTop: window.innerHeight / 2 - 57,
    marginBottom: window.innerHeight / 2 - 57,
  },
  musicItem: {
    flexDirection: 'row',
  },
  musicCover: {
    width: 83,
    height: 83,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    marginBottom: 15,
    shadowColor: '#98B3B0',
    shadowBlur: 15,
    shadowOffsetY: 2,
    shadowOffsetX: 0,
    backgroundColor: '#fff',
  },
  musicInfo: {
    flex: 1,
  },
  musicName: {
    ...DEFAULT_TEXT,
    fontSize: 16,
    marginBottom: 10,
    opacity: 0.8,
    marginTop: 20,
  },
  musicSinger: {
    ...DEFAULT_TEXT,
    fontSize: 14,
    fontWeight: '400',
    opacity: 0.3,
  },
  line: {
    height: 1,
    backgroundColor: '#98B3B0',
    opacity: 0.1,
    marginTop: 5,
  },
};
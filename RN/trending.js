import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {NavigatorIOS, StyleSheet, View, Text, FlatList, Alert, Image } from 'react-native';

export default class Trending extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: ListView,
          title: 'Trending',
          // passProps: { title: 'Trending' },
        }}
        style={{flex: 1}}
      />
    );
  }
}

class ListView extends React.PureComponent {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getImages();
  }

  // TODO: loading
  getImages = () => {
    this.setState({isLoading: true});
    fetch('https://api.giphy.com/v1/gifs/trending?api_key=MZsFhoepmFhvhbyYfWYCkloNdG0BxRRH&limit=25&rating=G')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({isLoading: false});
      if (responseJson.message && !responseJson.data) {
        Alert.alert(responseJson.message);
      } else {
        const data = responseJson.data || [];
        for (let i = 0; i < data.length; i += 1) {
          const item = data[i];
          item.key = `${i}`;
        }
        this.setState({ data });
      }
    })
    .catch((error) => {
      this.setState({isLoading: false});
      Alert.alert(error);
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.state.data}
          renderItem={({item, index}) => 
            <View style={{flexDirection: 'row'}}>
              <Image 
                  source={{uri: item.images.fixed_width.url}}
                  style={{
                    width: item.images.fixed_width.width-0,
                    height: item.images.fixed_width.height-0,
                    backgroundColor: '#0093ff',
                  }}
                  onLoadEnd={() => {
                  }}
              />
              <Image 
                  source={{uri: item.images.fixed_width.url}}
                  style={{
                    width: item.images.fixed_width.width-0,
                    height: item.images.fixed_width.height-0,
                    backgroundColor: '#0093ff',
                  }} 
              />
            </View>
          }
          refreshing={this.state.isLoading}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
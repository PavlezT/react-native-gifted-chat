import PropTypes from 'prop-types'
import React from 'react'
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native'
import Color from './Color'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.defaultColor,
    borderRadius: 15,
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    backgroundColor: Color.backgroundTransparent,
    color: Color.white,
    fontSize: 12,
  },
  activityIndicator: {
    marginTop: Platform.select({
      ios: -14,
      android: -16,
      default: -15,
    }),
  },
})

export interface LoadEarlierProps {
  isLoadingEarlier?: boolean
  label?: string
  containerStyle?: StyleProp<ViewStyle>
  wrapperStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  activityIndicatorStyle?: StyleProp<ViewStyle>
  activityIndicatorColor?: string
  activityIndicatorSize?: number | 'small' | 'large'
  onLoadEarlier?(): void
}

export default class LoadEarlier extends React.Component<LoadEarlierProps> {
  static defaultProps = {
    onLoadEarlier: () => {},
    isLoadingEarlier: false,
    labelLoadEarlier: 'Load earlier messages',
    containerStyle: {},
    wrapperStyle: {},
    textStyle: {},
    activityIndicatorStyle: {},
    activityIndicatorColor: 'white',
    activityIndicatorSize: 'small',
  }

  static propTypes = {
    onLoadEarlier: PropTypes.func,
    isLoadingEarlier: PropTypes.bool,
    labelLoadEarlier: PropTypes.string,
    containerStyle: ViewPropTypes.style,
    wrapperStyle: ViewPropTypes.style,
    textStyle: PropTypes.any,
    activityIndicatorStyle: ViewPropTypes.style,
    activityIndicatorColor: PropTypes.string,
    activityIndicatorSize: PropTypes.string,
  }

  renderLoading() {
    if (this.props.isLoadingEarlier === false) {
      return (
        <Text style={[styles.text, this.props.textStyle]}>
          {this.props.labelLoadEarlier}
        </Text>
      )
    }
    return (
      <View>
        <Text style={[styles.text, this.props.textStyle, { opacity: 0 }]}>
          {this.props.labelLoadEarlier}
        </Text>
        <ActivityIndicator
          color={this.props.activityIndicatorColor!}
          size={this.props.activityIndicatorSize!}
          style={[styles.activityIndicator, this.props.activityIndicatorStyle]}
        />
      </View>
    )
  }
  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.containerStyle]}
        onPress={() => {
          if (this.props.onLoadEarlier) {
            this.props.onLoadEarlier()
          }
        }}
        disabled={this.props.isLoadingEarlier === true}
        accessibilityTraits='button'
      >
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          {this.renderLoading()}
        </View>
      </TouchableOpacity>
    )
  }
}

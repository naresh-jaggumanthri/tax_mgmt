import React from 'react';
import {View, StyleSheet, ActivityIndicator, Modal,Text } from "react-native";
import { THEME_COLOR, STANDARD_SCREEN_HEIGHT, FONT_MEDIUM, NORMAL_FONT_SIZE } from '../styles/Const';
import { RFValue } from 'react-native-responsive-fontsize';

const Loader = props => {
  const {
    loading,
    info,
    ...attributes
  } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {console.log('close modal')}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            size={props.size || "large"}
            color={props.color || THEME_COLOR}
            animating={loading} />
          {info && <Text style={{
            fontSize:RFValue(NORMAL_FONT_SIZE, STANDARD_SCREEN_HEIGHT),
            color:THEME_COLOR,
            fontFamily: FONT_MEDIUM
          }}>{info}</Text>}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default Loader;
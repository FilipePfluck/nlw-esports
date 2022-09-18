import React from 'react';
import { TouchableOpacity, ImageBackground, ImageSourcePropType, TouchableOpacityProps, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

import { styles } from './styles';
import { THEME } from '../../theme';

export interface GameCardProps extends TouchableOpacityProps {
  id: string
  title: string
  _count: {
    ads: number
  }
  bannerUrl: string
}

export function GameCard({ id, title, _count: {ads}, bannerUrl, ...props }: GameCardProps) {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <ImageBackground style={styles.cover} source={{uri: bannerUrl}}>
        <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
          <Text style={styles.name}> {title} </Text>
          <Text style={styles.ads}> {ads} anúncios </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}
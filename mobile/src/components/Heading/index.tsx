import React from 'react';
import { View, Text, ViewProps } from 'react-native';

import { styles } from './styles';

interface Props extends ViewProps {
  title: string
  subtitle: string
}

export function Heading({ subtitle, title, ...props }: Props) {
  return (
    <View style={styles.container} {...props}>
      <Text style={styles.title}>
        {title}
      </Text>
      <Text style={styles.subtitle}>
        {subtitle}
      </Text>
    </View>
  );
}
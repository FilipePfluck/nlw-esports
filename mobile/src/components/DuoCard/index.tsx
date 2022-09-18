import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { GameController } from 'phosphor-react-native'
import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';

import { styles } from './styles';

export interface DuoCardProps {
  hourEnd: string
  hourStart: string
  id: string
  name: string
  useVoiceChannel: boolean
  weekDays: number[],
  yearsPlaying: number
}

export function DuoCard({ 
  hourEnd, 
  hourStart, 
  id, 
  name, 
  useVoiceChannel, 
  weekDays, 
  yearsPlaying
}: DuoCardProps) {
  return (
    <View style={styles.container}>
      <DuoInfo label="Nome" value={name}/>
      <DuoInfo label="Tempo de jogo" value={`${yearsPlaying} anos`}/>
      <DuoInfo 
        label="Disponibilidade" 
        value={`${weekDays.length} dias \u2022 ${hourStart} - ${hourEnd}`}
      />
      <DuoInfo 
        label="Chamada de áudio" 
        value={useVoiceChannel ? 'Sim' : 'Não'} 
        color={useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />

      <TouchableOpacity style={styles.button}>
        <GameController color={THEME.COLORS.TEXT} size={20}/>
        <Text style={styles.buttonText}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}
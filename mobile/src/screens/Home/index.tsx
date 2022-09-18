import React, { useEffect, useState } from 'react';
import { Image, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import logoImg from '../../assets/logo-nlw-esports.png'
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';

import { styles } from './styles';
import { Background } from '../../components/Background';

export function Home() {
  const { navigate } = useNavigation()

  const [games, setGames] = useState<GameCardProps[]>([])

  useEffect(()=>{
    fetch('http://192.168.0.107:3333/games')
      .then(response => response.json())
      .then(data => setGames(data))
  },[])

  return (
    <Background>
    <SafeAreaView style={styles.container}>
      
        <Image source={logoImg} style={styles.logo}/>
        <Heading 
          title='Encontre seu duo!'
          subtitle='Selecione o game que deseja jogar' 
        />
        <FlatList
          contentContainerStyle={styles.contenList}
          data={games}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <GameCard 
              onPress={()=> navigate('game', {
                bannerUrl: item.bannerUrl,
                id: item.id, 
                title: item.title
              })}
              {...item}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      
    </SafeAreaView>
    </Background>
  );
}
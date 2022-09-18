import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'

import logoImg from '../../assets/logo-nlw-esports.png'

import { styles } from './styles';
import { THEME } from '../../theme';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';

interface RouteParams {
  id: string
  title: string
  bannerUrl: string
}

export function Game() {
  const { goBack } = useNavigation()
  const { params } = useRoute()

  const game = params as RouteParams

  const [ads, setAds] = useState<DuoCardProps[]>([])

  useEffect(()=>{
    fetch(`http://192.168.0.107:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setAds(data))
  },[])

  console.log(ads)

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={()=>goBack()}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
              style={styles.arrow}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right}/>
        </View>

        <Image
          source={{uri: game.bannerUrl}}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading subtitle='Conecte-se e comece a jogar!' title={game.title}/>

        <FlatList
          data={ads}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <DuoCard {...item}/>
          )}
          horizontal
          contentContainerStyle={styles.contentList}
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          ListEmptyComponent={()=>(
            <Text style={styles.emptyState}>
              Ainda não há anúncios publicados.
            </Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}
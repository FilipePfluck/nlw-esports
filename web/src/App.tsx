import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import { CreateAd } from './Components/CreateAd'
import { GameCard } from './Components/GameCard'
import './styles/main.css'
import { Modal } from './Components/Modal'

interface Game {
  bannerUrl: string
  id: string
  title: string
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then((response) => response.json())
      .then((data) => setGames(data))
  }, [])

  console.log(games)

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center p-16">
      <img src="/Logo.svg" alt="" />

      <div className="flex mt-16">
        <h1 className="text-6xl text-white font-black">Seu</h1>
        <h1 className="font-black text-transparent text-6xl mx-2 bg-clip-text bg-gradient-to-r from-[#9572FC] via-[#43E7AD] to-[#E1D55D]">
          duo
        </h1>
        <h1 className="text-6xl text-white font-black">está aqui</h1>
      </div>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => (
          <GameCard
            key={game.id}
            name={game.title}
            numberOfAnnouncements={game._count.ads}
            src={game.bannerUrl}
          />
        ))}
      </div>

      <Dialog.Root>
        <CreateAd />
        <Modal />
      </Dialog.Root>
    </div>
  )
}

export default App

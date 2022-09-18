interface GameCardProps {
  src: string
  name: string
  numberOfAnnouncements: number
}

export const GameCard = ({
  src,
  name,
  numberOfAnnouncements,
}: GameCardProps) => {
  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img src={src} alt={name} />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">{name}</strong>
        <span className="text-zinc-300 text-sm block">
          {numberOfAnnouncements} anúncios
        </span>
      </div>
    </a>
  )
}

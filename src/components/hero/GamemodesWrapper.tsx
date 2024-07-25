import GamemodeBlock from './GamemodeBlock'

interface GamemodesWrapperProps {
  children: React.ReactNode
}

export default function GamemodesWrapper({ children }: GamemodesWrapperProps) {
  return (
    <div className="flex flex-col flex-wrap md:flex-row gap-16 px-4 md:items-center justify-center">
      {children}
    </div>
  )
}

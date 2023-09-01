"use client"

import * as React from "react"
import { Table } from "@/types/table"
import { BarChart, SkullIcon, SmileIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface CollectionControlsProps {
  id: number
  hardCollection: number[]
  setHardCollection: React.Dispatch<React.SetStateAction<number[]>>
  easyCollection: number[]
  setEasyCollection: React.Dispatch<React.SetStateAction<number[]>>
  table: Table
}

export default function CollectionControls({
  id,
  hardCollection,
  setHardCollection,
  easyCollection,
  setEasyCollection,
  table,
}: CollectionControlsProps) {
  const [isHard, setIsHard] = React.useState<boolean>(false)
  const [isEasy, setIsEasy] = React.useState<boolean>(false)

  const handleHardBtnClick = () => {
    if (isHard) {
      setHardCollection((prev) => prev.filter((el) => el !== id))
    } else if (isEasy) {
      setEasyCollection((prev) => prev.filter((el) => el !== id))
      setHardCollection((prev) => [id, ...prev])
    } else {
      if (!hardCollection.includes(id)) {
        setHardCollection((prev) => [id, ...prev])
      }
    }
  }

  const handleEasyBtnClick = () => {
    if (isEasy) {
      setEasyCollection((prev) => prev.filter((el) => el !== id))
    } else if (isHard) {
      setHardCollection((prev) => prev.filter((el) => el !== id))
      setEasyCollection((prev) => [id, ...prev])
    } else {
      if (!easyCollection.includes(id)) {
        setEasyCollection((prev) => [id, ...prev])
      }
    }
  }

  React.useEffect(() => {
    // Reset the states
    setIsHard(false)
    setIsEasy(false)

    setIsHard(hardCollection.includes(id))
    setIsEasy(easyCollection.includes(id))
  }, [id])

  React.useEffect(() => {
    localStorage.setItem(`${table}_hard`, JSON.stringify(hardCollection))
  }, [hardCollection])

  React.useEffect(() => {
    localStorage.setItem(`${table}_easy`, JSON.stringify(easyCollection))
  }, [easyCollection])

  React.useEffect(() => {
    setIsHard(hardCollection.includes(id))
    setIsEasy(easyCollection.includes(id))
  }, [hardCollection, easyCollection])

  return (
    <>
      <button
        id="hard"
        onClick={handleHardBtnClick}
        className={cn(
          "border-2 border-secondary-300 rounded-full p-2",
          "hover:text-danger-light hover:border-danger-light",
          {
            "text-danger-dark border-danger-dark": isHard,
          },
        )}
      >
        <SkullIcon className="w-8 h-8" />
      </button>
      <button
        id="easy"
        onClick={handleEasyBtnClick}
        className={cn(
          "border-2 border-secondary-300 rounded-full p-2",
          "hover:text-positive-light hover:border-positive-light",
          {
            "text-positive-dark border-positive-dark": isEasy,
          },
        )}
      >
        <SmileIcon className="w-8 h-8" />
      </button>
    </>
  )
}

"use client"

import { cn } from "@/lib/utils"
import { BarChart, XCircle } from "lucide-react"
import { Drawer } from "vaul"
import * as Dialog from "@radix-ui/react-dialog"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"

interface SessionStatsProps {}

export default function SessionStats({}: SessionStatsProps) {
  dayjs.extend(duration)
  const [counter, setCounter] = useState<number>(0)

  useEffect(() => {
    const counterInterval = setInterval(() => setCounter((prev) => prev + 1), 1000)
    return () => clearInterval(counterInterval)
  }, [])

  return (
    <>
      {/* Mobile drawer */}
      <div className="md:hidden">
        <Drawer.Root shouldScaleBackground>
          <Drawer.Trigger asChild>
            <button
              className={cn(
                "border-2 border-secondary-300 rounded-full p-2",
                "hover:text-foreground hover:border-foreground",
              )}
            >
              <BarChart className="w-8 h-8" />
            </button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />
            <Drawer.Content className="bg-gradient-primary flex flex-col rounded-t-md h-[96%] mt-24 fixed bottom-0 left-0 right-0">
              <div className="p-4 bg-gradient-primary rounded-t-[10px] flex-1 text-foreground border-secondary-300 border-[1px]">
                <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-secondary-300 mb-8" />
                <div className="max-w-md mx-auto">
                  <Drawer.Title className="font-semibold text-3xl">
                    Statystyki sesji
                  </Drawer.Title>
                  <p className="mb-2">
                    Upłynęło czasu:{" "}
                    {dayjs.duration(counter, "seconds").format("HH:mm:ss")}
                  </p>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
      {/* Desktop dialog */}
      <div className="hidden md:block">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              className={cn(
                "border-2 border-secondary-300 rounded-full p-2",
                "hover:text-foreground hover:border-foreground",
              )}
            >
              <BarChart className="w-8 h-8" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-black opacity-50 fixed inset-0" />
            <Dialog.Content
              className={cn(
                "fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%]",
                "bg-gradient-primary text-foreground border-secondary-300 border-[1px] p-8 rounded-md flex flex-col gap-4",
              )}
            >
              <Dialog.Title className="text-2xl font-semibold flex items-center justify-between">
                Statystyki sesji
                <Dialog.Close asChild>
                  <button>
                    <XCircle />
                  </button>
                </Dialog.Close>
              </Dialog.Title>
              <p className="mb-2">
                Upłynęło czasu: {dayjs.duration(counter, "seconds").format("HH:mm:ss")}
              </p>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </>
  )
}

import { cn } from "@/lib/utils"
import { BarChart, XCircle } from "lucide-react"
import { Drawer } from "vaul"
import * as Dialog from "@radix-ui/react-dialog"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import MobileDrawer from "./ui/MobileDrawer"
import DesktopDialog from "./ui/DesktopDialog"

interface SessionStatsProps {
  counter: number
  correctAnswers: number
  incorrectAnswers: number
  timesRolled: number
}

export default function SessionStats({
  counter,
  correctAnswers,
  incorrectAnswers,
  timesRolled,
}: SessionStatsProps) {
  dayjs.extend(duration)

  const statsContent = (
    <div className="flex flex-col gap-4">
      <p>Upłynęło czasu: {dayjs.duration(counter, "seconds").format("HH:mm:ss")}</p>
      <p>Poprawne odpowiedzi: {correctAnswers}</p>
      <p>Niepoprawne odpowiedzi: {incorrectAnswers}</p>
      <p>Wylosowanych pytań: {timesRolled}</p>
      <p>
        Wynik procentowy:{" "}
        {correctAnswers &&
          parseFloat(
            ((correctAnswers / (correctAnswers + incorrectAnswers)) * 100).toFixed(2),
          )}
        %
      </p>
    </div>
  )

  return (
    <>
      <div className="md:hidden">
        <MobileDrawer
          buttonIcon={<BarChart className="w-8 h-8" />}
          drawerTitle="Statystki sesji"
          drawerContent={statsContent}
        />
      </div>
      <div className="hidden md:block">
        <DesktopDialog
          buttonIcon={<BarChart className="w-8 h-8" />}
          dialogTitle="Statystki sesji"
          dialogContent={statsContent}
        />
      </div>
    </>
  )
}

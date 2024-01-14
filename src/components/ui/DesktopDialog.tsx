import { cn } from "@/lib/utils"
import * as Dialog from "@radix-ui/react-dialog"
import { XCircle } from "lucide-react"

interface DialogProps {
  buttonIcon: React.ReactNode
  dialogTitle: string
  dialogContent: React.ReactNode
}

export default function DesktopDialog({
  buttonIcon,
  dialogTitle,
  dialogContent,
}: DialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className={cn(
            "border-2 border-secondary-300 rounded-full p-2",
            "hover:text-foreground hover:border-foreground",
          )}
        >
          {buttonIcon}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black opacity-50 fixed inset-0" />
        <Dialog.Content
          className={cn(
            "fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%]",
            "bg-primary text-foreground border-secondary-300 border-[1px] p-8 rounded-md flex flex-col gap-4",
          )}
        >
          <Dialog.Title className="text-2xl font-semibold flex items-center justify-between">
            {dialogTitle}
            <Dialog.Close asChild>
              <button>
                <XCircle />
              </button>
            </Dialog.Close>
          </Dialog.Title>
          {dialogContent}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

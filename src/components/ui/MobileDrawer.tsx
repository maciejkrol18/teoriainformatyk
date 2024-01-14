import { cn } from "@/lib/utils"
import { Drawer } from "vaul"

interface DrawerProps {
  buttonIcon: React.ReactNode
  drawerTitle: string
  drawerContent: React.ReactNode
}

export default function MobileDrawer({
  buttonIcon,
  drawerTitle,
  drawerContent,
}: DrawerProps) {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <button
          className={cn(
            "border-2 border-secondary-300 rounded-full p-2",
            "hover:text-foreground hover:border-foreground",
          )}
        >
          {buttonIcon}
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-gradient-primary flex flex-col rounded-t-md h-[90%] mt-24 fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-gradient-primary rounded-t-[10px] flex-1 text-foreground border-secondary-300 border-[1px]">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-secondary-300 mb-8" />
            <div className="flex flex-col gap-4 max-w-md mx-auto">
              <Drawer.Title className="font-semibold text-3xl">
                {drawerTitle}
              </Drawer.Title>
              {drawerContent}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

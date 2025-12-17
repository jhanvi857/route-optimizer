import { PanelLeftIcon } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

const SidebarContext = React.createContext(null)

function useSidebar() {
  const ctx = React.useContext(SidebarContext)
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider')
  return ctx
}

function SidebarProvider({ defaultOpen = true, children }) {
  const isMobile = useIsMobile()
  const [open, setOpen] = React.useState(defaultOpen)

  return (
    <SidebarContext.Provider value={{ open, setOpen, isMobile, toggleSidebar: () => setOpen((o) => !o) }}>
      {children}
    </SidebarContext.Provider>
  )
}

function Sidebar({ children }) {
  return <aside className="w-64 bg-sidebar">{children}</aside>
}

function SidebarTrigger(props) {
  const { toggleSidebar } = useSidebar()
  return (
    <button onClick={toggleSidebar} {...props}>
      <PanelLeftIcon />
    </button>
  )
}

function SidebarContent({ children }) {
  return <div className="flex-1 overflow-auto">{children}</div>
}

export { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, useSidebar }

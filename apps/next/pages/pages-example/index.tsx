import { HomeScreen } from 'app/features/home/screen'
import { PortalProvider } from 'tamagui'

export default function Page() {
  return (
    <PortalProvider>
      <HomeScreen pagesMode={true} />
    </PortalProvider>
  )
}

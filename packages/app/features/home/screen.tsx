import {
  Anchor,
  Button,
  H1,
  Paragraph,
  Separator,
  Sheet,
  useToastController,
  SwitchThemeButton,
  SwitchRouterButton,
  XStack,
  YStack,
  H2,
} from '@my/ui'
import { ChevronDown, ChevronUp, X } from '@tamagui/lucide-icons'
import { use, useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { useLink } from 'solito/navigation'
import { Tooltip } from 'tamagui'
import { OnboardingDialog } from '../components/onboardingDialog/OnboardingDialog'

export type OnboardingStepType = 'intro' | 'tooltip' | 'notefication'

export function HomeScreen({ pagesMode = false }: { pagesMode?: boolean }) {
  const linkTarget = pagesMode ? '/pages-example-user' : '/user'
  const linkProps = useLink({
    href: `${linkTarget}/nate`,
  })

  const [currentOnboardingStep, setCurrentOnboardingStep] = useState<OnboardingStepType>('intro')

  const toast = useToastController()
  return (
    <YStack f={1} jc="center" ai="center" gap="$8" p="$4" bg="$background">
      <XStack
        pos="absolute"
        w="100%"
        t="$6"
        gap="$6"
        jc="center"
        fw="wrap"
        $sm={{ pos: 'relative', t: 0 }}
      >
        {Platform.OS === 'web' && (
          <>
            <SwitchRouterButton pagesMode={pagesMode} />
            <SwitchThemeButton />
          </>
        )}
      </XStack>

      <YStack gap="$4">
        <H1 ta="center" col="$color12">
          Welcome to Tamagui
        </H1>
        <Paragraph col="$color10" ta="center">
          Here's a basic starter to show navigating from one screen to another.
        </Paragraph>
        <Separator />
        <Paragraph ta="center">
          This screen uses the same code on Next.js and React Native.
        </Paragraph>
        <Separator />
      </YStack>

      <Button {...linkProps}>Link to user</Button>
      <OnboardingDialog
        currentOnboardingStep={currentOnboardingStep}
        onNextStep={() => setCurrentOnboardingStep('tooltip')}
      />
      <SheetDemo
        currentOnboardingStep={currentOnboardingStep}
        onNextStep={() => {
          setCurrentOnboardingStep('notefication')
          toast.show('Sheet closed!', {
            message: 'Notefication Step 3/3',
          })
        }}
      />
    </YStack>
  )
}

function SheetDemo(props: { currentOnboardingStep: OnboardingStepType; onNextStep: () => void }) {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(0)

  const isTooltipOpen = props.currentOnboardingStep === 'tooltip' && !open
  return (
    <div>
      <Tooltip open={isTooltipOpen}>
        <Tooltip.Trigger asChild>
          <Button
            size="$6"
            icon={isTooltipOpen ? ChevronDown : ChevronUp}
            circular
            onPress={() => setOpen(true)}
          />
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Arrow />
          <H2>Toggle stuff!</H2>
          <Paragraph>
            This is a simple example of a sheet that can be opened and closed with a button.
          </Paragraph>
          <Paragraph>Step 2/3</Paragraph>
        </Tooltip.Content>
      </Tooltip>
      <Sheet
        modal
        animation="medium"
        open={open}
        onOpenChange={() => {
          setOpen(false)
          props.onNextStep()
        }}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        <Sheet.Handle bg="$gray8" />
        <Sheet.Frame ai="center" jc="center" gap="$10" bg="$color2">
          <XStack gap="$2">
            <Paragraph ta="center">Made by</Paragraph>
            <Anchor col="$blue10" href="https://twitter.com/natebirdman" target="_blank">
              @natebirdman,
            </Anchor>
            <Anchor
              color="$purple10"
              href="https://github.com/tamagui/tamagui"
              target="_blank"
              rel="noreferrer"
            >
              give it a ⭐️
            </Anchor>
          </XStack>

          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false)
              props.onNextStep()
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </div>
  )
}

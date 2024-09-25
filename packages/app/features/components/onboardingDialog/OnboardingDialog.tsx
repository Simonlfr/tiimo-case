import React, { useEffect, useState } from 'react'
import { Dialog, Button, Paragraph, YStack, H2, DialogClose } from 'tamagui'
import { OnboardingStepType } from '../../home/screen'
import { X } from '@tamagui/lucide-icons'
import { XStack } from '@my/ui'

export function OnboardingDialog({
  currentOnboardingStep,
  onNextStep,
}: {
  currentOnboardingStep: OnboardingStepType
  onNextStep: () => void
}) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <Dialog modal open={currentOnboardingStep === 'intro'}>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <YStack space="$4">
            <H2>You are all set up and ready to get started with Tiimo!</H2>
            <Paragraph>
              Before we let you run wild on your own, we would like to introduce you to a few
              highlights in Tiimo. Are you up for it?
            </Paragraph>
          </YStack>
          <XStack gap="$2">
            <DialogClose asChild>
              <Button onPress={() => onNextStep()} aria-label="Close" size="$2" chromeless>
                Close
              </Button>
            </DialogClose>
            <Paragraph>Step 1/3</Paragraph>
          </XStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}

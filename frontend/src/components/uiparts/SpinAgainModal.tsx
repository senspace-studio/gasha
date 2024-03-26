import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { FC, useEffect } from 'react'
import { SpinModule } from './SpinModule'
import { SpinButton } from './SpinButton'
import { useRouter } from 'next/router'

export const SpinAgainModal: FC = () => {
  const { asPath } = useRouter()
  const { onOpen, onClose, isOpen } = useDisclosure()

  useEffect(() => {
    onClose()
  }, [asPath])

  return (
    <>
      <SpinButton minW="230px" mt={10} onClick={onOpen}>
        SPIN AGAIN!
      </SpinButton>
      <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
        <ModalOverlay
          backdropFilter="blur(24px)"
          onClick={onClose}
          background="#8a8a8abd"
        />
        <ModalContent backgroundColor="yellow.400" py={10}>
          <ModalBody>
            <SpinModule />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

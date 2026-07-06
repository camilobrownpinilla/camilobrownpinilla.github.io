import { useState } from 'react'
import {
  Box, SimpleGrid, Image, Text, IconButton,
  Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton,
  useDisclosure, useColorModeValue,
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { withBase } from '@/utils/asset'
import type { GalleryPhoto } from '../../types'

interface PhotoGridProps {
  photos: GalleryPhoto[]
  emptyLabel?: string
}

/** Responsive grid of rounded, hover-interactive photo cards with a lightbox. */
export default function PhotoGrid({ photos, emptyLabel }: PhotoGridProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [active, setActive] = useState(0)

  const emptyBg = useColorModeValue('gray.50', 'whiteAlpha.50')
  const emptyBorder = useColorModeValue('gray.200', 'whiteAlpha.200')
  const emptyText = useColorModeValue('gray.500', 'gray.400')

  if (!photos || photos.length === 0) {
    return (
      <Box
        w="full" py={12} px={6} textAlign="center"
        border="1px dashed" borderColor={emptyBorder} borderRadius="2xl" bg={emptyBg}
      >
        <Text fontSize="sm" color={emptyText} fontFamily="mono">
          {emptyLabel ?? 'Photos coming soon.'}
        </Text>
      </Box>
    )
  }

  const openAt = (i: number) => { setActive(i); onOpen() }
  const step = (delta: number) => setActive(i => (i + delta + photos.length) % photos.length)
  const current = photos[active]

  return (
    <>
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={{ base: 3, md: 4 }}>
        {photos.map((p, i) => (
          <Box
            key={`${p.src}-${i}`}
            as="button"
            type="button"
            onClick={() => openAt(i)}
            position="relative"
            aspectRatio={1}
            overflow="hidden"
            borderRadius="2xl"
            cursor="pointer"
            transition="transform 0.2s ease, box-shadow 0.2s ease"
            _hover={{ transform: 'scale(1.02)', boxShadow: 'md' }}
            _focusVisible={{ outline: '2px solid', outlineColor: 'var(--accent-color)', outlineOffset: '2px' }}
          >
            <Image
              src={withBase(p.src)}
              alt={p.alt ?? p.caption ?? ''}
              w="full" h="full" objectFit="cover"
              loading="lazy"
            />
          </Box>
        ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
        <ModalOverlay bg="rgba(0,0,0,0.82)" backdropFilter="blur(6px)" />
        <ModalContent
          bg="transparent" boxShadow="none" maxW="min(94vw, 1100px)" position="relative"
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') step(1)
            if (e.key === 'ArrowLeft') step(-1)
          }}
        >
          <ModalCloseButton color="white" bg="blackAlpha.400" _hover={{ bg: 'blackAlpha.600' }} zIndex={2} />
          <ModalBody p={0} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            {current && (
              <>
                <Image
                  src={withBase(current.src)}
                  alt={current.alt ?? current.caption ?? ''}
                  maxH="82vh" maxW="94vw" objectFit="contain" borderRadius="lg"
                />
                {current.caption && (
                  <Text mt={3} fontSize="sm" color="whiteAlpha.800" textAlign="center">
                    {current.caption}
                  </Text>
                )}
              </>
            )}
          </ModalBody>

          {photos.length > 1 && (
            <>
              <IconButton
                aria-label="Previous photo" icon={<ChevronLeftIcon boxSize={7} />}
                onClick={() => step(-1)}
                position="absolute" left={{ base: 1, md: -12 }} top="50%" transform="translateY(-50%)"
                isRound variant="ghost" color="white" bg="blackAlpha.400" _hover={{ bg: 'blackAlpha.600' }}
              />
              <IconButton
                aria-label="Next photo" icon={<ChevronRightIcon boxSize={7} />}
                onClick={() => step(1)}
                position="absolute" right={{ base: 1, md: -12 }} top="50%" transform="translateY(-50%)"
                isRound variant="ghost" color="white" bg="blackAlpha.400" _hover={{ bg: 'blackAlpha.600' }}
              />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

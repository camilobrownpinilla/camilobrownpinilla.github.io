import { useState } from 'react'
import {
  Box, Container, Flex, Grid, GridItem, Heading, HStack, VStack, Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { gallery } from '@/data'
import GlobeCanvas from '../gallery/GlobeCanvas'

const GallerySection: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [activeSlug, setActiveSlug] = useState<string | null>(null)

  const lineColor = useColorModeValue('gray.200', 'gray.700')
  const tabBorder = useColorModeValue('gray.200', 'gray.700')
  const rowText = useColorModeValue('gray.700', 'gray.300')
  const rowMuted = useColorModeValue('gray.400', 'gray.500')
  const rowHoverBg = useColorModeValue('gray.50', 'whiteAlpha.100')

  if (!gallery || gallery.length === 0) return null

  const go = (slug: string) => navigate(`/gallery/${slug}`)

  return (
    <Box w="full">
      <Container maxW={['full', 'full', '7xl']} px={[2, 4, 8]}>
        <Flex align="center" gap={3} mb={4}>
          <Box h="2px" w="20px" bg="var(--accent-color)" borderRadius="full" flexShrink={0} />
          <Heading size="md" fontWeight="semibold">{t('about.gallery', 'Gallery')}</Heading>
          <Box flex="1" h="1px" bg={lineColor} />
        </Flex>

        <Grid
          templateColumns={{ base: '1fr', md: 'clamp(280px, 40%, 420px) 1fr' }}
          gap={{ base: 6, md: 10 }}
          alignItems="center"
        >
          <GridItem>
            <GlobeCanvas
              locations={gallery}
              activeSlug={activeSlug}
              onHover={setActiveSlug}
              onSelect={go}
            />
          </GridItem>

          <GridItem minW={0}>
            {/* Tab bar — single "Gallery" tab for now, built to extend */}
            <Flex borderBottom="1px solid" borderColor={tabBorder} mb={2} gap={4}>
              <Box
                as="button"
                type="button"
                fontSize="sm"
                fontWeight="semibold"
                pb={2}
                px={1}
                color="var(--accent-color)"
                borderBottom="2px solid"
                borderColor="var(--accent-color)"
                cursor="default"
              >
                {t('about.gallery', 'Gallery')}
              </Box>
            </Flex>

            {/* Location list — each row links to /gallery/:slug and highlights its pin */}
            <VStack spacing={0} align="stretch">
              {gallery.map((loc) => {
                const isActive = activeSlug === loc.slug
                const count = loc.photos.length
                return (
                  <Flex
                    key={loc.slug}
                    as="button"
                    type="button"
                    onClick={() => go(loc.slug)}
                    onMouseEnter={() => setActiveSlug(loc.slug)}
                    onMouseLeave={() => setActiveSlug(null)}
                    align="center"
                    justify="space-between"
                    gap={3}
                    w="full"
                    textAlign="left"
                    py={2.5}
                    px={2}
                    borderRadius="md"
                    bg={isActive ? rowHoverBg : 'transparent'}
                    transition="background 0.15s ease"
                    _hover={{ bg: rowHoverBg }}
                  >
                    <HStack spacing={3} minW={0}>
                      <Box
                        w="7px"
                        h="7px"
                        borderRadius="full"
                        bg="var(--accent-color)"
                        flexShrink={0}
                        opacity={isActive ? 1 : 0.55}
                        transform={isActive ? 'scale(1.3)' : 'none'}
                        transition="all 0.15s ease"
                      />
                      <Text fontSize="sm" fontWeight="medium" color={rowText} noOfLines={1}>
                        {loc.name}
                      </Text>
                      {loc.country && (
                        <Text fontSize="xs" color={rowMuted} noOfLines={1}>{loc.country}</Text>
                      )}
                    </HStack>
                    <Text fontSize="2xs" fontFamily="mono" color={rowMuted} flexShrink={0}>
                      {count > 0 ? `${count} ${count === 1 ? 'photo' : 'photos'}` : '—'}
                    </Text>
                  </Flex>
                )
              })}
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}

export default GallerySection

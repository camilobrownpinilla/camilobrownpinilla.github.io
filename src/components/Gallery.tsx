import {
  Box, Container, Flex, Heading, Text, VStack, Link as ChakraLink, useColorModeValue,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { gallery } from '@/data'
import PhotoGrid from './gallery/PhotoGrid'

const Gallery: React.FC = () => {
  const { t } = useTranslation()
  const muted = useColorModeValue('gray.500', 'gray.400')
  const lineColor = useColorModeValue('gray.200', 'gray.700')

  const withPhotos = gallery.filter(l => l.photos.length > 0)

  return (
    <Box w="full" py={[6, 8, 10]}>
      <Container maxW={['full', 'full', '7xl']} px={[2, 4, 8]}>
        <Heading size="lg" fontWeight="bold" mb={1}>{t('nav.gallery', 'Gallery')}</Heading>
        <Text fontSize="sm" color={muted} mb={8}>
          {t('gallery.subtitle', "Photos from places I've been.")}
        </Text>

        {withPhotos.length === 0 ? (
          <Box py={16} textAlign="center">
            <Text fontSize="sm" color={muted} fontFamily="mono">
              {t('gallery.emptyIndex', 'Photos coming soon — pictures from around the world will land here.')}
            </Text>
          </Box>
        ) : (
          <VStack spacing={12} align="stretch">
            {withPhotos.map((loc) => (
              <Box key={loc.slug}>
                <Flex align="center" gap={3} mb={4}>
                  <Heading size="md" fontWeight="semibold">
                    <ChakraLink
                      as={RouterLink}
                      to={`/gallery/${loc.slug}`}
                      _hover={{ color: 'var(--accent-color)', textDecoration: 'none' }}
                    >
                      {loc.name}
                    </ChakraLink>
                  </Heading>
                  {loc.country && <Text fontSize="sm" color={muted}>{loc.country}</Text>}
                  <Box flex="1" h="1px" bg={lineColor} />
                </Flex>
                <PhotoGrid photos={loc.photos} />
              </Box>
            ))}
          </VStack>
        )}
      </Container>
    </Box>
  )
}

export default Gallery

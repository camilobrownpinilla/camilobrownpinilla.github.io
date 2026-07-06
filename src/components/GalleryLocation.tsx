import {
  Box, Container, Flex, Heading, Text, Icon, Link as ChakraLink, useColorModeValue,
} from '@chakra-ui/react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { gallery } from '@/data'
import PhotoGrid from './gallery/PhotoGrid'

const GalleryLocation: React.FC = () => {
  const { location } = useParams()
  const { t } = useTranslation()
  const muted = useColorModeValue('gray.500', 'gray.400')
  const backColor = useColorModeValue('gray.600', 'gray.300')

  const loc = gallery.find(l => l.slug === location)
  const count = loc?.photos.length ?? 0

  return (
    <Box w="full" py={[6, 8, 10]}>
      <Container maxW={['full', 'full', '7xl']} px={[2, 4, 8]}>
        <ChakraLink
          as={RouterLink}
          to="/gallery"
          display="inline-flex"
          alignItems="center"
          gap={2}
          fontSize="sm"
          color={backColor}
          _hover={{ color: 'var(--accent-color)', textDecoration: 'none' }}
          mb={5}
        >
          <Icon as={FaArrowLeft} boxSize={3} /> {t('gallery.backToGallery', 'All locations')}
        </ChakraLink>

        {!loc ? (
          <Box py={16} textAlign="center">
            <Heading size="md" mb={2}>{t('gallery.notFound', 'Location not found')}</Heading>
            <ChakraLink as={RouterLink} to="/gallery" color="var(--accent-color)">
              {t('gallery.backToGallery', 'All locations')}
            </ChakraLink>
          </Box>
        ) : (
          <>
            <Flex align="baseline" gap={3} mb={1} wrap="wrap">
              <Heading size="lg" fontWeight="bold">{loc.name}</Heading>
              {loc.country && <Text fontSize="md" color={muted}>{loc.country}</Text>}
            </Flex>
            <Text fontSize="sm" color={muted} fontFamily="mono" mb={6}>
              {count > 0
                ? `${count} ${count === 1 ? 'photo' : 'photos'}`
                : t('gallery.photosComingSoon', 'Photos coming soon.')}
            </Text>
            <PhotoGrid photos={loc.photos} emptyLabel={t('gallery.photosComingSoon', 'Photos coming soon.')} />
          </>
        )}
      </Container>
    </Box>
  )
}

export default GalleryLocation

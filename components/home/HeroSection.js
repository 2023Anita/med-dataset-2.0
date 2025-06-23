'use client';

import { Box, Container, Typography, Button, useMediaQuery } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BiotechIcon from '@mui/icons-material/Biotech';
import { styles } from '@/styles/home';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import MedicalBackground from './MedicalBackground';
import { useTranslation } from 'react-i18next';

export default function HeroSection({ onCreateProject }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ ...styles.heroSection, ...styles.medicalHeroBackground(theme) }}>
      {/* 添加医疗主题背景 */}
      <MedicalBackground />

      <Box sx={styles.medicalDecorativeCircle} />
      <Box sx={styles.medicalDecorativeCircleSecond} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            textAlign: 'center',
            maxWidth: '800px',
            mx: 'auto',
            py: { xs: 5, md: 8 }
          }}
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant={isMobile ? 'h3' : 'h1'}
            component="h1"
            fontWeight="bold"
            sx={{
              ...styles.gradientTitle(theme),
              letterSpacing: '-1px',
              mb: 3,
              textShadow: theme.palette.mode === 'dark' ? '0 0 30px rgba(139, 92, 246, 0.3)' : 'none'
            }}
          >
            {t('home.title')}
          </Typography>

          <Typography
            variant={isMobile ? 'body1' : 'h5'}
            component={motion.p}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            color="text.secondary"
            paragraph
            sx={{
              maxWidth: '650px',
              mx: 'auto',
              lineHeight: 1.8,
              opacity: 0.9,
              fontSize: { xs: '1rem', md: '1.2rem' },
              fontWeight: 400,
              mb: 4
            }}
          >
            {t('home.subtitle')}
          </Typography>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            sx={{
              mt: 6,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'center',
              gap: { xs: 2, sm: 3 }
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={onCreateProject}
              startIcon={<LocalHospitalIcon />}
              sx={{
                ...styles.medicalCreateButton(theme),
                fontWeight: 600,
                transition: 'all 0.3s ease',
                transform: 'translateY(0)',
                px: 4,
                py: 1.5,
                borderRadius: '16px',
                background: theme.palette.gradient.primary,
                boxShadow: '0 8px 24px rgba(0, 102, 204, 0.3)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 32px rgba(0, 102, 204, 0.4)'
                }
              }}
            >
              {t('home.createProject')}
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                window.location.href = '/dataset-square';
              }}
              startIcon={<BiotechIcon />}
              sx={{
                ...styles.medicalSecondaryButton(theme),
                fontWeight: 600,
                transition: 'all 0.3s ease',
                transform: 'translateY(0)',
                px: 4,
                py: 1.5,
                borderRadius: '16px',
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                borderWidth: '2px',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderWidth: '2px',
                  backgroundColor: 'rgba(0, 102, 204, 0.05)',
                  boxShadow: '0 8px 24px rgba(0, 102, 204, 0.2)'
                }
              }}
            >
              {t('home.searchDataset')}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

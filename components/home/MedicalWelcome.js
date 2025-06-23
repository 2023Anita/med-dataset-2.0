'use client';

import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BiotechIcon from '@mui/icons-material/Biotech';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

export default function MedicalWelcome({ onGetStarted }) {
  const theme = useTheme();

  const features = [
    {
      icon: <LocalHospitalIcon sx={{ fontSize: 40 }} />,
      title: '专业医疗AI',
      description: '基于最新医疗知识库，提供精准的医疗数据处理'
    },
    {
      icon: <BiotechIcon sx={{ fontSize: 40 }} />,
      title: '智能诊断',
      description: '先进的机器学习算法，辅助医疗诊断决策'
    },
    {
      icon: <HealthAndSafetyIcon sx={{ fontSize: 40 }} />,
      title: '安全可靠',
      description: '符合医疗数据安全标准，保护患者隐私'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box
        sx={{
          textAlign: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -50,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 100,
            height: 4,
            background: theme.palette.gradient.primary,
            borderRadius: 2
          }
        }}
      >
        {/* 主标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 3,
              background: theme.palette.gradient.primary,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            欢迎使用 MedDataset Pro
          </Typography>
        </motion.div>

        {/* 副标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
          >
            专业的医疗AI数据集创建与管理平台
            <br />
            助力医疗大模型训练，推动智慧医疗发展
          </Typography>
        </motion.div>

        {/* 特性卡片 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
            mb: 6
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
            >
              <Box
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background: theme.palette.mode === 'dark' 
                    ? 'linear-gradient(145deg, #1A2332 0%, #1E2A3A 100%)'
                    : 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFB 100%)',
                  border: `1px solid ${theme.palette.custom.cardBorder}`,
                  boxShadow: theme.palette.mode === 'dark' 
                    ? '0px 8px 24px rgba(0, 0, 0, 0.4)' 
                    : '0px 8px 24px rgba(0, 0, 0, 0.06)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.palette.mode === 'dark' 
                      ? '0px 16px 40px rgba(0, 0, 0, 0.5)' 
                      : '0px 16px 40px rgba(0, 0, 0, 0.08)'
                  }
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: theme.palette.gradient.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    color: 'white'
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {feature.description}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>

        {/* 开始按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={onGetStarted}
            startIcon={<LocalHospitalIcon />}
            sx={{
              px: 6,
              py: 2,
              borderRadius: 3,
              fontSize: '1.1rem',
              fontWeight: 600,
              background: theme.palette.gradient.primary,
              boxShadow: '0 8px 24px rgba(0, 102, 204, 0.3)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 32px rgba(0, 102, 204, 0.4)'
              }
            }}
          >
            开始使用医疗AI平台
          </Button>
        </motion.div>
      </Box>
    </Container>
  );
}

'use client';

import { Box, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

export default function MedicalLoader({ size = 40, color = 'primary' }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      {/* 外层医疗十字旋转 */}
      <Box
        component={motion.div}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        sx={{
          position: 'absolute',
          width: size + 20,
          height: size + 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <svg width={size + 20} height={size + 20} viewBox="0 0 60 60">
          <rect 
            x="25" 
            y="10" 
            width="10" 
            height="40" 
            rx="2" 
            fill={theme.palette.primary.main} 
            opacity="0.3"
          />
          <rect 
            x="10" 
            y="25" 
            width="40" 
            height="10" 
            rx="2" 
            fill={theme.palette.secondary.main} 
            opacity="0.3"
          />
        </svg>
      </Box>

      {/* 内层脉冲圆圈 */}
      <Box
        component={motion.div}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        sx={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: '50%',
          border: `2px solid ${theme.palette.primary.main}`,
          opacity: 0.4
        }}
      />

      {/* 中心加载器 */}
      <CircularProgress 
        size={size} 
        color={color}
        sx={{
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round'
          }
        }}
      />

      {/* 心跳线动画 */}
      <Box
        component={motion.div}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        sx={{
          position: 'absolute',
          width: size * 1.5,
          height: size * 0.3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <svg width={size * 1.5} height={size * 0.3} viewBox="0 0 60 12">
          <motion.path
            d="M0,6 L15,6 L18,2 L21,10 L24,2 L27,6 L60,6"
            fill="none"
            stroke={theme.palette.primary.main}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      </Box>
    </Box>
  );
}

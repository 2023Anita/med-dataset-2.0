'use client';

import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

export default function MedicalBackground() {
  const theme = useTheme();

  // 心电图路径数据
  const ecgPath = "M0,50 L20,50 L25,30 L30,70 L35,20 L40,80 L45,50 L100,50";
  
  // DNA螺旋路径数据
  const dnaPath1 = "M0,40 Q25,20 50,40 T100,40";
  const dnaPath2 = "M0,60 Q25,80 50,60 T100,60";

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 0,
        opacity: theme.palette.mode === 'dark' ? 0.3 : 0.2
      }}
    >
      {/* 心电图动画 */}
      <Box
        component={motion.div}
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '200px',
          height: '100px'
        }}
      >
        <svg width="200" height="100" viewBox="0 0 100 100">
          <motion.path
            d={ecgPath}
            fill="none"
            stroke="#0066CC"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </svg>
      </Box>

      {/* DNA螺旋动画 */}
      <Box
        component={motion.div}
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse' }}
        sx={{
          position: 'absolute',
          top: '60%',
          right: '10%',
          width: '200px',
          height: '100px'
        }}
      >
        <svg width="200" height="100" viewBox="0 0 100 100">
          <motion.path
            d={dnaPath1}
            fill="none"
            stroke="#00A86B"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.path
            d={dnaPath2}
            fill="none"
            stroke="#20B2AA"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          />
        </svg>
      </Box>

      {/* 医疗分子结构 */}
      <Box
        component={motion.div}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        sx={{
          position: 'absolute',
          top: '30%',
          right: '20%',
          width: '80px',
          height: '80px'
        }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="20" r="8" fill="#4A90E2" opacity="0.7" />
          <circle cx="20" cy="50" r="6" fill="#00A86B" opacity="0.7" />
          <circle cx="60" cy="50" r="6" fill="#0066CC" opacity="0.7" />
          <circle cx="40" cy="70" r="5" fill="#20B2AA" opacity="0.7" />
          <line x1="40" y1="20" x2="20" y2="50" stroke="#0066CC" strokeWidth="2" opacity="0.5" />
          <line x1="40" y1="20" x2="60" y2="50" stroke="#0066CC" strokeWidth="2" opacity="0.5" />
          <line x1="20" y1="50" x2="40" y2="70" stroke="#00A86B" strokeWidth="2" opacity="0.5" />
          <line x1="60" y1="50" x2="40" y2="70" stroke="#00A86B" strokeWidth="2" opacity="0.5" />
        </svg>
      </Box>

      {/* 医疗十字图标 */}
      <Box
        component={motion.div}
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        sx={{
          position: 'absolute',
          top: '15%',
          right: '30%',
          width: '40px',
          height: '40px'
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40">
          <rect x="15" y="5" width="10" height="30" rx="2" fill="#0066CC" opacity="0.6" />
          <rect x="5" y="15" width="30" height="10" rx="2" fill="#00A86B" opacity="0.6" />
        </svg>
      </Box>

      {/* 数据流粒子 */}
      {[...Array(8)].map((_, i) => (
        <Box
          key={i}
          component={motion.div}
          animate={{
            x: [0, 100, 200, 300],
            y: [0, -20, 20, 0],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'easeInOut'
          }}
          sx={{
            position: 'absolute',
            top: `${20 + i * 8}%`,
            left: '-20px',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: `linear-gradient(45deg, #0066CC, #00A86B)`,
            boxShadow: '0 0 10px rgba(0, 102, 204, 0.5)'
          }}
        />
      ))}

      {/* 医疗网格背景 */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(0, 102, 204, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 102, 204, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.3
        }}
      />
    </Box>
  );
}

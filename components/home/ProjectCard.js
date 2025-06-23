'use client';

import {
  Card,
  Box,
  CardActionArea,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material';
import Link from 'next/link';
import { styles } from '@/styles/home';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BiotechIcon from '@mui/icons-material/Biotech';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * 项目卡片组件
 * @param {Object} props - 组件属性
 * @param {Object} props.project - 项目数据
 * @param {Function} props.onDeleteClick - 删除按钮点击事件处理函数
 */
export default function ProjectCard({ project, onDeleteClick }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const [processingId, setProcessingId] = useState(false);

  // 打开项目目录
  const handleOpenDirectory = async event => {
    event.stopPropagation();
    event.preventDefault();

    if (processingId) return;

    try {
      setProcessingId(true);

      const response = await fetch('/api/projects/open-directory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ projectId: project.id })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || t('migration.openDirectoryFailed'));
      }

      // 成功打开目录，不需要特别处理
    } catch (error) {
      console.error('打开目录错误:', error);
      alert(error.message);
    } finally {
      setProcessingId(false);
    }
  };

  // 处理删除按钮点击
  const handleDeleteClick = event => {
    event.stopPropagation();
    event.preventDefault();
    onDeleteClick(event, project);
  };

  return (
    <Card
      component={motion.div}
      whileHover={{
        y: -8,
        boxShadow: theme.palette.mode === 'dark'
          ? '0px 16px 40px rgba(0, 0, 0, 0.5), 0px 4px 16px rgba(0, 102, 204, 0.2)'
          : '0px 16px 40px rgba(0, 0, 0, 0.08), 0px 4px 16px rgba(0, 102, 204, 0.15)'
      }}
      transition={{ duration: 0.3 }}
      sx={{
        ...styles.medicalProjectCard(theme),
        position: 'relative',
        overflow: 'visible'
      }}
    >
      {/* 医疗风格装饰元素 */}
      <Box
        sx={{
          position: 'absolute',
          top: -2,
          left: -2,
          right: -2,
          height: '4px',
          background: theme.palette.gradient.primary,
          borderRadius: '16px 16px 0 0',
          opacity: 0.8
        }}
      />

      <Link href={`/projects/${project.id}`} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardActionArea component="div">
          <CardContent sx={{ pt: 3, pb: 2 }}>
            {/* 项目头部 */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                mb: 2
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar
                  sx={{
                    bgcolor: theme.palette.gradient.primary,
                    width: 40,
                    height: 40,
                    background: theme.palette.gradient.primary
                  }}
                >
                  <LocalHospitalIcon />
                </Avatar>
                <Typography variant="h5" component="div" fontWeight="600" sx={{
                  color: theme.palette.text.primary,
                  fontSize: '1.3rem'
                }}>
                  {project.name}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  size="small"
                  icon={<BiotechIcon />}
                  label={`${project._count.Questions || 0} ${t('projects.questions')}`}
                  sx={{
                    bgcolor: 'rgba(0, 102, 204, 0.1)',
                    color: theme.palette.primary.main,
                    border: `1px solid ${theme.palette.primary.main}`,
                    fontWeight: 500
                  }}
                />
                <Chip
                  size="small"
                  icon={<HealthAndSafetyIcon />}
                  label={`${project._count.Datasets || 0} ${t('projects.datasets')}`}
                  sx={{
                    bgcolor: 'rgba(0, 168, 107, 0.1)',
                    color: theme.palette.secondary.main,
                    border: `1px solid ${theme.palette.secondary.main}`,
                    fontWeight: 500
                  }}
                />
              </Box>
            </Box>

            {/* 项目描述 */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                ...styles.projectDescription,
                lineHeight: 1.6,
                fontSize: '0.95rem',
                mb: 2.5
              }}
            >
              {project.description}
            </Typography>

            <Divider sx={{
              mb: 2,
              borderColor: theme.palette.custom.divider,
              opacity: 0.6
            }} />

            {/* 项目底部信息 */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  fontSize: '0.8rem',
                  fontWeight: 500
                }}
              >
                {t('projects.lastUpdated')}: {new Date(project.updateAt).toLocaleDateString('zh-CN')}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Tooltip title={t('projects.viewDetails')}>
                  <IconButton
                    size="small"
                    sx={{
                      color: theme.palette.primary.main,
                      '&:hover': {
                        bgcolor: 'rgba(0, 102, 204, 0.1)',
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('projects.openDirectory')}>
                  <IconButton
                    size="small"
                    onClick={handleOpenDirectory}
                    disabled={processingId}
                    sx={{
                      color: theme.palette.secondary.main,
                      '&:hover': {
                        bgcolor: 'rgba(0, 168, 107, 0.1)',
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    <FolderOpenIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="删除项目">
                  <IconButton
                    size="small"
                    onClick={handleDeleteClick}
                    sx={{
                      color: theme.palette.error.main,
                      '&:hover': {
                        bgcolor: 'rgba(208, 2, 27, 0.1)',
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}

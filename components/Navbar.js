'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  MenuItem,
  FormControl,
  Select,
  Tabs,
  Tab,
  IconButton,
  useTheme as useMuiTheme,
  Tooltip,
  Menu,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import UpdateChecker from './UpdateChecker';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
// 图标
import StorageIcon from '@mui/icons-material/Storage';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import TokenOutlinedIcon from '@mui/icons-material/TokenOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LanguageIcon from '@mui/icons-material/Language';
import { toast } from 'sonner';
import axios from 'axios';
import { useSetAtom } from 'jotai/index';
import { modelConfigListAtom, selectedModelInfoAtom } from '@/lib/store';
import ModelSelect from './ModelSelect';

export default function Navbar({ projects = [], currentProject }) {
  const [selectedProject, setSelectedProject] = useState(currentProject || '');
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const theme = useMuiTheme();

  const setConfigList = useSetAtom(modelConfigListAtom);
  const setSelectedModelInfo = useSetAtom(selectedModelInfoAtom);
  // 只在项目详情页显示模块选项卡
  const isProjectDetail = pathname.includes('/projects/') && pathname.split('/').length > 3;
  // 更多菜单状态
  const [moreMenuAnchor, setMoreMenuAnchor] = useState(null);
  const isMoreMenuOpen = Boolean(moreMenuAnchor);

  // 语言菜单状态
  const [langMenuAnchor, setLangMenuAnchor] = useState(null);
  const isLangMenuOpen = Boolean(langMenuAnchor);

  // 处理更多菜单打开
  const handleMoreMenuOpen = event => {
    setMoreMenuAnchor(event.currentTarget);
  };

  // 处理更多菜单悬浮打开
  const handleMoreMenuHover = event => {
    setMoreMenuAnchor(event.currentTarget);
  };

  // 关闭更多菜单
  const handleMoreMenuClose = () => {
    setMoreMenuAnchor(null);
  };

  // 处理菜单区域的鼠标离开
  const handleMenuMouseLeave = () => {
    setMoreMenuAnchor(null);
  };

  // 处理语言菜单打开
  const handleLangMenuOpen = event => {
    setLangMenuAnchor(event.currentTarget);
  };

  // 关闭语言菜单
  const handleLangMenuClose = () => {
    setLangMenuAnchor(null);
  };

  // 处理语言切换
  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    handleLangMenuClose();
  };

  const handleProjectChange = event => {
    const newProjectId = event.target.value;
    setSelectedProject(newProjectId);
    axios
      .get(`/api/projects/${newProjectId}/model-config`)
      .then(response => {
        setConfigList(response.data.data);
        if (response.data.defaultModelConfigId) {
          setSelectedModelInfo(response.data.data.find(item => item.id === response.data.defaultModelConfigId));
        } else {
          setSelectedModelInfo('');
        }
      })
      .catch(error => {
        toast.error('get model list error');
      });
    // 跳转到新选择的项目页面
    window.location.href = `/projects/${newProjectId}/text-split`;
  };



  return (
    <AppBar
      position="static"
      elevation={0}
      color={theme.palette.mode === 'dark' ? 'transparent' : 'primary'}
      sx={{
        borderBottom: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'primary.main'
      }}
      style={{ borderRadius: 0, zIndex: 99000 }}
    >
      <Toolbar
        sx={{
          height: '56px',
          minHeight: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
        style={{ zIndex: 99000 }}
      >
        {/* 左侧Logo和项目选择 */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 0 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mr: 2,
              '&:hover': { opacity: 0.9 }
            }}
            style={{ cursor: 'pointer', '&:hover': { opacity: 0.9 } }}
            onClick={() => {
              window.location.href = '/';
            }}
          >
            <Box
              component="img"
              src="/imgs/logo.svg"
              alt="MED-Dataset Logo"
              sx={{
                width: 28,
                height: 28,
                mr: 1.5
              }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 600,
                letterSpacing: '-0.5px'
              }}
              style={{ fontSize: '1.1rem' }}
              className={theme.palette.mode === 'dark' ? 'gradient-text' : ''}
              color={theme.palette.mode === 'dark' ? 'inherit' : 'white'}
            >
              MED-Dataset
            </Typography>
          </Box>

          {isProjectDetail && (
            <>
              <FormControl size="small" sx={{ minWidth: 100 }}>
                <Select
                  value={selectedProject}
                  onChange={handleProjectChange}
                  displayEmpty
                  variant="outlined"
                  sx={{
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    color: theme.palette.mode === 'dark' ? 'inherit' : 'white',
                    '& .MuiSelect-icon': {
                      color: theme.palette.mode === 'dark' ? 'inherit' : 'white'
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'transparent'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'transparent'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main'
                    }
                  }}
                  MenuProps={{
                    PaperProps: {
                      elevation: 2,
                      sx: { mt: 1, borderRadius: 2 }
                    }
                  }}
                >
                  <MenuItem value="" disabled>
                    {t('projects.selectProject')}
                  </MenuItem>
                  {projects.map(project => (
                    <MenuItem key={project.id} value={project.id}>
                      {project.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* 模型选择器 */}
              <Box sx={{ ml: 2 }}>
                <ModelSelect
                  projectId={selectedProject}
                  size="small"
                  minWidth={150}
                />
              </Box>
            </>
          )}
        </Box>

        {/* 中间的功能模块导航 - 使用Flex布局居中 */}
        {isProjectDetail && (
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', ml: 2, mr: 2 }}>
            <Tabs
              value={
                pathname.includes('/settings') || pathname.includes('/playground') || pathname.includes('/datasets-sq')
                  ? 'more'
                  : pathname
              }
              textColor="inherit"
              indicatorColor="secondary"
              sx={{
                '& .MuiTab-root': {
                  minWidth: 100,
                  fontSize: '0.85rem',
                  transition: 'all 0.2s',
                  color: theme.palette.mode === 'dark' ? 'inherit' : 'white',
                  opacity: theme.palette.mode === 'dark' ? 0.7 : 0.8,
                  padding: '6px 16px',
                  minHeight: '48px',
                  '&:hover': {
                    color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : 'white',
                    opacity: 1
                  }
                },
                '& .Mui-selected': {
                  color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : 'white',
                  opacity: 1,
                  fontWeight: 600
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.secondary.main : 'white'
                }
              }}
            >
              <Tab
                icon={
                  <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                    <DescriptionOutlinedIcon fontSize="small" />
                  </Box>
                }
                iconPosition="start"
                label={t('textSplit.title')}
                value={`/projects/${selectedProject}/text-split`}
                component={Link}
                href={`/projects/${selectedProject}/text-split`}
              />
              <Tab
                icon={
                  <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                    <TokenOutlinedIcon fontSize="small" />
                  </Box>
                }
                iconPosition="start"
                label={t('distill.title')}
                value={`/projects/${selectedProject}/distill`}
                component={Link}
                href={`/projects/${selectedProject}/distill`}
              />
              <Tab
                icon={
                  <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                    <QuestionAnswerOutlinedIcon fontSize="small" />
                  </Box>
                }
                iconPosition="start"
                label={t('questions.title')}
                value={`/projects/${selectedProject}/questions`}
                component={Link}
                href={`/projects/${selectedProject}/questions`}
              />
              <Tab
                icon={
                  <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                    <DatasetOutlinedIcon fontSize="small" />
                  </Box>
                }
                iconPosition="start"
                label={t('datasets.management')}
                value={`/projects/${selectedProject}/datasets`}
                component={Link}
                href={`/projects/${selectedProject}/datasets`}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  px: 2,
                  py: 1,
                  cursor: 'pointer',
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
                onMouseEnter={handleMoreMenuHover}
                onClick={handleMoreMenuOpen}
              >
                <MoreVertIcon fontSize="small" sx={{ mr: 1 }} />
                {t('common.more')}
              </Box>
            </Tabs>
          </Box>
        )}

        {/* 更多菜单 */}
        <Menu
          anchorEl={moreMenuAnchor}
          open={isMoreMenuOpen}
          onClose={handleMoreMenuClose}
          PaperProps={{
            elevation: 2,
            sx: { mt: 1.5, borderRadius: 2, minWidth: 180 },
            onMouseLeave: handleMenuMouseLeave
          }}
          transformOrigin={{ horizontal: 'center', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          MenuListProps={{
            dense: true,
            onMouseLeave: handleMenuMouseLeave
          }}
        >
          <MenuItem
            component={Link}
            href={`/projects/${selectedProject}/settings`}
            onClick={handleMoreMenuClose}
            selected={pathname === `/projects/${selectedProject}/settings`}
          >
            <ListItemIcon>
              <SettingsOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={t('settings.title')} />
          </MenuItem>
          <Divider />
          <MenuItem
            component={Link}
            href={`/projects/${selectedProject}/playground`}
            onClick={handleMoreMenuClose}
            selected={pathname === `/projects/${selectedProject}/playground`}
          >
            <ListItemIcon>
              <ScienceOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={t('playground.title')} />
          </MenuItem>
          <Divider />
          <MenuItem
            component={Link}
            href="/dataset-square"
            onClick={handleMoreMenuClose}
            selected={pathname === `/dataset-square`}
          >
            <ListItemIcon>
              <StorageIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={t('datasetSquare.title')} />
          </MenuItem>
        </Menu>

        {/* 语言切换菜单 */}
        <Menu
          anchorEl={langMenuAnchor}
          open={isLangMenuOpen}
          onClose={handleLangMenuClose}
          PaperProps={{
            elevation: 2,
            sx: { mt: 1.5, borderRadius: 2, minWidth: 120 }
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem
            onClick={() => handleLanguageChange('zh-CN')}
            selected={i18n.language === 'zh-CN'}
          >
            中文
          </MenuItem>
          <MenuItem
            onClick={() => handleLanguageChange('en')}
            selected={i18n.language === 'en'}
          >
            English
          </MenuItem>
        </Menu>

        {/* 右侧操作区 - 使用Flex布局 */}
        <Box sx={{ display: 'flex', flexGrow: 0, alignItems: 'center', gap: 1.5 }}>
          {/* 语言切换按钮 */}
          <Tooltip title={t('common.language')}>
            <IconButton
              onClick={handleLangMenuOpen}
              sx={{
                color: theme.palette.mode === 'dark' ? 'inherit' : 'white',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <LanguageIcon />
            </IconButton>
          </Tooltip>

          {/* 更新检查器 */}
          <UpdateChecker />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

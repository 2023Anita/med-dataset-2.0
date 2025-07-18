import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { getProjectRoot } from '@/lib/db/base';
import { getTaskConfig } from '@/lib/db/projects';
import { processTask } from '@/lib/services/tasks';
import { db } from '@/lib/db/index';

// 简单的内存缓存
const taskConfigCache = new Map();
const CACHE_DURATION = 2 * 60 * 1000; // 2分钟缓存

// 获取任务配置
export async function GET(request, { params }) {
  try {
    const { projectId } = params;

    // 验证项目 ID
    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    // 检查缓存
    const cacheKey = `task_config_${projectId}`;
    const cached = taskConfigCache.get(cacheKey);
    const now = Date.now();

    if (cached && (now - cached.timestamp) < CACHE_DURATION) {
      return NextResponse.json(cached.data);
    }

    // 添加超时控制
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Task config query timeout')), 5000);
    });

    const taskConfigPromise = (async () => {
      // 获取项目根目录
      const projectRoot = await getProjectRoot();
      const projectPath = path.join(projectRoot, projectId);

      // 检查项目是否存在
      try {
        await fs.access(projectPath);
      } catch (error) {
        throw new Error('Project does not exist: ' + projectPath);
      }

      return await getTaskConfig(projectId);
    })();

    const taskConfig = await Promise.race([
      taskConfigPromise,
      timeoutPromise
    ]);

    // 更新缓存
    taskConfigCache.set(cacheKey, {
      data: taskConfig,
      timestamp: now
    });

    return NextResponse.json(taskConfig);
  } catch (error) {
    console.error('Failed to obtain task configuration:', String(error));

    // 如果有缓存数据，即使过期也返回
    const cacheKey = `task_config_${params.projectId}`;
    const cached = taskConfigCache.get(cacheKey);
    if (cached) {
      console.warn('Using stale task config cache due to error');
      return NextResponse.json(cached.data);
    }

    return NextResponse.json({ error: 'Failed to obtain task configuration' }, { status: 500 });
  }
}

// 更新任务配置
export async function PUT(request, { params }) {
  try {
    const { projectId } = params;

    // 验证项目 ID
    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    // 获取请求体
    const taskConfig = await request.json();

    // 验证请求体
    if (!taskConfig) {
      return NextResponse.json({ error: 'Task configuration cannot be empty' }, { status: 400 });
    }

    // 获取项目根目录
    const projectRoot = await getProjectRoot();
    const projectPath = path.join(projectRoot, projectId);

    // 检查项目是否存在
    try {
      await fs.access(projectPath);
    } catch (error) {
      return NextResponse.json({ error: 'Project does not exist' }, { status: 404 });
    }

    // 获取任务配置文件路径
    const taskConfigPath = path.join(projectPath, 'task-config.json');

    // 写入任务配置文件
    await fs.writeFile(taskConfigPath, JSON.stringify(taskConfig, null, 2), 'utf-8');

    return NextResponse.json({ message: 'Task configuration updated successfully' });
  } catch (error) {
    console.error('Failed to update task configuration:', String(error));
    return NextResponse.json({ error: 'Failed to update task configuration' }, { status: 500 });
  }
}

// 创建新任务
export async function POST(request, { params }) {
  try {
    const { projectId } = params;
    const data = await request.json();

    // 验证必填字段
    const { taskType, modelInfo, language, detail = '', totalCount = 0, note } = data;

    if (!taskType) {
      return NextResponse.json(
        {
          code: 400,
          error: 'Missing required parameter: taskType'
        },
        { status: 400 }
      );
    }

    // 创建新任务
    const newTask = await db.task.create({
      data: {
        projectId,
        taskType,
        status: 0, // 初始状态: 处理中
        modelInfo: typeof modelInfo === 'string' ? modelInfo : JSON.stringify(modelInfo),
        language: language || 'zh-CN',
        detail: detail || '',
        totalCount,
        note: note ? JSON.stringify(note) : '',
        completedCount: 0
      }
    });

    // 异步启动任务处理
    processTask(newTask.id).catch(err => {
      console.error(`Task startup failed: ${newTask.id}`, String(err));
    });

    return NextResponse.json({
      code: 0,
      data: newTask,
      message: 'Task created successfully'
    });
  } catch (error) {
    console.error('Failed to create task:', String(error));
    return NextResponse.json(
      {
        code: 500,
        error: 'Failed to create task',
        message: error.message
      },
      { status: 500 }
    );
  }
}

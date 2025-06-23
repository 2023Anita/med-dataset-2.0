import { NextResponse } from 'next/server';
import { createLlmModels, getLlmModelsByProviderId } from '@/lib/db/llm-models'; // 导入db实例

// 简单的内存缓存
const modelsCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

// 获取LLM模型
export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    let providerId = searchParams.get('providerId');
    if (!providerId) {
      return NextResponse.json({ error: '参数错误' }, { status: 400 });
    }

    // 检查缓存
    const cacheKey = `models_${providerId}`;
    const cached = modelsCache.get(cacheKey);
    const now = Date.now();

    if (cached && (now - cached.timestamp) < CACHE_DURATION) {
      return NextResponse.json(cached.data);
    }

    // 添加超时控制
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Database query timeout')), 8000);
    });

    const models = await Promise.race([
      getLlmModelsByProviderId(providerId),
      timeoutPromise
    ]);

    if (!models) {
      return NextResponse.json({ error: 'LLM provider not found' }, { status: 404 });
    }

    // 更新缓存
    modelsCache.set(cacheKey, {
      data: models,
      timestamp: now
    });

    return NextResponse.json(models);
  } catch (error) {
    console.error('Database query error:', String(error));

    // 如果有缓存数据，即使过期也返回
    const cacheKey = `models_${searchParams.get('providerId')}`;
    const cached = modelsCache.get(cacheKey);
    if (cached) {
      console.warn('Using stale cache due to database error');
      return NextResponse.json(cached.data);
    }

    return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
  }
}

//同步最新模型列表
export async function POST(request) {
  try {
    const { newModels, providerId } = await request.json();
    const models = await getLlmModelsByProviderId(providerId);
    const existingModelIds = models.map(model => model.modelId);
    const diffModels = newModels.filter(item => !existingModelIds.includes(item.modelId));
    if (diffModels.length > 0) {
      // return NextResponse.json(await createLlmModels(diffModels));
      return NextResponse.json({ message: 'No new models to insert' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No new models to insert' }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Database insert failed' }, { status: 500 });
  }
}

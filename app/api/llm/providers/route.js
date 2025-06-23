import { NextResponse } from 'next/server';
import { getLlmProviders } from '@/lib/db/llm-providers';

// 简单的内存缓存
let providersCache = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

// 获取 LLM 提供商数据
export async function GET() {
  try {
    // 检查缓存
    const now = Date.now();
    if (providersCache && (now - cacheTimestamp) < CACHE_DURATION) {
      return NextResponse.json(providersCache);
    }

    // 添加超时控制
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Database query timeout')), 10000);
    });

    const result = await Promise.race([
      getLlmProviders(),
      timeoutPromise
    ]);

    // 更新缓存
    providersCache = result;
    cacheTimestamp = now;

    return NextResponse.json(result);
  } catch (error) {
    console.error('Database query error:', String(error));

    // 如果有缓存数据，即使过期也返回
    if (providersCache) {
      console.warn('Using stale cache due to database error');
      return NextResponse.json(providersCache);
    }

    return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
  }
}

import { createOllama } from 'ollama-ai-provider';
import BaseClient from './base.js';

class OllamaClient extends BaseClient {
  constructor(config) {
    super(config);
    this.ollama = createOllama({
      baseURL: this.endpoint,
      apiKey: this.apiKey
    });
  }

  _getModel() {
    return this.ollama(this.model);
  }

  /**
   * 获取本地可用的模型列表
   * @returns {Promise<Array>} 返回模型列表
   */
  async getModels() {
    try {
      // 添加超时控制，避免长时间等待
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒超时

      const response = await fetch(this.endpoint + '/tags', {
        signal: controller.signal,
        timeout: 5000
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      // 处理响应，提取模型名称
      if (data && data.models) {
        return data.models.map(model => ({
          name: model.name,
          modified_at: model.modified_at,
          size: model.size
        }));
      }
      return [];
    } catch (error) {
      console.error('Ollama fetch error:', error.message);
      // 返回空数组而不是undefined，避免后续处理出错
      return [];
    }
  }
}

module.exports = OllamaClient;

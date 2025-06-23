#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// 创建readline接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 颜色输出函数
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function colorLog(text, color = 'reset') {
  console.log(colors[color] + text + colors.reset);
}

// 显示欢迎信息
function showWelcome() {
  console.clear();
  colorLog('🎉 欢迎使用 MED-Dataset！', 'cyan');
  colorLog('=' .repeat(50), 'blue');
  console.log();
  colorLog('📖 MED-Dataset 是一个专业的医疗AI数据集创建与管理平台', 'bright');
  console.log();
  colorLog('🚀 支持两种运行模式：', 'yellow');
  console.log();
}

// 显示模式选择
function showModeOptions() {
  colorLog('请选择启动模式：', 'bright');
  console.log();
  
  colorLog('1️⃣  生产模式 (推荐)', 'green');
  colorLog('   ✅ 启动速度极快 (187ms)', 'green');
  colorLog('   ✅ 页面加载迅速 (1-5秒)', 'green');
  colorLog('   ✅ 运行稳定，内存使用少', 'green');
  colorLog('   ✅ 适合日常使用数据集工具', 'green');
  console.log();
  
  colorLog('2️⃣  开发模式', 'yellow');
  colorLog('   🔧 支持代码热重载', 'yellow');
  colorLog('   🔧 详细的调试信息', 'yellow');
  colorLog('   ⚠️  启动较慢 (2-5分钟)', 'yellow');
  colorLog('   ⚠️  适合修改代码时使用', 'yellow');
  console.log();
  
  colorLog('3️⃣  查看详细说明', 'blue');
  colorLog('4️⃣  退出', 'red');
  console.log();
}

// 显示详细说明
function showDetailedInfo() {
  console.clear();
  colorLog('📋 详细模式对比', 'cyan');
  colorLog('=' .repeat(50), 'blue');
  console.log();
  
  console.log('┌─────────────────┬─────────────┬─────────────┐');
  console.log('│ 功能特性        │ 开发模式    │ 生产模式    │');
  console.log('├─────────────────┼─────────────┼─────────────┤');
  console.log('│ 启动时间        │ 2-5分钟     │ 187毫秒     │');
  console.log('│ 页面加载        │ 30-60秒     │ 1-5秒       │');
  console.log('│ API响应         │ 6-42秒      │ 1-3秒       │');
  console.log('│ 内存使用        │ 高          │ 低          │');
  console.log('│ 稳定性          │ 中等        │ 优秀        │');
  console.log('│ 代码热重载      │ ✅          │ ❌          │');
  console.log('│ 核心功能        │ ✅          │ ✅          │');
  console.log('└─────────────────┴─────────────┴─────────────┘');
  console.log();
  
  colorLog('💡 使用建议：', 'bright');
  colorLog('• 日常使用数据集工具 → 选择生产模式', 'green');
  colorLog('• 修改代码或自定义功能 → 选择开发模式', 'yellow');
  colorLog('• 追求最佳性能和稳定性 → 选择生产模式', 'green');
  console.log();
  
  colorLog('按任意键返回主菜单...', 'blue');
}

// 检查是否需要构建
function needsBuild() {
  const buildDir = path.join(process.cwd(), '.next');
  return !fs.existsSync(buildDir);
}

// 执行命令
function runCommand(command, description) {
  try {
    colorLog(`\n🔄 ${description}...`, 'yellow');
    execSync(command, { stdio: 'inherit', cwd: process.cwd() });
    colorLog(`✅ ${description}完成！`, 'green');
    return true;
  } catch (error) {
    colorLog(`❌ ${description}失败！`, 'red');
    colorLog(`错误信息: ${error.message}`, 'red');
    return false;
  }
}

// 启动生产模式
function startProductionMode() {
  console.clear();
  colorLog('🚀 启动生产模式', 'cyan');
  colorLog('=' .repeat(30), 'blue');
  
  // 检查是否需要构建
  if (needsBuild()) {
    colorLog('\n📦 检测到需要构建应用...', 'yellow');
    if (!runCommand('npm run build', '构建应用')) {
      return false;
    }
  } else {
    colorLog('\n✅ 应用已构建，跳过构建步骤', 'green');
  }
  
  colorLog('\n🎯 启动生产服务器...', 'yellow');
  colorLog('📍 应用将在 http://localhost:1717 启动', 'blue');
  colorLog('⏱️  预计启动时间: 187毫秒', 'blue');
  console.log();
  
  try {
    execSync('npm run start', { stdio: 'inherit', cwd: process.cwd() });
  } catch (error) {
    colorLog('❌ 启动失败！', 'red');
    return false;
  }
  
  return true;
}

// 启动开发模式
function startDevelopmentMode() {
  console.clear();
  colorLog('🔧 启动开发模式', 'cyan');
  colorLog('=' .repeat(30), 'blue');
  
  colorLog('\n🎯 启动开发服务器...', 'yellow');
  colorLog('📍 应用将在 http://localhost:1717 启动', 'blue');
  colorLog('⏱️  预计启动时间: 2-5分钟', 'yellow');
  colorLog('🔄 支持代码热重载', 'green');
  console.log();
  
  try {
    execSync('npm run dev', { stdio: 'inherit', cwd: process.cwd() });
  } catch (error) {
    colorLog('❌ 启动失败！', 'red');
    return false;
  }
  
  return true;
}

// 主菜单处理
function handleMainMenu(choice) {
  switch (choice.trim()) {
    case '1':
      rl.close();
      startProductionMode();
      break;
      
    case '2':
      rl.close();
      startDevelopmentMode();
      break;
      
    case '3':
      showDetailedInfo();
      rl.question('', () => {
        showMainMenu();
      });
      break;
      
    case '4':
      colorLog('\n👋 感谢使用 Easy Dataset！', 'cyan');
      rl.close();
      process.exit(0);
      break;
      
    default:
      colorLog('\n❌ 无效选择，请输入 1、2、3 或 4', 'red');
      setTimeout(showMainMenu, 1000);
      break;
  }
}

// 显示主菜单
function showMainMenu() {
  showWelcome();
  showModeOptions();
  rl.question('请输入您的选择 (1-4): ', handleMainMenu);
}

// 检查环境
function checkEnvironment() {
  try {
    // 检查是否在正确的目录
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      colorLog('❌ 错误：未找到 package.json 文件', 'red');
      colorLog('请确保在 MED-Dataset 项目根目录下运行此脚本', 'yellow');
      process.exit(1);
    }

    // 检查package.json内容
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    if (packageJson.name !== 'med-dataset') {
      colorLog('❌ 错误：这不是 MED-Dataset 项目', 'red');
      process.exit(1);
    }
    
    return true;
  } catch (error) {
    colorLog('❌ 环境检查失败：' + error.message, 'red');
    process.exit(1);
  }
}

// 主程序入口
function main() {
  // 检查环境
  if (!checkEnvironment()) {
    return;
  }
  
  // 显示主菜单
  showMainMenu();
}

// 处理退出信号
process.on('SIGINT', () => {
  colorLog('\n\n👋 感谢使用 Easy Dataset！', 'cyan');
  process.exit(0);
});

// 启动程序
main();

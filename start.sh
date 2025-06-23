#!/bin/bash

# MED-Dataset 启动脚本
# 支持交互式选择启动模式

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# 清屏函数
clear_screen() {
    clear
}

# 彩色输出函数
print_color() {
    local color=$1
    local text=$2
    echo -e "${color}${text}${NC}"
}

# 显示欢迎信息
show_welcome() {
    clear_screen
    print_color $CYAN "🎉 欢迎使用 MED-Dataset！"
    print_color $BLUE "=================================================="
    echo
    print_color $BOLD "📖 MED-Dataset 是一个强大的医疗领域大型语言模型微调数据集创建工具"
    echo
    print_color $YELLOW "🚀 支持两种运行模式："
    echo
}

# 显示模式选择
show_mode_options() {
    print_color $BOLD "请选择启动模式："
    echo
    
    print_color $GREEN "1️⃣  生产模式 (推荐)"
    print_color $GREEN "   ✅ 启动速度极快 (187ms)"
    print_color $GREEN "   ✅ 页面加载迅速 (1-5秒)"
    print_color $GREEN "   ✅ 运行稳定，内存使用少"
    print_color $GREEN "   ✅ 适合日常使用数据集工具"
    echo
    
    print_color $YELLOW "2️⃣  开发模式"
    print_color $YELLOW "   🔧 支持代码热重载"
    print_color $YELLOW "   🔧 详细的调试信息"
    print_color $YELLOW "   ⚠️  启动较慢 (2-5分钟)"
    print_color $YELLOW "   ⚠️  适合修改代码时使用"
    echo
    
    print_color $BLUE "3️⃣  查看详细说明"
    print_color $RED "4️⃣  退出"
    echo
}

# 显示详细说明
show_detailed_info() {
    clear_screen
    print_color $CYAN "📋 详细模式对比"
    print_color $BLUE "=================================================="
    echo
    
    echo "┌─────────────────┬─────────────┬─────────────┐"
    echo "│ 功能特性        │ 开发模式    │ 生产模式    │"
    echo "├─────────────────┼─────────────┼─────────────┤"
    echo "│ 启动时间        │ 2-5分钟     │ 187毫秒     │"
    echo "│ 页面加载        │ 30-60秒     │ 1-5秒       │"
    echo "│ API响应         │ 6-42秒      │ 1-3秒       │"
    echo "│ 内存使用        │ 高          │ 低          │"
    echo "│ 稳定性          │ 中等        │ 优秀        │"
    echo "│ 代码热重载      │ ✅          │ ❌          │"
    echo "│ 核心功能        │ ✅          │ ✅          │"
    echo "└─────────────────┴─────────────┴─────────────┘"
    echo
    
    print_color $BOLD "💡 使用建议："
    print_color $GREEN "• 日常使用数据集工具 → 选择生产模式"
    print_color $YELLOW "• 修改代码或自定义功能 → 选择开发模式"
    print_color $GREEN "• 追求最佳性能和稳定性 → 选择生产模式"
    echo
    
    print_color $BLUE "按 Enter 键返回主菜单..."
    read
}

# 检查是否需要构建
needs_build() {
    if [ ! -d ".next" ]; then
        return 0  # 需要构建
    else
        return 1  # 不需要构建
    fi
}

# 启动生产模式
start_production_mode() {
    clear_screen
    print_color $CYAN "🚀 启动生产模式"
    print_color $BLUE "=============================="
    
    # 检查是否需要构建
    if needs_build; then
        echo
        print_color $YELLOW "📦 检测到需要构建应用..."
        print_color $YELLOW "🔄 正在构建应用..."
        
        if npm run build; then
            print_color $GREEN "✅ 构建完成！"
        else
            print_color $RED "❌ 构建失败！"
            echo
            print_color $YELLOW "按 Enter 键返回主菜单..."
            read
            return 1
        fi
    else
        echo
        print_color $GREEN "✅ 应用已构建，跳过构建步骤"
    fi
    
    echo
    print_color $YELLOW "🎯 启动生产服务器..."
    print_color $BLUE "📍 应用将在 http://localhost:1717 启动"
    print_color $BLUE "⏱️  预计启动时间: 187毫秒"
    echo
    
    # 启动生产服务器
    npm run start
}

# 启动开发模式
start_development_mode() {
    clear_screen
    print_color $CYAN "🔧 启动开发模式"
    print_color $BLUE "=============================="
    
    echo
    print_color $YELLOW "🎯 启动开发服务器..."
    print_color $BLUE "📍 应用将在 http://localhost:1717 启动"
    print_color $YELLOW "⏱️  预计启动时间: 2-5分钟"
    print_color $GREEN "🔄 支持代码热重载"
    echo
    
    # 启动开发服务器
    npm run dev
}

# 检查环境
check_environment() {
    # 检查是否在正确的目录
    if [ ! -f "package.json" ]; then
        print_color $RED "❌ 错误：未找到 package.json 文件"
        print_color $YELLOW "请确保在 MED-Dataset 项目根目录下运行此脚本"
        exit 1
    fi

    # 检查是否是 MED-Dataset 项目
    if ! grep -q '"name": "med-dataset"' package.json; then
        print_color $RED "❌ 错误：这不是 MED-Dataset 项目"
        exit 1
    fi
    
    # 检查 Node.js 和 npm
    if ! command -v node &> /dev/null; then
        print_color $RED "❌ 错误：未找到 Node.js"
        print_color $YELLOW "请先安装 Node.js: https://nodejs.org/"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_color $RED "❌ 错误：未找到 npm"
        print_color $YELLOW "请先安装 npm"
        exit 1
    fi
}

# 主菜单循环
main_menu() {
    while true; do
        show_welcome
        show_mode_options
        
        echo -n "请输入您的选择 (1-4): "
        read choice
        
        case $choice in
            1)
                start_production_mode
                break
                ;;
            2)
                start_development_mode
                break
                ;;
            3)
                show_detailed_info
                ;;
            4)
                echo
                print_color $CYAN "👋 感谢使用 MED-Dataset！"
                exit 0
                ;;
            *)
                echo
                print_color $RED "❌ 无效选择，请输入 1、2、3 或 4"
                sleep 2
                ;;
        esac
    done
}

# 信号处理
trap 'echo; print_color $CYAN "👋 感谢使用 MED-Dataset！"; exit 0' INT

# 主程序入口
main() {
    # 检查环境
    check_environment
    
    # 显示主菜单
    main_menu
}

# 启动程序
main

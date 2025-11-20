#!/bin/bash

# Virtual Classroom Frontend - Quick Start Script
# This script helps you get started with the project quickly

echo "🎓 Virtual Classroom Frontend - Setup Script"
echo "=============================================="
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js >= 16.x"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if yarn is available, otherwise use npm
if command -v yarn &> /dev/null; then
    PACKAGE_MANAGER="yarn"
    echo "✅ Using Yarn"
else
    PACKAGE_MANAGER="npm"
    echo "✅ Using npm"
fi

# Check if .env exists
if [ ! -f .env ]; then
    echo ""
    echo "⚠️  .env file not found!"
    echo "📝 Creating .env from .env.example..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Please update .env with your actual credentials:"
    echo "   - VITE_GOOGLE_CLIENT_ID"
    echo "   - VITE_RAZORPAY_KEY"
    echo ""
    read -p "Press Enter to continue after updating .env, or Ctrl+C to exit..."
else
    echo "✅ .env file exists"
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo ""
    echo "📦 Installing dependencies..."
    if [ "$PACKAGE_MANAGER" = "yarn" ]; then
        yarn install
    else
        npm install
    fi
    
    if [ $? -eq 0 ]; then
        echo "✅ Dependencies installed successfully"
    else
        echo "❌ Failed to install dependencies"
        exit 1
    fi
else
    echo "✅ Dependencies already installed"
fi

# Check if backend is running
echo ""
echo "🔍 Checking if backend is running..."
if curl -s http://localhost:5000/health > /dev/null 2>&1; then
    echo "✅ Backend is running at http://localhost:5000"
else
    echo "⚠️  Backend is not running at http://localhost:5000"
    echo "   Make sure to start your backend before proceeding"
    echo ""
    read -p "Continue anyway? (y/n): " continue_choice
    if [ "$continue_choice" != "y" ]; then
        exit 0
    fi
fi

echo ""
echo "🚀 Starting development server..."
echo ""
echo "📝 Project will be available at: http://localhost:5173"
echo "📚 Check SETUP.md for detailed documentation"
echo "🔍 Check ANALYSIS.md for issues and improvements"
echo ""

# Start the dev server
if [ "$PACKAGE_MANAGER" = "yarn" ]; then
    yarn dev
else
    npm run dev
fi

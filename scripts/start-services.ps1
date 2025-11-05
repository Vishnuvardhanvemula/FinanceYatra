# Finance Tutor Startup Script
# This script starts both Python RAG service and Node.js backend

Write-Host "🚀 Starting Finance Tutor Services..." -ForegroundColor Cyan
Write-Host ""

# Set project root
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

# Function to check if a port is in use
function Test-Port {
    param([int]$Port)
    $connection = Test-NetConnection -ComputerName localhost -Port $Port -InformationLevel Quiet -WarningAction SilentlyContinue
    return $connection
}

# Function to start Python RAG service
function Start-PythonRAG {
    Write-Host "📦 Starting Python RAG Service..." -ForegroundColor Yellow
    
    # Check if port 8000 is already in use
    if (Test-Port -Port 8000) {
        Write-Host "⚠️  Port 8000 is already in use. Python RAG may already be running." -ForegroundColor Red
        Write-Host "   If not, stop the process using port 8000 and try again." -ForegroundColor Red
        return $false
    }
    
    # Navigate to rag_system
    Set-Location "$ProjectRoot\rag_system"
    
    # Check if virtual environment exists
    if (!(Test-Path "venv")) {
        Write-Host "❌ Virtual environment not found. Please run setup first:" -ForegroundColor Red
        Write-Host "   cd rag_system" -ForegroundColor Yellow
        Write-Host "   python -m venv venv" -ForegroundColor Yellow
        Write-Host "   .\venv\Scripts\activate" -ForegroundColor Yellow
        Write-Host "   pip install -r requirements.txt" -ForegroundColor Yellow
        return $false
    }
    
    # Start Python RAG in new window
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$ProjectRoot\rag_system'; .\venv\Scripts\activate; Write-Host '🐍 Starting Python RAG Service...' -ForegroundColor Green; python app.py"
    
    Write-Host "✅ Python RAG service starting in new window..." -ForegroundColor Green
    Write-Host "   Waiting for service to be ready..." -ForegroundColor Yellow
    
    # Wait for service to be ready (max 30 seconds)
    $timeout = 30
    $elapsed = 0
    while ($elapsed -lt $timeout) {
        Start-Sleep -Seconds 2
        $elapsed += 2
        
        try {
            $response = Invoke-RestMethod -Uri "http://localhost:8000/health" -Method Get -TimeoutSec 2 -ErrorAction SilentlyContinue
            if ($response.status -eq "healthy") {
                Write-Host "✅ Python RAG service is ready!" -ForegroundColor Green
                Write-Host "   📊 Documents: $($response.documents_count)" -ForegroundColor Cyan
                Write-Host "   🤖 Ollama: $($response.ollama_status)" -ForegroundColor Cyan
                return $true
            }
        } catch {
            # Service not ready yet, continue waiting
        }
        
        Write-Host "   Still waiting... ($elapsed/$timeout seconds)" -ForegroundColor Yellow
    }
    
    Write-Host "⚠️  Python RAG service did not become ready in time." -ForegroundColor Red
    Write-Host "   Check the Python RAG window for errors." -ForegroundColor Red
    return $false
}

# Function to start Node.js backend
function Start-NodeBackend {
    Write-Host ""
    Write-Host "📦 Starting Node.js Backend..." -ForegroundColor Yellow
    
    # Check if port 5000 is already in use
    if (Test-Port -Port 5000) {
        Write-Host "⚠️  Port 5000 is already in use. Backend may already be running." -ForegroundColor Red
        Write-Host "   If not, stop the process using port 5000 and try again." -ForegroundColor Red
        return $false
    }
    
    # Navigate to backend
    Set-Location "$ProjectRoot\backend"
    
    # Check if node_modules exists
    if (!(Test-Path "node_modules")) {
        Write-Host "❌ Node modules not found. Please run:" -ForegroundColor Red
        Write-Host "   cd backend" -ForegroundColor Yellow
        Write-Host "   npm install" -ForegroundColor Yellow
        return $false
    }
    
    # Start Node.js in new window
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$ProjectRoot\backend'; Write-Host '🟢 Starting Node.js Backend...' -ForegroundColor Green; npm run dev"
    
    Write-Host "✅ Node.js backend starting in new window..." -ForegroundColor Green
    Write-Host "   Waiting for service to be ready..." -ForegroundColor Yellow
    
    # Wait for service to be ready (max 20 seconds)
    $timeout = 20
    $elapsed = 0
    while ($elapsed -lt $timeout) {
        Start-Sleep -Seconds 2
        $elapsed += 2
        
        try {
            $response = Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method Get -TimeoutSec 2 -ErrorAction SilentlyContinue
            if ($response.status -eq "OK") {
                Write-Host "✅ Node.js backend is ready!" -ForegroundColor Green
                return $true
            }
        } catch {
            # Service not ready yet, continue waiting
        }
        
        Write-Host "   Still waiting... ($elapsed/$timeout seconds)" -ForegroundColor Yellow
    }
    
    Write-Host "⚠️  Node.js backend did not become ready in time." -ForegroundColor Red
    Write-Host "   Check the Node.js window for errors." -ForegroundColor Red
    return $false
}

# Main execution
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Finance Tutor - Multi-Service Startup" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Host "🔍 Checking prerequisites..." -ForegroundColor Yellow

# Check Python
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✅ Python: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Python not found. Please install Python 3.8+." -ForegroundColor Red
    exit 1
}

# Check Node.js
try {
    $nodeVersion = node --version 2>&1
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js 18+." -ForegroundColor Red
    exit 1
}

# Check Ollama
try {
    $ollamaVersion = ollama --version 2>&1
    Write-Host "✅ Ollama: $ollamaVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Ollama not found. Please install Ollama." -ForegroundColor Yellow
    Write-Host "   Download from: https://ollama.ai/" -ForegroundColor Yellow
}

Write-Host ""

# Start services
$pythonSuccess = Start-PythonRAG
$nodeSuccess = Start-NodeBackend

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Startup Summary" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

if ($pythonSuccess -and $nodeSuccess) {
    Write-Host "✅ All services started successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📡 Service URLs:" -ForegroundColor Cyan
    Write-Host "   Python RAG API:  http://localhost:8000" -ForegroundColor White
    Write-Host "   Python RAG Docs: http://localhost:8000/docs" -ForegroundColor White
    Write-Host "   Node.js Backend: http://localhost:5000" -ForegroundColor White
    Write-Host "   Backend Health:  http://localhost:5000/api/health" -ForegroundColor White
    Write-Host ""
    Write-Host "🧪 Test the integration:" -ForegroundColor Cyan
    Write-Host "   curl -X POST http://localhost:5000/api/chat/message ``" -ForegroundColor Yellow
    Write-Host "     -H 'Content-Type: application/json' ``" -ForegroundColor Yellow
    Write-Host "     -d '{`"message`": `"What is EMI?`", `"language`": `"en`"}'" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📚 Documentation:" -ForegroundColor Cyan
    Write-Host "   INTEGRATION_GUIDE.md" -ForegroundColor White
    Write-Host "   INTEGRATION_TEST_CHECKLIST.md" -ForegroundColor White
    Write-Host "   INTEGRATION_SUMMARY.md" -ForegroundColor White
    Write-Host ""
    Write-Host "🛑 To stop services: Close the Python RAG and Node.js windows" -ForegroundColor Yellow
} elseif ($pythonSuccess) {
    Write-Host "⚠️  Python RAG started, but Node.js backend failed" -ForegroundColor Yellow
    Write-Host "   Check the Node.js window for errors" -ForegroundColor Yellow
} elseif ($nodeSuccess) {
    Write-Host "⚠️  Node.js backend started, but Python RAG failed" -ForegroundColor Yellow
    Write-Host "   Check the Python RAG window for errors" -ForegroundColor Yellow
} else {
    Write-Host "❌ Both services failed to start" -ForegroundColor Red
    Write-Host "   Check the individual windows for errors" -ForegroundColor Red
}

Write-Host ""
Write-Host "Press any key to exit this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

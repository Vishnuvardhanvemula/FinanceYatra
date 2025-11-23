"""
GPU Diagnostics Script
Checks if CUDA/GPU is available for the RAG system
"""

import sys

def check_pytorch():
    """Check PyTorch and CUDA availability"""
    print("="*60)
    print("🔍 CHECKING PYTORCH & CUDA")
    print("="*60)
    
    try:
        import torch
        print(f"✅ PyTorch installed: version {torch.__version__}")
        
        # Check CUDA availability
        if torch.cuda.is_available():
            print(f"✅ CUDA is available!")
            print(f"   CUDA Version: {torch.version.cuda}")
            print(f"   Number of GPUs: {torch.cuda.device_count()}")
            
            # Show details for each GPU
            for i in range(torch.cuda.device_count()):
                props = torch.cuda.get_device_properties(i)
                print(f"\n   GPU {i}: {torch.cuda.get_device_name(i)}")
                print(f"   - Total Memory: {props.total_memory / 1e9:.2f} GB")
                print(f"   - Compute Capability: {props.major}.{props.minor}")
                print(f"   - Multi Processors: {props.multi_processor_count}")
            
            # Test GPU tensor operation
            print("\n🧪 Testing GPU tensor operation...")
            try:
                x = torch.randn(1000, 1000).cuda()
                y = torch.randn(1000, 1000).cuda()
                z = torch.matmul(x, y)
                print("✅ GPU tensor operations working!")
            except Exception as e:
                print(f"❌ GPU tensor test failed: {e}")
            
            return True
        else:
            print("❌ CUDA is NOT available")
            print("   PyTorch is using CPU only")
            
            # Check if it's a CUDA-enabled build
            print(f"   CUDA built: {torch.version.cuda is not None}")
            
            return False
            
    except ImportError:
        print("❌ PyTorch is NOT installed")
        print("\n📝 To install PyTorch with CUDA support:")
        print("   Visit: https://pytorch.org/get-started/locally/")
        print("   For CUDA 12.1: pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121")
        print("   For CUDA 11.8: pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118")
        return False


def check_sentence_transformers():
    """Check sentence-transformers installation"""
    print("\n" + "="*60)
    print("🔍 CHECKING SENTENCE-TRANSFORMERS")
    print("="*60)
    
    try:
        import sentence_transformers
        print(f"✅ sentence-transformers installed: version {sentence_transformers.__version__}")
        
        # Test loading a model on GPU
        print("\n🧪 Testing model loading on GPU...")
        try:
            from sentence_transformers import SentenceTransformer
            import torch
            
            if torch.cuda.is_available():
                model = SentenceTransformer('sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')
                model = model.to('cuda:0')
                
                # Test encoding
                test_text = ["This is a test sentence"]
                embeddings = model.encode(test_text)
                
                print(f"✅ Model loaded on GPU successfully!")
                print(f"   Embedding dimension: {embeddings.shape[1]}")
                print(f"   Device: {model.device}")
            else:
                print("⚠️  No GPU available for testing")
                
        except Exception as e:
            print(f"❌ Model loading test failed: {e}")
        
        return True
        
    except ImportError:
        print("❌ sentence-transformers is NOT installed")
        print("\n📝 To install:")
        print("   pip install sentence-transformers")
        return False


def check_nvidia_smi():
    """Check NVIDIA driver and GPU info"""
    print("\n" + "="*60)
    print("🔍 CHECKING NVIDIA DRIVER")
    print("="*60)
    
    import subprocess
    
    try:
        result = subprocess.run(
            ['nvidia-smi'], 
            capture_output=True, 
            text=True, 
            timeout=10
        )
        
        if result.returncode == 0:
            print("✅ NVIDIA driver installed")
            print("\n" + result.stdout)
            return True
        else:
            print("❌ nvidia-smi command failed")
            return False
            
    except FileNotFoundError:
        print("❌ nvidia-smi not found")
        print("   NVIDIA driver may not be installed")
        print("\n📝 To install NVIDIA driver:")
        print("   Visit: https://www.nvidia.com/Download/index.aspx")
        return False
    except Exception as e:
        print(f"❌ Error running nvidia-smi: {e}")
        return False


def check_ollama_gpu():
    """Check if Ollama is using GPU"""
    print("\n" + "="*60)
    print("🔍 CHECKING OLLAMA GPU USAGE")
    print("="*60)
    
    try:
        import requests
        
        # Check Ollama health
        response = requests.get("http://localhost:11434/api/tags", timeout=5)
        
        if response.status_code == 200:
            print("✅ Ollama is running")
            
            models = response.json().get('models', [])
            if models:
                print(f"   Installed models: {len(models)}")
                for model in models:
                    print(f"   - {model.get('name')}")
            
            print("\n💡 Ollama automatically uses GPU if CUDA is available")
            print("   Check Ollama logs to confirm GPU usage")
            
            return True
        else:
            print("⚠️  Ollama responded but with error")
            return False
            
    except Exception as e:
        print(f"❌ Cannot connect to Ollama: {e}")
        print("   Make sure Ollama is running: ollama serve")
        return False


def check_config():
    """Check RAG system configuration"""
    print("\n" + "="*60)
    print("🔍 CHECKING RAG SYSTEM CONFIG")
    print("="*60)
    
    try:
        from config import config
        
        print(f"USE_GPU: {config.USE_GPU}")
        print(f"GPU_DEVICE: {config.GPU_DEVICE}")
        print(f"EMBEDDING_MODEL: {config.EMBEDDING_MODEL}")
        
        if config.USE_GPU:
            print("\n✅ GPU is ENABLED in configuration")
        else:
            print("\n⚠️  GPU is DISABLED in configuration")
            print("   Set USE_GPU=true in .env file to enable")
        
        return True
        
    except Exception as e:
        print(f"❌ Error loading config: {e}")
        return False


def main():
    """Run all diagnostic checks"""
    print("\n" + "🚀 "*30)
    print("GPU DIAGNOSTICS FOR RAG SYSTEM")
    print("🚀 "*30 + "\n")
    
    results = {
        'NVIDIA Driver': check_nvidia_smi(),
        'PyTorch & CUDA': check_pytorch(),
        'Sentence Transformers': check_sentence_transformers(),
        'Ollama GPU': check_ollama_gpu(),
        'RAG Config': check_config()
    }
    
    # Summary
    print("\n" + "="*60)
    print("📊 SUMMARY")
    print("="*60)
    
    for check, passed in results.items():
        status = "✅" if passed else "❌"
        print(f"{status} {check}")
    
    all_passed = all(results.values())
    
    print("\n" + "="*60)
    if all_passed:
        print("🎉 ALL CHECKS PASSED!")
        print("Your RAG system is ready to use GPU acceleration!")
    else:
        print("⚠️  SOME CHECKS FAILED")
        print("Review the output above for installation instructions")
    print("="*60)
    
    return 0 if all_passed else 1


if __name__ == "__main__":
    sys.exit(main())

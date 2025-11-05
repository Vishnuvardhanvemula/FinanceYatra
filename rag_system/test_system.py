"""
Test Suite for RAG System
Verifies all components are working correctly
"""

import sys
import logging
from pathlib import Path

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(message)s')
logger = logging.getLogger(__name__)

def print_header(text):
    """Print formatted header"""
    print("\n" + "="*60)
    print(f"  {text}")
    print("="*60)

def print_success(text):
    """Print success message"""
    print(f"✅ {text}")

def print_error(text):
    """Print error message"""
    print(f"❌ {text}")

def print_info(text):
    """Print info message"""
    print(f"ℹ️  {text}")

def test_imports():
    """Test 1: Check all imports"""
    print_header("Test 1: Checking Module Imports")
    
    try:
        import langchain
        print_success("LangChain imported")
    except ImportError as e:
        print_error(f"LangChain import failed: {e}")
        return False
    
    try:
        import chromadb
        print_success("ChromaDB imported")
    except ImportError as e:
        print_error(f"ChromaDB import failed: {e}")
        return False
    
    try:
        from sentence_transformers import SentenceTransformer
        print_success("Sentence Transformers imported")
    except ImportError as e:
        print_error(f"Sentence Transformers import failed: {e}")
        return False
    
    try:
        import fastapi
        print_success("FastAPI imported")
    except ImportError as e:
        print_error(f"FastAPI import failed: {e}")
        return False
    
    return True

def test_config():
    """Test 2: Check configuration"""
    print_header("Test 2: Checking Configuration")
    
    try:
        from config import config
        print_success("Config loaded")
        print_info(f"Ollama URL: {config.OLLAMA_BASE_URL}")
        print_info(f"Ollama Model: {config.OLLAMA_MODEL}")
        print_info(f"Embedding Model: {config.EMBEDDING_MODEL}")
        print_info(f"ChromaDB Path: {config.CHROMA_PERSIST_DIRECTORY}")
        print_info(f"Supported Languages: {len(config.SUPPORTED_LANGUAGES)}")
        return True
    except Exception as e:
        print_error(f"Config error: {e}")
        return False

def test_ollama():
    """Test 3: Check Ollama connection"""
    print_header("Test 3: Checking Ollama")
    
    try:
        from llm_handler import get_llm
        llm = get_llm()
        
        if llm.check_health():
            print_success("Ollama is running")
            print_info(f"Model: {llm.model}")
            return True
        else:
            print_error("Ollama is not responding")
            print_info("Please start Ollama: ollama serve")
            print_info("And ensure model is pulled: ollama pull llama3")
            return False
    except Exception as e:
        print_error(f"Ollama check failed: {e}")
        return False

def test_embeddings():
    """Test 4: Check embeddings"""
    print_header("Test 4: Checking Embeddings")
    
    try:
        from embeddings_handler import get_embeddings
        
        print_info("Loading embeddings model (may take 10-30s on first run)...")
        embedder = get_embeddings()
        
        # Test embedding
        test_text = "What is EMI?"
        embedding = embedder.embed_query(test_text)
        
        print_success(f"Embeddings working")
        print_info(f"Embedding dimension: {len(embedding)}")
        print_info(f"Model: {embedder.model_name}")
        return True
    except Exception as e:
        print_error(f"Embeddings failed: {e}")
        print_info("This may take time on first run to download model (~100MB)")
        return False

def test_vector_store():
    """Test 5: Check vector store"""
    print_header("Test 5: Checking Vector Store")
    
    try:
        from vector_store import get_vector_store
        from langchain.schema import Document
        
        vs = get_vector_store()
        stats = vs.get_collection_stats()
        
        print_success("Vector store initialized")
        print_info(f"Collection: {stats['collection_name']}")
        print_info(f"Documents: {stats['document_count']}")
        
        if stats['document_count'] == 0:
            print_info("⚠️  No documents in vector store")
            print_info("Run: python ingest_documents.py data/documents/financial_basics.txt")
        
        return True
    except Exception as e:
        print_error(f"Vector store failed: {e}")
        return False

def test_translation():
    """Test 6: Check translation"""
    print_header("Test 6: Checking Translation")
    
    try:
        from translation_service import get_translator
        
        translator = get_translator()
        
        # Test detection
        test_texts = {
            "What is EMI?": "en",
            "EMI क्या है?": "hi",
            "EMI అంటే ఏమిటి?": "te"
        }
        
        all_correct = True
        for text, expected_lang in test_texts.items():
            detected = translator.detect_language(text)
            if detected == expected_lang:
                print_success(f"'{text}' → {detected}")
            else:
                print_error(f"'{text}' → {detected} (expected {expected_lang})")
                all_correct = False
        
        return all_correct
    except Exception as e:
        print_error(f"Translation failed: {e}")
        return False

def test_end_to_end():
    """Test 7: End-to-end RAG query"""
    print_header("Test 7: End-to-End RAG Query")
    
    try:
        from rag_pipeline import get_rag_pipeline
        
        rag = get_rag_pipeline()
        
        # Check if vector store has documents
        stats = rag.get_stats()
        if stats['vector_store']['document_count'] == 0:
            print_error("No documents in vector store")
            print_info("Run: python ingest_documents.py data/documents/financial_basics.txt")
            return False
        
        # Test query
        print_info("Testing query: 'What is EMI?'")
        result = rag.query("What is EMI?", k=2, return_sources=True)
        
        print_success("Query processed successfully")
        print_info(f"Answer length: {len(result['answer'])} characters")
        print_info(f"Query language: {result['query_language']}")
        print_info(f"Sources retrieved: {len(result.get('sources', []))}")
        
        print("\n📝 Answer Preview:")
        print("-" * 60)
        print(result['answer'][:300] + "..." if len(result['answer']) > 300 else result['answer'])
        print("-" * 60)
        
        if result.get('sources'):
            print("\n📚 Sources:")
            for i, source in enumerate(result['sources'][:2], 1):
                print(f"  [{i}] Score: {source['score']:.3f}")
                print(f"      {source['content'][:100]}...")
        
        return True
    except Exception as e:
        print_error(f"End-to-end test failed: {e}")
        import traceback
        traceback.print_exc()
        return False

def test_api():
    """Test 8: API endpoints"""
    print_header("Test 8: API Endpoints (Optional)")
    
    try:
        import requests
        
        # Check if API is running
        try:
            response = requests.get("http://localhost:8000/health", timeout=2)
            if response.status_code == 200:
                print_success("API is running")
                print_info(f"Status: {response.json()['status']}")
                return True
            else:
                print_info("API not running (this is optional)")
                print_info("To test API, run: python app.py")
                return True
        except requests.exceptions.ConnectionError:
            print_info("API not running (this is optional)")
            print_info("To test API, run: python app.py")
            return True
    except Exception as e:
        print_info("API test skipped")
        return True

def run_all_tests():
    """Run all tests"""
    print("\n")
    print("╔══════════════════════════════════════════════════════╗")
    print("║     FinanceYatra RAG System - Test Suite            ║")
    print("╚══════════════════════════════════════════════════════╝")
    
    tests = [
        ("Module Imports", test_imports),
        ("Configuration", test_config),
        ("Ollama Connection", test_ollama),
        ("Embeddings", test_embeddings),
        ("Vector Store", test_vector_store),
        ("Translation", test_translation),
        ("End-to-End Query", test_end_to_end),
        ("API Endpoints", test_api)
    ]
    
    results = []
    for name, test_func in tests:
        try:
            result = test_func()
            results.append((name, result))
        except Exception as e:
            print_error(f"Test '{name}' crashed: {e}")
            results.append((name, False))
    
    # Summary
    print_header("Test Summary")
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {name}")
    
    print("\n" + "="*60)
    print(f"Results: {passed}/{total} tests passed")
    print("="*60 + "\n")
    
    if passed == total:
        print("🎉 All tests passed! Your RAG system is ready to use!")
        print("\nQuick Start:")
        print("  • Interactive mode: python query_handler.py")
        print("  • API server: python app.py")
        print("  • Documentation: See README.md")
        return 0
    else:
        print("⚠️  Some tests failed. Please check the errors above.")
        print("\nCommon fixes:")
        print("  • Ensure Ollama is running: ollama serve")
        print("  • Ensure llama3 model is pulled: ollama pull llama3")
        print("  • Ingest documents: python ingest_documents.py data/documents/")
        print("  • Check .env configuration")
        return 1

if __name__ == "__main__":
    sys.exit(run_all_tests())

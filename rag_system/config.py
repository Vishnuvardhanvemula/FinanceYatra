"""
Configuration module for RAG system
Loads environment variables and provides centralized config access
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Config:
    """Centralized configuration for RAG system"""
    
    # Ollama LLM Configuration
    OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
    OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3")
    
    # ChromaDB Configuration
    CHROMA_PERSIST_DIRECTORY = os.getenv("CHROMA_PERSIST_DIRECTORY", "./chroma_db")
    CHROMA_COLLECTION_NAME = os.getenv("CHROMA_COLLECTION_NAME", "financial_knowledge")
    
    # Embedding Model Configuration
    # Options: 
    # - sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2 (384 dim, fast)
    # - intfloat/multilingual-e5-base (768 dim, more accurate)
    EMBEDDING_MODEL = os.getenv(
        "EMBEDDING_MODEL", 
        "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
    )
    
    # GPU Configuration
    USE_GPU = os.getenv("USE_GPU", "false").lower() == "true"
    GPU_DEVICE = int(os.getenv("GPU_DEVICE", "0"))
    
    # Document Processing
    CHUNK_SIZE = int(os.getenv("CHUNK_SIZE", "250"))  # words per chunk
    CHUNK_OVERLAP = int(os.getenv("CHUNK_OVERLAP", "50"))  # overlap between chunks
    
    # API Configuration
    API_HOST = os.getenv("API_HOST", "0.0.0.0")
    API_PORT = int(os.getenv("API_PORT", "8000"))
    
    # Translation Configuration
    ENABLE_TRANSLATION = os.getenv("ENABLE_TRANSLATION", "true").lower() == "true"
    
    # Supported Languages
    SUPPORTED_LANGUAGES = {
        "en": {"name": "English", "code": "en"},
        "hi": {"name": "Hindi", "code": "hi"},
        "te": {"name": "Telugu", "code": "te"},
        "ta": {"name": "Tamil", "code": "ta"},
        "bn": {"name": "Bengali", "code": "bn"},
        "kn": {"name": "Kannada", "code": "kn"},
        "ml": {"name": "Malayalam", "code": "ml"},
        "mr": {"name": "Marathi", "code": "mr"},
        "gu": {"name": "Gujarati", "code": "gu"},
        "pa": {"name": "Punjabi", "code": "pa"}
    }
    
    # Data directories
    BASE_DIR = Path(__file__).parent
    DATA_DIR = BASE_DIR / "data"
    DOCUMENTS_DIR = DATA_DIR / "documents"
    
    # Create directories if they don't exist
    DATA_DIR.mkdir(exist_ok=True)
    DOCUMENTS_DIR.mkdir(exist_ok=True)
    Path(CHROMA_PERSIST_DIRECTORY).mkdir(exist_ok=True)

# Create singleton instance
config = Config()

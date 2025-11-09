"""
Embeddings Handler Module
Manages multilingual embeddings using HuggingFace sentence-transformers
"""

import logging
from typing import List
from langchain.embeddings import HuggingFaceEmbeddings
from config import config

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class MultilingualEmbeddings:
    """
    Handles creation of multilingual embeddings for RAG
    Uses HuggingFace sentence-transformers models optimized for multilingual content
    """
    
    def __init__(self, model_name: str = None):
        """
        Initialize multilingual embeddings model
        
        Args:
            model_name: HuggingFace model identifier
                       Default: paraphrase-multilingual-MiniLM-L12-v2 (384 dim, fast)
                       Alternative: intfloat/multilingual-e5-base (768 dim, accurate)
        """
        self.model_name = model_name or config.EMBEDDING_MODEL
        
        logger.info(f"🔄 Loading embedding model: {self.model_name}")
        
        # Determine device (GPU or CPU)
        device = 'cpu'
        if config.USE_GPU:
            try:
                import torch
                if torch.cuda.is_available():
                    device = f'cuda:{config.GPU_DEVICE}'
                    logger.info(f"🚀 GPU detected! Using device: {device}")
                    logger.info(f"   GPU Name: {torch.cuda.get_device_name(config.GPU_DEVICE)}")
                    logger.info(f"   GPU Memory: {torch.cuda.get_device_properties(config.GPU_DEVICE).total_memory / 1e9:.2f} GB")
                else:
                    logger.warning("⚠️  GPU requested but CUDA not available. Falling back to CPU.")
            except ImportError:
                logger.warning("⚠️  PyTorch not found. Falling back to CPU.")
        else:
            logger.info("💻 Using CPU for embeddings")
        
        # Load HuggingFace embeddings
        # This will download the model on first run (~100-500MB depending on model)
        self.embeddings = HuggingFaceEmbeddings(
            model_name=self.model_name,
            model_kwargs={'device': device},  # Use GPU if available
            encode_kwargs={
                'normalize_embeddings': True,  # Normalize for cosine similarity
                'batch_size': 64 if device.startswith('cuda') else 32  # Larger batches on GPU
            }
        )
        
        logger.info(f"✅ Embedding model loaded successfully on {device}")
    
    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        """
        Create embeddings for multiple documents
        
        Args:
            texts: List of text strings to embed
            
        Returns:
            List of embedding vectors (each vector is a list of floats)
        """
        if not texts:
            return []
        
        logger.info(f"🔄 Embedding {len(texts)} documents...")
        embeddings = self.embeddings.embed_documents(texts)
        logger.info(f"✅ Created {len(embeddings)} embeddings (dim: {len(embeddings[0])})")
        return embeddings
    
    def embed_query(self, text: str) -> List[float]:
        """
        Create embedding for a single query
        
        Args:
            text: Query text to embed
            
        Returns:
            Embedding vector (list of floats)
        """
        logger.info(f"🔍 Embedding query: '{text[:50]}...'")
        embedding = self.embeddings.embed_query(text)
        return embedding
    
    def get_embedding_dimension(self) -> int:
        """
        Get the dimension of embeddings produced by this model
        
        Returns:
            Embedding dimension (384 or 768 depending on model)
        """
        # Test with a dummy text
        test_embedding = self.embed_query("test")
        return len(test_embedding)


def get_embeddings(model_name: str = None) -> MultilingualEmbeddings:
    """
    Factory function to get embeddings instance
    
    Args:
        model_name: Optional model name override
        
    Returns:
        MultilingualEmbeddings instance
    """
    return MultilingualEmbeddings(model_name)


if __name__ == "__main__":
    """Test embeddings"""
    print("🧪 Testing Multilingual Embeddings\n")
    
    # Initialize embeddings
    embedder = MultilingualEmbeddings()
    
    # Test with multilingual queries
    test_queries = [
        "What is EMI?",
        "EMI क्या है?",  # Hindi
        "EMI అంటే ఏమిటి?",  # Telugu
        "EMI என்றால் என்ன?",  # Tamil
    ]
    
    print(f"Model: {embedder.model_name}")
    print(f"Embedding dimension: {embedder.get_embedding_dimension()}\n")
    
    for query in test_queries:
        embedding = embedder.embed_query(query)
        print(f"Query: {query}")
        print(f"Embedding shape: {len(embedding)}")
        print(f"First 5 values: {embedding[:5]}")
        print()

"""
Vector Store Module
Manages ChromaDB vector database for document storage and retrieval
"""

import logging
from typing import List, Dict, Any, Optional
from pathlib import Path

import chromadb
from chromadb.config import Settings
from langchain.schema import Document
from langchain_community.vectorstores import Chroma

from embeddings_handler import get_embeddings
from config import config

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class VectorStore:
    """
    Manages ChromaDB vector store for RAG system
    Handles document ingestion, embedding storage, and similarity search
    """
    
    def __init__(self, collection_name: str = None, persist_directory: str = None):
        """
        Initialize ChromaDB vector store
        
        Args:
            collection_name: Name of the ChromaDB collection
            persist_directory: Directory to persist the database
        """
        self.collection_name = collection_name or config.CHROMA_COLLECTION_NAME
        self.persist_directory = persist_directory or config.CHROMA_PERSIST_DIRECTORY
        
        # Initialize embeddings
        logger.info("🔄 Initializing embeddings...")
        self.embeddings = get_embeddings()
        
        # Initialize ChromaDB
        logger.info(f"🔄 Initializing ChromaDB (collection: {self.collection_name})")
        
        # Create persistent ChromaDB client
        self.chroma_client = chromadb.PersistentClient(
            path=self.persist_directory,
            settings=Settings(
                anonymized_telemetry=False,  # Disable telemetry
                allow_reset=True
            )
        )
        
        # Initialize LangChain Chroma wrapper
        self.vectorstore = Chroma(
            client=self.chroma_client,
            collection_name=self.collection_name,
            embedding_function=self.embeddings.embeddings,
            persist_directory=self.persist_directory
        )
        
        logger.info("✅ Vector store initialized successfully")
    
    def add_documents(self, documents: List[Document], batch_size: int = 100) -> List[str]:
        """
        Add documents to vector store with embeddings
        
        Args:
            documents: List of LangChain Document objects
            batch_size: Number of documents to process at once
            
        Returns:
            List of document IDs
        """
        if not documents:
            logger.warning("⚠️ No documents to add")
            return []
        
        logger.info(f"🔄 Adding {len(documents)} documents to vector store...")
        
        try:
            # Add documents in batches for memory efficiency
            all_ids = []
            for i in range(0, len(documents), batch_size):
                batch = documents[i:i + batch_size]
                ids = self.vectorstore.add_documents(batch)
                all_ids.extend(ids)
                logger.info(f"✅ Added batch {i // batch_size + 1}/{(len(documents) - 1) // batch_size + 1}")
            
            logger.info(f"✅ Successfully added {len(all_ids)} documents")
            return all_ids
            
        except Exception as e:
            logger.error(f"❌ Error adding documents: {e}")
            raise
    
    def similarity_search(
        self, 
        query: str, 
        k: int = 3,
        filter: Dict[str, Any] = None
    ) -> List[Document]:
        """
        Search for similar documents using semantic similarity
        
        Args:
            query: Search query
            k: Number of results to return
            filter: Optional metadata filter (e.g., {"category": "loans"})
            
        Returns:
            List of most similar Documents
        """
        logger.info(f"🔍 Searching for: '{query[:50]}...' (k={k})")
        
        try:
            # Perform similarity search
            if filter:
                results = self.vectorstore.similarity_search(
                    query, 
                    k=k,
                    filter=filter
                )
            else:
                results = self.vectorstore.similarity_search(query, k=k)
            
            logger.info(f"✅ Found {len(results)} relevant documents")
            return results
            
        except Exception as e:
            logger.error(f"❌ Error in similarity search: {e}")
            return []
    
    def similarity_search_with_score(
        self, 
        query: str, 
        k: int = 3,
        filter: Dict[str, Any] = None
    ) -> List[tuple[Document, float]]:
        """
        Search with similarity scores
        
        Args:
            query: Search query
            k: Number of results
            filter: Optional metadata filter
            
        Returns:
            List of tuples (Document, similarity_score)
        """
        logger.info(f"🔍 Searching with scores: '{query[:50]}...' (k={k})")
        
        try:
            if filter:
                results = self.vectorstore.similarity_search_with_score(
                    query, 
                    k=k,
                    filter=filter
                )
            else:
                results = self.vectorstore.similarity_search_with_score(query, k=k)
            
            logger.info(f"✅ Found {len(results)} documents with scores")
            for i, (doc, score) in enumerate(results, 1):
                logger.info(f"  {i}. Score: {score:.3f} | Source: {doc.metadata.get('source', 'unknown')}")
            
            return results
            
        except Exception as e:
            logger.error(f"❌ Error in similarity search: {e}")
            return []
    
    def get_collection_stats(self) -> Dict[str, Any]:
        """
        Get statistics about the vector store collection
        
        Returns:
            Dictionary with collection statistics
        """
        try:
            collection = self.chroma_client.get_collection(self.collection_name)
            count = collection.count()
            
            stats = {
                "collection_name": self.collection_name,
                "document_count": count,
                "persist_directory": self.persist_directory
            }
            
            logger.info(f"📊 Collection stats: {count} documents")
            return stats
            
        except Exception as e:
            logger.error(f"❌ Error getting collection stats: {e}")
            return {"error": str(e)}
    
    def delete_collection(self):
        """Delete the entire collection (use with caution!)"""
        logger.warning(f"⚠️ Deleting collection: {self.collection_name}")
        try:
            self.chroma_client.delete_collection(self.collection_name)
            logger.info("✅ Collection deleted")
        except Exception as e:
            logger.error(f"❌ Error deleting collection: {e}")
    
    def reset(self):
        """Reset the vector store (delete and reinitialize)"""
        logger.warning("⚠️ Resetting vector store...")
        self.delete_collection()
        self.__init__(self.collection_name, self.persist_directory)


def get_vector_store(collection_name: str = None) -> VectorStore:
    """
    Factory function to get vector store instance
    
    Args:
        collection_name: Optional collection name override
        
    Returns:
        VectorStore instance
    """
    return VectorStore(collection_name=collection_name)


if __name__ == "__main__":
    """Test vector store"""
    print("🧪 Testing Vector Store\n")
    
    # Initialize vector store
    vs = VectorStore()
    
    # Create sample documents
    sample_docs = [
        Document(
            page_content="EMI stands for Equated Monthly Installment. It is a fixed payment amount made by a borrower to a lender.",
            metadata={"category": "loans", "language": "en", "topic": "EMI"}
        ),
        Document(
            page_content="UPI is Unified Payments Interface. It is an instant real-time payment system developed by NPCI.",
            metadata={"category": "payments", "language": "en", "topic": "UPI"}
        ),
        Document(
            page_content="Fixed Deposit provides higher interest than savings account. Tenure ranges from 7 days to 10 years.",
            metadata={"category": "savings", "language": "en", "topic": "FD"}
        )
    ]
    
    # Add documents
    print("Adding sample documents...")
    vs.add_documents(sample_docs)
    
    # Get stats
    print("\nCollection stats:")
    stats = vs.get_collection_stats()
    print(stats)
    
    # Test search
    print("\n" + "="*50)
    print("Testing similarity search:")
    print("="*50)
    
    queries = [
        "What is EMI?",
        "How does UPI work?",
        "Tell me about fixed deposits"
    ]
    
    for query in queries:
        print(f"\nQuery: {query}")
        results = vs.similarity_search_with_score(query, k=2)
        for doc, score in results:
            print(f"  Score: {score:.3f}")
            print(f"  Content: {doc.page_content[:100]}...")
            print(f"  Metadata: {doc.metadata}")

"""
Document Ingestion Script
Load documents into ChromaDB vector store
Run this script to ingest knowledge base documents
"""

import argparse
import logging
from pathlib import Path

from data_loader import DocumentLoader, load_documents
from vector_store import get_vector_store
from config import config

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def ingest_documents(
    source_path: str,
    collection_name: str = None,
    reset_collection: bool = False,
    batch_size: int = 100
):
    """
    Ingest documents into vector store
    
    Args:
        source_path: Path to document file or directory
        collection_name: ChromaDB collection name
        reset_collection: Whether to reset existing collection
        batch_size: Batch size for ingestion
    """
    logger.info("="*60)
    logger.info("📚 Starting Document Ingestion")
    logger.info("="*60)
    
    # Initialize vector store
    logger.info(f"🔄 Initializing vector store (collection: {collection_name or config.CHROMA_COLLECTION_NAME})")
    vector_store = get_vector_store(collection_name)
    
    # Reset collection if requested
    if reset_collection:
        logger.warning("⚠️ Resetting collection...")
        vector_store.reset()
        vector_store = get_vector_store(collection_name)
    
    # Load documents
    logger.info(f"📂 Loading documents from: {source_path}")
    
    metadata = {
        "ingestion_source": str(source_path),
        "category": "financial_knowledge"
    }
    
    documents = load_documents(source_path, metadata)
    
    if not documents:
        logger.error("❌ No documents loaded!")
        return
    
    logger.info(f"✅ Loaded {len(documents)} document chunks")
    
    # Ingest into vector store
    logger.info(f"🔄 Ingesting documents into vector store...")
    doc_ids = vector_store.add_documents(documents, batch_size=batch_size)
    
    logger.info(f"✅ Successfully ingested {len(doc_ids)} documents")
    
    # Show final stats
    stats = vector_store.get_collection_stats()
    logger.info("="*60)
    logger.info("📊 Final Statistics")
    logger.info("="*60)
    for key, value in stats.items():
        logger.info(f"  {key}: {value}")
    
    logger.info("\n✅ Ingestion complete!")


def main():
    """Main entry point for CLI"""
    parser = argparse.ArgumentParser(
        description="Ingest documents into ChromaDB vector store for RAG"
    )
    
    parser.add_argument(
        "source",
        type=str,
        help="Path to document file or directory to ingest"
    )
    
    parser.add_argument(
        "--collection",
        type=str,
        default=None,
        help=f"ChromaDB collection name (default: {config.CHROMA_COLLECTION_NAME})"
    )
    
    parser.add_argument(
        "--reset",
        action="store_true",
        help="Reset (delete) existing collection before ingestion"
    )
    
    parser.add_argument(
        "--batch-size",
        type=int,
        default=100,
        help="Batch size for ingestion (default: 100)"
    )
    
    args = parser.parse_args()
    
    # Validate source path
    source_path = Path(args.source)
    if not source_path.exists():
        logger.error(f"❌ Source path not found: {source_path}")
        return
    
    # Run ingestion
    ingest_documents(
        source_path=str(source_path),
        collection_name=args.collection,
        reset_collection=args.reset,
        batch_size=args.batch_size
    )


if __name__ == "__main__":
    """
    Usage examples:
    
    # Ingest a single file
    python ingest_documents.py data/documents/financial_basics.txt
    
    # Ingest all files in a directory
    python ingest_documents.py data/documents/
    
    # Reset collection and ingest
    python ingest_documents.py data/documents/ --reset
    
    # Use custom collection name
    python ingest_documents.py data/documents/ --collection my_collection
    """
    main()

"""
Query Handler Script
Interactive CLI for testing RAG pipeline
"""

import argparse
import logging
from rag_pipeline import get_rag_pipeline
from config import config

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def interactive_query_loop(rag: any):
    """
    Interactive query loop for testing
    
    Args:
        rag: RAG pipeline instance
    """
    print("\n" + "="*60)
    print("🤖 FinanceYatra Interactive Query Handler")
    print("="*60)
    print("\nSupported languages:", ", ".join(config.SUPPORTED_LANGUAGES.keys()))
    print("\nCommands:")
    print("  - Type your question in any supported language")
    print("  - Type 'stats' to see system statistics")
    print("  - Type 'quit' or 'exit' to exit")
    print("\n" + "="*60 + "\n")
    
    while True:
        try:
            # Get user input
            user_input = input("You: ").strip()
            
            if not user_input:
                continue
            
            # Handle commands
            if user_input.lower() in ['quit', 'exit', 'q']:
                print("\n👋 Goodbye!")
                break
            
            if user_input.lower() == 'stats':
                stats = rag.get_stats()
                print("\n📊 System Statistics:")
                for key, value in stats.items():
                    print(f"  {key}: {value}")
                print()
                continue
            
            # Process query
            print("\n🔄 Processing...\n")
            result = rag.query(
                user_query=user_input,
                k=3,
                return_sources=True
            )
            
            # Display answer
            print("🤖 Assistant:")
            print(result['answer'])
            
            # Display metadata
            print(f"\n📝 Query Language: {result['query_language']}")
            print(f"🔄 Translation Used: {result['translation_used']}")
            
            # Display sources
            if result.get('sources'):
                print(f"\n📚 Sources ({len(result['sources'])}):")
                for i, source in enumerate(result['sources'], 1):
                    print(f"\n  [{i}] Score: {source['score']:.3f}")
                    print(f"      Content: {source['content'][:100]}...")
                    if source['metadata']:
                        print(f"      Metadata: {source['metadata']}")
            
            print("\n" + "-"*60 + "\n")
            
        except KeyboardInterrupt:
            print("\n\n👋 Goodbye!")
            break
        except Exception as e:
            logger.error(f"❌ Error: {e}")
            print(f"\n❌ Error: {e}\n")


def single_query(rag: any, query: str, language: str = None, k: int = 3):
    """
    Process a single query and exit
    
    Args:
        rag: RAG pipeline instance
        query: Query text
        language: Target language
        k: Number of context documents
    """
    print("\n" + "="*60)
    print(f"Query: {query}")
    print("="*60 + "\n")
    
    result = rag.query(
        user_query=query,
        k=k,
        language=language,
        return_sources=True
    )
    
    print("Answer:")
    print(result['answer'])
    
    print(f"\nQuery Language: {result['query_language']}")
    print(f"Translation Used: {result['translation_used']}")
    
    if result.get('sources'):
        print(f"\nSources ({len(result['sources'])}):")
        for i, source in enumerate(result['sources'], 1):
            print(f"\n  [{i}] Score: {source['score']:.3f}")
            print(f"      {source['content'][:150]}...")


def main():
    """Main entry point for CLI"""
    parser = argparse.ArgumentParser(
        description="Query handler for FinanceYatra RAG system"
    )
    
    parser.add_argument(
        "--query",
        type=str,
        help="Single query to process (if not provided, starts interactive mode)"
    )
    
    parser.add_argument(
        "--language",
        type=str,
        default=None,
        help="Target language for response (auto-detect if not provided)"
    )
    
    parser.add_argument(
        "--k",
        type=int,
        default=3,
        help="Number of context documents to retrieve (default: 3)"
    )
    
    parser.add_argument(
        "--collection",
        type=str,
        default=None,
        help=f"ChromaDB collection name (default: {config.CHROMA_COLLECTION_NAME})"
    )
    
    args = parser.parse_args()
    
    # Initialize RAG pipeline
    print("\n🚀 Initializing RAG pipeline...")
    rag = get_rag_pipeline(vector_store_collection=args.collection)
    print("✅ Ready!\n")
    
    # Single query mode or interactive mode
    if args.query:
        single_query(rag, args.query, args.language, args.k)
    else:
        interactive_query_loop(rag)


if __name__ == "__main__":
    """
    Usage examples:
    
    # Interactive mode
    python query_handler.py
    
    # Single query
    python query_handler.py --query "What is EMI?"
    
    # Query with specific language
    python query_handler.py --query "EMI क्या है?" --language hi
    
    # Query with more context
    python query_handler.py --query "Tell me about UPI" --k 5
    """
    main()

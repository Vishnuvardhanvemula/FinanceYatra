"""
RAG Pipeline Module
Complete Retrieval-Augmented Generation pipeline
Combines all components: Translation → Retrieval → Generation
"""

import logging
from typing import Dict, Any, List, Optional
from langchain.schema import Document

from vector_store import get_vector_store
from llm_handler import get_llm
from translation_service import get_translator
from prompt_templates import get_system_prompt
from config import config

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class RAGPipeline:
    """
    Complete RAG pipeline for multilingual financial chatbot
    
    Flow:
    1. User query (any language) → Detect language
    2. Translate query to English (if needed)
    3. Retrieve relevant context from vector store
    4. Generate answer using LLM + context
    5. Translate answer back to user's language
    6. Return response
    """
    
    def __init__(
        self,
        vector_store_collection: str = None,
        llm_model: str = None,
        enable_translation: bool = None
    ):
        """
        Initialize RAG pipeline with all components
        
        Args:
            vector_store_collection: ChromaDB collection name
            llm_model: Ollama model name
            enable_translation: Enable/disable translation
        """
        logger.info("🚀 Initializing RAG Pipeline...")
        
        # Initialize components
        self.vector_store = get_vector_store(vector_store_collection)
        self.llm = get_llm(llm_model)
        self.translator = get_translator()
        
        self.enable_translation = (
            enable_translation 
            if enable_translation is not None 
            else config.ENABLE_TRANSLATION
        )
        
        logger.info("✅ RAG Pipeline ready")
    
    def query(
        self,
        user_query: str,
        k: int = 2,
        language: Optional[str] = None,
        proficiency_level: Optional[str] = None,
        metadata_filter: Optional[Dict[str, Any]] = None,
        return_sources: bool = True
    ) -> Dict[str, Any]:
        """
        Complete RAG query pipeline
        
        Args:
            user_query: User's question (any language)
            k: Number of context documents to retrieve
            language: Target language for response (auto-detect if None)
            proficiency_level: User proficiency level (beginner/intermediate/expert)
            metadata_filter: Optional filter for vector search
            return_sources: Include source documents in response
            
        Returns:
            Dictionary with:
                - answer: Generated answer in target language
                - sources: List of source documents (if return_sources=True)
                - query_language: Detected query language
                - translation_used: Boolean indicating if translation was used
        """
        logger.info(f"📝 Processing query: '{user_query[:50]}...' [Level: {proficiency_level or 'unknown'}]")
        
        try:
            # Step 1: Detect query language
            query_language = self.translator.detect_language(user_query)
            logger.info(f"🔍 Query language: {query_language}")
            
            # Step 2: Translate to English if needed
            english_query = user_query
            if self.enable_translation and query_language != 'en':
                english_query = self.translator.translate_to_english(user_query)
                logger.info(f"🔄 Translated query: {english_query}")
            
            # Step 3: Retrieve relevant context (retrieve more, filter by relevance)
            logger.info(f"🔍 Retrieving {k} relevant documents...")
            results = self.vector_store.similarity_search_with_score(
                english_query,
                k=k,
                filter=metadata_filter
            )
            
            # Filter by relevance threshold (only keep highly relevant documents)
            relevance_threshold = 0.7  # Only use documents with similarity > 0.7
            results = [(doc, score) for doc, score in results if score >= relevance_threshold]
            
            if not results:
                logger.warning("⚠️ No relevant documents found (below threshold)")
                fallback_message = "I don't have enough information to answer that question. Please ask about financial topics like EMI, UPI, savings, loans, or investments."
                
                # Translate fallback message if needed
                if self.enable_translation and language and language != 'en':
                    target_lang = language or query_language
                    fallback_message = self.translator.translate_from_english(fallback_message, target_lang)
                    translation_used = True
                else:
                    translation_used = False
                
                return {
                    "answer": fallback_message,
                    "sources": [],
                    "query_language": query_language,
                    "translation_used": translation_used
                }
            
            # Extract documents and scores
            documents = [doc for doc, score in results]
            scores = [score for doc, score in results]
            context_texts = [doc.page_content for doc in documents]
            
            logger.info(f"✅ Retrieved {len(documents)} documents (avg score: {sum(scores)/len(scores):.3f})")
            
            # Step 4: Get level-specific system prompt
            system_prompt = get_system_prompt(proficiency_level)
            
            # Step 5: Generate answer using LLM + context
            logger.info(f"🤖 Generating answer [Level: {proficiency_level or 'unknown'}]...")
            english_answer = self.llm.generate_with_context(
                query=english_query,
                context_documents=context_texts,
                system_prompt=system_prompt,
                temperature=0.7,
                proficiency_level=proficiency_level
            )
            
            # Step 6: Translate answer back to user's language
            final_answer = english_answer
            translation_used = False
            
            # Determine target language: use explicit 'language' param first, then detected language
            target_lang = language if language else query_language
            
            if self.enable_translation and target_lang != 'en':
                logger.info(f"🔄 Translating answer to {target_lang}")
                final_answer = self.translator.translate_from_english(
                    english_answer,
                    target_lang
                )
                translation_used = True
            
            # Step 7: Prepare response
            response = {
                "answer": final_answer,
                "query_language": query_language,
                "translation_used": translation_used,
                "english_query": english_query if translation_used else None,
                "english_answer": english_answer if translation_used else None
            }
            
            # Add sources if requested
            if return_sources:
                response["sources"] = [
                    {
                        "content": doc.page_content,
                        "metadata": doc.metadata,
                        "score": score
                    }
                    for doc, score in results
                ]
            
            logger.info("✅ Query processed successfully")
            return response
            
        except Exception as e:
            logger.error(f"❌ Error processing query: {e}")
            return {
                "answer": f"I encountered an error processing your question. Please try again.",
                "error": str(e),
                "sources": [],
                "query_language": "en",
                "translation_used": False
            }
    
    def get_stats(self) -> Dict[str, Any]:
        """
        Get statistics about the RAG system
        
        Returns:
            Dictionary with system statistics
        """
        stats = {
            "vector_store": self.vector_store.get_collection_stats(),
            "llm_model": self.llm.model,
            "llm_status": "online" if self.llm.check_health() else "offline",
            "translation_enabled": self.enable_translation,
            "supported_languages": len(self.translator.supported_languages)
        }
        return stats


def get_rag_pipeline(
    vector_store_collection: str = None,
    llm_model: str = None
) -> RAGPipeline:
    """
    Factory function to get RAG pipeline instance
    
    Args:
        vector_store_collection: Optional collection name override
        llm_model: Optional model name override
        
    Returns:
        RAGPipeline instance
    """
    return RAGPipeline(
        vector_store_collection=vector_store_collection,
        llm_model=llm_model
    )


if __name__ == "__main__":
    """Test RAG pipeline"""
    print("🧪 Testing RAG Pipeline\n")
    
    # Initialize pipeline
    rag = RAGPipeline()
    
    # Get stats
    print("="*50)
    print("System Statistics")
    print("="*50)
    stats = rag.get_stats()
    for key, value in stats.items():
        print(f"{key}: {value}")
    
    # Test queries
    print("\n" + "="*50)
    print("Test Queries")
    print("="*50)
    
    test_queries = [
        ("What is EMI?", "en"),
        ("EMI क्या है?", "hi"),
        ("UPI అంటే ఏమిటి?", "te"),
        ("Tell me about Fixed Deposits", "en")
    ]
    
    for query, expected_lang in test_queries:
        print(f"\n{'='*50}")
        print(f"Query: {query}")
        print(f"{'='*50}")
        
        result = rag.query(query, k=2)
        
        print(f"Detected Language: {result['query_language']}")
        print(f"Translation Used: {result['translation_used']}")
        print(f"\nAnswer:\n{result['answer']}")
        
        if result.get('sources'):
            print(f"\nSources ({len(result['sources'])}):")
            for i, source in enumerate(result['sources'], 1):
                print(f"  {i}. Score: {source['score']:.3f}")
                print(f"     Content: {source['content'][:100]}...")
                print(f"     Metadata: {source['metadata']}")

"""
LLM Handler Module
Manages Ollama LLM integration for response generation
"""

import logging
import requests
from typing import List, Dict, Any, Optional
from config import config

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class OllamaLLM:
    """
    Handles interaction with local Ollama LLM
    Supports llama3 and other Ollama models
    """
    
    def __init__(self, model: str = None, base_url: str = None):
        """
        Initialize Ollama LLM client
        
        Args:
            model: Ollama model name (default: llama3)
            base_url: Ollama API base URL
        """
        self.model = model or config.OLLAMA_MODEL
        self.base_url = base_url or config.OLLAMA_BASE_URL
        self.api_url = f"{self.base_url}/api/generate"
        
        logger.info(f"🔄 Initializing Ollama LLM (model: {self.model})")
        
        # Check if Ollama is running
        if self.check_health():
            logger.info("✅ Ollama is running and ready")
        else:
            logger.warning("⚠️ Ollama may not be running. Please start Ollama service.")
    
    def check_health(self) -> bool:
        """
        Check if Ollama service is running
        
        Returns:
            True if Ollama is accessible, False otherwise
        """
        try:
            response = requests.get(f"{self.base_url}/api/tags", timeout=5)
            return response.status_code == 200
        except Exception as e:
            logger.error(f"❌ Ollama health check failed: {e}")
            return False
    
    def generate(
        self, 
        prompt: str, 
        system_prompt: Optional[str] = None,
        temperature: float = 0.7,
        max_tokens: int = 500
    ) -> str:
        """
        Generate response from Ollama
        
        Args:
            prompt: User prompt/question
            system_prompt: Optional system instructions
            temperature: Sampling temperature (0.0 to 1.0)
            max_tokens: Maximum tokens to generate
            
        Returns:
            Generated response text
        """
        logger.info(f"🤖 Generating response for: '{prompt[:50]}...'")
        
        try:
            # Prepare the full prompt
            if system_prompt:
                full_prompt = f"{system_prompt}\n\nUser: {prompt}\n\nAssistant:"
            else:
                full_prompt = prompt
            
            # Prepare request payload
            payload = {
                "model": self.model,
                "prompt": full_prompt,
                "stream": False,
                "options": {
                    "temperature": temperature,
                    "num_predict": max_tokens
                }
            }
            
            # Send request to Ollama
            response = requests.post(
                self.api_url,
                json=payload,
                timeout=60  # 60 second timeout for generation
            )
            
            if response.status_code == 200:
                result = response.json()
                generated_text = result.get("response", "")
                logger.info(f"✅ Generated {len(generated_text)} characters")
                return generated_text.strip()
            else:
                logger.error(f"❌ Ollama API error: {response.status_code}")
                return f"Error: Unable to generate response (status {response.status_code})"
                
        except requests.exceptions.Timeout:
            logger.error("❌ Ollama request timeout")
            return "Error: Request timeout. Please try again."
        except Exception as e:
            logger.error(f"❌ Error generating response: {e}")
            return f"Error: {str(e)}"
    
    def generate_with_context(
        self,
        query: str,
        context_documents: List[str],
        system_prompt: Optional[str] = None,
        temperature: float = 0.7
    ) -> str:
        """
        Generate response using retrieved context (RAG)
        
        Args:
            query: User query
            context_documents: List of relevant document texts
            system_prompt: Optional system instructions
            temperature: Sampling temperature
            
        Returns:
            Generated response grounded in context
        """
        # Build context section
        context_text = "\n\n".join([
            f"[Context {i+1}]\n{doc}" 
            for i, doc in enumerate(context_documents)
        ])
        
        # Build RAG prompt
        rag_prompt = f"""Context Information:
{context_text}

Based on the above context, please answer the following question. If the context doesn't contain enough information, say so clearly.

Question: {query}

Answer:"""
        
        # Use system prompt if provided
        if not system_prompt:
            system_prompt = """You are a helpful financial literacy assistant for India. 
Your role is to explain financial concepts in simple, easy-to-understand language.
Always provide accurate information based on the given context.
If you're unsure or the context doesn't provide enough information, be honest about it."""
        
        return self.generate(rag_prompt, system_prompt, temperature)


def get_llm(model: str = None) -> OllamaLLM:
    """
    Factory function to get LLM instance
    
    Args:
        model: Optional model name override
        
    Returns:
        OllamaLLM instance
    """
    return OllamaLLM(model=model)


if __name__ == "__main__":
    """Test Ollama LLM"""
    print("🧪 Testing Ollama LLM\n")
    
    # Initialize LLM
    llm = OllamaLLM()
    
    # Test basic generation
    print("="*50)
    print("Test 1: Basic Generation")
    print("="*50)
    
    response = llm.generate(
        prompt="What is EMI in simple terms?",
        system_prompt="You are a helpful financial advisor. Explain concepts simply."
    )
    print(f"\nResponse:\n{response}\n")
    
    # Test RAG generation
    print("="*50)
    print("Test 2: RAG Generation")
    print("="*50)
    
    context_docs = [
        "EMI stands for Equated Monthly Installment. It is a fixed payment amount made by a borrower to a lender at a specified date each calendar month.",
        "The EMI formula is: EMI = [P x R x (1+R)^N]/[(1+R)^N-1]. Where P = Principal, R = Rate of interest, N = Number of installments."
    ]
    
    response = llm.generate_with_context(
        query="How is EMI calculated?",
        context_documents=context_docs
    )
    print(f"\nResponse:\n{response}\n")

"""
FastAPI Application for RAG System
REST API endpoints for querying the financial chatbot
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
import logging
import uvicorn

from rag_pipeline import get_rag_pipeline
from config import config

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="FinanceYatra RAG API",
    description="Multilingual Financial Literacy Chatbot with RAG",
    version="1.0.0"
)

# Add CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize RAG pipeline
rag_pipeline = None


# Request/Response models
class QueryRequest(BaseModel):
    """Request model for chat query"""
    query: str = Field(..., description="User's question", min_length=1)
    language: Optional[str] = Field(None, description="Target language code (en, hi, te, etc.)")
    proficiency_level: Optional[str] = Field(None, description="User proficiency level: beginner, intermediate, expert")
    k: Optional[int] = Field(2, description="Number of context documents to retrieve", ge=1, le=10)
    return_sources: Optional[bool] = Field(True, description="Include source documents in response")
    metadata_filter: Optional[Dict[str, Any]] = Field(None, description="Filter for vector search")


class QueryResponse(BaseModel):
    """Response model for chat query"""
    answer: str
    query_language: str
    translation_used: bool
    sources: Optional[List[Dict[str, Any]]] = None
    english_query: Optional[str] = None
    english_answer: Optional[str] = None


class HealthResponse(BaseModel):
    """Response model for health check"""
    status: str
    message: str
    stats: Optional[Dict[str, Any]] = None


# Startup event
@app.on_event("startup")
async def startup_event():
    """Initialize RAG pipeline on startup"""
    global rag_pipeline
    logger.info("🚀 Starting FinanceYatra RAG API...")
    
    try:
        rag_pipeline = get_rag_pipeline()
        logger.info("✅ RAG pipeline initialized successfully")
    except Exception as e:
        logger.error(f"❌ Failed to initialize RAG pipeline: {e}")
        raise


# Routes
@app.get("/", response_model=HealthResponse)
async def root():
    """Root endpoint"""
    return HealthResponse(
        status="online",
        message="FinanceYatra RAG API is running"
    )


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint
    Returns system status and statistics
    """
    try:
        if rag_pipeline is None:
            return HealthResponse(
                status="error",
                message="RAG pipeline not initialized"
            )
        
        stats = rag_pipeline.get_stats()
        
        return HealthResponse(
            status="healthy",
            message="All systems operational",
            stats=stats
        )
    except Exception as e:
        logger.error(f"❌ Health check failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/chat", response_model=QueryResponse)
async def chat_query(request: QueryRequest):
    """
    Main chat endpoint
    Processes user query through RAG pipeline
    
    Example request:
    ```json
    {
        "query": "EMI అంటే ఏమిటి?",
        "language": "te",
        "k": 3,
        "return_sources": true
    }
    ```
    """
    try:
        if rag_pipeline is None:
            raise HTTPException(status_code=503, detail="RAG pipeline not initialized")
        
        logger.info(f"📝 Received query: '{request.query[:50]}...' [Level: {request.proficiency_level or 'unknown'}]")
        
        # Process query through RAG pipeline
        result = rag_pipeline.query(
            user_query=request.query,
            k=request.k,
            language=request.language,
            proficiency_level=request.proficiency_level,
            metadata_filter=request.metadata_filter,
            return_sources=request.return_sources
        )
        
        # Check for errors
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        
        return QueryResponse(**result)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Error processing query: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/languages")
async def get_supported_languages():
    """
    Get list of supported languages
    
    Returns:
        Dictionary of supported languages with codes and names
    """
    return {
        "languages": config.SUPPORTED_LANGUAGES,
        "count": len(config.SUPPORTED_LANGUAGES)
    }


@app.get("/api/stats")
async def get_statistics():
    """
    Get detailed system statistics
    
    Returns:
        Dictionary with RAG system statistics
    """
    try:
        if rag_pipeline is None:
            raise HTTPException(status_code=503, detail="RAG pipeline not initialized")
        
        return rag_pipeline.get_stats()
        
    except Exception as e:
        logger.error(f"❌ Error getting stats: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# Main entry point
if __name__ == "__main__":
    """Run the FastAPI server"""
    print(f"""
    ╔══════════════════════════════════════════════════════╗
    ║         FinanceYatra RAG API Server                  ║
    ║                                                       ║
    ║  API running at: http://{config.API_HOST}:{config.API_PORT}      ║
    ║  Docs available at: /docs                            ║
    ║  Health check: /health                               ║
    ║  Chat endpoint: POST /api/chat                       ║
    ╚══════════════════════════════════════════════════════╝
    """)
    
    # Check if running in production (set ENVIRONMENT=production in .env)
    import os
    is_production = os.getenv("ENVIRONMENT", "development") == "production"
    
    uvicorn.run(
        "app:app",
        host=config.API_HOST,
        port=config.API_PORT,
        reload=not is_production,  # Auto-reload only in development
        log_level="info",
        access_log=False  # Reduce log noise
    )

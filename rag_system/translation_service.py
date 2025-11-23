"""
Translation Service Module
Handles multilingual translation using googletrans and deep-translator
"""

import logging
from typing import Optional, List
from deep_translator import GoogleTranslator
from config import config

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class TranslationService:
    """
    Handles translation between English and Indian languages
    Used for query translation and response translation in RAG pipeline
    """
    
    def __init__(self):
        """Initialize translation service"""
        self.supported_languages = config.SUPPORTED_LANGUAGES
        logger.info(f"✅ Translation service initialized ({len(self.supported_languages)} languages)")
    
    def detect_language(self, text: str) -> str:
        """
        Detect language of input text using Unicode ranges
        
        Args:
            text: Input text
            
        Returns:
            Language code (e.g., 'hi', 'te', 'en')
        """
        # Unicode ranges for Indian scripts
        language_ranges = {
            'hi': (0x0900, 0x097F),  # Devanagari (Hindi, Marathi)
            'te': (0x0C00, 0x0C7F),  # Telugu
            'ta': (0x0B80, 0x0BFF),  # Tamil
            'bn': (0x0980, 0x09FF),  # Bengali
            'kn': (0x0C80, 0x0CFF),  # Kannada
            'ml': (0x0D00, 0x0D7F),  # Malayalam
            'gu': (0x0A80, 0x0AFF),  # Gujarati
            'pa': (0x0A00, 0x0A7F),  # Gurmukhi (Punjabi)
        }
        
        # Check each character
        for char in text:
            code_point = ord(char)
            for lang, (start, end) in language_ranges.items():
                if start <= code_point <= end:
                    logger.info(f"🔍 Detected language: {lang}")
                    return lang
        
        # Default to English
        logger.info("🔍 Detected language: en")
        return 'en'
    
    def translate(
        self, 
        text: str, 
        source_lang: str = 'auto', 
        target_lang: str = 'en'
    ) -> str:
        """
        Translate text from source language to target language
        
        Args:
            text: Text to translate
            source_lang: Source language code ('auto' for detection)
            target_lang: Target language code
            
        Returns:
            Translated text
        """
        # If source and target are same, return original
        if source_lang == target_lang:
            return text
        
        # If target is English and text is already English, skip
        if target_lang == 'en' and source_lang == 'auto':
            detected = self.detect_language(text)
            if detected == 'en':
                return text
        
        try:
            logger.info(f"🔄 Translating: {source_lang} → {target_lang}")
            
            # Use GoogleTranslator from deep-translator
            translator = GoogleTranslator(source=source_lang, target=target_lang)
            
            # Handle long text by chunking (GoogleTranslator has limits)
            if len(text) > 4000:
                chunks = self._chunk_text(text, 4000)
                translated_chunks = [translator.translate(chunk) for chunk in chunks]
                result = ' '.join(translated_chunks)
            else:
                result = translator.translate(text)
            
            logger.info(f"✅ Translation complete ({len(text)} → {len(result)} chars)")
            return result
            
        except Exception as e:
            logger.error(f"❌ Translation error: {e}")
            # Return original text if translation fails
            return text
    
    def translate_to_english(self, text: str) -> str:
        """
        Translate any language to English
        
        Args:
            text: Input text in any supported language
            
        Returns:
            English translation
        """
        detected_lang = self.detect_language(text)
        if detected_lang == 'en':
            return text
        return self.translate(text, source_lang=detected_lang, target_lang='en')
    
    def translate_from_english(self, text: str, target_lang: str) -> str:
        """
        Translate English text to target language
        
        Args:
            text: English text
            target_lang: Target language code
            
        Returns:
            Translated text
        """
        if target_lang == 'en':
            return text
        return self.translate(text, source_lang='en', target_lang=target_lang)
    
    def _chunk_text(self, text: str, max_length: int = 4000) -> List[str]:
        """
        Split text into chunks for translation
        
        Args:
            text: Text to chunk
            max_length: Maximum chunk length
            
        Returns:
            List of text chunks
        """
        # Split at sentence boundaries
        sentences = text.replace('। ', '।\n').replace('. ', '.\n').split('\n')
        
        chunks = []
        current_chunk = ""
        
        for sentence in sentences:
            if len(current_chunk) + len(sentence) < max_length:
                current_chunk += sentence + " "
            else:
                if current_chunk:
                    chunks.append(current_chunk.strip())
                current_chunk = sentence + " "
        
        if current_chunk:
            chunks.append(current_chunk.strip())
        
        logger.info(f"✂️ Split into {len(chunks)} chunks")
        return chunks
    
    def get_language_name(self, lang_code: str) -> str:
        """
        Get full language name from code
        
        Args:
            lang_code: Language code (e.g., 'hi')
            
        Returns:
            Language name (e.g., 'Hindi')
        """
        lang_info = self.supported_languages.get(lang_code, {})
        return lang_info.get('name', lang_code)


def get_translator() -> TranslationService:
    """
    Factory function to get translator instance
    
    Returns:
        TranslationService instance
    """
    return TranslationService()


if __name__ == "__main__":
    """Test translation service"""
    print("🧪 Testing Translation Service\n")
    
    translator = TranslationService()
    
    # Test detection
    print("="*50)
    print("Test 1: Language Detection")
    print("="*50)
    
    test_texts = [
        ("What is EMI?", "en"),
        ("EMI क्या है?", "hi"),
        ("EMI అంటే ఏమిటి?", "te"),
        ("EMI என்றால் என்ன?", "ta")
    ]
    
    for text, expected in test_texts:
        detected = translator.detect_language(text)
        status = "✅" if detected == expected else "❌"
        print(f"{status} '{text}' → {detected} (expected: {expected})")
    
    # Test translation
    print("\n" + "="*50)
    print("Test 2: Translation")
    print("="*50)
    
    # Hindi to English
    hindi_text = "EMI क्या है?"
    english_text = translator.translate_to_english(hindi_text)
    print(f"\nHindi → English:")
    print(f"  Original: {hindi_text}")
    print(f"  Translated: {english_text}")
    
    # English to Telugu
    query = "What is Fixed Deposit?"
    telugu_text = translator.translate_from_english(query, 'te')
    print(f"\nEnglish → Telugu:")
    print(f"  Original: {query}")
    print(f"  Translated: {telugu_text}")

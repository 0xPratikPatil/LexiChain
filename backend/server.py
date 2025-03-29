from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Dict, Any
import os
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
import unicodedata
from fastapi.middleware.cors import CORSMiddleware

# Define the WordDefinition model based on the previous code
class WordDefinition(BaseModel):
    word: str = Field(description="The word being defined")
    languageCode: str = Field(description="Language code for the word")
    partOfSpeech: str = Field(description="Grammatical category of the word")
    phonetic: str = Field(description="Phonetic transcription")
    definition: str = Field(description="Comprehensive definition of the word")
    example: List[str] = Field(description="Contextual usage examples")


# LanguageUtilities and DynamicExampleGenerator classes from the original code (including normalization and example generation)
class LanguageUtilities:
    @staticmethod
    def get_language_name(language_code: str) -> str:
        LANGUAGE_MAP = {
            "aa": "Afar",
            "ab": "Abkhazian",
            "ae": "Avestan",
            "af": "Afrikaans",
            "ak": "Akan",
            "am": "Amharic",
            "an": "Aragonese",
            "ar": "Arabic",
            "as": "Assamese",
            "av": "Avaric",
            "ay": "Aymara",
            "az": "Azerbaijani",
            "ba": "Bashkir",
            "be": "Belarusian",
            "bg": "Bulgarian",
            "bh": "Bihari languages",
            "bi": "Bislama",
            "bm": "Bambara",
            "bn": "Bengali",
            "bo": "Tibetan",
            "br": "Breton",
            "bs": "Bosnian",
            "ca": "Catalan",
            "ce": "Chechen",
            "ch": "Chamorro",
            "co": "Corsican",
            "cr": "Cree",
            "cs": "Czech",
            "cu": "Church Slavic",
            "cv": "Chuvash",
            "cy": "Welsh",
            "da": "Danish",
            "de": "German",
            "dv": "Maldivian",
            "dz": "Dzongkha",
            "ee": "Ewe",
            "el": "Greek",
            "en": "English",
            "eo": "Esperanto",
            "es": "Spanish",
            "et": "Estonian",
            "eu": "Basque",
            "fa": "Persian",
            "ff": "Fulah",
            "fi": "Finnish",
            "fj": "Fijian",
            "fo": "Faroese",
            "fr": "French",
            "fy": "Western Frisian",
            "ga": "Irish",
            "gd": "Gaelic",
            "gl": "Galician",
            "gn": "Guarani",
            "gu": "Gujarati",
            "gv": "Manx",
            "ha": "Hausa",
            "he": "Hebrew",
            "hi": "Hindi",
            "ho": "Hiri Motu",
            "hr": "Croatian",
            "ht": "Haitian",
            "hu": "Hungarian",
            "hy": "Armenian",
            "hz": "Herero",
            "ia": "Interlingua",
            "id": "Indonesian",
            "ie": "Interlingue",
            "ig": "Igbo",
            "ii": "Sichuan Yi",
            "ik": "Inupiaq",
            "io": "Ido",
            "is": "Icelandic",
            "it": "Italian",
            "iu": "Inuktitut",
            "ja": "Japanese",
            "jv": "Javanese",
            "ka": "Georgian",
            "kg": "Kongo",
            "ki": "Kikuyu",
            "kj": "Kuanyama",
            "kk": "Kazakh",
            "kl": "Kalaallisut",
            "km": "Central Khmer",
            "kn": "Kannada",
            "ko": "Korean",
            "kr": "Kanuri",
            "ks": "Kashmiri",
            "ku": "Kurdish",
            "kv": "Komi",
            "kw": "Cornish",
            "ky": "Kirghiz",
            "la": "Latin",
            "lb": "Luxembourgish",
            "lg": "Ganda",
            "li": "Limburgan",
            "ln": "Lingala",
            "lo": "Lao",
            "lt": "Lithuanian",
            "lu": "Luba-Katanga",
            "lv": "Latvian",
            "mg": "Malagasy",
            "mh": "Marshallese",
            "mi": "Maori",
            "mk": "Macedonian",
            "ml": "Malayalam",
            "mn": "Mongolian",
            "mr": "Marathi",
            "ms": "Malay",
            "mt": "Maltese",
            "my": "Burmese",
            "na": "Nauru",
            "nb": "Norwegian",
            "nd": "North Ndebele",
            "ne": "Nepali",
            "ng": "Ndonga",
            "nl": "Dutch",
            "nn": "Norwegian",
            "no": "Norwegian",
            "nr": "South Ndebele",
            "nv": "Navajo",
            "ny": "Chichewa",
            "oc": "Occitan",
            "oj": "Ojibwa",
            "om": "Oromo",
            "or": "Oriya",
            "os": "Ossetic",
            "pa": "Panjabi",
            "pi": "Pali",
            "pl": "Polish",
            "ps": "Pushto",
            "pt": "Portuguese",
            "qu": "Quechua",
            "rm": "Romansh",
            "rn": "Rundi",
            "ro": "Romanian",
            "ru": "Russian",
            "rw": "Kinyarwanda",
            "sa": "Sanskrit",
            "sc": "Sardinian",
            "sd": "Sindhi",
            "se": "Northern Sami",
            "sg": "Sango",
            "si": "Sinhala",
            "sk": "Slovak",
            "sl": "Slovenian",
            "sm": "Samoan",
            "sn": "Shona",
            "so": "Somali",
            "sq": "Albanian",
            "sr": "Serbian",
            "ss": "Swati",
            "st": "Sotho, Southern",
            "su": "Sundanese",
            "sv": "Swedish",
            "sw": "Swahili",
            "ta": "Tamil",
            "te": "Telugu",
            "tg": "Tajik",
            "th": "Thai",
            "ti": "Tigrinya",
            "tk": "Turkmen",
            "tl": "Tagalog",
            "tn": "Tswana",
            "to": "Tonga",
            "tr": "Turkish",
            "ts": "Tsonga",
            "tt": "Tatar",
            "tw": "Twi",
            "ty": "Tahitian",
            "ug": "Uighur",
            "uk": "Ukrainian",
            "ur": "Urdu",
            "uz": "Uzbek",
            "ve": "Venda",
            "vi": "Vietnamese",
            "vo": "Volapük",
            "wa": "Walloon",
            "wo": "Wolof",
            "xh": "Xhosa",
            "yi": "Yiddish",
            "yo": "Yoruba",
            "za": "Zhuang",
            "zh": "Chinese",
            "zu": "Zulu",
        }
        return LANGUAGE_MAP.get(language_code, f"Unknown Language ({language_code})")

    @staticmethod
    def normalize_text(text: str) -> str:
        return "".join(
            char
            for char in unicodedata.normalize("NFKD", text)
            if unicodedata.category(char) != "Mn"
        )


class DynamicExampleGenerator:
    @classmethod
    def generate_contextual_examples(cls, word: str, language_code: str) -> List[str]:
        example_templates = [
            "A moment of profound significance where '{word}' carries deep meaning.",
            "An unexpected context that transforms the essence of '{word}'.",
            "A subtle interaction revealing the nuanced layers of '{word}'.",
            "A metaphorical use that transcends the literal interpretation of '{word}'.",
            "An emotional landscape painted by the mere utterance of '{word}'.",
        ]
        return [template.format(word=word) for template in example_templates]


# LanguageDictionaryAPI class from the original code
class LanguageDictionaryAPI:
    def __init__(self, groq_api_key: str, model_name: str = "llama3-70b-8192"):
        self.llm = ChatGroq(
            temperature=0.2, model_name=model_name, groq_api_key=groq_api_key
        )
        self.parser = PydanticOutputParser(pydantic_object=WordDefinition)

    def create_dynamic_prompt(self) -> PromptTemplate:
        return PromptTemplate(
            template="""You are an elite linguistic expert providing a comprehensive analysis in {language_name}.

Linguistic Analysis for Word: '{word}'

Provide a profound, nuanced definition that captures:
- Linguistic essence
- Cultural context
- Grammatical intricacies
- Semantic depth

Constraints:
- Definition must be in {language_name}
- Use native linguistic terminology
- Reflect authentic language usage

{format_instructions}

Linguistic Exploration Guidelines:
- Reveal etymological insights
- Capture contextual variations
- Demonstrate linguistic sophistication""",
            input_variables=["word", "language_name"],
            partial_variables={
                "format_instructions": self.parser.get_format_instructions()
            },
        )

    def get_word_definition(self, word: str, language_code: str) -> Dict[str, Any]:
        if len(word.split()) > 1:
            raise ValueError(
                "Only single words are allowed. Please provide a single word."
            )

        normalized_word = LanguageUtilities.normalize_text(word)
        language_name = LanguageUtilities.get_language_name(language_code)

        try:
            prompt = self.create_dynamic_prompt()
            response = self.llm.invoke(
                prompt.format(word=normalized_word, language_name=language_name)
            )

            try:
                definition = self.parser.parse(response.content)
                definition_dict = definition.dict()
            except Exception as parsing_error:
                definition_dict = {
                    "word": normalized_word,
                    "languageCode": language_code,
                    "partOfSpeech": "Unknown",
                    "phonetic": "",
                    "definition": response.content,
                    "example": [],
                }

            if (
                not definition_dict.get("example")
                or len(definition_dict["example"]) < 3
            ):
                definition_dict[
                    "example"
                ] = DynamicExampleGenerator.generate_contextual_examples(
                    normalized_word, language_code
                )

            return definition_dict

        except Exception as e:
            return {
                "word": normalized_word,
                "languageCode": language_code,
                "partOfSpeech": "Error",
                "phonetic": "",
                "definition": f"Error retrieving definition: {str(e)}",
                "example": DynamicExampleGenerator.generate_contextual_examples(
                    normalized_word, language_code
                ),
            }


# FastAPI app setup
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

groq_api_key = "GROQ_API_KEY"
dictionary = LanguageDictionaryAPI(groq_api_key)


@app.get("/word/{word}", response_model=WordDefinition)
async def get_word_definition(word: str, language_code: str = "en"):
    """
    Fetch the word definition based on the word and language code.

    :param word: The word to define.
    :param language_code: The language code for the definition (default is "en" for English).
    :return: The WordDefinition object containing details of the word.
    """
    try:
        result = dictionary.get_word_definition(word, language_code)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error retrieving definition: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)

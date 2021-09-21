import { LanguageMessages } from "@/i18n/types";
import enInstructions from "../en/instructions";

const instructions: LanguageMessages["instructions"] = {
  title: "Informacje o Ćwiczeniu Oddechowym",
  paragraphs: [
    [
      `Ułóż się wygodnie - połóż się lub usiąć zależnie co jest dla ciebie bardziej komfortowe, upewnij się, że może swobodnie oddychać - Twoje płuca mogą się rozszeżać bez żadnych ograniczeń. Każde dodatkowe spięcie mieśni utrudni ćwiczenie co będzie skutkować skróceniem czasu jaki wytrzymasz na wstrzymanym oddechu.`,
    ],
    [
      `Weź 30-50 głębokich oddechów - wdychaj powietrze głęboko przez nos lub usta i wydychaj przez usta. Staraj się wdychać głęboko w stronę brzucha. Nie zmuszaj się do wydychania, po prostu wypuść powietrze (około 30% powietrza zostanie w płucach).`,
      `Możesz odczuwać zawroty głowy, mrowienie i drętwienie palców i nóg - są to normalne, nieszkodliwe efekty uboczne obniżenia się poziomu dwutlenku węgla we krwi`,
    ],
    enInstructions.paragraphs[2],
    enInstructions.paragraphs[3],
  ],
};

export default instructions;

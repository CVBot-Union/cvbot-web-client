interface Translation {
  author: TranslationAuthor;
  _id: string;
  translationContent: string;
}

interface TranslationAuthor {
  id: string;
  groupID: string;
}

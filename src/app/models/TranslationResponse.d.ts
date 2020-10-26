export interface TranslationResponse {
  success: boolean;
  response: TranslationEntity[];
}

export interface TranslationEntity {
  author: TranslationAuthor;
  _id: string;
  translationContent: string;
}

export interface TranslationAuthor {
  id: string;
  groupID: string;
}

export interface ExtendedTranslationResponse {
  success: boolean;
  response: ExtendedTranslationEntity[];
}

export interface ExtendedTranslationEntity {
  author: ExtendedTranslationAuthor;
  _id: string;
  translationContent: string;
  createdAt: string;
}

export interface ExtendedTranslationAuthor {
  name: string;
  id: string;
  group: string;
}

export interface UpdateTranslationObject {
  success: boolean;
  response: UpdateTranslationResponse;
}

export interface UpdateTranslationResponse {
  n: number;
  nModified: number;
  ok: number;
}

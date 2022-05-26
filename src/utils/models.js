const types = {};

types.Article = 'articles';
types.Thesis = 'theses';
types.Book = 'books';
types.BookChapter = 'book_chapters';
types.Recomendation = 'recomendations';
types.ArchivalDocument = 'archival_documents';
types.Legislation = 'legislations';
types.PressRelease = 'press_releases';
types.Amparo = 'amparos';
types.DataBase = 'databases';
types.Request = 'requests';
types.Journal = 'journals';



export default{
    types: types
}

/** ["Thesis", "Article", "Book", "Video", "BookChapter", "Music", "Database", "Map", 
 *      "Fact", "Photography", "JurisprudentialThesis", "ArchivalDocument", "Request", "Judgment", 
 *      "Recomendation", "Resolution", "Amparo", "PressRelease", "Presentation", "Journal", 
 *      "LegalCase", "Legislation"] */
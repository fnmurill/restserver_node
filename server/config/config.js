// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;

// ============================
//  Entorno
// ============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ============================
//  Data Base
// ============================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = 'mongodb+srv://fnmuril:AgNhPeZarlytkyrU@cluster0-2a3fh.mongodb.net/cafe?retryWrites=true&w=majority'
}

process.env.URLDB = urlDB;
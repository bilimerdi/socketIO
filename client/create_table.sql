-- create_table.sql dosyası
USE kutuphaneyeni; -- Kullanılacak olan veritabanı

-- Tablo oluşturma işlemi
CREATE TABLE dbo.version (
    developer NVARCHAR(50),
    version NVARCHAR(50),
    description NVARCHAR(MAX),
    priority NVARCHAR(20),
    size NVARCHAR(10),
    time TIME(7)
);

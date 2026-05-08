# backend-isgop

Node.js, TypeScript, Express, Prisma ve PostgreSQL ile kurulan backend projesi.

## Teknolojiler

- Node.js
- TypeScript
- Express
- Prisma
- PostgreSQL
- Docker Compose

## Proje Yapısı

```text
src/
  app.ts                # Express uygulama ayarları
  server.ts             # Sunucuyu ayağa kaldırır
  config/               # Environment/config okuma
  controllers/          # HTTP request/response yönetimi
  middlewares/          # Araya giren Express katmanları
  modules/              # Modül birleştirme noktaları
  repositories/         # Veri erişim katmanı
  routes/               # Endpoint tanımları
  services/             # İş mantığı
  types/                # Ortak TypeScript tipleri
  utils/                # Yardımcı yapılar
prisma/
  schema.prisma         # Veritabanı şeması
compose.yaml            # Local PostgreSQL servisi
```

## Başlangıç

### 1. Bağımlılıkları kur

```bash
npm install
```

### 2. Environment dosyasını hazırla

`.env.example` dosyasını kopyalayıp `.env` oluştur:

```bash
cp .env.example .env
```

Bu projede varsayılan local bağlantı bilgileri Docker içindeki PostgreSQL servisine göre ayarlanmıştır.

### 3. PostgreSQL'i ayağa kaldır

```bash
docker compose up -d
```

Bu komut:

- PostgreSQL container'ını başlatır
- `backend_isgop` veritabanını oluşturur
- `5432` portunu local makineye açar

### 4. Migration çalıştır

```bash
npm run prisma:migrate -- --name init
```

İlk migration sonrası Prisma client otomatik güncellenir. Gerekirse manuel olarak:

```bash
npm run prisma:generate
```

### 5. Uygulamayı başlat

```bash
npm run dev
```

Not: Şu an bazı ortamlarda `watch` otomatik yenileme kararsız olabilir. Gerekirse projeyi durdurup tekrar başlatabilirsin.

## Kullanışlı Komutlar

```bash
npm run dev
npm run build
npm start
npm run prisma:generate
npm run prisma:migrate -- --name your_migration_name
npm run prisma:studio
docker compose up -d
docker compose down
```

## Endpoint'ler

- `GET /`
- `GET /api/health`

## Yeni Tablo Ekleme Akışı

1. `prisma/schema.prisma` içine yeni `model` ekle.
2. Migration oluştur:

```bash
npm run prisma:migrate -- --name add-users
```

3. Gerekirse Prisma client üret:

```bash
npm run prisma:generate
```

4. Sonra backend katmanlarını ekle:

- route
- controller
- service
- repository

## Ekip İçin Notlar

- `.env` dosyasını repoya ekleme.
- `.env.example` dosyasını güncel tut.
- Şema değiştiğinde migration dosyalarını commit et.
- Herkes aynı veritabanı ortamını kullansın diye Docker Compose tercih ediliyor.

## Veritabanı Bilgileri

Docker varsayılanları:

- Host: `localhost`
- Port: `5432`
- User: `postgres`
- Password: `postgres`
- Database: `backend_isgop`

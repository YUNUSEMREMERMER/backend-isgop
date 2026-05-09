# backend-isgop

Node.js, TypeScript, Express, Prisma ve PostgreSQL ile geliştirilen backend projesi.

Bu sürümde projeye şu temel altyapılar eklendi:

- `User` modeli
- JWT tabanlı auth akışı
- request validation katmanı
- ortak API response ve hata formatı

## Teknolojiler

- Node.js
- TypeScript
- Express
- Prisma
- PostgreSQL
- Docker Compose
- Zod
- bcryptjs
- jsonwebtoken

## Proje Yapısı

```text
src/
  app.ts                # Express uygulama ayarları
  server.ts             # Sunucuyu ayağa kaldırır
  config/               # Environment/config okuma
  controllers/          # HTTP request/response yönetimi
  errors/               # Uygulama seviyesi özel hatalar
  middlewares/          # Validation, auth, error handling
  modules/              # Modül birleştirme noktaları
  repositories/         # Veri erişim katmanı
  routes/               # Endpoint tanımları
  schemas/              # Zod request şemaları
  services/             # İş mantığı
  types/                # Ortak TypeScript tipleri
  utils/                # Yardımcı yapılar
prisma/
  migrations/           # Prisma migration dosyaları
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

Örnek değişkenler:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=super-secret-key
JWT_EXPIRES_IN=7d
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/backend_isgop?schema=public"
```

### 3. PostgreSQL'i ayağa kaldır

```bash
docker compose up -d
```

### 4. Migration çalıştır

```bash
npm run prisma:migrate -- --name init
```

Not:

- `prisma migrate dev` geliştirme ortamında migration üretir ve veritabanına uygular.
- Çoğu durumda ayrıca `prisma generate` çalıştırman gerekmez; `migrate` zaten client'ı günceller.

### 5. Uygulamayı başlat

Geliştirme modu:

```bash
npm run dev
```

Production benzeri çalışma:

```bash
npm run build
npm start
```

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

## Prisma Komutları

### `npm run prisma:migrate -- --name migration_name`

Şema değişikliği yaptığında ana komut budur.

Bu komut:

- `schema.prisma` dosyasındaki değişikliği okur
- yeni migration üretir
- migration'ı local veritabanına uygular
- Prisma Client'ı günceller

Örnek:

```bash
npm run prisma:migrate -- --name add-user-auth
```

### `npm run prisma:generate`

Sadece Prisma Client üretmek veya yenilemek için kullanılır.

Genelde şu durumlarda gerekir:

- migration çalıştırmadan sadece client güncellenecekse
- `node_modules` yeniden kurulduysa
- mevcut migration'lar zaten uygulanmış ama client eksikse

## Veritabanı Şeması

Mevcut ana model:

- `User`

Alanlar:

- `name`
- `surname`
- `email`
- `password`
- `role`

Desteklenen `role` değerleri:

- `accounting`
- `operation`
- `expert`
- `worker`
- `admin`
- `unit_manager`

## API Response Formatı

Başarılı cevap formatı:

```json
{
  "success": true,
  "message": "Operation successful.",
  "data": {}
}
```

Hata cevap formatı:

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    {
      "field": "body.email",
      "message": "Please provide a valid email address."
    }
  ]
}
```

## Validation Katmanı

Request validation için Zod kullanılır.

Örnek kurallar:

- `name`: minimum 2 karakter
- `surname`: minimum 2 karakter
- `email`: geçerli email formatı
- `password`: minimum 6, maksimum 72 karakter
- `role`: izin verilen enum değerlerinden biri olmalı

Validation middleware'i route seviyesinde çalışır ve geçersiz isteklerde ortak hata formatı döner.

## Auth Akışı

Projede JWT tabanlı auth altyapısı bulunur.

Akış:

1. Kullanıcı `register` olur
2. Şifre `bcryptjs` ile hashlenir
3. Başarılı register/login sonrası `accessToken` üretilir
4. Korumalı route'larda `Authorization: Bearer <token>` beklenir

## Endpoint'ler

### `GET /`

API karşılama endpoint'i.

### `GET /api/health`

Sistem sağlık kontrolü.

### `POST /api/auth/register`

Yeni kullanıcı kaydı oluşturur.

Örnek body:

```json
{
  "name": "Ali",
  "surname": "Yilmaz",
  "email": "ali@example.com",
  "password": "secret123",
  "role": "worker"
}
```

### `POST /api/auth/login`

Kullanıcı girişi yapar.

Örnek body:

```json
{
  "email": "ali@example.com",
  "password": "secret123"
}
```

### `GET /api/auth/me`

Token ile giriş yapan kullanıcının profilini döner.

Header:

```text
Authorization: Bearer <access_token>
```

## Postman ile Test

Base URL:

```text
http://localhost:3000/api
```

Önerilen test sırası:

1. `GET /health`
2. `POST /auth/register`
3. `POST /auth/login`
4. `GET /auth/me`
5. validation hata senaryoları
6. yanlış şifre ve duplicate email senaryoları

## Yeni Tablo Ekleme Akışı

1. `prisma/schema.prisma` içine yeni `model` ekle
2. migration oluştur:

```bash
npm run prisma:migrate -- --name add-new-model
```

3. route, controller, service, repository katmanlarını ekle
4. request schema ve validation middleware'ini bağla
5. gerekiyorsa auth/authorization ekle

## Ekip İçin Notlar

- `.env` dosyasını repoya ekleme
- `.env.example` dosyasını güncel tut
- şema değiştiğinde migration dosyalarını commit et
- auth endpoint'lerinde `password` alanını response içinde dönme
- ortak response formatını yeni endpoint'lerde de koru

## Veritabanı Bilgileri

Docker varsayılanları:

- Host: `localhost`
- Port: `5432`
- User: `postgres`
- Password: `postgres`
- Database: `backend_isgop`

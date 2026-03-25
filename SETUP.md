# 🚀 خطوات ربط المشروع بـ Neon Postgres و Vercel

## 1️⃣ رفع المشروع على Vercel

1. ارفع المشروع على GitHub
2. اذهب إلى [vercel.com](https://vercel.com) واربط الـ repository
3. اضغط **Deploy** (سيفشل البناء مؤقتاً لأننا لم نضف قاعدة البيانات بعد)

---

## 2️⃣ إنشاء قاعدة بيانات Neon من داخل Vercel

1. اذهب إلى مشروعك في Vercel
2. اضغط على تبويب **Storage**
3. اضغط **Connect Database**
4. اختر **Neon Postgres** ثم اضغط **Create New**
5. Vercel سيضيف `DATABASE_URL` تلقائياً في Environment Variables ✅

---

## 3️⃣ إنشاء الجدول

1. في Vercel → Storage → اضغط على قاعدة البيانات
2. اضغط **Query** أو **SQL Editor**
3. انسخ محتوى ملف `scripts/001_create_profiles_table.sql` والصقه ثم شغّله

---

## 4️⃣ إعادة النشر

اضغط **Redeploy** في Vercel — المشروع سيعمل الآن بالكامل 🎉

---

## ✅ النتيجة

```
قبل:  /p/abc12?d=eJyVVdtu2zAM....(طويل جداً)
بعد:  /p/abc123  ✅
```

---

## 🛠️ للتطوير المحلي

```bash
# انسخ ملف البيئة
cp .env.local.example .env.local

# ضع DATABASE_URL من Neon Console أو Vercel Dashboard
# ثم شغّل المشروع
npm install
npm run dev
```

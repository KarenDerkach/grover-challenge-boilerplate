# Grover Challenge Boilerplate (con seed)

## 🚀 Cómo iniciar

### 1. Instalar dependencias
```bash
npm install
```

### 2. Ejecutar migraciones
```bash
npx prisma migrate dev --name init
```

### 3. Sembrar datos de ejemplo
```bash
npx prisma db seed
```
### 4. Ver datos de ejemplo en Prisma studio
```bash
npx prisma studio
```
### 5. Iniciar servidor
```bash
npm run dev
```

Luego abre [http://localhost:3000](http://localhost:3000) para ver tus suscripciones.

### 🧠 Stack
- Next.js 14 (Pages Router)
- React 18
- TypeScript
- Prisma + SQLite
- Styled Components
- UUID + Date-fns

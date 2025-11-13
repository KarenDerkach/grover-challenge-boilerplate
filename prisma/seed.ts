import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Create multiple products
  const iphone = await prisma.product.create({
    data: {
      slug: "apple-iphone-14-pro-max",
      title: "Apple iPhone 14 Pro Max - 128GB",
      coreAttribute: "6.7'' OLED, Triple Rear Camera, 6GB RAM",
      image: "iphone14.png",
      rentalPlans: {
        create: [
          { period: 1, price: 15990 },
          { period: 3, price: 11490 },
          { period: 6, price: 8990 },
        ]
      }
    }
  })

  const macbook = await prisma.product.create({
    data: {
      slug: "macbook-pro-13-m2",
      title: "MacBook Pro 13\" M2 - 256GB",
      coreAttribute: "M2 Chip, 8GB RAM, 13.3'' Retina Display",
      image: "macbook-pro-13.png",
      rentalPlans: {
        create: [
          { period: 1, price: 25990 },
          { period: 3, price: 18990 },
          { period: 6, price: 15990 },
          { period: 12, price: 12990 },
        ]
      }
    }
  })

  const ipad = await prisma.product.create({
    data: {
      slug: "ipad-air-5th-gen",
      title: "iPad Air 5th Gen - 64GB",
      coreAttribute: "10.9'' Liquid Retina, M1 Chip, Wi-Fi",
      image: "ipad-air.png",
      rentalPlans: {
        create: [
          { period: 1, price: 8990 },
          { period: 3, price: 6990 },
          { period: 6, price: 5490 },
        ]
      }
    }
  })

  const now = new Date()
  
  // DRAFT: Customer is still customizing subscription
  await prisma.subscription.create({
    data: {
      referenceId: "G-DRAFT-001",
      createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      rentalPeriod: 3,
      monthlyPrice: 11490,
      state: "DRAFT",
      productId: iphone.id
    }
  })

  // FULFILLING: Customer placed order, warehouse preparing delivery
  await prisma.subscription.create({
    data: {
      referenceId: "G-FULFILL-002",
      createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      rentalPeriod: 6,
      monthlyPrice: 15990,
      state: "FULFILLING",
      productId: macbook.id
    }
  })

  // ACTIVE: Customer received product, subscription active
  await prisma.subscription.create({
    data: {
      referenceId: "G-ACTIVE-003",
      createdAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      activatedAt: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000), // 25 days ago
      activeUntil: new Date(now.getTime() + 65 * 24 * 60 * 60 * 1000), // 65 days ahead
      rentalPeriod: 3,
      monthlyPrice: 6990,
      state: "ACTIVE",
      productId: ipad.id
    }
  })

  // ACTIVE: Another active subscription with iPhone
  await prisma.subscription.create({
    data: {
      referenceId: "G-ACTIVE-004",
      createdAt: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
      activatedAt: new Date(now.getTime() - 55 * 24 * 60 * 60 * 1000), // 55 days ago
      activeUntil: new Date(now.getTime() + 35 * 24 * 60 * 60 * 1000), // 35 days ahead
      rentalPeriod: 3,
      monthlyPrice: 11490,
      state: "ACTIVE",
      productId: iphone.id
    }
  })

  // TERMINATED: Customer ended subscription and returned product
  await prisma.subscription.create({
    data: {
      referenceId: "G-TERM-005",
      createdAt: new Date(now.getTime() - 120 * 24 * 60 * 60 * 1000), // 120 days ago
      activatedAt: new Date(now.getTime() - 115 * 24 * 60 * 60 * 1000), // 115 days ago
      activeUntil: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      terminatedAt: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000), // 25 days ago
      rentalPeriod: 3,
      monthlyPrice: 8990,
      state: "TERMINATED",
      productId: ipad.id
    }
  })

  // ACTIVE: MacBook subscription about to expire (for testing extensions)
  await prisma.subscription.create({
    data: {
      referenceId: "G-EXTEND-006",
      createdAt: new Date(now.getTime() - 80 * 24 * 60 * 60 * 1000), // 80 days ago
      activatedAt: new Date(now.getTime() - 75 * 24 * 60 * 60 * 1000), // 75 days ago
      activeUntil: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000), // 15 days ahead
      rentalPeriod: 3,
      monthlyPrice: 18990,
      state: "ACTIVE",
      productId: macbook.id
    }
  })

  console.log('✅ Seed data created successfully!')
  console.log('📱 Products:', { iphone: iphone.id, macbook: macbook.id, ipad: ipad.id })
  console.log('📋 Subscription states: DRAFT, FULFILLING, ACTIVE (x3), TERMINATED')
}

main()
  .then(() => prisma.$disconnect())
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

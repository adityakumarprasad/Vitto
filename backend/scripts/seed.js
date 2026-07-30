// ============================================================
// seed.js – Insert sample businesses, loans, and decisions
// Run with: npm run seed  (from the backend folder)
// ============================================================

require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const mongoose = require('mongoose');
const DecisionHistory = require('../src/models/DecisionHistory');
const { runDecisionEngine } = require('../src/services/decisionEngine');
const { DECISION_STATUS } = require('../src/config/constants');

const prisma = new PrismaClient();

// Sample MSME applicants used for demos and charts
const SAMPLE_BUSINESSES = [
  {
    ownerName: 'Ravi Sharma',
    pan: 'ABCDE1234F',
    businessType: 'Retail',
    monthlyRevenue: 450000,
    loanAmount: 1200000,
    tenure: 36,
    purpose: 'Expansion',
  },
  {
    ownerName: 'Priya Patel',
    pan: 'FGHIJ5678K',
    businessType: 'Manufacturing',
    monthlyRevenue: 800000,
    loanAmount: 2500000,
    tenure: 48,
    purpose: 'Machinery',
  },
  {
    ownerName: 'Amit Kumar',
    pan: 'KLMNO9012P',
    businessType: 'Services',
    monthlyRevenue: 150000,
    loanAmount: 900000,
    tenure: 24,
    purpose: 'Working Capital',
  },
  {
    ownerName: 'Sneha Reddy',
    pan: 'QRSTU3456V',
    businessType: 'Healthcare',
    monthlyRevenue: 600000,
    loanAmount: 1800000,
    tenure: 60,
    purpose: 'Expansion',
  },
  {
    ownerName: 'Vikram Singh',
    pan: 'WXYZA7890B',
    businessType: 'Agriculture',
    monthlyRevenue: 18000,
    loanAmount: 500000,
    tenure: 12,
    purpose: 'Inventory',
  },
  {
    ownerName: 'Neha Gupta',
    pan: 'CDEFG2345H',
    businessType: 'Technology',
    monthlyRevenue: 950000,
    loanAmount: 3000000,
    tenure: 36,
    purpose: 'Marketing',
  },
  {
    ownerName: 'Arjun Mehta',
    pan: 'HIJKL6789M',
    businessType: 'Education',
    monthlyRevenue: 220000,
    loanAmount: 700000,
    tenure: 18,
    purpose: 'Working Capital',
  },
  {
    ownerName: 'Kavita Joshi',
    pan: 'NOPQR0123S',
    businessType: 'Others',
    monthlyRevenue: 350000,
    loanAmount: 5000000,
    tenure: 96,
    purpose: 'Other',
  },
];

/**
 * Clear existing demo data then insert fresh samples.
 */
async function seed() {
  console.log('Connecting to databases...');
  await prisma.$connect();
  await mongoose.connect(process.env.MONGODB_URI);

  console.log('Clearing old data...');
  await DecisionHistory.deleteMany({});
  await prisma.loan.deleteMany({});
  await prisma.business.deleteMany({});

  console.log('Inserting sample businesses, loans, and decisions...');

  for (const sample of SAMPLE_BUSINESSES) {
    const business = await prisma.business.create({
      data: {
        ownerName: sample.ownerName,
        pan: sample.pan,
        businessType: sample.businessType,
        monthlyRevenue: sample.monthlyRevenue,
      },
    });

    const loan = await prisma.loan.create({
      data: {
        businessId: business.id,
        loanAmount: sample.loanAmount,
        tenure: sample.tenure,
        purpose: sample.purpose,
      },
    });

    const result = runDecisionEngine({
      pan: business.pan,
      monthlyRevenue: business.monthlyRevenue,
      loanAmount: loan.loanAmount,
      tenure: loan.tenure,
    });

    await DecisionHistory.create({
      businessId: business.id,
      loanId: loan.id,
      ownerName: business.ownerName,
      pan: business.pan,
      creditScore: result.creditScore,
      approved: result.approved,
      decision: result.decision,
      reasonCodes: result.reasonCodes,
      estimatedEMI: result.estimatedEMI,
      status: DECISION_STATUS.COMPLETED,
      processingTime: 1500 + Math.floor(Math.random() * 2000),
    });
  }

  console.log(`Seeded ${SAMPLE_BUSINESSES.length} sample applications.`);
  await prisma.$disconnect();
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(async (err) => {
  console.error('Seed failed:', err);
  await prisma.$disconnect();
  await mongoose.disconnect();
  process.exit(1);
});

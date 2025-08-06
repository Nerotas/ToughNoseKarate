#!/bin/bash
# Backend Cleanup Script - Remove unused controllers and services
# Execute this after running the database cleanup script

echo "🧹 Starting backend cleanup of unused technique tracking files..."

# Backup important files first
echo "📁 Creating backup directory..."
mkdir -p ../backup/unused_files/controller
mkdir -p ../backup/unused_files/service
mkdir -p ../backup/unused_files/models

# Move files to backup (safer than deleting)
echo "📦 Moving unused files to backup..."

# Controllers
mv src/controller/blocks.controller.ts ../backup/unused_files/controller/ 2>/dev/null || echo "blocks.controller.ts not found"
mv src/controller/combinations.controller.ts ../backup/unused_files/controller/ 2>/dev/null || echo "combinations.controller.ts not found"
mv src/controller/falling.controller.ts ../backup/unused_files/controller/ 2>/dev/null || echo "falling.controller.ts not found"
mv src/controller/forms.controller.ts ../backup/unused_files/controller/ 2>/dev/null || echo "forms.controller.ts not found"
mv src/controller/kicks.controller.ts ../backup/unused_files/controller/ 2>/dev/null || echo "kicks.controller.ts not found"
mv src/controller/oneSteps.controller.ts ../backup/unused_files/controller/ 2>/dev/null || echo "oneSteps.controller.ts not found"
mv src/controller/punches.controller.ts ../backup/unused_files/controller/ 2>/dev/null || echo "punches.controller.ts not found"
mv src/controller/stances.controller.ts ../backup/unused_files/controller/ 2>/dev/null || echo "stances.controller.ts not found"

# Services
mv src/service/blocks.service.ts ../backup/unused_files/service/ 2>/dev/null || echo "blocks.service.ts not found"
mv src/service/combinations.service.ts ../backup/unused_files/service/ 2>/dev/null || echo "combinations.service.ts not found"
mv src/service/falling.service.ts ../backup/unused_files/service/ 2>/dev/null || echo "falling.service.ts not found"
mv src/service/forms.service.ts ../backup/unused_files/service/ 2>/dev/null || echo "forms.service.ts not found"
mv src/service/kicks.service.ts ../backup/unused_files/service/ 2>/dev/null || echo "kicks.service.ts not found"
mv src/service/oneSteps.service.ts ../backup/unused_files/service/ 2>/dev/null || echo "oneSteps.service.ts not found"
mv src/service/punches.service.ts ../backup/unused_files/service/ 2>/dev/null || echo "punches.service.ts not found"
mv src/service/stances.service.ts ../backup/unused_files/service/ 2>/dev/null || echo "stances.service.ts not found"

# Models
mv src/models/blocks.ts ../backup/unused_files/models/ 2>/dev/null || echo "blocks.ts not found"
mv src/models/combinations.ts ../backup/unused_files/models/ 2>/dev/null || echo "combinations.ts not found"
mv src/models/falling.ts ../backup/unused_files/models/ 2>/dev/null || echo "falling.ts not found"
mv src/models/forms.ts ../backup/unused_files/models/ 2>/dev/null || echo "forms.ts not found"
mv src/models/kicks.ts ../backup/unused_files/models/ 2>/dev/null || echo "kicks.ts not found"
mv src/models/oneSteps.ts ../backup/unused_files/models/ 2>/dev/null || echo "oneSteps.ts not found"
mv src/models/punches.ts ../backup/unused_files/models/ 2>/dev/null || echo "punches.ts not found"
mv src/models/stances.ts ../backup/unused_files/models/ 2>/dev/null || echo "stances.ts not found"

echo "✅ Files moved to backup directory"
echo "🔧 Next steps:"
echo "1. Update src/app.module.ts to remove controller imports"
echo "2. Update src/models/index.ts to remove model exports"./cle
echo "3. Test the application to ensure no breaking changes"
echo "4. If all works well, you can delete the backup directory"

echo "🎯 Cleanup completed! Your backend is now lighter and cleaner."

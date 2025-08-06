# Backend Cleanup Script

# Removes unused controllers, services, and models for tables that are not used by frontend

# Files to DELETE (unused technique tracking):

# Controllers:

# - src/controller/blocks.controller.ts

# - src/controller/combinations.controller.ts

# - src/controller/falling.controller.ts

# - src/controller/forms.controller.ts

# - src/controller/kicks.controller.ts

# - src/controller/oneSteps.controller.ts

# - src/controller/punches.controller.ts

# - src/controller/stances.controller.ts

# Services:

# - src/service/blocks.service.ts

# - src/service/combinations.service.ts

# - src/service/falling.service.ts

# - src/service/forms.service.ts

# - src/service/kicks.service.ts

# - src/service/oneSteps.service.ts

# - src/service/punches.service.ts

# - src/service/stances.service.ts

# Models:

# - src/models/blocks.ts

# - src/models/combinations.ts

# - src/models/falling.ts

# - src/models/forms.ts

# - src/models/kicks.ts

# - src/models/oneSteps.ts

# - src/models/punches.ts

# - src/models/stances.ts

# Files to UPDATE (remove imports):

# - src/app.module.ts (remove controller imports and registrations)

# - src/models/index.ts (remove model exports)

echo "Backend cleanup plan created. Execute carefully after database cleanup."
echo "Always backup before removing files!"

# Tables/Features KEEPING (actively used by frontend):

# ✅ belt_requirements - Used in belt requirements page

# ✅ instructors - Authentication system

# ✅ students - Core student management

# ✅ families - Parent/guardian info

# ✅ form_definitions - Forms reference page

# ✅ kicks_definitions - Kicks reference page

# ✅ punches_definitions - Punches reference page

# ✅ student_assessments - Testing system

# ✅ Views: assessment_overview, families

# REMOVING (no frontend usage detected):

# ❌ blocks, combinations, falling, forms, kicks, one_steps, punches, stances

# ❌ These are individual student technique tracking tables

# ❌ Replaced by \_definitions tables for reference data

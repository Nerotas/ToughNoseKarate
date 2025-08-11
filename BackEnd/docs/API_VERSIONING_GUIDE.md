# API Versioning Implementation Guide

## Overview

The ToughNoseKarate API now supports URI-based versioning using NestJS's built-in versioning capabilities. All endpoints are versioned to ensure backward compatibility and smooth API evolution.

## Versioning Strategy

- **Type**: URI-based versioning
- **Current Version**: v1
- **URL Pattern**: `http://localhost:3001/v1/{resource}`
- **Prefix**: `v`

## Implementation Details

### Backend (NestJS)

The API versioning is implemented using NestJS's global versioning configuration with `VersioningType.URI`.

#### Configuration (main.ts)

```typescript
import { VersioningType } from '@nestjs/common';

// Enable URI-based versioning globally
app.enableVersioning({
  type: VersioningType.URI,
  prefix: 'v',
  defaultVersion: '1',
});
```

#### Controller Implementation

All controllers automatically inherit the global versioning configuration:

```typescript
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  @Get()
  findAll() {
    return this.studentsService.findAll();
  }
}
```

**Note**: No per-endpoint `@Version()` decorators are needed. All endpoints automatically use the global `defaultVersion: '1'`.

## API Documentation

- **Swagger UI**: http://localhost:3001/api-docs
- **OpenAPI Spec**: http://localhost:3001/api-docs-json
- **Swagger Config**: Includes v1 server configuration

## Rollback Strategy

If issues arise:

1. The versioning can be disabled by commenting out `app.enableVersioning()` in main.ts
2. Remove `@Version('1')` decorators from controllers
3. Endpoints will revert to non-versioned URLs

This versioning implementation provides a solid foundation for API evolution while maintaining stability and backward compatibility.

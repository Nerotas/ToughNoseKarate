import { Reflector } from '@nestjs/core';

export const Roles = Reflector.createDecorator<string[]>();

// Convenience functions for common role combinations
export const InstructorOnly = () => Roles(['instructor', 'admin']);
export const AdminOnly = () => Roles(['admin']);
export const InstructorOrAdmin = () => Roles(['instructor', 'admin']);

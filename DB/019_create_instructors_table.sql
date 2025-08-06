-- Migration: Create Instructors Table
-- File: 019_create_instructors_table.sql
-- Purpose: Add authentication table for instructors
CREATE TABLE instructors (
  instructor_id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role ENUM('instructor', 'admin') DEFAULT 'instructor',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL,
  -- Indexes for performance
  INDEX idx_instructors_email (email),
  INDEX idx_instructors_role (role),
  INDEX idx_instructors_active (is_active)
);

-- Insert default admin user (you'll need to replace with your hashed password)
-- Use: node generate-admin-password.js to generate the hash
INSERT INTO
  instructors (
    email,
    password_hash,
    first_name,
    last_name,
    role
  )
VALUES
  (
    'admin@toughnosekarate.com',
    '$REPLACE_WITH_YOUR_HASH',
    'Admin',
    'User',
    'admin'
  );

-- Example with a sample hash (DO NOT USE THIS IN PRODUCTION):
-- INSERT INTO instructors (email, password_hash, first_name, last_name, role)
-- VALUES ('admin@toughnosekarate.com', '$2b$10$example.hash.here', 'Admin', 'User', 'admin');
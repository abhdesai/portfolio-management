# Server Scripts

This directory contains utility scripts for the Portfolio Management server.

## Scripts

### `seed.js`
- **Purpose**: Database seeding script
- **Usage**: `npm run seed` or `node scripts/seed.js`
- **Description**: Populates the database with initial data

### `check-reset-token.js`
- **Purpose**: Utility to check password reset tokens
- **Usage**: `node scripts/check-reset-token.js <token>`
- **Description**: Validates password reset tokens for debugging

### `test-gmail-smtp.js`
- **Purpose**: Test Gmail SMTP configuration
- **Usage**: `node scripts/test-gmail-smtp.js`
- **Description**: Tests email service configuration

### `update-existing-users.js`
- **Purpose**: Update existing user records
- **Usage**: `node scripts/update-existing-users.js`
- **Description**: Migration script for existing user data

## Usage

All scripts should be run from the server directory:

```bash
cd server
node scripts/<script-name>.js
```

## Notes

- Scripts are for development and maintenance purposes
- Some scripts may require environment variables to be set
- Always backup data before running migration scripts 
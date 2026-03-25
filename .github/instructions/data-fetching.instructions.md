description: Read this file to learn about how to fetch data in this project.

# Data Fetching Instructions
this document provides guidelines on how to fetch data in this project. Follow these instructions to ensure consistency and maintainability in your code.
## 1. Use Server Components for Data Fetching
In Next.js, always use Server Components for data fetching. NEVER use client components to fetch data.

## 2. Data Fetching Methods

ALWAYS use the helper functions in the /data directory to fetch data. NEVER fetch data direclty in the components.

ALL helper functions in the /data directory should use Drizzle ORM for database interactions.
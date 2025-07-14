#  Survey Office Portfolio Backend Documentation

This backend uses **Next.js API routes with MongoDB (Mongoose)** to manage **survey job uploads and retrieval** for your portfolio.

---

##  Files Overview

### 1 `/src/lib/db.ts`

Handles **MongoDB connection** using Mongoose with **connection caching** for Next.js hot reloads.

### 2 `/src/models/jobModel.ts`

Defines the **Job schema and TypeScript interface (`IJob`)** for your MongoDB `jobs` collection.

### 3 `/src/app/api/jobs/route.ts`

API route for:

* `POST`: Uploading a new job.
* `GET`: Retrieving all jobs.

---

## 1 `/src/lib/db.ts` - MongoDB Connection Utility

### What it does:

* Connects to MongoDB Atlas using the `MONGODB_URI` environment variable.
* Implements caching to prevent multiple connections during development hot reloads.

### How to test:

1. Ensure your `.env` contains:

   ```
   MONGODB_URI=<your_mongo_uri>
   ```
2. Run:

   ```bash
   npm run dev
   ```
3. If **no errors** appear, your connection is working.
4. Use `dbConnect()` in your API route and check the console for connection logs.

---

## 2 `/src/models/jobModel.ts` - Job Model

### What it does:

Defines your `Job` schema:

* `title`: string, required.
* `description`: string.
* `location`: string.
* `date`: Date (optional).
* `images`: array of strings.
* Uses timestamps to auto-generate `createdAt` and `updatedAt`.

### How to test:

* This is tested through your API routes.
* On a successful POST request, a document will appear in your `jobs` collection in MongoDB.
* Verify using your MongoDB Atlas dashboard.

---

## 3 `/src/app/api/jobs/route.ts` - Job API Routes

### What it does:

Implements:

* `POST`: Creates a new job document.
* `GET`: Retrieves all jobs sorted by newest first.

### How to test:

#### Test `GET`:

1. Run your dev server:

   ```bash
   npm run dev
   ```
2. Visit:

   ```
   http://localhost:3000/api/jobs
   ```

   You should see `[]` if empty or a JSON array of jobs.

#### Test `POST`:

Using Postman, cURL, or VS Code REST Client:

**POST** `http://localhost:3000/api/jobs`

Headers:

* `Content-Type: application/json`

Body:

```json
{
  "title": "Boundary Survey",
  "description": "Determining the legal boundaries of a parcel.",
  "location": "Nairobi, Kenya",
  "images": ["https://via.placeholder.com/150"]
}
```

 You should receive a `201 Created` response with the created job containing `_id`, `createdAt`, and `updatedAt`.

---

##  Additional Notes

 Ensure your MongoDB URI is correctly set in your `.env`:

```
MONGODB_URI=mongodb+srv://surveyUser:<pasword>@surveyofficedb.rmpybc2.mongodb.net/?retryWrites=true&w=majority&appName=surveyOfficeDB
```

 The backend will reject:

* Missing required fields like `title`.
* Invalid data types.

Check logs for debugging:

* Terminal logs via `console.error`.
* MongoDB Atlas connection status.

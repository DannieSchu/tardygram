# Tardygram 
An Instagram clone

## Process
Work in vertical slices with TDD

### Auth routes and User model 
1. Create user model
2. Hash password with virtual (in User model)
3. Create auth token with jwt (in User model)
4. Seed database with users and export getAgent function (in db folder)
5. Signup route (in auth routes)
   1. Use cookies to send jwt
6. Authorize method (in User model)
7. Login route (in auth routes)
8.    1. Use cookies to send jwt
9. FindByToken method (in User model)
10. EnsureAuth middleware (cookie-parser) (in ensure-auth middleware)
11. Verify route (in auth routes)
    1.  Use getAgent()

### Posts
1. Model (references user)
   1. Must have `comments` virtual
2. Routes: 
   1. Authentication needed to `create`, `update` and `delete`
   2. Populate user (using reference id) and comments (using virtual) on GET (/posts/:id) route
   3. Aggregation on GET (/posts/popular) route for 10 posts with most comments

### Comments
1. Model (references both posts and routes)
2. Routes: only two (`create` and `delete`); authentication needed for both

### Users (if time)
1. Aggregations on User model
2. Routes
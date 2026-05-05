# Folder Architecture and File Architecture
- `/app` or `/src/app`
    - This is a routing folder
    - Any folder inside this directory will work as a route
    - if any folder inside `/app` contains a file `page.tsx` then it's a routing folder
        - these are the files names that are preserved for routing
            - `layout.tsx`
            - `page.tsx`
            - `loading.tsx`
            - `not-found.tsx`
            - `error.tsx`
            - `global—error.tsx`
            - `route.tsx`
            - `template.tsx`
            - `default.tsx`   
    - Every file has by default a `serverside render component`
    - You cannot use any react hook inside `server side component`

## Nextjs Components
    - `Server Side Component` (default)
    - `Client Side Component`
        - `use client;` directive use at top of your component

## For Routing
    - ```jsx
       /app
            /<folder>
            /(<folder>)
                layout.tsx
                /<routeFolder>
                different path (different layout)
            /[:<folder>]
                parameterized routes
            layout.tsx    
            // UI load
            layout
                layout
                    RouterFolder page.tsx
    ```

### Grouped Routing
    - `if a folder is created using (foldername) => this is just a file/folder gorup but not route`
    - this `(foldername)` can have `layout.tsx` file
#

Setting up an express project with nodejs

## Step1

    -make a folder `api-62`

## Step 2

    - setup node project
    - `> cd api-62/`
    - `> pnpm init`

## Step 3

    - (npm i express@5.2.1 dotenv@16.4.7 cors@2.8.5 @clerk/express@2.1.0 @clerk/backend@3.2.8 @imagekit/nodejs@7.4.0 @sentry/node@10.48.0 @sentry/profiling-node@10.48.0 drizzle-orm@0.39.3 pg@8.13.1 standardwebhooks@1.0.0 stream-chat@8.57.6 zod@3.24.2)
    - Install Dependencies and Dev Dependencies
    - `> pnpm install express`
    - `> pnpm install --save-dev @type/node typescript ts-node nodemon @type/express`

## Step 4

    - Setup `tsconfig`
    - `> npx ts --init`
    - Update ypur ` tsconfig` with the following data
    ```json
    {
        "compilerOptions": {
        "outDir": "./dist",

        "module": "nodenext",
        "target": "esnext",
        "lib": ["esnext"],
        "types": ["node"],
        "sourceMap": true,
        "declaration": true,
        "declarationMap": true,

        // Stricter Typechecking Options
        "noUncheckedIndexedAccess": true,
        "exactOptionalPropertyTypes": true,

        // Style Options
        "noUnusedLocals": true,
        // "noUnusedParameters": true,
        "noFallthroughCasesInSwitch": true,

        // Recommended Options
        "strict": true,
        // "jsx": "react-jsx",
        "verbatimModuleSyntax": true,
        "isolatedModules": true,
        "noUncheckedSideEffectImports": true,
        "moduleDetection": "force",
        "skipLibCheck": true,

        "esModuleInterop": true
        },
        "include": ["src/**/*"],
        "exclude": ["node_modules"]
    }

```
-Industry config
 {
    "compilerOptions": {
      "rootDir": "./",
      "outDir": "./dist",
      "module": "CommonJS",
      "target": "ES2020",
      "types": ["node"],
      "lib": ["ES2020"],
      "strict": true,
      "esModuleInterop": true,
      "moduleResolution": "node",
      "allowJs": true,
      "isolatedModules": true,
      "skipLibCheck": true,,
      "sourceMap": true,
      "resolveJsonModule": true,
      "forceConsistentCasingInFileNames": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "./dist"]
  }

```

## Step 5

    - Update your package.json file
    - Add the following in your script section

    ```
    {
        // ...
        "script": {
        "dev": "nodemon ./index.ts",
        "start": "node ./dist/index.js",
        "build": "tsc"
        // ...
        }
    }
    ```

## Step 6

    - create a file named `index.ts` at your root
    - Develop a server interface

# Step 7

    - Setup express
    - Prepare a folder `/src` in root
    - Create a file `./src/app.ts` for express configuration

    ```
    // ./src/app.ts

    import express, {type Application} from "express"
    const app: Application = express()

    export default app;

    ```
    - Mount the app in `index.ts`
    // /index.ts
    //....
    // import ....
    import app from "./src/app"

    const server = http.createServer(app)

    // ....

## Step 8

    - Run your codebase
    - in terminal from root location run `> pnpm dev`

## System Architecture

    - Logic/Application login
    - Data logic (Database logic)
    - Present
    - Model . View . Controller

    ```
    Request ===> Router ===> Controller(business logic) <===> Model <===> DB Operation
                                        ========> JSON response ()
    ```

    ```
        -src/
            -modules/
                -auth/
                    -AuthController.ts
                    -AuthModel.ts
                    -AuthRouter.ts
                    -AuthRequest.ts
                    -AuthService.ts


        -src/
            -controller
                -AuthController.ts
            -Request
                -AuthRequest.ts
            -Router
                -AuthRouter.ts

````

```js
  //  ./src/router/router.ts
  ...
  router.use('/auth', authRouter)

  // ./src/app.ts
  ...
  app.use("/api/v1/",router);
  app.use('/api/v2/', router)
  // O - Open-closed principle
  // open to expansion but closed to modification
  // payment gateway (esewa)
    // develop another version which should be used by new version

  // https://api.custom.tld/api/v1/auth/login
  // https://api.custom.tld/api/v1/auth/register
  // https://api.custom.tld/api/v1/auth/forget-password
  // https://api.custom.tld/api/v1/auth/reset-password
  // https://api.custom.tld/api/v1/auth/logout

````

#DB

## Library - ORM or ODM

    - Db physical data-> table or collection

## NoSQL (Non-relational DBMS)

    - ODM
    - MongoDB > `mongoose`

## SQL (Relational DBMS)

    - ORM
    - SQL ( pg, mysql, mariadb, oracle, .....) > `sequelize`, `typeorm`, `prisma`

## Setup Server

    - Localize
    - Onilne
        - Atlas

```env
- username - root
- pw - uLT9IJngaBJE6Uzf

username - user-62
password - BeC1vrfURNQNNZBB
```

# Db server config

    - DB connection
    - DB Database
    - DB table(relational)

# DB with codebase

    - connection
    - DB Modelling

# Model

    - Data Structure
    ``` json
        {

            },
            "ip": "42.48.100.32",
            
            "macAddress": "47:fa:41:18:ec:eb",
            "university": "University of Wisconsin--Madison",
            "bank": {
            "cardExpire": "03/26",
            "cardNumber": "9289760655481815",
            "cardType": "Elo",
            "currency": "CNY",
            "iban": "YPUXISOBI7TTHPK2BR3HAIXL"
            },
            "company": {
            "department": "Engineering",
            "name": "Dooley, Kozey and Cronin",
            "title": "Sales Manager",
            "address": {
            "address": "263 Tenth Street",
            "city": "San Francisco",
            "state": "Wisconsin",
            "stateCode": "WI",
            "postalCode": "37657",
            "coordinates": {
            "lat": 71.814525,
            "lng": -161.150263
            },
            "country": "United States"
            }
            },
            "ein": "977-175",
            "ssn": "900-590-289",
            "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
            "crypto": {
            "coin": "Bitcoin",
            "wallet": "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
            "network": "Ethereum (ERC20)"
            },
            "role": "admin" // or "moderator", or "user"
        }

    ```

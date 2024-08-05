# This will be our project directory

- use documents package to read the documentation
- client: our front end application
    - run
        ```
            pnpm install
        ```
    to install all the dependencies
    - run 
        ```
            pnpm run dev
        ```
    to start application

- server: our server application
    - run
        ```
            pnpm install
        ```
    to install all the dependencies
    - run 
        ```
            pnpm start:dev
        ```
    to start application

- init schema and connect to database
    - Install postgre, install pgAdmin, 
    - Tạo db tương ứng. 
    - sửa file .env 

    cd to server/prisma.
    ```
        pnpx prisma generate
    ```
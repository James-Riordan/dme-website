# Steps

## 1. Install [bun](https://bun.sh/docs/installation)

if Windows: 

(paste into terminal)
```
powershell -c "irm bun.sh/install.ps1|iex"
```
## 2. Download / Git Clone repo

```sh
git clone 
```

OR you can

Click on `code` -> `download zip`

## 2. Install project dependencies

1. 
    ```sh
    cd /path/to/project
    ```

2. 
    ```sh
    bun install
    ```

## 3. Run the code:

3.
    ```sh
    bun run dev
    ```
4.
    ```sh
    navigate to browser and go to http://localhost:5173
    ```

 or, simply, you can start the server and open the app in a new browser tab all in one command:
```sh
bun --bun run dev -- --open
```
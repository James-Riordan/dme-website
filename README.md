# Steps

## 1. Install [bun](https://bun.sh/docs/installation)

to install, if on Windows, paste into terminal: 

```
powershell -c "irm bun.sh/install.ps1|iex"
```
## 2. Download / Git Clone repo

```sh
git clone https://github.com/James-Riordan/dme-website.git
```

OR you can

go to [Repo](https://github.com/James-Riordan/dme-website) and click on `Code` -> `Download Zip`

## 3. Install project dependencies

1. 
    ```sh
    cd /path/to/project
    ```

2. 
    ```sh
    bun install
    ```

## 4. Run the code:

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
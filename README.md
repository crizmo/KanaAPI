# KanaAPI

KanaAPI is a simple API built with Express.js that provides information about Japanese Kana characters (Hiragana and Katakana).

- `data/kana.json`: Contains the Kana characters data.
- `index.js`: Main server file that sets up the API endpoints.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/crizmo/KanaAPI
    cd kanaapi
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the server:
    ```sh
    npm start
    ```

2. The server will run on `http://localhost:3000` by default.

## API Endpoints

- **Get Kana data by character**
    ```
    GET /api/kana/:character
    ```
    Example: `GET /api/kana/あ`

- **Get Hiragana chart**
    ```
    GET /api/hiragana
    ```

- **Get Katakana chart**
    ```
    GET /api/katakana
    ```
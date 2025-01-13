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

- **Get Kana data by type**
    ```
    GET /api/:type
    ```
    Example: `GET /api/hiragana`

- **Get Kana chart by type**
    ```
    GET /api/chart/:type
    ```
    Example: `GET /api/chart/hiragana`
    Response:
    ```json
    {
      "a": ["あ", "か", "さ", "た", "な", "は", "ま", "や", "ら", "わ"],
      "i": ["い", "き", "し", "ち", "に", "ひ", "み", "り"],
      "u": ["う", "く", "す", "つ", "ぬ", "ふ", "む", "ゆ", "る"],
      "e": ["え", "け", "せ", "て", "ね", "へ", "め", "れ"],
      "o": ["お", "こ", "そ", "と", "の", "ほ", "も", "よ", "ろ", "を"]
    }
    ```
# Telegram Name Updater

This script connects to your Telegram account and automatically updates your **last name** with the current time in (your time zone) every minute, prefixed with an emoji depending on the hour.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [How It Works](#how-it-works)
- [Author](#author)

---

## Prerequisites

1. **Node.js** (version 14 or higher).
2. **npm** or **yarn** for installing dependencies.

---

## Installation

1. **Clone or download** this repository.

2. **Install dependencies**:
   ```bash
   npm install
   ```

---

## Usage

1. **Create** a `.env` file in the root directory (see [Environment Variables](#environment-variables) below).
2. **Run** the script:

   ```bash
   node index.js
   ```

   The script will prompt for:

   - **Phone number**
   - **Password** (if you have 2FA enabled on Telegram)
   - **Phone code** (the code Telegram sends to your phone)

   On the first run, the script will log the string session for your account so you can save it in your `.env` file. This way, you won't have to re-enter your credentials again.

---

## Environment Variables

Create a file named `.env` in the root of your project with the following variables:

```dotenv
TELEGRAM_API_ID=123456
TELEGRAM_API_HASH=abcdef1234567890abcdef1234567890
TELEGRAM_SESSION_STRING= # (optional for the first run)
```

- `TELEGRAM_API_ID`: Your Telegram API ID, available at [my.telegram.org](https://my.telegram.org).
- `TELEGRAM_API_HASH`: Your Telegram API Hash, also found at [my.telegram.org](https://my.telegram.org).
- `TELEGRAM_SESSION_STRING`: Once generated, store it here to skip the login prompt in subsequent runs.

**Note**: If you leave `TELEGRAM_SESSION_STRING` empty, the script will prompt for your credentials and generate a new session string.

---

## How It Works

1. **Initial Login**

   - If `TELEGRAM_SESSION_STRING` is **not** set in `.env`, the script will ask for your phone number, password (if you have 2FA), and the one-time code.
   - After successful login, it will **log** the generated session string so you can save it to `.env` for future runs.

2. **Name Update**

   - The script retrieves the **current time** in Bali (Makassar time zone, `Asia/Makassar`) every minute.
   - Depending on the hour, an **emoji** is chosen:
     - Between 0:00 to 7:59 local time: `💤`
     - Otherwise: `👨‍💻`
   - The script then updates your Telegram last name to `<HH:MM> <emoji>` (e.g., `<03:15> 💤`).

3. **Repeating Task**
   - A `setInterval` is scheduled to call the `updateLastName` function every **60 seconds**, keeping the name in sync with the current time.

---

## Author

- **Fullstacktard**
  - [GitHub ](https://github.com/fullstacktard)
  - [Website](https://fullstacktard.com)

Feel free to open issues or submit pull requests for improvements or bug fixes!

---

**Enjoy your auto-updating Telegram profile name!**
# tg-username-live-time

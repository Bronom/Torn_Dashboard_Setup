# Torn Dashboard ESP32 TFT

A **hardware Torn dashboard** powered by an **ESP32** and a **2.8" SPI TFT Touch Display (ILI9341)**.

The device connects to the **Torn API** and displays your in-game stats on a dedicated screen.

⚠️ **Important:** The ESP32 only supports **2.4GHz WiFi networks**.

---

# Features

* Displays Torn player information on a TFT screen
* Uses the **Torn API**
* Touchscreen support
* Runs on a standalone **ESP32 device**

---

# Hardware

## Required Parts

| Part                             | Description                   |
| -------------------------------- | ----------------------------- |
| ESP32-32D / ESP32-WROOM-DA       | Main microcontroller          |
| 2.8" SPI TFT LCD Touch (ILI9341) | Display                       |
| ESP32 Breakout Board             | Recommended for easier wiring |
| electrical wires                 | For connections               |
| Jumper wires (Dupont wire)       | For easier testing            |

---

# Wiring

## TFT Display (ILI9341)

| Function | ESP32 Pin | Description                      |
| -------- | --------- | -------------------------------- |
| MOSI     | 23        | SPI data to TFT                  |
| MISO     | 19        | SPI data from TFT                |
| SCLK     | 18        | SPI clock                        |
| CS       | 5         | TFT chip select                  |
| DC / A0  | 2         | Data / Command select            |
| RST      | 4         | Display reset                    |
| BL       | 32        | Backlight control (PWM optional) |

---

## Touch Controller (XPT2046)

| Function  | ESP32 Pin | Description            |
| --------- | --------- | ---------------------- |
| CS        | 21        | Touch chip select      |
| MOSI      | 23        | Shared SPI MOSI        |
| MISO      | 19        | Shared SPI MISO        |
| SCLK      | 18        | Shared SPI clock       |
| IRQ / PEN | 22        | Optional interrupt pin |

---

# Notes

* ESP32 supports **2.4GHz WiFi only**
* The wiring and hardware must be the same or you need to ajust the pinout in the **`User_Setup.h`**.
* The UI Layout don't scale with different display size.
  
---

# License

This project is released for **personal and educational use only**.

You are free to:

* Use the project for personal purposes
* Modify the code
* Share improvements

Under the following conditions:

1. **No commercial use**
   This project may **not be sold**, bundled into commercial products, or used for any commercial activity.

2. **Attribution required**
   If you distribute or modify this project, you must **keep the original source reference** and credit the original author.

3. **Source must remain open**
   Any modified versions must **keep the source code publicly available**.

4. **Do not claim this project as your own**
   Redistribution must keep the original author credit.

If you wish to use this project commercially, please contact the author for permission.

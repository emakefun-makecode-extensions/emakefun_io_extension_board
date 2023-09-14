# MakeCode Extension For Emakefun IO Extension Board

## Introduction

- This project implements a MakeCode extension for Microbit to integrate the Emakefun IO Extension Board's capabilities on the micro:bit.

- Through this extension, you can easily use the Emakefun IO Extension Board to add peripherals like digital input/output, analog input, PWM output and servo control in the MakeCode Blocks editor.

## Usage

- To use this extension, simply add the extension file to MakeCode and start coding with the provided blocks under the "Emakefun" category.

- The key steps are:

  - Create an `IoExtensionBoard` instance with the I2C address of the board. The default I2C address is `0x24` in hex or `36` in decimal.

  - Set PWM frequency using `setPwmFrequency` which takes a value between **1-10000 Hz**. This is optional and only needed if you want to use PWM output.

  - Configure pin modes using setPinMode. The available pin modes are:

    - `PinMode.InputPullUp` - Input with pull-up resistor
    - `PinMode.InputPullDown` - Input with pull-down resistor
    - `PinMode.InputFloating` - Input without pull-up/down resistor
    - `PinMode.OutputDigital` - Digital output
    - `PinMode.InputAnalog` - Analog input
    - `PinMode.OutputPwm` - PWM output
  - Read digital input using `digitalRead`

  - Write digital output using `digitalWrite`

  - Read analog input using `analogRead`. The return value range is **0-1023**.

  - **PWM output is only supported on pins E1 and E2. Duty cycle range is 0-4095.**

  - Control PWM output using `setPwmDuty`

  - Servo control is a high level PWM function also **only supported on E1 and E2**. It requires PWM frequency to be set to `50Hz`. `setServoAngle` will control the servo based on this.

  **Note: Controlling servo motors requires an external power supply, the micro:bit alone cannot provide enough current.**

## Hardware

## Example

### Digital writing and reading

This example shows how to configure E0 for digital input and E1 for digital output. It reads the input value from E0 and displays it on the Microbit LED screen. It also writes digital value 1 to the output pin E1.

You can copy the code from below or view the project (blocks and JavaScript view) [here](https://makecode.microbit.org/_DXp2z22WiW8x).

```block
let io_extension_board = emakefun.createIoExtensionBoard(36)
io_extension_board.setPinMode(emakefun.Pin.E0, emakefun.PinMode.InputPullUp)
io_extension_board.setPinMode(emakefun.Pin.E1, emakefun.PinMode.OutputDigital)
basic.forever(function () {
    basic.showNumber(io_extension_board.digitalRead(emakefun.Pin.E0))
    io_extension_board.digitalWrite(emakefun.Pin.E1, 1)
})
```

### Analog reading

This example shows how to use analog input on pin E0. It reads the analog value and displays it on the Microbit screen.

You can copy the code from below or view the project (blocks and JavaScript view) [here](https://makecode.microbit.org/_1ETgVxKThPP7).

```block
let io_extension_board = emakefun.createIoExtensionBoard(36)
io_extension_board.setPinMode(emakefun.Pin.E0, emakefun.PinMode.InputAnalog)
basic.forever(function () {
    basic.showNumber(io_extension_board.analogRead(emakefun.Pin.E0))
})
```

### Output pwm

This example shows how to configure PWM output on pin E1. It sets the frequency to 1000Hz and a duty cycle of 2048 (half).

You can copy the code from below or view the project (blocks and JavaScript view) [here](https://makecode.microbit.org/_gDR0DmLfTXo8).

```block
let io_extension_board = emakefun.createIoExtensionBoard(36)
io_extension_board.setPwmFrequency(1000)
io_extension_board.setPinMode(emakefun.Pin.E1, emakefun.PinMode.OutputPwm)
basic.forever(function () {
    io_extension_board.setPwmDuty(emakefun.Pin.E1, 2048)
})
```

### Servo Control

This example shows how to control a servo on pin E1. It sets PWM frequency to 50Hz and moves the servo between 0 and 90 degree positions.

**Note: Controlling servo motors requires an external power supply, the micro:bit alone cannot provide enough current.**

You can copy the code from below or view the project (blocks and JavaScript view) [here](https://makecode.microbit.org/_fPoeWsV2iTk0).

```block
let io_extension_board = emakefun.createIoExtensionBoard(36)
io_extension_board.setPwmFrequency(50)
io_extension_board.setPinMode(emakefun.Pin.E1, emakefun.PinMode.OutputPwm)
basic.forever(function () {
    io_extension_board.setServoAngle(emakefun.Pin.E1, 0)
    basic.pause(1000)
    io_extension_board.setServoAngle(emakefun.Pin.E1, 90)
    basic.pause(1000)
})
```

## Supported targets

- for PXT/microbit (The metadata above is needed for package search.)

## License

MIT

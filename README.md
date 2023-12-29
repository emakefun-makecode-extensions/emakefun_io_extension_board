# MakeCode Extension For Emakefun IO Extension Board

## Introduction

- This project implements a MakeCode extension for Microbit to integrate the Emakefun IO Extension Board's capabilities on the micro:bit.

- Through this extension, you can easily use the Emakefun IO Extension Board to add peripherals like digital input/output, analog input, PWM output and servo control in the MakeCode Blocks editor.

- You can get this module from [here](https://www.aliexpress.com/item/1005006064021730.html)

## Usage

- To use this extension, simply add the extension file to MakeCode and start coding with the provided blocks under the "Emakefun" category.

- The key steps are:

  - Create an `IoExtensionBoard` instance with the I2C address of the board. The default I2C address is `0x24` in hex or `36` in decimal.

  - Set PWM frequency using `setPwmFrequency` which takes a value between **1-10000 Hz**. This is optional and only needed if you want to use PWM output.

  - Configure pin modes using setPinMode. The available pin modes are:

    - `PinMode.DigitalInputPullUp` - Digital input with pull-up resistor
    - `PinMode.DigitalInputPullDown` - Digital input with pull-down resistor
    - `PinMode.DigitalInputFloating` - Digital input without pull-up/down resistor
    - `PinMode.DigitalOutput` - Digital output
    - `PinMode.AnalogInput` - Analog input
    - `PinMode.PwmOutput` - PWM output
  - Read digital input using `digitalRead`

  - Write digital output using `digitalWrite`

  - Read analog input using `analogRead`. The return value range is **0-1023**.

  - **PWM output is only supported on pins E1 and E2. Duty cycle range is 0-4095.**

  - Control PWM output using `setPwmDuty`

  - Servo control is a high level PWM function also **only supported on E1 and E2**. It requires PWM frequency to be set to `50Hz`. `setServoAngle` will control the servo based on this.

  **Note: Controlling servo motors requires an external power supply, the micro:bit alone cannot provide enough current.**

## Example

### Digital writing and reading

This example shows how to configure E0 for digital input and E1 for digital output. It reads the input value from E0 and displays it on the Microbit LED screen. It also writes digital value 1 to the output pin E1.

You can copy the code from below or view the project (blocks and JavaScript view) [here](https://makecode.microbit.org/_AyK3eucCKEse).

```block
let io_extension_board = emakefun.createIoExtensionBoard(36)
io_extension_board.setPinMode(emakefun.Pin.E0, emakefun.PinMode.DigitalInputPullUp)
io_extension_board.setPinMode(emakefun.Pin.E1, emakefun.PinMode.DigitalOutput)
basic.forever(function () {
    basic.showNumber(io_extension_board.digitalRead(emakefun.Pin.E0))
    io_extension_board.digitalWrite(emakefun.Pin.E1, 1)
})
```

### Analog reading

This example shows how to use analog input on pin E0. It reads the analog value and displays it on the Microbit screen.

You can copy the code from below or view the project (blocks and JavaScript view) [here](https://makecode.microbit.org/_7DjWLJJUsPRr).

```block
let io_extension_board = emakefun.createIoExtensionBoard(36)
io_extension_board.setPinMode(emakefun.Pin.E0, emakefun.PinMode.AnalogInput)
basic.forever(function () {
    basic.showNumber(io_extension_board.analogRead(emakefun.Pin.E0))
})
```

### Pwm Output

This example shows how to configure PWM output on pin E1. It sets the frequency to 1000Hz and a duty cycle of 2048 (half).

You can copy the code from below or view the project (blocks and JavaScript view) [here](https://makecode.microbit.org/_Wpz4jcfbXEsX).

```block
let io_extension_board = emakefun.createIoExtensionBoard(36)
io_extension_board.setPwmFrequency(1000)
io_extension_board.setPinMode(emakefun.Pin.E1, emakefun.PinMode.PwmOutput)
basic.forever(function () {
    io_extension_board.setPwmDuty(emakefun.Pin.E1, 2048)
})
```

### Servo Control

This example shows how to control a servo on pin E1. It sets PWM frequency to 50Hz and moves the servo between 0 and 90 degree positions.

**Note: Controlling servo motors requires an external power supply, the micro:bit alone cannot provide enough current.**

You can copy the code from below or view the project (blocks and JavaScript view) [here](https://makecode.microbit.org/_XjzMj0VCKYJJ).

```block
let io_extension_board = emakefun.createIoExtensionBoard(36)
io_extension_board.setPwmFrequency(50)
io_extension_board.setPinMode(emakefun.Pin.E1, emakefun.PinMode.PwmOutput)
basic.forever(function () {
    io_extension_board.setServoAngle(emakefun.Pin.E1, 0)
    basic.pause(1000)
    io_extension_board.setServoAngle(emakefun.Pin.E1, 90)
    basic.pause(1000)
})
```

## Supported targets

- for PXT/microbit

## License

MIT

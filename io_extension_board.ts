//% block="Emakefun"
namespace Emakefun {

  /**
   * Enumeration for pins on the extension board
   */
  export const enum Pin {
    E0,
    E1,
    E2,
    E3,
    E4,
    E5,
    E6,
    E7,
  }

  /**
   * Enumeration for pin modes
   */
  export const enum PinMode {
    InputPullUp = 1 << 0,    // Input with pull-up resistor
    InputPullDown = 1 << 1,  // Input with pull-down resistor
    InputFloating = 1 << 2,  // Input without pull-up/down resistor
    OutputDigital = 1 << 3,  // Output mode
    InputAnalog = 1 << 4,    // Analog input mode
    OutputPwm = 1 << 5,      // PWM output mode
  }

  /**
   * I2C addresses
   */
  const enum Address {
    Version = 0x00,
    IoMode = 0x01,
    AnalogValue = 0x10,
    DigitalValue = 0x40,
    PwmDuty = 0x50,
    PwmFrequency = 0x60,
  }

  /**
   * Create a new Emakefun IO extension board instance
   * @param i2c_address I2C address of the board, default 0x24
   */

  //% block="create Emakefun IO extension board|with I2C address $i2c_address"
  //% subcategory="IoExtensionBoard"
  //% blockSetVariable=io_extension_board
  //% i2c_address.defl=0x24
  //% inlineInputMode=external
  //% group="constructor"
  export function createIoExtensionBoard(i2c_address: number = 0x24): IoExtensionBoard {
    return new IoExtensionBoard(i2c_address);
  }

  export class IoExtensionBoard {
    private readonly i2c_device: Emakefun.I2cDevice = undefined

    /**
     * Constructor
     * @param i2c_address I2C address of the module, default 0x24
     */
    constructor(i2c_address: number = 0x24) {
      this.i2c_device = new Emakefun.I2cDevice(i2c_address);
    }

    /**
     * Set the pin mode for a pin
     * @param pin Pin to set mode for
     * @param pin_mode Mode to set for the pin
     */
    //% block="$this set pin $pin mode to $pin_mode"
    //% subcategory="IoExtensionBoard"
    //% this.defl=io_extension_board
    //% pin_mode.defl=Output
    //% group="initialization"
    setPinMode(pin: Pin, pin_mode: PinMode) {
      this.i2c_device.writeByte(Address.IoMode + pin, pin_mode);
    }

    /**
     * Set the PWM frequency
     * @param frequency Frequency in Hz (1-10000)
     */
    //% block="$this set PWM frequency to $frequency Hz"
    //% subcategory="IoExtensionBoard"
    //% this.defl=io_extension_board
    //% frequency.min=1 frequency.max=10000
    //% frequency.defl=50
    //% group="initialization"
    setPwmFrequency(frequency: number) {
      this.i2c_device.writeBytes(Address.PwmFrequency, Buffer.pack('<H', [frequency]));
    }

    /**
     * Write a digital value to a pin
     * @param pin Pin to write to
     * @param value 0 or 1 to write
     */
    //% block="$this write digital value $value to pin $pin"
    //% subcategory="IoExtensionBoard"
    //% this.defl=io_extension_board
    //% value.min=0 value.max=1
    //% group="digital"
    digitalWrite(pin: Pin, value: number) {
      this.i2c_device.writeByte(Address.DigitalValue + pin, value);
    }

    /**
     * Read a digital value from a pin
     * @param pin Pin to read from
     * @returns 0 or 1
     */
    //% block="$this read digital value from pin $pin"
    //% subcategory="IoExtensionBoard"
    //% this.defl=io_extension_board
    //% group="digital"
    digitalRead(pin: Pin): number {
      return this.i2c_device.readByte(Address.DigitalValue + pin);
    }

    /**
     * Read an analog value from a pin
     * @param pin Pin to read from
     * @returns Analog value (0-1024)
     */
    //% block="$this read analog value from pin $pin"
    //% subcategory="IoExtensionBoard"
    //% this.defl=io_extension_board
    //% group="analog"
    analogRead(pin: Pin): number {
      let bytes = this.i2c_device.readBytes(Address.AnalogValue + (pin << 1), 2);
      return (bytes[1] << 8) | bytes[0];
    }

    /**
     * Set PWM duty cycle for a pin
     * @param pin Pin to set duty cycle for
     * @param duty Duty cycle value (0-4095)
     */
    //% block="$this set PWM duty on pin $pin to $duty"
    //% subcategory="IoExtensionBoard"
    //% this.defl=io_extension_board
    //% duty.defl=2048
    //% duty.min=0 duty.max=4095
    //% group="pwm"
    setPwmDuty(pin: Pin, duty: number) {
      this.i2c_device.writeBytes(Address.PwmDuty + (pin << 1), Buffer.pack('<H', [duty]));
    }

    /**
     * Set servo angle on a pin
     * @param pin Pin to control servo on
     * @param angle Angle in degrees (0-180)
     */

    //% block="$this set servo on pin $pin to $angle degrees"
    //% subcategory="IoExtensionBoard"
    //% this.defl=io_extension_board
    //% angle.min=0 angle.max=180
    //% group="servo control"
    setServoAngle(pin: Pin, angle: number) {
      this.setPwmDuty(pin, Math.round(((angle / 90) + 0.5) / 20 * 4095));
    }
  }
}
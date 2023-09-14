let io_extension_board = emakefun.createIoExtensionBoard(36)
io_extension_board.setPinMode(emakefun.Pin.E0, emakefun.PinMode.InputPullUp)
io_extension_board.setPinMode(emakefun.Pin.E1, emakefun.PinMode.OutputPwm)
basic.forever(function() {
  basic.showNumber(io_extension_board.digitalRead(emakefun.Pin.E0))
  io_extension_board.digitalWrite(emakefun.Pin.E1, 1)
})

let io_extension_board = Emakefun.createIoExtensionBoard(36)
io_extension_board.setPinMode(Emakefun.Pin.E0, Emakefun.PinMode.InputPullUp)
io_extension_board.setPinMode(Emakefun.Pin.E1, Emakefun.PinMode.OutputPwm)
basic.forever(function() {
  basic.showNumber(io_extension_board.digitalRead(Emakefun.Pin.E0))
  io_extension_board.digitalWrite(Emakefun.Pin.E1, 1)
})

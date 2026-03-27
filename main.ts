/** 
Cutebot RC Car: Controller Code
-------------------------------

If A is pressed:
    send "Left" to the car
Elif B is pressed:
    send "Right" to the car
Elif AB is pressend:
    send "Forward" to the car
Else:
    send "Stop" to the car

If the car makes an emergency stop, notify
the user and make a sound. Also disable all
input until reset with a logo press.

 */
let is_emergency_stopped = false
radio.onReceivedString(function on_received_string(receivedString: string) {
    let is_emergency_stopped: boolean;
    if (receivedString == "Emergency Stop") {
        is_emergency_stopped = true
        basic.showLeds(`
            . . # . .
            . . # . .
            . . # . .
            . . . . .
            . . # . .
            `)
        music.play(music.builtinPlayableSoundEffect(soundExpression.mysterious), music.PlaybackMode.InBackground)
    }
    
})
input.onLogoEvent(TouchButtonEvent.Pressed, function on_logo_event_pressed() {
    let is_emergency_stopped = false
    basic.showIcon(IconNames.Yes)
    music.play(music.builtinPlayableSoundEffect(soundExpression.happy), music.PlaybackMode.InBackground)
})
radio.setGroup(42)
basic.forever(function on_forever() {
    if (!is_emergency_stopped) {
        if (input.buttonIsPressed(Button.AB)) {
            radio.sendString("Forward")
            basic.showArrow(ArrowNames.North)
        } else if (input.buttonIsPressed(Button.A)) {
            radio.sendString("Left")
            basic.showArrow(ArrowNames.West)
        } else if (input.buttonIsPressed(Button.B)) {
            radio.sendString("Right")
            basic.showArrow(ArrowNames.East)
        } else {
            radio.sendString("Stop")
            basic.showLeds(`
                . # # # .
                # . . . #
                # . . . #
                # . . . #
                . # # # .
                `)
        }
        
    }
    
})

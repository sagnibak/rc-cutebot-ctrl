"""
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
"""

is_emergency_stopped = False

def on_received_string(receivedString):
    if receivedString == "Emergency Stop":
        is_emergency_stopped = True
        basic.show_leds("""
            . . # . .
            . . # . .
            . . # . .
            . . . . .
            . . # . .
            """)
        music.play(
            music.builtin_playable_sound_effect(soundExpression.mysterious),
            music.PlaybackMode.IN_BACKGROUND)
radio.on_received_string(on_received_string)

def on_logo_event_pressed():
    is_emergency_stopped = False
    basic.show_icon(IconNames.YES)
    music.play(
        music.builtin_playable_sound_effect(soundExpression.happy),
        music.PlaybackMode.IN_BACKGROUND)
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_event_pressed)

radio.set_group(42)

def on_forever():
    if not is_emergency_stopped:
        if input.button_is_pressed(Button.AB):
            radio.send_string("Forward")
            basic.show_arrow(ArrowNames.NORTH)
        elif input.button_is_pressed(Button.A):
            radio.send_string("Left")
            basic.show_arrow(ArrowNames.WEST)
        elif input.button_is_pressed(Button.B):
            radio.send_string("Right")
            basic.show_arrow(ArrowNames.EAST)
        else:
            radio.send_string("Stop")
            basic.show_leds("""
                . # # # .
                # . . . #
                # . . . #
                # . . . #
                . # # # .
                """)


basic.forever(on_forever)

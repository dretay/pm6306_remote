# PM630X User Interface

<img src="https://raw.githubusercontent.com/dretay/pm6306_remote/master/IMG_4582.jpg" align="right" width="208">

> An Electron-based user interface for PM630X LCR meters


The Fluke / Philips PM630X line of LCR meters were a line of benchtop equipment that allowed the testing of components with a frequency up to 1MHZ. Even though the meter was designed over 20 years ago it is still highly capable and has specs similar to modern commercial meters. The major advantage modern meters have are their updated rich UIs which are much more featureful and powerful than the LED display leveraged in this device. Fortunately PM630X meters include an optional RS232 port which allows fully remote control of the unit. This project leverages this serial port to build a modern high resolution TFT-based UI
on this device that significantly expands the utility of the base unit. 

### Main Features ###
- Redesigned modern UI for displaying measured component values
  - Shows currently measured voltage and current in addition to primary and secondary component readings
  - Allows entering numeric values (frequency and voltages) through an on-screen keypad for quicker setup
  - Allows selection of primary and secondary measurement parameters through on-screen dropdowns
- (Planned) graphical ability to sweep frequency response for a component
- (Planned) graphical ability to bin components based on tolerances

### Build Instructions ###
- TODO

## References
> Software tools, hardware, and useful articles

### Software ###
- [Electron](https://electronjs.org/)
- [ReactJS](https://reactjs.org/)
- [Bootstrap](https://getbootstrap.com/) 

### Hardware ###
- [Odroid C2](https://wiki.odroid.com/odroid-c2/odroid-c2)
- [Waveshare 4.3inch HDMI LCD](https://www.waveshare.com/4.3inch-hdmi-lcd-b.htm)

# Automated Keyboard PCB generator for KiCad 

Simple tool that can generate KiCad project based on [Keyboard Layout Editor](http://www.keyboard-layout-editor.com/) json configuration.


## Changes against main project

This project is a fork of fcoury/kbpcb project. My intention was to adopt this tool in the way, that I will be able to generate projects with more complex layout and different controller. Because of that quite a lot of elements from main project where changed removed. 

**Probably this changes will never be backported to main project**

Main changes in this fork

* Removed support for raw Atmega32u4
* Added support for `promicro` controller (default)
* Experimental support for split keyboards
* Added posibility to configure PCB size for keyboard. May help with `promicro` placement
* A lot of fixes related to KiCad project. Everything should now work on KiCad side.

## Split keyboards (Experimantal in progress)

Experimental support for split keyboards (tests in progress).
Possibility to configure different connectors to communicate between parts.
Each half should be generated separately. As result we will have two Kicad projects.

I still working on this currently Left side should work without any problems. But right may still contain issues related to layout placement.
Final support should be ready in 1 quarter of 2020  

## How to use

Application is build with nodejs. For info how install please check node manual.

To run application type `node index.js` from main project folder.

Afterwards upload your raw keyboard layout and configure what elements should be added to final board.

## KiCad

To open generated project you will need [KiCad](https://kicad-pcb.org/) application. After opening please validate project with `Perform electrical rules check` tool. And synchronize schematic with PCB. In most situation check / synchronization is not needed but to be sure that our project will not generate any issues in future please do it.


## Code
Current code quality is not the best. I have very limited time for this project.

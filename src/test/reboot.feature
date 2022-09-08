Feature: RebootTests rebooting of devices
Background:
Given I navigate to the device dashboard

Scenario Outline: A device tile updates accordingly when rebooting a device
When I click the Reboot button of the device at the address "<address>"
Then The device status indicator becomes green

Examples:
|address     |
|10.198.162.1|
|10.198.162.2|
|10.198.162.3|

 
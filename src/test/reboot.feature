Feature: Reboot
Background: 
When I navigate to the device dashboard

Scenario: A device tile updates accordingly when rebooting a device
And I click the Reboot  button of the device at the address  "10.198.162.2"
Then the device status indicator becomes green


Scenario Outline: All device tile updates accordingly when rebooting that devices
And I click the Reboot  button of the device at the address  "<address>"
Then the device status indicator becomes green
Examples: 
   |address|
   |10.198.162.1|
   |10.198.162.2|
   |10.198.162.3|

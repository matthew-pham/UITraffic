###UITraffic 


------------


##  Goal
Help people plan around human dense areas for walking traffic purposes. Predict ahead of time if a location will be populated to help make plans.

## Components and Responsibilities
### Minimum Viable Product
- Heat map / data points for engineering quad
- Collect and see data in a mobile app
- Website to show aggregated data
- Beta testers / fine tune aggregation

------------

## Submodule Usage

This project consists of parts that would not all fit onto one repo. For example, the android files should not be directly next to the ios files. To organize our code, we will use git submodules. There are 4 submodules, Android (For the Android app), IOS (For the IOS app), Website_Backend (For all backend related code), and Website_Frontend (For the website's front end)

When cloning this repo, you will get all the submodules, but they will be empty. To get the contents of a specific submodule, run
`git submodule update submodule_name`
For your first pull, be sure to run 
`git submodule update --init submodule_name`

Once you get the contentents of a submodle, you can treat the insides of it as its own repo. You can make branches, push, pull, etc.


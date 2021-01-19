# Hack The North 2020++ Hackathon Project - VidSpace

## 2nd place winner for the CansOfCom challenge - $400 prize

<img src="https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/348/679/datas/gallery.jpg" width="500">

## Check out our devpost for pics and more info!
## Devpost: https://devpost.com/software/vidspace

## Project Pictures 
![pic1](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/350/339/datas/original.png)
![pic2](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/350/343/datas/original.png)

## Inspiration

VidSpace is a video analysis tool that automatically processes videos in your data warehouse into searchable segments. Our Inspiration came from the CansOfCOM challenge which asked us to create an easy way to search videos like bodycam footage as these videos are often very long and it is very easy to miss stuff that way. We set to fix that with our project VidSpace.

## What it does

VidSpace uses machine learning and AI to detect objects in a video, the user can search for any object they want and instantly go to the part of the video where that object was seen. The User can also specify a range of times and the program will output all the objects seen in that range of time.

### Benefits
Lower the cost spent on manually scrubbing through hours and hours of videos
High accuracy object labelling
Focus on what your organization needs to focus on

### Public sector use (e.g. military, law enforcement)
Foot patrol body cam footage
Aerial surveillance
Ground surveillance (cctv)
Security

### Private sector use revenue streams
Targeted advertising
Maps
Population density / traffic analysis
Security


## How we built it

We built this program using the Google Cloud Video Intelligence API for the AI and machine learning aspect, we also used CockroachDB's cloud database to store all our results and to ease in searching. We used react and node.js for the UI and frontend.

## Challenges we ran into

It was a first time for many of us, Nigel had never worked with the video intelligence API before so he had to learn that from scratch and that took many hours as we went through documentation to learn how to use it.

Moustafa created the database and had to learn SQL and databases for the first time as well, Spending the first hours learning we were able to finally use cockroachdb and create a working database for our project.

Farhan created the UI and learned how to add videos to a webpage and upload them. The rest of the time he worked on developing a user friendly UI that pleases the eye.

## What we learned

We learnt a lot in this hackathon and each one of us picked up a new skill or two. We are very proud of our achievement during this hackathon.

## What's next for VidSpace

Better load times as google cloud is slow due to the limited processing power, and more features such as borders on people and cars on the video.

## UI Demo Shown In Presentation
https://youtu.be/QG9kIlhCOJw

## Try it yourself!
https://vidspace.netlify.app/v

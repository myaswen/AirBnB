# **Tbdbnb**

## **Summary**

Tbdbnb is a full stack, stateful clone of airbnb.com. All data displayed on the site is dynamically loaded from both database seeds and user interaction with the site. The current build of the site offers two key features of interaction. The first feature allows users to host spots (supporting create, read, update, and delete). The second feature allows users to make bookings at those spots (supporting create, read, and delete).

---
## **Technologies**

### Languages:
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

### Backend Development:
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

### Frontend Development:
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

---
## **Screenshots**
![Get all spots](https://i.imgur.com/piBBTXR.jpg)
![Get a spot](https://i.imgur.com/d9LIr67.png)
<img src="https://i.imgur.com/XQGQHd1.png" alt="Get all spots mobile" width="32%"/>
<img src="https://i.imgur.com/Ks3S3lI.png" alt="Get a spot mobile" width="32%"/>
<img src="https://i.imgur.com/HpHrPLe.png" alt="Get reservations" width="32%"/>

---
## **Features**

### Authentication
- Users are able to login to an existing account or sign up for a new account.
- Both the login and sign up forms have implemented validation.
- Users without an active login session are denied access to or interaction with certain features.

### Spots
- All spots are displayed in their own respective cards on the home page.
- Each spot card can be clicked to navigate to that individual spot's detail page.
- Users can create a new spot.
- Users can edit spots they've created.
- Users can delete spots they've created.
- Both the create spot and edit spot forms have implemented validation.

### Bookings
- Once navigated to a spot's detail page, users can create a reservation for that spot using the booking card.
- Users can view all the reservations they've made on their reservations page.
- Users can delete reservations, if in advance of the check-in date.
- Both the create reservation form and delete reservation action have implemented validation.

---
## **Future Plans**
- Implement reviews (create, read, update, and delete).
- Implement additional spot images (create, read, and delete).
---
## **Get Started**
- In order to run the project locally, you must install the dependencies for both the frontend and backend directories.
- Then run the start commands for both the backend and frontend directories in separate tabs of your CLI.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete product feedback requests
- Receive form validations when trying to create/edit feedback requests
- Sort suggestions by most/least upvotes and most/least comments
- Filter suggestions by category
- Add comments and replies to a product feedback request
- Upvote product feedback requests
- **Bonus**: Keep track of any changes, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)

### Screenshot

![desktop](./sc-desktop.png)
![tablet](./sc-tablet.png)
![mobile](./sc-mobile.png)

### Links

- Live Site URL: [Live site](https://feedback-product-dusky.vercel.app)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [Next.js](https://nextjs.org/) - React framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

### What I learned

While building this project, I learned how intercepting routes work in Next.js and how powerful they become when combined with parallel routes — especially for displaying modals smoothly without breaking page navigation.

I also discovered the strength of using **Zod** with **React Hook Form** for validating and managing forms. Together, they made handling form inputs much more reliable, readable, and efficient.

## Author

- Frontend Mentor - [@maziarja](https://www.frontendmentor.io/profile/maziarja)
- Twitter - [@maz_alem](https://x.com/maz_alem)
- LinkedIn - [@maziar-jamalialem](https://www.linkedin.com/in/maziar-jamalialem-677030345/)

## Acknowledgments

I want to express my appreciation to **Tom Phillips** for his _NextAuth v5_ course on Udemy. I had learned authentication before, but it was always a bit confusing to me. After taking his course, the concepts became much clearer and more structured.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Reason to build this APP

Every day i see fuel prices change during the day, during the week. 
The UI is backed by Node JS API which i have kept private.

The Node JS API, scrapes data from a website which tracks 4 gas stations near my place.
It scrapes data, every hour and saves in Firebase DB.
End of every day, second API calculates the Min and Max for the whole day and then saves again.

## Tech Stack
### Frontend
```
1. Create React App with Hooks
2. MobX
3. D3.JS
4. TypeScript
```

### Backend API <Private Repo>

```
1. Node JS
2. Cheerio
3. Firebase SDK
```

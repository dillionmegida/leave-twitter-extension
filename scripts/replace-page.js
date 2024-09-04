console.log("`Leave Me Alone` extension activated")

const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Leave Twitter, Be Productive</title>
      <style>
        @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body,
        html {
          height: 100%;
          font-family: "Roboto", sans-serif;
          color: #ffffff;
        }

        html {
          background-color: #333;
        }

        .container {
          padding: 40px 60px;
        }

        .landing-cover {
          object-fit: cover;
          width: 100%;
        }

        h1 {
          font-size: 3rem;
          margin-bottom: 20px;
          color: #fe5858;
          text-transform: uppercase;
        }

        p {
          font-size: 1.5rem;
          margin-bottom: 30px;
        }
      </style>
    </head>
    <body>
      <img
        class="landing-cover"
        src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <div class="container">
        <h1>Leave Twitter Alone</h1>
        <p>Twitter can be a distraction. Do something productive instead!</p>
      </div>
    </body>
  </html>
`

function replacePageContent() {
  const htmlElemOnPage = document.querySelector("html")

  if (!htmlElemOnPage) return

  htmlElemOnPage.innerHTML = html
}

const STORAGE_KEY_TIME_SPENT = "time_spent_on_twitter"
const STORAGE_KEY_DATE = "todays_date"
const TIME_LIMIT = 2 * 60 * 60; // 2hrs

let timeSpent = 0 // in secs

function init() {
  const savedTodaysDate = localStorage.getItem(STORAGE_KEY_DATE)
  const actualTodaysDate = new Date()

  const sameDay = isItSameDay(savedTodaysDate, actualTodaysDate)
  console.log({ savedTodaysDate, actualTodaysDate, sameDay })

  if (sameDay) {
    const savedTimeSpent = localStorage.getItem(STORAGE_KEY_TIME_SPENT)
    const savedTimeSpentInNum = parseInt(savedTimeSpent)

    if (isItTimeUp(savedTimeSpentInNum)) return replacePageContent()

    setTimer(savedTimeSpent)
  } else {
    localStorage.setItem(STORAGE_KEY_DATE, actualTodaysDate)
    setTimer(0)
  }
}

function setTimer(from = 0) {
  timeSpent += from

  intervalId = setInterval(() => {
    timeSpent++

    if (isItTimeUp(timeSpent)) {
      replacePageContent()
      clearInterval(intervalId)
      return
    }

    localStorage.setItem(STORAGE_KEY_TIME_SPENT, timeSpent)
  }, 1000)
}

init()

function isItSameDay(date1, date2) {
  const dateObject1 = new Date(date1)
  const dateObject2 = new Date(date2)

  return (
    dateObject1.getDate() === dateObject2.getDate() &&
    dateObject1.getMonth() === dateObject2.getMonth() &&
    dateObject1.getFullYear() === dateObject2.getFullYear()
  )
}

function isItTimeUp(timeSpent) {
  return timeSpent >= TIME_LIMIT
}

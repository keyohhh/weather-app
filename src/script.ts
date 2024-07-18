//Variables for DOM changes
const submitQueue: HTMLButtonElement = document.querySelector('.submit-location')!;
const weatherLocation: HTMLInputElement = document.querySelector('.desired-location')!;
let dayOfWeek: HTMLHeadingElement = document.querySelector('.weekday')!;
let date = document.querySelector('.date')!;

//textContent updates
dayOfWeek.textContent = getDate('weekday')
date.textContent = getDate('notx')


submitQueue.addEventListener('click', () => {
  let city = weatherLocation.value
  let toggleWindow = document.querySelector('.location')
  toggleWindow?.classList.toggle('inactive')
  findLocation(city).then(data => console.log(data))
  weatherLocation.value = ""
})

//Dynamic error handling
class errorHandler extends Error {
    constructor(
      public status: number,
      public message: string
    ) {
      super(message);
      this.name = this.constructor.name;
    }
}

//Fetch weather API for location input click
async function findLocation(city: string) {
  let cityQueue: HTMLInputElement = document.querySelector('.desired-location')!;
  city = cityQueue.value
  let apiKey = 'BMPSU7J2HT99SL9NTZC8BJ962'
  let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`

  try {
    let response = await fetch(url)
    let data = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error('There was a problem fetching weather:', error.message)
    } else {
      console.error('An unexpected error has occurred')
    }
  }
}

function getDate(x: string) {
  let date = new Date()
  let weekdays = ["Sunday", 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let weekday = weekdays[date.getDay()]
  let time = date.toLocaleTimeString()
  let timeArr = time.split(' ')
  let currTime = timeArr[0].slice(0, -3)
  let correctTime = currTime + " " + timeArr[1]
  let dateFormat = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}, ` + correctTime
  if (x === 'weekday') {
    return weekday
  } else {
    return dateFormat
  }
} 


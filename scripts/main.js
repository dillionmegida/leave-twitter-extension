const STORAGE_KEY_LIMIT = "time_limit_for_twitter"

const durationInput = document.getElementById("duration-input")
const limitElem = document.getElementById("limit-elem")
const durationForm = document.getElementById("duration-form")
const savedLimit = localStorage.getItem(STORAGE_KEY_LIMIT)

if (savedLimit) {
  limitElem.innerText = `${savedLimit}mins`
  durationInput.value = savedLimit
}

durationForm.addEventListener("submit", e => {
  e.preventDefault()

  if (durationInput) {
    const newLimit = durationInput.value
    chrome.storage.local.set({ [STORAGE_KEY_LIMIT]: newLimit }, function () {
      console.log("New duration is saved in storage:", newLimit + 'mins')
    })
    localStorage.setItem(STORAGE_KEY_LIMIT, newLimit)
    limitElem.innerText = `${newLimit}mins`
  }
})

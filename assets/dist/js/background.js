const addFramerRule = () => {
  chrome.declarativeNetRequest.updateSessionRules(
    {addRules: [generateUnblockRule()]},() => {
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
      }
    }
  )
}
const stringToId = (str) => {
  let id = str.length
  Array.from(str).forEach( (it) => {
    id += it.charCodeAt()
  })
  return id * 10000 + 6794 
}
const generateUnblockRule = () => {
  return {
    "id": stringToId('/'),
    "priority": 1,
    "action": {
      "type": "modifyHeaders",
      "responseHeaders": [
          { "header": "x-frame-options", "operation": "remove" },
          { "header": "content-security-policy", "operation": "remove" }
        ]
    },
    "condition": { "urlFilter": `*/*`, "resourceTypes": ["main_frame","sub_frame"] }
  }
  
}
  
addFramerRule();
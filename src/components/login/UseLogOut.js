// import React, { useEffect, useState } from "react"
// const UseLogout = (startTime) => {
//   const [timer, setTimer] = useState(startTime)

//   //useEffect(() => {
//   //every second this reduces one second from startTime value

//   //vaiha ainakun tehään joku toiminto niin ota current time ja vertaa edelliseen current timeen, jos yli 10min ni log out.
//   const myInterval = setInterval(() => {
//     if (timer > 0) {
//       setTimer(timer - 1)
//     }
//   }, 1000)

//   const resetTimeout = () => {
//     setTimer(startTime)
//   }
//   const events = ["load", "mousemove", "mousedown", "click", "scroll", "keypress"]
//   for (let i in events) {
//     window.addEventListener(events[i], resetTimeout)
//   }
//   return () => {
//     clearInterval(myInterval)
//     for (let i in events) {
//       window.removeEventListener(events[i], resetTimeout)
//     }
//   }
//   //});

//   return timer
// }

// export default UseLogout

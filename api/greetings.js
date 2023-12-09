// api/greeting.js

export default function handler(req, res) {
  const hour = new Date().getHours();
  let greeting;

  if (hour < 12) {
    greeting = "Good morning!";
  } else if (hour < 18) {
    greeting = "Good afternoon!";
  } else {
    greeting = "Good evening!";
  }
  console.log(greeting);
  res.status(200).send(greeting);
}

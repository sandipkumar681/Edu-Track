import "./dotenv.js";
import app from "./src/app.js";

app.listen(process.env.PORT || 4000, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});

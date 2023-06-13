const express = require("express");
const app = express();
require("dotenv/config");

const cors = require("cors");
const { default: mongoose } = require("mongoose");

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.json("Hai there.....");
});
//user authentication route
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

//artist route
const artistsRoutes = require("./routes/artist");
app.use("/api/artists/", artistsRoutes);
//albums route
const albumRoutes = require("./routes/album");
app.use("/api/albums/", albumRoutes);
//songs route
const songRoutes = require("./routes/song");
app.use("/api/songs/", songRoutes);

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => console.log("Connected"))
  .on("error", (error) => {
    console.log(`ERROR :${error}`);
  });

app.listen(4000, () => console.log("Listening to port 4000"));

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { StreamChat } = require('stream-chat');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const serverSideClient = new StreamChat(
  "ef4ts7cwbnek","w35uf76x6vsdmxkejgh3qxpredukbs8stsa3vf8jk588meye55shrnvmx3bg3q9a");

app.post('/join', async (req, res) => {
  const { username } = req.body;
  const token = serverSideClient.createToken(username);
  try {
    await serverSideClient.updateUser(
      {
        id: username,
        name: username,
      },
      token
    );
  } catch (err) {
    console.log(err);
  }

  return res
    .status(200)
    .json({ user: { username }, token, api_key: "ef4ts7cwbnek" });
});

const server = app.listen(process.env.PORT || 5500, () => {
  const { port } = server.address();
  console.log(`Server running on PORT ${port}`);
});


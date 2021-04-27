const subscriptions = {};
var crypto = require("crypto");
const webpush = require("web-push");

// const vapidKeys = {
//   privateKey: "bdSiNzUhUP6piAxLH-tW88zfBlWWveIx0dAsDO66aVU",
//   publicKey:
//     "BIN2Jc5Vmkmy-S3AUrcMlpKxJpLeVRAfu9WBqUbJ70SJOCWGCGXKY-Xzyh7HDr6KbRDGYHjqZ06OcS3BjD7uAm8",
// };

// webpush.setVapidDetails(
//   "mailto:nayyaung.developer@gmail.com",
//   vapidKeys.publicKey,
//   vapidKeys.privateKey,
// );

function createHash(input) {
  const md5sum = crypto.createHash("md5");
  md5sum.update(Buffer.from(input));
  return md5sum.digest("hex");
}

function handlePushNotificationSubscription(req, res) {
  const subscriptionRequest = req.body;
  const susbscriptionId = createHash(JSON.stringify(subscriptionRequest));
  subscriptions[susbscriptionId] = subscriptionRequest;
  res.status(201).json({ id: susbscriptionId });
}

function sendPushNotification(req, res) {
  const subscriptionId = req.params.id;
  const pushSubscription = subscriptions[subscriptionId];

  const vapidKeys = {
    privateKey: "bdSiNzUhUP6piAxLH-tW88zfBlWWveIx0dAsDO66aVU",
    publicKey:
      "BIN2Jc5Vmkmy-S3AUrcMlpKxJpLeVRAfu9WBqUbJ70SJOCWGCGXKY-Xzyh7HDr6KbRDGYHjqZ06OcS3BjD7uAm8",
  };

  webpush.setVapidDetails(
    "mailto:nayyaung.developer@gmail.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey,
  );

  webpush
    .sendNotification(
      pushSubscription,
      JSON.stringify({
        title: "You have received a new message",
        text: "Just Testing",
        image: "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg",
        url: `https://talkie-phote.netlify.app/chat`,
      }),
    )
    .catch((err) => {
      console.log(err);
    });

  res.status(202).json({});
}

module.exports = { handlePushNotificationSubscription, sendPushNotification };

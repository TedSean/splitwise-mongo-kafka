const connection = require('./kafka/connection');

// topics files
// var signin = require('./services/signin.js');
const account = require('./services/account');
const passport = require('./services/passport');
const users = require('./services/users');
const images = require('./services/images');
const groups = require('./services/groups');

require('./db/mongoose');

function handleTopicRequest(topicName, fname) {
  const consumer = connection.getConsumer(topicName);
  const producer = connection.getProducer();
  console.log(`server is running for ${topicName} topic`);
  consumer.on('message', (message) => {
    console.log(`message received for ${topicName} `, fname);
    console.log(JSON.stringify(message.value));
    const data = JSON.parse(message.value);

    fname.handleRequest(data.data, (err, res) => {
      console.log(`after handle ${JSON.stringify(res)}`);
      const payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, (producerErr, producerData) => {
        if (err) {
          console.log(`Producer send : ${producerErr}`);
        } else {
          console.log(producerData);
        }
      });
    });
  });
}
// Add your TOPICs here
// first argument is topic name
// second argument is a function that will handle this topic request
handleTopicRequest('account', account);
handleTopicRequest('passport', passport);
handleTopicRequest('users', users);
handleTopicRequest('images', images);
handleTopicRequest('groups', groups);

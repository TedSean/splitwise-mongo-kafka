const kafka = require('kafka-node');

function ConnectionProvider() {
  this.getConsumer = (topicName) => {
    // if (!this.kafkaConsumerConnection) {
    console.log(`Connection - Topic Name: ${topicName}`);
    this.client = new kafka.Client('localhost:2181');
    /* this.client.refreshMetadata([{topic: topicName}], (err) => {
                if (err) {
                    console.warn('Error refreshing kafka metadata', err);
                }
            }); */
    this.kafkaConsumerConnection = new kafka.Consumer(this.client, [{
      topic: topicName,
      partition: 0,
    }]);
    this.client.on('ready', () => { console.log('client ready!'); });
    // }
    return this.kafkaConsumerConnection;
  };

  // Code will be executed when we start Producer
  this.getProducer = () => {
    if (!this.kafkaProducerConnection) {
      this.client = new kafka.Client('localhost:2181');
      /* this.client.refreshMetadata([{topic: topicName}], (err) => {
                if (err) {
                    console.warn('Error refreshing kafka metadata', err);
                }
            }); */
      const { HighLevelProducer } = kafka;
      this.kafkaProducerConnection = new HighLevelProducer(this.client);
      // this.kafkaConnection = new kafka.Producer(this.client);
      console.log('producer ready');
    }
    return this.kafkaProducerConnection;
  };
}
module.exports = new ConnectionProvider();

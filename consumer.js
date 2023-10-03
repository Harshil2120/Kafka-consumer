const { Kafka } = require('kafkajs')
const io=require('socket.io')(3003,{
  cors:{
      origin:['http://localhost:8080']
  }
})

const kafka = new Kafka({
  clientId: 'my-consumer-topics',
  brokers: ['localhost:9092',]
})

const consumer = kafka.consumer({ groupId: 'consumer-group' })
const topic = 'my-topic'

const run = async () => {
  // Consuming
  await consumer.connect()
  
  await consumer.subscribe({ topic })
  let messageBuffer = ' '
 
  await consumer.run({
    eachMessage: async ({ partition, message }) => {
      // console.log({
      //   partition,
      //   offset: message.offset,
      //   value: message.value.toString(),
      // })
      console.log({
        value: message.value.toString(),
      })
      const messageValue = message.value.toString()
      // console.log(messageValue)

      
    
      io.emit('receive', messageValue);


      // Check if the message ends with a newline character
      // if (messageValue.endsWith('\n')) {
      //   // Print the accumulated messages
      //   console.log({ value: messageBuffer })

      //   // Clear the message buffer
      //   messageBuffer = ''
      // }

    },
  })
}
 
run().catch(console.error)

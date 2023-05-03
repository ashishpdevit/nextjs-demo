const { MongoClient } = require("mongodb")
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// /api/mew-meetup
async function handler(req, res) {
  if (req.method == 'POST') {
    const { title, image, address, description } = req.body
    try {
      const client = await MongoClient.connect(process.env.DB)
      const db = client.db()
      const meetupCollection = db.collection('meetups')
      const result = await meetupCollection.insertOne({ title, image, address, description })
      console.log(result)
      client.close()
      res.status(201).json({ message: 'Meetup inserted' })
    }
    catch (e) {
      console.log(e)
    }
  }
}
export default handler;

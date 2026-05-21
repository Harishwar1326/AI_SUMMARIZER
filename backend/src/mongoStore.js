import { MongoClient } from "mongodb";

const mongoClient = new MongoClient(
  process.env.MONGO_URI ?? "mongodb://localhost:27017/",
);
const databaseName = process.env.MONGO_DATABASE ?? "ai_content_summarizer";
const collectionName = process.env.MONGO_COLLECTION ?? "summaries";

let collectionPromise;

async function getCollection() {
  if (!collectionPromise) {
    collectionPromise = (async () => {
      await mongoClient.connect();
      return mongoClient.db(databaseName).collection(collectionName);
    })();
  }

  return collectionPromise;
}

export async function storeSummaryRecord(entry) {
  const collection = await getCollection();
  const createdAt = new Date().toISOString();

  const document = {
    originalContent: entry.originalContent,
    summarizedContent: entry.summarizedContent,
    mode: entry.mode,
    summaryLength: entry.summaryLength,
    style: entry.style,
    tone: entry.tone,
    sourceType: entry.sourceType,
    analysis: entry.analysis,
    createdAt,
  };

  const result = await collection.insertOne(document);

  return { id: result.insertedId.toString(), createdAt };
}

// Test serverless function
export default function handler(req, res) {
    console.log('Entered the serverless function');
    res.status(200).json({ dummy: "data" });
}
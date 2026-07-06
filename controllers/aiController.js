const { generateTravelResponse } = require("../ai/geminiService");

module.exports.askAI = async (req, res) => {
    try {
        const { message } = req.body;
        const prompt = `You are a travel assistant for Wanderlust: "${message}"`;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        const reply = await generateTravelResponse(prompt);

        res.json({
            success: true,
            reply
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};
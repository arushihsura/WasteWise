const { GoogleGenerativeAI } = require('@google/generative-ai');
const Bin = require('../models/Bin');
const Truck = require('../models/Truck');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// System prompt for waste management context
const WASTE_MANAGEMENT_SYSTEM_PROMPT = `You are an intelligent assistant for WasteWise, a comprehensive waste management system. 
You help users with queries about:
- Waste bin status and collection schedules
- Truck routing and assignment
- Zone management and optimization
- Festival mode operations
- Environmental impact and efficiency metrics
- Priority-based bin collection strategies

Provide concise, actionable responses focused on waste management operations. 
If asked about metrics, reference real-time data when available.
Always suggest optimization opportunities and best practices for waste management.
Keep responses focused on waste management topics only.`;

// Get contextual data about current waste management state
const getWasteManagementContext = async (city) => {
  try {
    const bins = await Bin.find(city ? { city } : {});
    const trucks = await Truck.find(city ? { city } : {});

    const totalBins = bins.length;
    const binsNeedingCollection = bins.filter(
      (b) => b.fillLevel > 75 || b.priority === 'high'
    ).length;
    const averageFillLevel =
      bins.length > 0
        ? Math.round(
            bins.reduce((sum, b) => sum + b.fillLevel, 0) / bins.length
          )
        : 0;
    const activeTrucks = trucks.filter((t) => t.status === 'active').length;

    return {
      summary: `Current Status: ${totalBins} bins total, ${binsNeedingCollection} requiring attention, ${activeTrucks} active trucks`,
      totalBins,
      binsNeedingCollection,
      averageFillLevel,
      activeTrucks,
      city: city || 'all',
    };
  } catch (error) {
    console.error('Error fetching waste management context:', error);
    return {
      summary: 'Unable to fetch real-time context',
      totalBins: 0,
      binsNeedingCollection: 0,
      averageFillLevel: 0,
      activeTrucks: 0,
      city: city || 'all',
    };
  }
};

// Main AI query handler using Google Gemini
const getAIResponse = async (req, res) => {
  try {
    const { query, city } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Query is required',
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set in environment variables');
      return res.status(500).json({
        success: false,
        message: 'Gemini API key not configured',
      });
    }

    // Get current waste management context
    const context = await getWasteManagementContext(city);

    // Initialize the model
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: WASTE_MANAGEMENT_SYSTEM_PROMPT,
    });

    // Combine context with user query
    const enhancedQuery = `
Current Waste Management System Context:
${context.summary}
- Average Fill Level: ${context.averageFillLevel}%
- Bins Needing Collection: ${context.binsNeedingCollection}
- Active Trucks: ${context.activeTrucks}
- City Focus: ${context.city}

User Query: ${query}

Please provide a helpful response about waste management based on the current system state.`;

    console.log('Sending request to Gemini...');

    // Generate response using Gemini
    const result = await model.generateContent(enhancedQuery);
    const response = result.response.text();

    console.log('Gemini response received');

    res.status(200).json({
      success: true,
      response,
      context: {
        city: context.city,
        systemMetrics: {
          totalBins: context.totalBins,
          binsNeedingCollection: context.binsNeedingCollection,
          averageFillLevel: context.averageFillLevel,
          activeTrucks: context.activeTrucks,
        },
      },
    });
  } catch (error) {
    console.error('AI Query Error Details:', {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      success: false,
      message: 'Error processing query',
      error: error.response?.data?.error?.message || error.message,
    });
  }
};

// Streaming response handler for real-time updates
const getAIResponseStream = async (req, res) => {
  try {
    const { query, city } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Query is required',
      });
    }

    // Get current context
    const context = await getWasteManagementContext(city);

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: WASTE_MANAGEMENT_SYSTEM_PROMPT,
    });

    const enhancedQuery = `
Current Waste Management System Context:
${context.summary}
- Average Fill Level: ${context.averageFillLevel}%
- Bins Needing Collection: ${context.binsNeedingCollection}
- Active Trucks: ${context.activeTrucks}

User Query: ${query}`;

    // Set up streaming response
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const result = await model.generateContentStream(enhancedQuery);

    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error) {
    console.error('Streaming AI Query Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing streaming query',
      error: error.message,
    });
  }
};

module.exports = {
  getAIResponse,
  getAIResponseStream,
};


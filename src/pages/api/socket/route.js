import { Server } from "socket.io";
import fs from "fs";
import path from "path";
import { Groq } from "groq-sdk";
import { v4 as uuidv4 } from "uuid";

const uploadsDir = path.join(process.cwd(), "public/uploads");

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // Use environment variable for security
});

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("Initializing Socket.IO...");

    const io = new Server(res.socket.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("Client connected");

      let audioBuffer = [];

      socket.on("audio-chunk", (data) => {
        audioBuffer.push(Buffer.from(data));
      });

      socket.on("audio-end", async () => {
        console.log("Received full audio. Buffer length:", audioBuffer.length);

        if (audioBuffer.length === 0) {
          console.log("No audio data received.");
          return;
        }

        // Generate unique file name
        const fileName = path.join(uploadsDir, `${uuidv4()}.mp3`);
        fs.writeFileSync(fileName, Buffer.concat(audioBuffer));
        console.log("Audio saved:", fileName);

        try {
          // Transcribe Audio
          const transcription = await groq.audio.transcriptions.create({
            file: fs.createReadStream(fileName),
            model: "whisper-large-v3-turbo",
            response_format: "verbose_json",
          });

          console.log("Transcription:", transcription.text);

          // Send transcription to frontend
          socket.emit("transcription", transcription.text);
        } catch (error) {
          console.error("Error transcribing:", error);
          socket.emit("transcription", "Error processing audio.");
        }

        // Cleanup
        audioBuffer = [];
        fs.unlinkSync(fileName); // Delete file after processing
        console.log("Temporary audio file deleted.");
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  }

  res.end();
}

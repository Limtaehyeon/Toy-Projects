const express = require("express");
const vision = require("@google-cloud/vision");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));

const client = new vision.ImageAnnotatorClient({
  keyFilename: "./google-key.json",
});

app.post("/ocr", async (req, res) => {
  try {
    const { image } = req.body;

    // Google Vision API를 호출하여 이미지 내 텍스트 추출
    const [result] = await client.textDetection({
      image: { content: image },
    });

    const detections = result.textAnnotations;
    const recognizedText =
      detections.length > 0
        ? detections[0].description
        : "인식된 글자가 없습니다.";

    res.json({ text: recognizedText });
  } catch (error) {
    console.error("OCR 에러:", error);
    res.status(500).json({ error: "서버 분석 중 에러가 발생했습니다." });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});

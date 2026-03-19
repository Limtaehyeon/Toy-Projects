import React, { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

function App() {
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");

  // 기기 카메라를 호출하여 사진을 촬영하고 데이터를 가져오는 기능
  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });
      setPhoto(image.base64String);
      setRecognizedText("");
    } catch (err) {
      console.error(err);
    }
  };

  // 촬영된 사진 데이터를 백엔드로 전송하여 OCR 결과를 받아오는 기능
  const startOCR = async () => {
    if (!photo) return;
    setUploading(true);
    try {
      const response = await fetch("http://localhost:3001/ocr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: photo }),
      });
      const data = await response.json();
      setRecognizedText(data.text);
    } catch (err) {
      alert("서버 연결 실패");
    } finally {
      setUploading(false);
    }
  };

  const deletePhoto = () => {
    setPhoto(null);
    setRecognizedText("");
  };

  return (
    <div style={wrapperStyle}>
      <header style={headerStyle}>
        <h1 style={headerTitleStyle}>글자 인식</h1>
      </header>

      <main style={mainStyle}>
        <div style={photoCardStyle}>
          {photo ? (
            <div style={imageWrapperStyle}>
              <img
                src={`data:image/jpeg;base64,${photo}`}
                alt="Preview"
                style={imageStyle}
              />
              <button onClick={deletePhoto} style={closeButtonStyle}>
                ✕
              </button>
            </div>
          ) : (
            <div style={placeholderStyle}>
              <div style={iconCircleStyle}>📄</div>
              <p style={placeholderTextStyle}>스캔 대상을 촬영해 주세요</p>
            </div>
          )}
        </div>

        <div style={infoSectionStyle}>
          {uploading ? (
            <div style={loadingAreaStyle}>
              <div className="spinner" style={spinnerStyle}></div>
              <p style={statusStyle}>글자를 읽고 있습니다...</p>
            </div>
          ) : recognizedText ? (
            <div style={resultContainerStyle}>
              <div style={resultHeaderStyle}>
                <span style={labelStyle}>인식 결과</span>

                <button
                  onClick={() => navigator.clipboard.writeText(recognizedText)}
                  style={copyButtonStyle}
                >
                  복사하기
                </button>
              </div>
              <textarea style={textareaStyle} value={recognizedText} readOnly />
            </div>
          ) : (
            photo && (
              <p style={readyTextStyle}>준비 완료! 아래 버튼을 눌러주세요.</p>
            )
          )}
        </div>
      </main>

      <footer style={footerStyle}>
        {!photo ? (
          <button onClick={takePhoto} style={primaryButtonStyle}>
            사진 촬영하기
          </button>
        ) : (
          <button
            onClick={startOCR}
            style={actionButtonStyle}
            disabled={uploading}
          >
            {uploading ? "읽는 중..." : "글자 읽어오기"}
          </button>
        )}
      </footer>

      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .spinner { animation: spin 1s linear infinite; }
        button:active { transform: scale(0.98); }
      `}</style>
    </div>
  );
}

const wrapperStyle = {
  background: "linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  fontFamily: "-apple-system, sans-serif",
};
const headerStyle = {
  paddingTop: "60px",
  paddingBottom: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(10px)",
  textAlign: "center",
  borderBottom: "1px solid rgba(0,0,0,0.05)",
  position: "sticky",
  top: 0,
  zIndex: 100,
};
const headerTitleStyle = {
  fontSize: "22px",
  margin: 0,
  fontWeight: "800",
  color: "#00cec9",
};
const mainStyle = {
  flex: 1,
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const photoCardStyle = {
  width: "100%",
  maxWidth: "400px",
  aspectRatio: "4/5",
  backgroundColor: "#fff",
  borderRadius: "32px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  overflow: "hidden",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const imageWrapperStyle = {
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
};
const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const placeholderStyle = {
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const iconCircleStyle = {
  fontSize: "48px",
  backgroundColor: "#f1f2f6",
  width: "90px",
  height: "90px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "20px",
};
const placeholderTextStyle = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#4b4b4b",
  margin: 0,
};

const closeButtonStyle = {
  position: "absolute",
  top: "15px",
  right: "15px",
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  color: "#fff",
  border: "none",
  fontSize: "18px",
  cursor: "pointer",
  backdropFilter: "blur(4px)",
  zIndex: 20,
};

const infoSectionStyle = {
  width: "100%",
  maxWidth: "400px",
  marginTop: "30px",
};
const readyTextStyle = {
  textAlign: "center",
  color: "#0097a7",
  fontWeight: "600",
};
const resultContainerStyle = {
  backgroundColor: "#fff",
  borderRadius: "20px",
  padding: "16px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
};
const resultHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "12px",
};
const labelStyle = { fontSize: "13px", fontWeight: "800", color: "#00cec9" };
const copyButtonStyle = {
  background: "none",
  border: "none",
  color: "#0097a7",
  fontSize: "12px",
  fontWeight: "600",
};
const textareaStyle = {
  width: "100%",
  minHeight: "150px",
  border: "none",
  fontSize: "15px",
  outline: "none",
  resize: "none",
};
const loadingAreaStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const spinnerStyle = {
  width: "40px",
  height: "40px",
  border: "4px solid rgba(0, 206, 201, 0.1)",
  borderTop: "4px solid #00cec9",
  borderRadius: "50%",
};
const statusStyle = { fontSize: "15px", marginTop: "15px", color: "#636e72" };
const footerStyle = { padding: "30px 24px" };
const primaryButtonStyle = {
  width: "100%",
  padding: "20px",
  borderRadius: "24px",
  border: "none",
  backgroundColor: "#00cec9",
  color: "#fff",
  fontSize: "18px",
  fontWeight: "700",
  boxShadow: "0 10px 20px rgba(0, 206, 201, 0.3)",
};
const actionButtonStyle = { ...primaryButtonStyle, backgroundColor: "#00b894" };

export default App;

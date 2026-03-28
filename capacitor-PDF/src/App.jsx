import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Filesystem, Directory } from "@capacitor/filesystem";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function App() {
  const [inputText, setInputText] = useState("");
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const [pdfRawBlob, setPdfRawBlob] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const hiddenRef = useRef(null);

  useEffect(() => {
    if (!showModal && pdfBlobUrl) {
      URL.revokeObjectURL(pdfBlobUrl);
      setPdfBlobUrl(null);
    }
  }, [showModal, pdfBlobUrl]);

  const generatePDF = async () => {
    if (!inputText.trim()) return alert("내용을 입력해주세요.");
    setIsLoading(true);

    const sentences = inputText.split(".").filter((s) => s.trim().length > 0);
    const pdf = new jsPDF("p", "mm", "a4");
    const captureElement = hiddenRef.current;

    try {
      for (let i = 0; i < sentences.length; i++) {
        captureElement.innerText = `${sentences[i].trim()}.`;
        const canvas = await html2canvas(captureElement, {
          scale: 1.2,
          backgroundColor: "#ffffff",
          logging: false,
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.6);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        const yPos = (pdf.internal.pageSize.getHeight() - pdfHeight) / 2;

        pdf.addImage(imgData, "JPEG", 0, yPos, pdfWidth, pdfHeight);
        if (i < sentences.length - 1) pdf.addPage();
      }

      const blob = pdf.output("blob");
      setPdfRawBlob(blob);
      setPdfBlobUrl(URL.createObjectURL(blob));
      setShowModal(true);
      setActiveIndex(0);
    } catch (error) {
      console.error(error);
      alert("PDF 생성 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveToDevice = async () => {
    if (!pdfRawBlob) return;
    try {
      const reader = new FileReader();
      reader.readAsDataURL(pdfRawBlob);
      reader.onloadend = async () => {
        const base64data = reader.result.split(",")[1];
        const fileName = `PDF_요약${Date.now()}.pdf`;
        await Filesystem.writeFile({
          path: fileName,
          data: base64data,
          directory: Directory.Documents,
          recursive: true,
        });

        alert(`저장 완료!`);

        setInputText("");

        setShowModal(false);
      };
    } catch (error) {
      alert("저장 실패");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#F8F9FA",
        minHeight: "100vh",
        padding: "20px",
        paddingTop: "160px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily:
          "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
        boxSizing: "border-box",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "800",
            color: "#2C3E50",
            margin: "0 0 10px 0",
          }}
        >
          PDF 요약 리포트
        </h1>
        <p style={{ fontSize: "15px", color: "#7F8C8D", margin: "0" }}>
          글을 PDF로 요약하세요
        </p>
      </div>

      <div
        ref={hiddenRef}
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          width: "170mm",
          padding: "50px",
          fontSize: "24px",
          textAlign: "center",
          background: "white",
          color: "#333",
          lineHeight: "1.6",
        }}
      />

      <div
        style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
          marginBottom: "20px",
        }}
      >
        <textarea
          style={{
            width: "100%",
            height: "250px",
            padding: "20px",
            borderRadius: "15px",
            border: "1px solid #E0E0E0",
            backgroundColor: "#FCFCFC",
            boxSizing: "border-box",
            fontSize: "16px",
            lineHeight: "1.6",
            color: "#333",
            outline: "none",
            resize: "none",
          }}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="요약할 내용을 작성해주세요."
        />

        <button
          onClick={generatePDF}
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "18px",
            marginTop: "20px",
            backgroundColor: isLoading ? "#BDC3C7" : "#2C3E50",
            color: "white",
            border: "none",
            borderRadius: "15px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "17px",
            boxShadow: isLoading ? "none" : "0 5px 15px rgba(44, 62, 80, 0.2)",
          }}
        >
          {isLoading ? (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <span className="spinner"></span> PDF 생성중...
            </span>
          ) : (
            "PDF 리포트 생성하기"
          )}
        </button>
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#1A2530",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "60px",
            boxSizing: "border-box",
          }}
        >
          <button
            onClick={() => setShowModal(false)}
            style={{
              position: "absolute",
              top: "60px",
              right: "25px",
              background: "none",
              border: "none",
              color: "white",
              fontSize: "35px",
              fontWeight: "300",
              zIndex: 10002,
              cursor: "pointer",
            }}
          >
            &times;
          </button>

          <div style={{ width: "100%", position: "relative" }}>
            <Document
              file={pdfBlobUrl}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            >
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ type: "fraction", el: ".custom-page-info" }}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                style={{ width: "100%", paddingBottom: "20px" }}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <SwiperSlide
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {Math.abs(activeIndex - index) <= 1 ? (
                      <div
                        style={{
                          width: "85%",
                          maxWidth: "360px",
                          backgroundColor: "white",
                          borderRadius: "8px",
                          overflow: "hidden",
                          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                        }}
                      >
                        <Page
                          pageNumber={index + 1}
                          width={window.innerWidth * 0.8}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                        />
                      </div>
                    ) : (
                      <div style={{ width: "85%", height: "450px" }} />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </Document>

            <div
              className="custom-page-info"
              style={{
                color: "rgba(255,255,255,0.6)",
                textAlign: "center",
                fontWeight: "500",
                fontSize: "14px",
                marginTop: "10px",
                letterSpacing: "1px",
              }}
            ></div>

            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <button
                onClick={saveToDevice}
                style={{
                  padding: "16px 40px",
                  borderRadius: "30px",
                  border: "none",
                  backgroundColor: "#2C3E50",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "16px",
                  cursor: "pointer",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                }}
              >
                내 파일에 저장하기
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
        .generate-btn:active { transform: scale(0.97); }
        
     
        .swiper-button-next, .swiper-button-prev { 
          color: white !important; 
          width: 15px !important; 
        }
        .swiper-button-next:after, .swiper-button-prev:after { 
          font-size: 8px !important; 
          font-weight: 600 !important;
        }

    
        .swiper-button-next { right: 10px !important; }
        .swiper-button-prev { left: 10px !important; }

        .spinner {
          width: 18px; height: 18px;
          border: 3px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default App;

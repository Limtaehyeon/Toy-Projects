import React, { useState, useEffect } from "react";
import { LocalNotifications } from "@capacitor/local-notifications";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#0F172A",
    padding: "40px 20px",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', sans-serif",
    color: "#fff",
  },
  card: {
    background: "rgba(30, 41, 59, 0.6)",
    backdropFilter: "blur(20px) saturate(160%)",
    padding: "60px 32px 40px 32px",
    borderRadius: "36px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
    width: "100%",
    maxWidth: "420px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    position: "relative",
  },
  glowEffect: {
    position: "absolute",
    top: "-10%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "80%",
    height: "100px",
    background:
      "radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  topSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "48px",
    position: "relative",
    zIndex: 1,
  },
  title: {
    fontSize: "28px",
    fontWeight: "800",
    margin: 0,
    color: "#F8FAFC",
    letterSpacing: "-0.8px",
  },
  description: {
    fontSize: "14px",
    color: "#94A3B8",
    marginTop: "10px",
    lineHeight: "1.6",
    fontWeight: "500",
  },
  toggleWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "6px",
  },
  statusText: { fontSize: "10px", fontWeight: "700", letterSpacing: "1px" },
  toggleBg: {
    width: "48px",
    height: "24px",
    borderRadius: "12px",
    position: "relative",
    cursor: "pointer",
    transition: "0.3s",
  },
  toggleCircle: {
    width: "18px",
    height: "18px",
    backgroundColor: "white",
    borderRadius: "50%",
    position: "absolute",
    top: "3px",
    transition: "0.3s",
    boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
  },
  alarmList: { display: "flex", flexDirection: "column", gap: "20px" },
  alarmRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px 28px",
    borderRadius: "28px",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
  },
  label: { fontSize: "17px", fontWeight: "600", color: "#E2E8F0" },
  timeInput: {
    background: "transparent",
    color: "inherit",
    border: "none",
    fontSize: "20px",
    fontWeight: "700",
    outline: "none",
    width: "110px",
    textAlign: "right",
    cursor: "pointer",
  },
  resetBtn: {
    background: "rgba(244, 63, 94, 0.15)",
    border: "none",
    color: "#FB7185",
    width: "26px",
    height: "26px",
    borderRadius: "50%",
    fontSize: "12px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "12px",
  },
  saveBtn: {
    width: "100%",
    padding: "22px",
    background: "linear-gradient(135deg, #38BDF8 0%",
    color: "#fff",
    border: "none",
    borderRadius: "24px",
    cursor: "pointer",
    fontSize: "17px",
    fontWeight: "800",
    marginTop: "40px",
    boxShadow: "0 12px 24px -6px rgba(56, 189, 248, 0.4)",
    transition: "0.2s",
  },
};

function App() {
  const getInitialState = (key) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : { time: "", isSet: false };
  };

  const [morning, setMorning] = useState(() => getInitialState("morning"));
  const [lunch, setLunch] = useState(() => getInitialState("lunch"));
  const [dinner, setDinner] = useState(() => getInitialState("dinner"));
  const [isAllEnabled, setIsAllEnabled] = useState(() => {
    const saved = localStorage.getItem("isAllEnabled");
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem("morning", JSON.stringify(morning));
    localStorage.setItem("lunch", JSON.stringify(lunch));
    localStorage.setItem("dinner", JSON.stringify(dinner));
    localStorage.setItem("isAllEnabled", JSON.stringify(isAllEnabled));
  }, [morning, lunch, dinner, isAllEnabled]);

  const handleSave = async () => {
    await LocalNotifications.cancel({
      notifications: [{ id: 1 }, { id: 2 }, { id: 3 }],
    });
    if (!isAllEnabled) {
      alert("현재 모든 알림이 꺼져 있습니다.");
      return;
    }

    const items = [
      { ...morning, id: 1, msg: "아침입니다!" },
      { ...lunch, id: 2, msg: "점심입니다!" },
      { ...dinner, id: 3, msg: "저녁입니다!" },
    ];

    const notifications = items
      .filter((i) => i.isSet && i.time)
      .map((i) => {
        const [hour, minute] = i.time.split(":").map(Number);
        return {
          title: "⏰ 알림",
          body: i.msg,
          id: i.id,
          schedule: {
            on: { hour, minute },
            repeats: true,
            allowWhileIdle: true,
          },
        };
      });

    try {
      await LocalNotifications.schedule({ notifications });
      alert("알림 설정이 저장되었습니다.");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.glowEffect} />

        <div style={styles.topSection}>
          <div>
            <h1 style={styles.title}>알림 설정</h1>
            <p style={styles.description}>
              일과에 맞게 시간을
              <br />
              자유롭게 설정하세요.
            </p>
          </div>
          <div style={styles.toggleWrapper}>
            <span
              style={{
                ...styles.statusText,
                color: isAllEnabled ? "#38BDF8" : "#64748B",
              }}
            >
              {isAllEnabled ? "ON" : "OFF"}
            </span>
            <div
              onClick={() => setIsAllEnabled(!isAllEnabled)}
              style={{
                ...styles.toggleBg,
                backgroundColor: isAllEnabled ? "#38BDF8" : "#334155",
              }}
            >
              <div
                style={{
                  ...styles.toggleCircle,
                  left: isAllEnabled ? "27px" : "3px",
                }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            ...styles.alarmList,
            opacity: isAllEnabled ? 1 : 0.3,
            pointerEvents: isAllEnabled ? "auto" : "none",
          }}
        >
          {[
            { label: "아침", data: morning, setter: setMorning },
            { label: "점심", data: lunch, setter: setLunch },
            { label: "저녁", data: dinner, setter: setDinner },
          ].map((item, idx) => (
            <div key={idx} style={styles.alarmRow}>
              <span style={styles.label}>{item.label}</span>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="time"
                  value={item.data.time || ""}
                  onChange={(e) =>
                    e.target.value &&
                    item.setter({ time: e.target.value, isSet: true })
                  }
                  style={{
                    ...styles.timeInput,
                    color: item.data.isSet
                      ? "#38BDF8"
                      : "rgba(255,255,255,0.1)",
                  }}
                />
                {item.data.isSet && (
                  <button
                    onClick={() => item.setter({ time: "", isSet: false })}
                    style={styles.resetBtn}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          style={styles.saveBtn}
          onMouseOver={(e) =>
            (e.currentTarget.style.transform = "translateY(-2px)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          설정 완료하기
        </button>
      </div>
    </div>
  );
}

export default App;

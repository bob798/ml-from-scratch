import React, { useRef, useEffect, useState, useCallback } from "react";

// ============================================================
//  斜率 & 梯度下降 · 交互可视化
//  拖动小球看斜率 → 看下坡方向 → 松手让它自己滚到谷底
//  曲线: y = x²   (谷底在 x=0)
// ============================================================

const XMIN = -3.3, XMAX = 3.3, YMIN = -0.9, YMAX = 9.3;
const f = (x) => x * x;
const df = (x) => 2 * x; // 导数 = 斜率

const INK = "#11131a";
const PANEL = "#1a1d27";
const GRID = "#262a38";
const CURVE = "#e8e4da";
const POS = "#ff6b5e";   // 斜率为正 → 暖红
const NEG = "#4fd6c9";   // 斜率为负 → 青
const BALL = "#f5b340";  // 小球 · 琥珀
const TRAIL = "#f5b34055";

export default function GradientDescentViz() {
  const canvasRef = useRef(null);
  const [x, setX] = useState(2.4);        // 当前小球位置
  const [lr, setLr] = useState(0.1);      // 学习率
  const [running, setRunning] = useState(false);
  const [trail, setTrail] = useState([]); // 滚动轨迹
  const [step, setStep] = useState(0);
  const rafRef = useRef(null);
  const stateRef = useRef({ x: 2.4, lr: 0.1, step: 0, trail: [] });
  const draggingRef = useRef(false);

  stateRef.current.lr = lr;

  const toPx = useCallback((wx, wy, W, H) => {
    const padL = 46, padR = 18, padT = 16, padB = 34;
    const pw = W - padL - padR, ph = H - padT - padB;
    return [
      padL + ((wx - XMIN) / (XMAX - XMIN)) * pw,
      padT + (1 - (wy - YMIN) / (YMAX - YMIN)) * ph,
    ];
  }, []);

  // ---------- 绘制 ----------
  const draw = useCallback((curX, curTrail) => {
    const cv = canvasRef.current;
    if (!cv) return;
    const dpr = window.devicePixelRatio || 1;
    const W = cv.clientWidth, H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    const ctx = cv.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    // 背景
    ctx.fillStyle = PANEL;
    ctx.fillRect(0, 0, W, H);

    // 网格
    ctx.strokeStyle = GRID; ctx.lineWidth = 1;
    ctx.fillStyle = "#5b6172"; ctx.font = "11px ui-monospace, monospace";
    for (let gx = -3; gx <= 3; gx++) {
      const [px] = toPx(gx, 0, W, H);
      const [, py0] = toPx(0, YMIN, W, H);
      const [, py1] = toPx(0, YMAX, W, H);
      ctx.beginPath(); ctx.moveTo(px, py1); ctx.lineTo(px, py0); ctx.stroke();
      ctx.textAlign = "center";
      ctx.fillText(gx.toString(), px, py0 + 16);
    }
    for (let gy = 0; gy <= 9; gy += 3) {
      const [px0] = toPx(XMIN, gy, W, H);
      const [px1, py] = toPx(XMAX, gy, W, H);
      ctx.beginPath(); ctx.moveTo(px0, py); ctx.lineTo(px1, py); ctx.stroke();
      ctx.textAlign = "right";
      ctx.fillText(gy.toString(), px0 + 30, py + 4);
    }

    // x 轴
    const [ax0, ay] = toPx(XMIN, 0, W, H);
    const [ax1] = toPx(XMAX, 0, W, H);
    ctx.strokeStyle = "#3a4052"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(ax0, ay); ctx.lineTo(ax1, ay); ctx.stroke();

    // 曲线 y = x²
    ctx.strokeStyle = CURVE; ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 240; i++) {
      const wx = XMIN + (i / 240) * (XMAX - XMIN);
      const [px, py] = toPx(wx, f(wx), W, H);
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();

    // 谷底标记
    const [bx, by] = toPx(0, 0, W, H);
    ctx.fillStyle = "#3a4052";
    ctx.beginPath(); ctx.arc(bx, by, 4, 0, Math.PI * 2); ctx.fill();

    // 轨迹
    curTrail.forEach((tx, i) => {
      const [px, py] = toPx(tx, f(tx), W, H);
      ctx.fillStyle = TRAIL;
      ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
    });

    const slope = df(curX);
    const y0 = f(curX);
    const slopeColor = slope > 0.001 ? POS : slope < -0.001 ? NEG : "#9aa0b0";

    // 切线 (那一点的斜率)
    const half = 1.25;
    const xA = curX - half, xB = curX + half;
    const yA = y0 + slope * (xA - curX);
    const yB = y0 + slope * (xB - curX);
    const [pAx, pAy] = toPx(xA, yA, W, H);
    const [pBx, pBy] = toPx(xB, yB, W, H);
    ctx.strokeStyle = slopeColor; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(pAx, pAy); ctx.lineTo(pBx, pBy); ctx.stroke();

    // 下坡方向箭头 (沿 x 轴, 指向谷底方向)
    if (Math.abs(slope) > 0.02) {
      const dir = slope > 0 ? -1 : 1; // 正→左, 负→右
      const [cpx, cpy] = toPx(curX, 0, W, H);
      const len = 46;
      const tipX = cpx + dir * len;
      ctx.strokeStyle = BALL; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(cpx, cpy - 22); ctx.lineTo(tipX, cpy - 22); ctx.stroke();
      ctx.fillStyle = BALL;
      ctx.beginPath();
      ctx.moveTo(tipX, cpy - 22);
      ctx.lineTo(tipX - dir * 9, cpy - 27);
      ctx.lineTo(tipX - dir * 9, cpy - 17);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = BALL; ctx.font = "600 11px ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.fillText(dir < 0 ? "下坡 ←" : "→ 下坡", (cpx + tipX) / 2, cpy - 30);
    }

    // 小球
    const [px, py] = toPx(curX, y0, W, H);
    ctx.shadowColor = BALL; ctx.shadowBlur = 16;
    ctx.fillStyle = BALL;
    ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "#fff8"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2); ctx.stroke();
  }, [toPx]);

  useEffect(() => { draw(x, trail); }, [x, trail, draw]);

  // ---------- 梯度下降动画 ----------
  const roll = useCallback(() => {
    const s = stateRef.current;
    const slope = df(s.x);
    if (Math.abs(slope) < 0.002 || s.step > 120) {
      setRunning(false);
      rafRef.current = null;
      return;
    }
    s.x = s.x - s.lr * slope;          // ← 核心: 沿斜率下坡
    s.x = Math.max(XMIN + 0.05, Math.min(XMAX - 0.05, s.x));
    s.step += 1;
    s.trail = [...s.trail, s.x].slice(-40);
    setX(s.x); setTrail(s.trail); setStep(s.step);
    rafRef.current = setTimeout(() => requestAnimationFrame(roll), 90);
  }, []);

  const start = () => {
    if (running) return;
    stateRef.current = { x, lr, step: 0, trail: [x] };
    setStep(0); setRunning(true);
    rafRef.current = setTimeout(() => requestAnimationFrame(roll), 90);
  };
  const reset = () => {
    if (rafRef.current) clearTimeout(rafRef.current);
    setRunning(false); setTrail([]); setStep(0); setX(2.4);
    stateRef.current = { x: 2.4, lr, step: 0, trail: [] };
  };

  // ---------- 拖动 ----------
  const handlePointer = (e) => {
    if (running) return;
    const cv = canvasRef.current;
    const rect = cv.getBoundingClientRect();
    const px = (e.clientX ?? e.touches?.[0]?.clientX) - rect.left;
    const padL = 46, padR = 18, pw = rect.width - padL - padR;
    let wx = XMIN + ((px - padL) / pw) * (XMAX - XMIN);
    wx = Math.max(XMIN + 0.05, Math.min(XMAX - 0.05, wx));
    setTrail([]); setX(wx);
  };

  useEffect(() => () => { if (rafRef.current) clearTimeout(rafRef.current); }, []);

  const slope = df(x);
  const sign = slope > 0.01 ? "正" : slope < -0.01 ? "负" : "零";
  const dirText = slope > 0.01 ? "往左走（减小 x）" : slope < -0.01 ? "往右走（增大 x）" : "到谷底了，停！";
  const sColor = slope > 0.01 ? POS : slope < -0.01 ? NEG : "#9aa0b0";

  return (
    <div style={{
      background: INK, minHeight: "100%", padding: "20px 16px 28px",
      fontFamily: "'Georgia', serif", color: "#e8e4da",
    }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, letterSpacing: 3, color: BALL, fontFamily: "ui-monospace, monospace", textTransform: "uppercase" }}>
            梯度下降 · 实验台
          </div>
          <h1 style={{ fontSize: 26, margin: "4px 0 2px", fontWeight: 600 }}>
            斜率，就是"该往哪滚"
          </h1>
          <p style={{ fontSize: 13.5, color: "#9aa0b0", margin: 0, lineHeight: 1.5 }}>
            拖动 <span style={{ color: BALL }}>小球</span> 沿曲线滑动，看那一点的斜率；
            再按"松手"，看它顺着斜率自己滚到谷底。
          </p>
        </div>

        <canvas
          ref={canvasRef}
          onMouseDown={(e) => { draggingRef.current = true; handlePointer(e); }}
          onMouseMove={(e) => { if (draggingRef.current) handlePointer(e); }}
          onMouseUp={() => (draggingRef.current = false)}
          onMouseLeave={() => (draggingRef.current = false)}
          onTouchStart={handlePointer}
          onTouchMove={handlePointer}
          style={{
            width: "100%", height: 320, borderRadius: 12,
            border: "1px solid #2a2f3e", cursor: running ? "default" : "ew-resize",
            touchAction: "none", display: "block",
          }}
        />

        {/* 读数面板 */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 12,
          fontFamily: "ui-monospace, monospace",
        }}>
          <Stat label="位置 x" value={x.toFixed(2)} color="#e8e4da" />
          <Stat label="斜率 f'(x)=2x" value={slope.toFixed(2)} color={sColor} />
          <Stat label="斜率符号" value={sign} color={sColor} />
        </div>

        {/* 下坡规则 */}
        <div style={{
          marginTop: 10, padding: "12px 14px", borderRadius: 10,
          background: PANEL, border: `1px solid ${sColor}44`,
          fontFamily: "ui-monospace, monospace", fontSize: 13.5, lineHeight: 1.6,
        }}>
          <span style={{ color: "#9aa0b0" }}>下坡方向：</span>
          <span style={{ color: sColor, fontWeight: 600 }}>{dirText}</span>
          <div style={{ color: "#6b7180", fontSize: 11.5, marginTop: 4 }}>
            规则：x ← x − 学习率 × 斜率。斜率为正就减 x（左），为负就加 x（右）。
          </div>
        </div>

        {/* 控制 */}
        <div style={{ marginTop: 14, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <button onClick={start} disabled={running} style={btn(running ? "#333" : BALL, running ? "#777" : INK)}>
            {running ? `滚动中… 第 ${step} 步` : "松手，让球滚下去 ▸"}
          </button>
          <button onClick={reset} style={btn("transparent", "#9aa0b0", true)}>重置</button>
        </div>

        {/* 学习率 */}
        <div style={{ marginTop: 16, fontFamily: "ui-monospace, monospace" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: "#9aa0b0", marginBottom: 6 }}>
            <span>学习率 (每步迈多大)</span>
            <span style={{ color: BALL }}>{lr.toFixed(2)}</span>
          </div>
          <input type="range" min="0.02" max="1.05" step="0.01" value={lr}
            disabled={running}
            onChange={(e) => setLr(parseFloat(e.target.value))}
            style={{ width: "100%", accentColor: BALL }} />
          <div style={{ fontSize: 11.5, color: "#6b7180", marginTop: 6, lineHeight: 1.5 }}>
            试试调到 <b style={{ color: NEG }}>0.05</b>（小步、慢但稳）和 <b style={{ color: POS }}>1.0</b>（大步、来回震荡甚至跳出去）——这就是为什么学习率要调。
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div style={{ background: PANEL, borderRadius: 9, padding: "9px 10px", border: "1px solid #2a2f3e" }}>
      <div style={{ fontSize: 10.5, color: "#6b7180", marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 19, color, fontWeight: 600 }}>{value}</div>
    </div>
  );
}

function btn(bg, fg, ghost) {
  return {
    background: bg, color: fg, border: ghost ? "1px solid #3a4052" : "none",
    padding: "11px 18px", borderRadius: 9, fontSize: 14, fontWeight: 600,
    cursor: "pointer", fontFamily: "ui-monospace, monospace", flex: ghost ? "0 0 auto" : 1,
  };
}

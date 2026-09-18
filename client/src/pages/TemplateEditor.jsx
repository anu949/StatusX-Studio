import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  CheckCircle2,
  ImagePlus,
  Loader2,
  Rocket,
  Sparkles,
  Upload,
  User,
} from "lucide-react";

import templates from "../data/templates";
import api from "../api";

function TemplateEditor() {
  const { templateId } = useParams();
  const navigate = useNavigate();

  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const [template, setTemplate] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ============================================================
  // LOAD TEMPLATE
  // ============================================================

  useEffect(() => {
    const selectedTemplate = templates.find(
      (item) => item.id === templateId
    );

    setTemplate(selectedTemplate || null);

    if (selectedTemplate) {
      setMessage(selectedTemplate.defaultMessage || "");
    }
  }, [templateId]);

  // ============================================================
  // PHOTO
  // ============================================================

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be below 10 MB.");
      return;
    }

    setError("");
    setSuccess("");

    setPhoto(file);

    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
  };

  // ============================================================
  // COMMON HELPERS
  // ============================================================

  const roundedRect = (
    ctx,
    x,
    y,
    width,
    height,
    radius
  ) => {
    ctx.beginPath();

    ctx.moveTo(x + radius, y);

    ctx.lineTo(
      x + width - radius,
      y
    );

    ctx.quadraticCurveTo(
      x + width,
      y,
      x + width,
      y + radius
    );

    ctx.lineTo(
      x + width,
      y + height - radius
    );

    ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius,
      y + height
    );

    ctx.lineTo(
      x + radius,
      y + height
    );

    ctx.quadraticCurveTo(
      x,
      y + height,
      x,
      y + height - radius
    );

    ctx.lineTo(
      x,
      y + radius
    );

    ctx.quadraticCurveTo(
      x,
      y,
      x + radius,
      y
    );

    ctx.closePath();
  };

  const wrapText = (
    ctx,
    text,
    x,
    y,
    maxWidth,
    lineHeight
  ) => {
    const words = String(text || "").split(" ");

    let line = "";

    for (let i = 0; i < words.length; i++) {
      const testLine =
        line + words[i] + " ";

      const width =
        ctx.measureText(testLine).width;

      if (
        width > maxWidth &&
        i > 0
      ) {
        ctx.fillText(
          line,
          x,
          y
        );

        line =
          words[i] + " ";

        y += lineHeight;
      } else {
        line = testLine;
      }
    }

    ctx.fillText(
      line,
      x,
      y
    );
  };

  const drawPhoto = (
    ctx,
    image,
    centerX,
    centerY,
    radius,
    borderColor = "#ffffff"
  ) => {
    ctx.save();

    // Glow

    const glow =
      ctx.createRadialGradient(
        centerX,
        centerY,
        radius,
        centerX,
        centerY,
        radius + 90
      );

    glow.addColorStop(
      0,
      "rgba(255,255,255,0.65)"
    );

    glow.addColorStop(
      1,
      "rgba(255,255,255,0)"
    );

    ctx.fillStyle = glow;

    ctx.beginPath();

    ctx.arc(
      centerX,
      centerY,
      radius + 90,
      0,
      Math.PI * 2
    );

    ctx.fill();

    // Outer border

    ctx.beginPath();

    ctx.arc(
      centerX,
      centerY,
      radius + 22,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = borderColor;
    ctx.fill();

    // Photo clip

    ctx.beginPath();

    ctx.arc(
      centerX,
      centerY,
      radius,
      0,
      Math.PI * 2
    );

    ctx.clip();

    const imageRatio =
      image.width / image.height;

    const targetSize =
      radius * 2;

    let width = targetSize;
    let height = targetSize;

    if (imageRatio > 1) {
      height = targetSize;
      width =
        targetSize * imageRatio;
    } else {
      width = targetSize;
      height =
        targetSize / imageRatio;
    }

    ctx.drawImage(
      image,
      centerX - width / 2,
      centerY - height / 2,
      width,
      height
    );

    ctx.restore();

    // Decorative dashed ring

    ctx.save();

    ctx.beginPath();

    ctx.arc(
      centerX,
      centerY,
      radius + 40,
      0,
      Math.PI * 2
    );

    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 8;

    ctx.setLineDash([
      28,
      15,
    ]);

    ctx.stroke();

    ctx.restore();
  };

  const drawPlaceholder = (
    ctx,
    x,
    y,
    radius
  ) => {
    ctx.save();

    ctx.beginPath();

    ctx.arc(
      x,
      y,
      radius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      "rgba(255,255,255,0.14)";

    ctx.fill();

    ctx.strokeStyle =
      "rgba(255,255,255,0.8)";

    ctx.lineWidth = 10;

    ctx.stroke();

    ctx.fillStyle = "#ffffff";

    ctx.font =
      "600 36px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
      "YOUR PHOTO",
      x,
      y + 12
    );

    ctx.restore();
  };

  const drawStars = (
    ctx,
    positions,
    color = "#ffffff"
  ) => {
    ctx.fillStyle = color;

    positions.forEach(
      ([x, y, size]) => {
        ctx.beginPath();

        for (let i = 0; i < 10; i++) {
          const angle =
            -Math.PI / 2 +
            (Math.PI * 2 * i) /
              10;

          const radius =
            i % 2 === 0
              ? size
              : size * 0.35;

          const px =
            x +
            Math.cos(angle) *
              radius;

          const py =
            y +
            Math.sin(angle) *
              radius;

          if (i === 0) {
            ctx.moveTo(
              px,
              py
            );
          } else {
            ctx.lineTo(
              px,
              py
            );
          }
        }

        ctx.closePath();
        ctx.fill();
      }
    );
  };

  // ============================================================
  // RAKHI
  // ============================================================

  const drawRakhi = async () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = 1080;
    canvas.height = 1920;

    // Background

    const gradient =
      ctx.createLinearGradient(
        0,
        0,
        1080,
        1920
      );

    gradient.addColorStop(
      0,
      "#fff7ed"
    );

    gradient.addColorStop(
      0.5,
      "#fef3c7"
    );

    gradient.addColorStop(
      1,
      "#fff1f2"
    );

    ctx.fillStyle = gradient;

    ctx.fillRect(
      0,
      0,
      1080,
      1920
    );

    // Border

    ctx.strokeStyle =
      "#b45309";

    ctx.lineWidth = 4;

    ctx.strokeRect(
      28,
      28,
      1024,
      1864
    );

    ctx.strokeStyle =
      "rgba(180,83,9,0.35)";

    ctx.lineWidth = 2;

    ctx.strokeRect(
      48,
      48,
      984,
      1824
    );

    ctx.textAlign = "center";

    // Decorative top heart

    ctx.fillStyle =
      "#be123c";

    ctx.font =
      "65px Arial";

    ctx.fillText(
      "♥",
      540,
      155
    );

    // Top message

    ctx.fillStyle =
      "#713f12";

    ctx.font =
      "500 35px Georgia";

    ctx.fillText(
      "A bond of love,",
      540,
      260
    );

    ctx.fillText(
      "that lasts a lifetime",
      540,
      310
    );

    // Happy

    ctx.fillStyle =
      "#451a03";

    ctx.font =
      "500 78px Georgia";

    ctx.fillText(
      "Happy",
      540,
      450
    );

    // Rakhi

    ctx.fillStyle =
      "#991b1b";

    ctx.font =
      "italic 900 115px Georgia";

    ctx.fillText(
      "Rakhi",
      540,
      570
    );

    // Heart

    ctx.fillStyle =
      "#b91c1c";

    ctx.font =
      "70px Arial";

    ctx.fillText(
      "♥",
      765,
      555
    );

    // Photo

    if (imageRef.current) {
      drawPhoto(
        ctx,
        imageRef.current,
        540,
        850,
        225,
        "#ffffff"
      );
    } else {
      drawPlaceholder(
        ctx,
        540,
        850,
        225
      );
    }

    // Name

    if (name.trim()) {
      ctx.fillStyle =
        "#7f1d1d";

      ctx.font =
        "700 48px Georgia";

      ctx.fillText(
        name.trim(),
        540,
        1160
      );
    }

    // Message

    ctx.fillStyle =
      "#451a03";

    ctx.font =
      "500 34px Georgia";

    wrapText(
      ctx,
      message ||
        "May our bond always stay strong, filled with love, trust and happiness.",
      540,
      1240,
      760,
      52
    );

    // Rakhi thread

    ctx.strokeStyle =
      "#991b1b";

    ctx.lineWidth = 18;

    ctx.beginPath();

    ctx.moveTo(
      70,
      1510
    );

    ctx.quadraticCurveTo(
      300,
      1470,
      540,
      1510
    );

    ctx.quadraticCurveTo(
      780,
      1550,
      1010,
      1510
    );

    ctx.stroke();

    // Rakhi center

    ctx.fillStyle =
      "#991b1b";

    ctx.beginPath();

    ctx.arc(
      540,
      1510,
      95,
      0,
      Math.PI * 2
    );

    ctx.fill();

    ctx.strokeStyle =
      "#d4af37";

    ctx.lineWidth = 16;

    ctx.stroke();

    ctx.fillStyle =
      "#facc15";

    ctx.font =
      "60px Arial";

    ctx.fillText(
      "✦",
      540,
      1530
    );

    // Beads

    const beads = [
      350,
      395,
      440,
      640,
      685,
      730,
    ];

    beads.forEach(
      (x, index) => {
        ctx.fillStyle =
          index % 2 === 0
            ? "#d4af37"
            : "#ffffff";

        ctx.beginPath();

        ctx.arc(
          x,
          1500,
          22,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }
    );

    // Bottom flower

    ctx.fillStyle =
      "#be123c";

    ctx.font =
      "55px Arial";

    ctx.fillText(
      "✿",
      540,
      1700
    );

    ctx.fillStyle =
      "#713f12";

    ctx.font =
      "500 32px Georgia";

    ctx.fillText(
      "Happy Raksha Bandhan",
      540,
      1780
    );

    ctx.textAlign =
      "start";
  };

  // ============================================================
  // DIWALI
  // ============================================================

  const drawDiwali = async () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = 1080;
    canvas.height = 1920;

    const gradient =
      ctx.createRadialGradient(
        540,
        850,
        100,
        540,
        850,
        1000
      );

    gradient.addColorStop(
      0,
      "#fbbf24"
    );

    gradient.addColorStop(
      0.35,
      "#ea580c"
    );

    gradient.addColorStop(
      0.7,
      "#991b1b"
    );

    gradient.addColorStop(
      1,
      "#450a0a"
    );

    ctx.fillStyle = gradient;

    ctx.fillRect(
      0,
      0,
      1080,
      1920
    );

    drawStars(
      ctx,
      [
        [100, 150, 18],
        [920, 180, 20],
        [180, 350, 12],
        [850, 400, 15],
        [100, 700, 15],
        [960, 720, 18],
      ],
      "#fde68a"
    );

    ctx.textAlign = "center";

    ctx.fillStyle =
      "#fef3c7";

    ctx.font =
      "65px Arial";

    ctx.fillText(
      "🪔",
      540,
      190
    );

    ctx.fillStyle =
      "#ffffff";

    ctx.font =
      "700 42px Georgia";

    ctx.fillText(
      "THE FESTIVAL OF LIGHTS",
      540,
      280
    );

    ctx.fillStyle =
      "#facc15";

    ctx.font =
      "900 105px Georgia";

    ctx.fillText(
      "DIWALI",
      540,
      410
    );

    ctx.strokeStyle =
      "#facc15";

    ctx.lineWidth = 5;

    ctx.beginPath();

    ctx.moveTo(
      300,
      455
    );

    ctx.lineTo(
      780,
      455
    );

    ctx.stroke();

    // Photo

    if (imageRef.current) {
      drawPhoto(
        ctx,
        imageRef.current,
        540,
        820,
        225,
        "#facc15"
      );
    } else {
      drawPlaceholder(
        ctx,
        540,
        820,
        225
      );
    }

    // Name

    if (name.trim()) {
      ctx.fillStyle =
        "#fef3c7";

      ctx.font =
        "700 52px Georgia";

      ctx.fillText(
        name.trim(),
        540,
        1140
      );
    }

    // Message

    ctx.fillStyle =
      "#fff7ed";

    ctx.font =
      "500 36px Georgia";

    wrapText(
      ctx,
      message ||
        "May the festival of lights fill your life with happiness, prosperity and peace.",
      540,
      1220,
      760,
      55
    );

    // Diyas

    const diyaPositions = [
      [170, 1580],
      [350, 1660],
      [540, 1580],
      [730, 1660],
      [910, 1580],
    ];

    diyaPositions.forEach(
      ([x, y]) => {
        ctx.fillStyle =
          "#f97316";

        ctx.beginPath();

        ctx.ellipse(
          x,
          y,
          75,
          30,
          0,
          0,
          Math.PI * 2
        );

        ctx.fill();

        ctx.fillStyle =
          "#facc15";

        ctx.beginPath();

        ctx.arc(
          x,
          y - 25,
          25,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }
    );

    // Bottom

    ctx.fillStyle =
      "#fef3c7";

    ctx.font =
      "600 34px Georgia";

    ctx.fillText(
      "Happy Diwali 🪔",
      540,
      1800
    );

    ctx.textAlign =
      "start";
  };

  // ============================================================
  // HOLI
  // ============================================================

  const drawHoli = async () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = 1080;
    canvas.height = 1920;

    const gradient =
      ctx.createLinearGradient(
        0,
        0,
        1080,
        1920
      );

    gradient.addColorStop(
      0,
      "#ec4899"
    );

    gradient.addColorStop(
      0.35,
      "#8b5cf6"
    );

    gradient.addColorStop(
      0.7,
      "#3b82f6"
    );

    gradient.addColorStop(
      1,
      "#14b8a6"
    );

    ctx.fillStyle =
      gradient;

    ctx.fillRect(
      0,
      0,
      1080,
      1920
    );

    // Color circles

    const circles = [
      [100, 200, 100, "#facc15"],
      [930, 260, 130, "#ef4444"],
      [120, 620, 90, "#22c55e"],
      [940, 700, 100, "#fb7185"],
      [120, 1250, 110, "#f97316"],
      [950, 1250, 100, "#a3e635"],
    ];

    circles.forEach(
      ([x, y, radius, color]) => {
        ctx.fillStyle = color;

        ctx.globalAlpha = 0.75;

        ctx.beginPath();

        ctx.arc(
          x,
          y,
          radius,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }
    );

    ctx.globalAlpha = 1;

    ctx.textAlign =
      "center";

    ctx.fillStyle =
      "#ffffff";

    ctx.font =
      "90px Arial";

    ctx.fillText(
      "🎨",
      540,
      200
    );

    ctx.font =
      "900 105px Arial";

    ctx.fillText(
      "HAPPY HOLI",
      540,
      330
    );

    ctx.font =
      "500 36px Arial";

    ctx.fillText(
      "LET THE COLORS OF HAPPINESS FILL YOUR LIFE",
      540,
      405
    );

    if (imageRef.current) {
      drawPhoto(
        ctx,
        imageRef.current,
        540,
        850,
        230,
        "#ffffff"
      );
    } else {
      drawPlaceholder(
        ctx,
        540,
        850,
        230
      );
    }

    if (name.trim()) {
      ctx.fillStyle =
        "#ffffff";

      ctx.font =
        "800 52px Arial";

      ctx.fillText(
        name.trim(),
        540,
        1180
      );
    }

    ctx.fillStyle =
      "#ffffff";

    ctx.font =
      "500 36px Arial";

    wrapText(
      ctx,
      message ||
        "Wishing you a Holi filled with colorful memories, laughter and happiness!",
      540,
      1260,
      780,
      55
    );

    // Color powder

    const powder = [
      [180, 1570, "#ef4444"],
      [350, 1640, "#facc15"],
      [540, 1550, "#22c55e"],
      [730, 1640, "#3b82f6"],
      [900, 1570, "#ec4899"],
    ];

    powder.forEach(
      ([x, y, color]) => {
        ctx.fillStyle = color;

        for (
          let i = 0;
          i < 15;
          i++
        ) {
          const px =
            x +
            (Math.random() - 0.5) *
              130;

          const py =
            y +
            (Math.random() - 0.5) *
              100;

          ctx.beginPath();

          ctx.arc(
            px,
            py,
            Math.random() * 12 + 5,
            0,
            Math.PI * 2
          );

          ctx.fill();
        }
      }
    );

    ctx.fillStyle =
      "#ffffff";

    ctx.font =
      "700 36px Arial";

    ctx.fillText(
      "Spread Love • Spread Colors 🎨",
      540,
      1810
    );

    ctx.textAlign =
      "start";
  };

  // ============================================================
  // UGADI
  // ============================================================

  const drawUgadi = async () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = 1080;
    canvas.height = 1920;

    const gradient =
      ctx.createLinearGradient(
        0,
        0,
        1080,
        1920
      );

    gradient.addColorStop(
      0,
      "#166534"
    );

    gradient.addColorStop(
      0.45,
      "#65a30d"
    );

    gradient.addColorStop(
      1,
      "#facc15"
    );

    ctx.fillStyle =
      gradient;

    ctx.fillRect(
      0,
      0,
      1080,
      1920
    );

    ctx.textAlign =
      "center";

    // Mango leaves

    ctx.fillStyle =
      "#dcfce7";

    ctx.font =
      "100px Arial";

    ctx.fillText(
      "🌿",
      540,
      190
    );

    ctx.fillStyle =
      "#ffffff";

    ctx.font =
      "500 38px Georgia";

    ctx.fillText(
      "A NEW BEGINNING",
      540,
      300
    );

    ctx.fillStyle =
      "#fef08a";

    ctx.font =
      "900 105px Georgia";

    ctx.fillText(
      "UGADI",
      540,
      420
    );

    ctx.fillStyle =
      "#ffffff";

    ctx.font =
      "500 34px Georgia";

    ctx.fillText(
      "May this new year bring hope and prosperity",
      540,
      490
    );

    if (imageRef.current) {
      drawPhoto(
        ctx,
        imageRef.current,
        540,
        850,
        230,
        "#fef08a"
      );
    } else {
      drawPlaceholder(
        ctx,
        540,
        850,
        230
      );
    }

    if (name.trim()) {
      ctx.fillStyle =
        "#ffffff";

      ctx.font =
        "700 52px Georgia";

      ctx.fillText(
        name.trim(),
        540,
        1180
      );
    }

    ctx.fillStyle =
      "#ffffff";

    ctx.font =
      "500 36px Georgia";

    wrapText(
      ctx,
      message ||
        "Wishing you a joyful Ugadi filled with new hopes, happiness and prosperity.",
      540,
      1260,
      760,
      55
    );

    // Decorative mango leaves

    ctx.fillStyle =
      "#14532d";

    for (
      let i = 0;
      i < 8;
      i++
    ) {
      const x =
        100 + i * 125;

      ctx.beginPath();

      ctx.ellipse(
        x,
        1560,
        30,
        80,
        -0.5,
        0,
        Math.PI * 2
      );

      ctx.fill();
    }

    ctx.fillStyle =
      "#fef08a";

    ctx.font =
      "600 34px Georgia";

    ctx.fillText(
      "Happy Ugadi 🌿",
      540,
      1800
    );

    ctx.textAlign =
      "start";
  };

  // ============================================================
  // NEW YEAR
  // ============================================================

  const drawNewYear = async () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = 1080;
    canvas.height = 1920;

    const gradient =
      ctx.createLinearGradient(
        0,
        0,
        1080,
        1920
      );

    gradient.addColorStop(
      0,
      "#312e81"
    );

    gradient.addColorStop(
      0.45,
      "#1d4ed8"
    );

    gradient.addColorStop(
      1,
      "#111827"
    );

    ctx.fillStyle =
      gradient;

    ctx.fillRect(
      0,
      0,
      1080,
      1920
    );

    drawStars(
      ctx,
      [
        [100, 180, 20],
        [900, 160, 25],
        [180, 400, 15],
        [850, 420, 20],
        [100, 700, 18],
        [960, 750, 15],
        [120, 1350, 20],
        [930, 1300, 22],
      ],
      "#facc15"
    );

    ctx.textAlign =
      "center";

    ctx.fillStyle =
      "#facc15";

    ctx.font =
      "80px Arial";

    ctx.fillText(
      "🎉",
      540,
      210
    );

    ctx.fillStyle =
      "#ffffff";

    ctx.font =
      "700 38px Arial";

    ctx.fillText(
      "A NEW CHAPTER BEGINS",
      540,
      300
    );

    ctx.fillStyle =
      "#facc15";

    ctx.font =
      "900 105px Arial";

    ctx.fillText(
      "NEW YEAR",
      540,
      430
    );

    ctx.fillStyle =
      "#ffffff";

    ctx.font =
      "500 38px Arial";

    ctx.fillText(
      "NEW DREAMS • NEW MEMORIES • NEW BEGINNINGS",
      540,
      500
    );

    if (imageRef.current) {
      drawPhoto(
        ctx,
        imageRef.current,
        540,
        850,
        230,
        "#facc15"
      );
    } else {
      drawPlaceholder(
        ctx,
        540,
        850,
        230
      );
    }

    if (name.trim()) {
      ctx.fillStyle =
        "#facc15";

      ctx.font =
        "700 52px Arial";

      ctx.fillText(
        name.trim(),
        540,
        1180
      );
    }

    ctx.fillStyle =
      "#ffffff";

    ctx.font =
      "500 36px Arial";

    wrapText(
      ctx,
      message ||
        "May the new year bring you happiness, success, peace and beautiful memories.",
      540,
      1260,
      780,
      55
    );

    // Fireworks

    const fireworks = [
      [170, 1550],
      [540, 1480],
      [900, 1550],
    ];

    fireworks.forEach(
      ([x, y]) => {
        ctx.strokeStyle =
          "#facc15";

        ctx.lineWidth = 5;

        for (
          let i = 0;
          i < 12;
          i++
        ) {
          const angle =
            (Math.PI * 2 * i) /
            12;

          ctx.beginPath();

          ctx.moveTo(
            x,
            y
          );

          ctx.lineTo(
            x +
              Math.cos(
                angle
              ) *
                80,
            y +
              Math.sin(
                angle
              ) *
                80
          );

          ctx.stroke();
        }
      }
    );

    ctx.fillStyle =
      "#ffffff";

    ctx.font =
      "700 36px Arial";

    ctx.fillText(
      "Cheers to a beautiful year ahead! 🎉",
      540,
      1810
    );

    ctx.textAlign =
      "start";
  };

  // ============================================================
  // BIRTHDAY
  // ============================================================

  const drawBirthday = async () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = 1080;
    canvas.height = 1920;

    const gradient =
      ctx.createLinearGradient(
        0,
        0,
        1080,
        1920
      );

    gradient.addColorStop(
      0,
      "#ec4899"
    );

    gradient.addColorStop(
      0.5,
      "#8b5cf6"
    );

    gradient.addColorStop(
      1,
      "#4f46e5"
    );

    ctx.fillStyle =
      gradient;

    ctx.fillRect(
      0,
      0,
      1080,
      1920
    );

    ctx.textAlign =
      "center";

    ctx.fillStyle =
      "#ffffff";

    ctx.font =
      "90px Arial";

    ctx.fillText(
      "🎂",
      540,
      190
    );

    ctx.font =
      "900 100px Arial";

    ctx.fillText(
      "HAPPY",
      540,
      330
    );

    ctx.fillStyle =
      "#fef08a";

    ctx.fillText(
      "BIRTHDAY",
      540,
      445
    );

    ctx.fillStyle =
      "#ffffff";

    ctx.font =
      "500 35px Arial";

    ctx.fillText(
      "CELEBRATE • SMILE • MAKE MEMORIES",
      540,
      515
    );

    if (imageRef.current) {
      drawPhoto(
        ctx,
        imageRef.current,
        540,
        850,
        230,
        "#ffffff"
      );
    } else {
      drawPlaceholder(
        ctx,
        540,
        850,
        230
      );
    }

    if (name.trim()) {
      ctx.fillStyle =
        "#fef08a";

      ctx.font =
        "800 55px Arial";

      ctx.fillText(
        name.trim(),
        540,
        1180
      );
    }

    ctx.fillStyle =
      "#ffffff";

    ctx.font =
      "500 36px Arial";

    wrapText(
      ctx,
      message ||
        "May your birthday be filled with laughter, love, happiness and unforgettable moments.",
      540,
      1260,
      780,
      55
    );

    // Balloons

    const balloons = [
      [130, 1540, "#ef4444"],
      [300, 1640, "#facc15"],
      [540, 1530, "#22c55e"],
      [780, 1640, "#3b82f6"],
      [950, 1540, "#ec4899"],
    ];

    balloons.forEach(
      ([x, y, color]) => {
        ctx.fillStyle = color;

        ctx.beginPath();

        ctx.ellipse(
          x,
          y,
          55,
          75,
          0,
          0,
          Math.PI * 2
        );

        ctx.fill();

        ctx.strokeStyle =
          "#ffffff";

        ctx.lineWidth = 3;

        ctx.beginPath();

        ctx.moveTo(
          x,
          y + 75
        );

        ctx.lineTo(
          x,
          y + 160
        );

        ctx.stroke();
      }
    );

    ctx.fillStyle =
      "#ffffff";

    ctx.font =
      "700 36px Arial";

    ctx.fillText(
      "Make today unforgettable! 🎂",
      540,
      1810
    );

    ctx.textAlign =
      "start";
  };

  // ============================================================
  // FRIENDSHIP
  // ============================================================

  const drawFriendship = async () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = 1080;
    canvas.height = 1920;

    const gradient =
      ctx.createLinearGradient(
        0,
        0,
        1080,
        1920
      );

    gradient.addColorStop(
      0,
      "#0369a1"
    );

    gradient.addColorStop(
      0.45,
      "#06b6d4"
    );

    gradient.addColorStop(
      1,
      "#0f766e"
    );

    ctx.fillStyle =
      gradient;

    ctx.fillRect(
      0,
      0,
      1080,
      1920
    );

    ctx.textAlign =
      "center";

    ctx.fillStyle =
      "#ffffff";

    ctx.font =
      "85px Arial";

    ctx.fillText(
      "👫",
      540,
      200
    );

    ctx.font =
      "900 95px Arial";

    ctx.fillText(
      "BEST FRIENDS",
      540,
      350
    );

    ctx.fillStyle =
      "#cffafe";

    ctx.font =
      "700 50px Arial";

    ctx.fillText(
      "FOREVER",
      540,
      430
    );

    ctx.fillStyle =
      "#ffffff";

    ctx.font =
      "500 34px Arial";

    ctx.fillText(
      "Some memories become priceless",
      540,
      500
    );

    // Photo

    if (imageRef.current) {
      drawPhoto(
        ctx,
        imageRef.current,
        540,
        850,
        230,
        "#ffffff"
      );
    } else {
      drawPlaceholder(
        ctx,
        540,
        850,
        230
      );
    }

    if (name.trim()) {
      ctx.fillStyle =
        "#ffffff";

      ctx.font =
        "800 52px Arial";

      ctx.fillText(
        name.trim(),
        540,
        1180
      );
    }

    ctx.fillStyle =
      "#ecfeff";

    ctx.font =
      "500 36px Arial";

    wrapText(
      ctx,
      message ||
        "Good friends make ordinary moments feel extraordinary.",
      540,
      1260,
      780,
      55
    );

    // Hearts

    const hearts = [
      [180, 1570],
      [360, 1650],
      [540, 1550],
      [720, 1650],
      [900, 1570],
    ];

    ctx.fillStyle =
      "#fda4af";

    hearts.forEach(
      ([x, y]) => {
        ctx.font =
          "65px Arial";

        ctx.fillText(
          "♥",
          x,
          y
        );
      }
    );

    ctx.fillStyle =
      "#ffffff";

    ctx.font =
      "700 35px Arial";

    ctx.fillText(
      "Together • Always • Unforgettable",
      540,
      1810
    );

    ctx.textAlign =
      "start";
  };

  // ============================================================
  // MEMORIES
  // ============================================================

  const drawMemories = async () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = 1080;
    canvas.height = 1920;

    // Cinematic background

    const gradient =
      ctx.createLinearGradient(
        0,
        0,
        1080,
        1920
      );

    gradient.addColorStop(
      0,
      "#0f172a"
    );

    gradient.addColorStop(
      0.5,
      "#475569"
    );

    gradient.addColorStop(
      1,
      "#020617"
    );

    ctx.fillStyle =
      gradient;

    ctx.fillRect(
      0,
      0,
      1080,
      1920
    );

    // Film lines

    ctx.strokeStyle =
      "rgba(255,255,255,0.18)";

    ctx.lineWidth = 3;

    for (
      let y = 80;
      y < 1900;
      y += 90
    ) {
      ctx.beginPath();

      ctx.moveTo(
        35,
        y
      );

      ctx.lineTo(
        1045,
        y
      );

      ctx.stroke();
    }

    ctx.textAlign =
      "center";

    ctx.fillStyle =
      "#ffffff";

    ctx.font =
      "65px Arial";

    ctx.fillText(
      "📸",
      540,
      190
    );

    ctx.font =
      "900 90px Georgia";

    ctx.fillText(
      "MEMORIES",
      540,
      330
    );

    ctx.fillStyle =
      "#cbd5e1";

    ctx.font =
      "italic 38px Georgia";

    ctx.fillText(
      "Moments that stay forever",
      540,
      410
    );

    // Large photo frame

    if (imageRef.current) {
      ctx.save();

      roundedRect(
        ctx,
        120,
        560,
        840,
        570,
        35
      );

      ctx.fillStyle =
        "#f8fafc";

      ctx.fill();

      ctx.clip();

      const image =
        imageRef.current;

      const ratio =
        image.width /
        image.height;

      let width = 840;
      let height =
        840 / ratio;

      if (height < 570) {
        height = 570;
        width =
          height * ratio;
      }

      ctx.drawImage(
        image,
        540 - width / 2,
        845 - height / 2,
        width,
        height
      );

      ctx.restore();

      ctx.strokeStyle =
        "#f8fafc";

      ctx.lineWidth = 10;

      roundedRect(
        ctx,
        120,
        560,
        840,
        570,
        35
      );

      ctx.stroke();
    } else {
      roundedRect(
        ctx,
        120,
        560,
        840,
        570,
        35
      );

      ctx.fillStyle =
        "rgba(255,255,255,0.1)";

      ctx.fill();

      ctx.strokeStyle =
        "#ffffff";

      ctx.lineWidth = 5;

      ctx.stroke();

      ctx.fillStyle =
        "#ffffff";

      ctx.font =
        "600 38px Arial";

      ctx.fillText(
        "YOUR MEMORY",
        540,
        850
      );
    }

    // Name

    if (name.trim()) {
      ctx.fillStyle =
        "#ffffff";

      ctx.font =
        "700 52px Georgia";

      ctx.fillText(
        name.trim(),
        540,
        1270
      );
    }

    // Message

    ctx.fillStyle =
      "#e2e8f0";

    ctx.font =
      "500 36px Georgia";

    wrapText(
      ctx,
      message ||
        "Beautiful memories become the stories we carry with us forever.",
      540,
      1360,
      760,
      55
    );

    // Film strip

    ctx.fillStyle =
      "rgba(255,255,255,0.15)";

    ctx.fillRect(
      80,
      1600,
      920,
      150
    );

    for (
      let i = 0;
      i < 8;
      i++
    ) {
      ctx.fillStyle =
        "#020617";

      ctx.fillRect(
        100 + i * 110,
        1620,
        70,
        110
      );
    }

    ctx.fillStyle =
      "#ffffff";

    ctx.font =
      "500 30px Georgia";

    ctx.fillText(
      "KEEP THE MOMENTS • KEEP THE MEMORIES",
      540,
      1820
    );

    ctx.textAlign =
      "start";
  };

  // ============================================================
  // GENERATE TEMPLATE
  // ============================================================

  const generatePreview = async () => {
    if (!template) return;

    setIsGenerating(true);

    try {
      switch (template.id) {
        case "sankranti":
          await drawSankranti();
          break;

        case "rakhi":
          await drawRakhi();
          break;

        case "diwali":
          await drawDiwali();
          break;

        case "holi":
          await drawHoli();
          break;

        case "ugadi":
          await drawUgadi();
          break;

        case "christmas":
          await drawChristmas();
          break;

        case "new-year":
          await drawNewYear();
          break;

        case "birthday":
          await drawBirthday();
          break;

        case "friendship":
          await drawFriendship();
          break;

        case "memories":
          await drawMemories();
          break;

        default:
          await drawGenericTemplate();
      }
    } finally {
      setIsGenerating(false);
    }
  };

  // ============================================================
  // SANKRANTI
  // ============================================================

  const drawSankranti = async () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = 1080;
    canvas.height = 1920;

    const gradient =
      ctx.createLinearGradient(
        0,
        0,
        1080,
        1920
      );

    gradient.addColorStop(
      0,
      "#f97316"
    );

    gradient.addColorStop(
      0.35,
      "#fde047"
    );

    gradient.addColorStop(
      0.7,
      "#bef264"
    );

    gradient.addColorStop(
      1,
      "#22c55e"
    );

    ctx.fillStyle =
      gradient;

    ctx.fillRect(
      0,
      0,
      1080,
      1920
    );

    ctx.textAlign =
      "center";

    ctx.fillStyle =
      "#166534";

    ctx.font =
      "600 34px Arial";

    ctx.fillText(
      "HARVEST • HAPPINESS • TOGETHERNESS",
      540,
      100
    );

    ctx.font =
      "100px Arial";

    ctx.fillText(
      "🪁",
      540,
      220
    );

    ctx.fillStyle =
      "#14532d";

    ctx.font =
      "italic 600 100px Georgia";

    ctx.fillText(
      "Happy",
      540,
      340
    );

    ctx.fillStyle =
      "#ea580c";

    ctx.font =
      "900 105px Arial";

    ctx.fillText(
      "SANKRANTI",
      540,
      450
    );

    if (imageRef.current) {
      drawPhoto(
        ctx,
        imageRef.current,
        540,
        900,
        250,
        "#ffffff"
      );
    } else {
      drawPlaceholder(
        ctx,
        540,
        900,
        250
      );
    }

    if (name.trim()) {
      ctx.fillStyle =
        "#166534";

      ctx.font =
        "700 52px Arial";

      ctx.fillText(
        name.trim(),
        540,
        1260
      );
    }

    ctx.fillStyle =
      "#14532d";

    ctx.font =
      "500 35px Arial";

    wrapText(
      ctx,
      message ||
        "May this Sankranti bring new hopes, good health and prosperity to your life!",
      540,
      1350,
      760,
      52
    );

    ctx.font =
      "80px Arial";

    ctx.fillStyle =
      "#166534";

    ctx.fillText(
      "🌾",
      540,
      1650
    );

    ctx.fillStyle =
      "#14532d";

    ctx.font =
      "600 34px Arial";

    ctx.fillText(
      "Happy Sankranti 🪁",
      540,
      1800
    );

    ctx.textAlign =
      "start";
  };

  // ============================================================
  // CHRISTMAS
  // ============================================================

  const drawChristmas = async () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = 1080;
    canvas.height = 1920;

    const gradient =
      ctx.createLinearGradient(
        0,
        0,
        1080,
        1920
      );

    gradient.addColorStop(
      0,
      "#7f1d1d"
    );

    gradient.addColorStop(
      0.35,
      "#b91c1c"
    );

    gradient.addColorStop(
      0.7,
      "#166534"
    );

    gradient.addColorStop(
      1,
      "#052e16"
    );

    ctx.fillStyle =
      gradient;

    ctx.fillRect(
      0,
      0,
      1080,
      1920
    );

    ctx.textAlign =
      "center";

    ctx.fillStyle =
      "#ffffff";

    ctx.font =
      "90px Arial";

    ctx.fillText(
      "🎄",
      540,
      200
    );

    ctx.fillStyle =
      "#facc15";

    ctx.font =
      "900 90px Georgia";

    ctx.fillText(
      "MERRY",
      540,
      350
    );

    ctx.fillStyle =
      "#ffffff";

    ctx.font =
      "900 80px Georgia";

    ctx.fillText(
      "CHRISTMAS",
      540,
      450
    );

    ctx.fillStyle =
      "#fef3c7";

    ctx.font =
      "500 34px Georgia";

    ctx.fillText(
      "LOVE • JOY • PEACE",
      540,
      520
    );

    if (imageRef.current) {
      drawPhoto(
        ctx,
        imageRef.current,
        540,
        850,
        225,
        "#ffffff"
      );
    } else {
      drawPlaceholder(
        ctx,
        540,
        850,
        225
      );
    }

    if (name.trim()) {
      ctx.fillStyle =
        "#facc15";

      ctx.font =
        "700 52px Georgia";

      ctx.fillText(
        name.trim(),
        540,
        1180
      );
    }

    ctx.fillStyle =
      "#ffffff";

    ctx.font =
      "500 36px Georgia";

    wrapText(
      ctx,
      message ||
        "Wishing you love, joy and beautiful memories this Christmas.",
      540,
      1260,
      760,
      55
    );

    ctx.font =
      "80px Arial";

    ctx.fillText(
      "🎁",
      540,
      1650
    );

    ctx.fillStyle =
      "#fef3c7";

    ctx.font =
      "600 34px Georgia";

    ctx.fillText(
      "Merry Christmas 🎄",
      540,
      1800
    );

    ctx.textAlign =
      "start";
  };

  // ============================================================
  // GENERIC FALLBACK
  // ============================================================

  const drawGenericTemplate =
    async () => {
      const canvas =
        canvasRef.current;

      if (!canvas) return;

      const ctx =
        canvas.getContext("2d");

      canvas.width = 1080;
      canvas.height = 1920;

      const gradient =
        ctx.createLinearGradient(
          0,
          0,
          1080,
          1920
        );

      gradient.addColorStop(
        0,
        template?.theme?.primary ||
          "#6366f1"
      );

      gradient.addColorStop(
        0.5,
        template?.theme?.secondary ||
          "#8b5cf6"
      );

      gradient.addColorStop(
        1,
        template?.theme?.accent ||
          "#312e81"
      );

      ctx.fillStyle =
        gradient;

      ctx.fillRect(
        0,
        0,
        1080,
        1920
      );

      ctx.textAlign =
        "center";

      ctx.fillStyle =
        "#ffffff";

      ctx.font =
        "90px Arial";

      ctx.fillText(
        template?.emoji ||
          "✨",
        540,
        200
      );

      ctx.font =
        "900 90px Arial";

      ctx.fillText(
        template?.name ||
          "Story",
        540,
        330
      );

      if (imageRef.current) {
        drawPhoto(
          ctx,
          imageRef.current,
          540,
          850,
          230
        );
      } else {
        drawPlaceholder(
          ctx,
          540,
          850,
          230
        );
      }

      if (name.trim()) {
        ctx.font =
          "700 52px Arial";

        ctx.fillText(
          name.trim(),
          540,
          1180
        );
      }

      ctx.font =
        "500 36px Arial";

      wrapText(
        ctx,
        message ||
          template?.defaultMessage ||
          "",
        540,
        1260,
        760,
        55
      );

      ctx.textAlign =
        "start";
    };

  // ============================================================
  // IMAGE LOADING
  // ============================================================

  useEffect(() => {
    if (!photoUrl) {
      imageRef.current = null;

      generatePreview();

      return;
    }

    const image = new Image();

    image.onload = () => {
      imageRef.current = image;

      generatePreview();
    };

    image.src = photoUrl;

    return () => {
      image.onload = null;
    };
  }, [photoUrl]);

  // ============================================================
  // TEXT CHANGES
  // ============================================================

  useEffect(() => {
    if (template) {
      generatePreview();
    }
  }, [
    template,
    name,
    message,
  ]);

  // ============================================================
  // DOWNLOAD
  // ============================================================

  const downloadImage = () => {
    const canvas =
      canvasRef.current;

    if (!canvas) return;

    const link =
      document.createElement("a");

    link.download =
      `${template?.id || "statusx"}-story.png`;

    link.href =
      canvas.toDataURL(
        "image/png"
      );

    link.click();
  };

  // ============================================================
  // PUBLISH
  // ============================================================

  const publishStory = async () => {
    const canvas =
      canvasRef.current;

    if (!canvas) return;

    setIsPublishing(true);
    setError("");
    setSuccess("");

    try {
      const finalImage =
        await new Promise(
          (resolve) => {
            canvas.toBlob(
              (blob) => {
                resolve(blob);
              },
              "image/png",
              1
            );
          }
        );

      if (!finalImage) {
        throw new Error(
          "Could not generate story image."
        );
      }

      const formData =
        new FormData();

      formData.append(
        "media",
        finalImage,
        `${
          template?.id ||
          "story"
        }-${Date.now()}.png`
      );

      formData.append(
        "caption",
        message || ""
      );

      const response =
        await api.post(
          "/stories",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      if (
        !response.data?.success
      ) {
        throw new Error(
          response.data?.message ||
            "Story publishing failed."
        );
      }

      setSuccess(
        "Story published successfully! 🎉"
      );

      setTimeout(() => {
        navigate("/feed");
      }, 1200);
    } catch (err) {
      console.error(
        "Publish error:",
        err
      );

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to publish story."
      );
    } finally {
      setIsPublishing(false);
    }
  };

  // ============================================================
  // TEMPLATE NOT FOUND
  // ============================================================

  if (!template) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

        <div className="text-center">

          <h1 className="text-3xl font-bold mb-4">
            Template Not Found
          </h1>

          <Link
            to="/templates"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 px-5 py-3 rounded-xl font-semibold"
          >
            <ArrowLeft size={18} />

            Back to Templates
          </Link>

        </div>

      </div>
    );
  }

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <nav className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">

          <Link
            to="/templates"
            className="flex items-center gap-2 text-slate-300 hover:text-white transition"
          >
            <ArrowLeft size={19} />

            Back to Templates
          </Link>

          <div className="flex items-center gap-2 font-bold">

            <Sparkles
              size={20}
              className="text-green-400"
            />

            <span className="text-green-400">
              StatusX Studio
            </span>

          </div>

        </div>

      </nav>

      <main className="max-w-7xl mx-auto px-5 py-8">

        <div className="mb-8">

          <div className="flex items-center gap-3 mb-3">

            <span className="text-4xl">
              {template.emoji}
            </span>

            <div>

              <h1 className="text-3xl md:text-4xl font-bold">
                {template.name} Template
              </h1>

              <p className="text-slate-400 mt-1">
                Upload your photo and customize your story.
              </p>

            </div>

          </div>

        </div>

        <div className="grid lg:grid-cols-[420px_1fr] gap-8 items-start">

          {/* LEFT */}

          <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

            <div className="flex items-center gap-2 mb-6">

              <Sparkles
                size={20}
                className="text-green-400"
              />

              <h2 className="text-xl font-bold">
                Customize
              </h2>

            </div>

            {/* PHOTO */}

            <div className="mb-6">

              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Your Photo
              </label>

              <label className="border-2 border-dashed border-slate-700 hover:border-green-500 rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition">

                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt="Selected"
                    className="w-24 h-24 rounded-full object-cover border-4 border-green-400 mb-3"
                  />
                ) : (
                  <ImagePlus
                    size={35}
                    className="text-slate-500 mb-3"
                  />
                )}

                <span className="text-sm text-slate-300 font-medium">
                  {photo
                    ? "Change Photo"
                    : "Upload Photo"}
                </span>

                <span className="text-xs text-slate-500 mt-1">
                  JPG, PNG or WEBP • Max 10MB
                </span>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={
                    handlePhotoChange
                  }
                />

              </label>

            </div>

            {/* NAME */}

            <div className="mb-5">

              <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2">

                <User size={16} />

                Your Name

              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                placeholder="Enter your name"
                maxLength={40}
                className="w-full bg-slate-950 border border-slate-700 focus:border-green-500 outline-none rounded-xl px-4 py-3 text-white transition"
              />

            </div>

            {/* MESSAGE */}

            <div className="mb-6">

              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Message
              </label>

              <textarea
                value={message}
                onChange={(e) =>
                  setMessage(
                    e.target.value
                  )
                }
                rows={5}
                maxLength={180}
                placeholder="Write your message..."
                className="w-full bg-slate-950 border border-slate-700 focus:border-green-500 outline-none rounded-xl px-4 py-3 text-white resize-none transition"
              />

              <div className="text-right text-xs text-slate-500 mt-1">
                {message.length}/180
              </div>

            </div>

            {/* ERROR */}

            {error && (
              <div className="mb-5 bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl p-4 text-sm">
                {error}
              </div>
            )}

            {/* SUCCESS */}

            {success && (
              <div className="mb-5 bg-green-500/10 border border-green-500/30 text-green-300 rounded-xl p-4 flex items-center gap-2 text-sm">

                <CheckCircle2
                  size={18}
                />

                {success}

              </div>
            )}

            {/* BUTTONS */}

            <div className="space-y-3">

              <button
                type="button"
                onClick={
                  publishStory
                }
                disabled={
                  isPublishing ||
                  isGenerating
                }
                className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl py-3.5 font-bold flex items-center justify-center gap-2 transition"
              >

                {isPublishing ? (
                  <>
                    <Loader2
                      size={19}
                      className="animate-spin"
                    />

                    Publishing...
                  </>
                ) : (
                  <>
                    <Rocket
                      size={19}
                    />

                    Publish Story
                  </>
                )}

              </button>

              <button
                type="button"
                onClick={
                  downloadImage
                }
                disabled={
                  isGenerating
                }
                className="w-full border border-slate-700 hover:border-slate-500 rounded-xl py-3.5 font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >

                <Upload
                  size={18}
                />

                Download PNG

              </button>

            </div>

            <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-500">

              <strong className="text-slate-300">
                Story format
              </strong>

              <br />

              1080 × 1920 px • 9:16 • PNG

            </div>

          </section>

          {/* RIGHT */}

          <section className="bg-slate-900 border border-slate-800 rounded-3xl p-5">

            <div className="flex items-center justify-between mb-4">

              <div>

                <h2 className="text-lg font-bold">
                  Live Preview
                </h2>

                <p className="text-xs text-slate-500">
                  Your final story image
                </p>

              </div>

              {isGenerating && (
                <div className="flex items-center gap-2 text-xs text-green-400">

                  <Loader2
                    size={15}
                    className="animate-spin"
                  />

                  Updating...

                </div>
              )}

            </div>

            <div className="flex justify-center">

              <div className="relative w-full max-w-[430px]">

                <div className="absolute inset-0 bg-green-500/10 blur-3xl rounded-full" />

                <canvas
                  ref={canvasRef}
                  className="relative w-full rounded-2xl shadow-2xl border border-slate-700 bg-black"
                />

              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default TemplateEditor;
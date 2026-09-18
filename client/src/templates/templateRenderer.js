const WIDTH = 1080;
const HEIGHT = 1920;

/* =====================================================
   COMMON HELPERS
===================================================== */

function roundedRect(
  ctx,
  x,
  y,
  width,
  height,
  radius
) {
  ctx.beginPath();

  ctx.moveTo(
    x + radius,
    y
  );

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
}

function wrapText(
  ctx,
  text,
  x,
  y,
  maxWidth,
  lineHeight
) {
  const words =
    String(text || "").split(" ");

  let line = "";

  for (
    let i = 0;
    i < words.length;
    i++
  ) {
    const testLine =
      line + words[i] + " ";

    const width =
      ctx.measureText(testLine).width;

    if (
      width > maxWidth &&
      i > 0
    ) {
      ctx.fillText(
        line.trim(),
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

  if (line.trim()) {
    ctx.fillText(
      line.trim(),
      x,
      y
    );
  }
}

function createGradient(
  ctx,
  colors
) {
  const gradient =
    ctx.createLinearGradient(
      0,
      0,
      WIDTH,
      HEIGHT
    );

  colors.forEach(
    (color, index) => {
      gradient.addColorStop(
        index /
          Math.max(
            colors.length - 1,
            1
          ),
        color
      );
    }
  );

  return gradient;
}

function drawImageCover(
  ctx,
  image,
  x,
  y,
  width,
  height
) {
  if (!image) return;

  const imageRatio =
    image.width /
    image.height;

  const boxRatio =
    width / height;

  let drawWidth;
  let drawHeight;

  if (imageRatio > boxRatio) {
    drawHeight = height;
    drawWidth =
      height * imageRatio;
  } else {
    drawWidth = width;
    drawHeight =
      width / imageRatio;
  }

  const dx =
    x +
    (width - drawWidth) / 2;

  const dy =
    y +
    (height - drawHeight) / 2;

  ctx.drawImage(
    image,
    dx,
    dy,
    drawWidth,
    drawHeight
  );
}

function drawCircularPhoto(
  ctx,
  image,
  centerX,
  centerY,
  radius,
  borderColor = "#ffffff"
) {
  if (!image) return;

  ctx.save();

  /* Glow */

  const glow =
    ctx.createRadialGradient(
      centerX,
      centerY,
      radius,
      centerX,
      centerY,
      radius + 80
    );

  glow.addColorStop(
    0,
    "rgba(255,255,255,0.5)"
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
    radius + 80,
    0,
    Math.PI * 2
  );

  ctx.fill();

  /* Outer border */

  ctx.beginPath();

  ctx.arc(
    centerX,
    centerY,
    radius + 22,
    0,
    Math.PI * 2
  );

  ctx.fillStyle =
    borderColor;

  ctx.fill();

  /* Photo */

  ctx.beginPath();

  ctx.arc(
    centerX,
    centerY,
    radius,
    0,
    Math.PI * 2
  );

  ctx.clip();

  drawImageCover(
    ctx,
    image,
    centerX - radius,
    centerY - radius,
    radius * 2,
    radius * 2
  );

  ctx.restore();

  /* Dashed decoration */

  ctx.save();

  ctx.beginPath();

  ctx.arc(
    centerX,
    centerY,
    radius + 40,
    0,
    Math.PI * 2
  );

  ctx.strokeStyle =
    "rgba(255,255,255,0.9)";

  ctx.lineWidth = 6;

  ctx.setLineDash([
    25,
    14,
  ]);

  ctx.stroke();

  ctx.restore();
}

function drawPhotoCard(
  ctx,
  image,
  x,
  y,
  width,
  height,
  rotation = 0
) {
  if (!image) return;

  ctx.save();

  ctx.translate(
    x + width / 2,
    y + height / 2
  );

  ctx.rotate(rotation);

  ctx.shadowColor =
    "rgba(0,0,0,0.35)";

  ctx.shadowBlur = 35;
  ctx.shadowOffsetY = 18;

  ctx.fillStyle =
    "#ffffff";

  ctx.fillRect(
    -width / 2,
    -height / 2,
    width,
    height
  );

  ctx.shadowColor =
    "transparent";

  ctx.save();

  ctx.beginPath();

  ctx.rect(
    -width / 2 + 20,
    -height / 2 + 20,
    width - 40,
    height - 90
  );

  ctx.clip();

  drawImageCover(
    ctx,
    image,
    -width / 2 + 20,
    -height / 2 + 20,
    width - 40,
    height - 90
  );

  ctx.restore();

  ctx.restore();
}

function drawPlaceholder(
  ctx,
  x,
  y,
  radius
) {
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
    "rgba(255,255,255,0.2)";

  ctx.fill();

  ctx.strokeStyle =
    "#ffffff";

  ctx.lineWidth = 8;

  ctx.stroke();

  ctx.fillStyle =
    "#ffffff";

  ctx.font =
    "600 34px Arial";

  ctx.textAlign =
    "center";

  ctx.fillText(
    "YOUR PHOTO",
    x,
    y + 12
  );

  ctx.restore();
}

function drawStars(
  ctx,
  positions
) {
  ctx.save();

  ctx.fillStyle =
    "rgba(255,255,255,0.85)";

  positions.forEach(
    ([x, y, size]) => {
      ctx.beginPath();

      ctx.arc(
        x,
        y,
        size,
        0,
        Math.PI * 2
      );

      ctx.fill();
    }
  );

  ctx.restore();
}

/* =====================================================
   SANKRANTI
===================================================== */

function drawSankranti(
  ctx,
  image,
  name,
  message
) {
  ctx.fillStyle =
    createGradient(ctx, [
      "#f97316",
      "#fde047",
      "#bef264",
      "#22c55e",
    ]);

  ctx.fillRect(
    0,
    0,
    WIDTH,
    HEIGHT
  );

  ctx.textAlign =
    "center";

  /* Border */

  ctx.strokeStyle =
    "rgba(255,255,255,0.85)";

  ctx.lineWidth = 8;

  ctx.strokeRect(
    30,
    30,
    WIDTH - 60,
    HEIGHT - 60
  );

  /* Top */

  ctx.fillStyle =
    "#166534";

  ctx.font =
    "600 32px Arial";

  ctx.fillText(
    "HARVEST • HAPPINESS • TOGETHERNESS",
    540,
    105
  );

  ctx.font =
    "90px Arial";

  ctx.fillText(
    "🪁",
    150,
    250
  );

  ctx.fillText(
    "☀️",
    900,
    250
  );

  ctx.font =
    "italic 600 85px Georgia";

  ctx.fillText(
    "Happy",
    540,
    330
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

  /* Photo */

  if (image) {
    drawCircularPhoto(
      ctx,
      image,
      540,
      850,
      255
    );
  } else {
    drawPlaceholder(
      ctx,
      540,
      850,
      255
    );
  }

  /* Name */

  ctx.fillStyle =
    "#166534";

  if (name.trim()) {
    ctx.font =
      "700 52px Arial";

    ctx.fillText(
      name.trim(),
      540,
      1260
    );
  }

  /* Message */

  ctx.font =
    "500 34px Arial";

  wrapText(
    ctx,
    message ||
      "May this Sankranti bring happiness, prosperity and beautiful new beginnings!",
    540,
    1360,
    760,
    50
  );

  /* Bottom */

  ctx.font =
    "90px Arial";

  ctx.fillText(
    "🌾",
    150,
    1760
  );

  ctx.fillText(
    "🪔",
    900,
    1760
  );

  ctx.font =
    "80px Arial";

  ctx.fillText(
    "🪁",
    540,
    1830
  );

  ctx.textAlign =
    "start";
}

/* =====================================================
   RAKHI
===================================================== */

async function drawRakhi(
  ctx,
  image,
  name,
  message
) {
  const backgroundImage =
    new Image();

  backgroundImage.src =
    "/templates/rakhi.png";

  await new Promise(
    (resolve) => {
      if (
        backgroundImage.complete &&
        backgroundImage.naturalWidth > 0
      ) {
        resolve();
        return;
      }

      backgroundImage.onload =
        resolve;

      backgroundImage.onerror =
        resolve;
    }
  );

  /*
   * If the reference image exists,
   * use it as the Rakhi base.
   */

  if (
    backgroundImage.naturalWidth > 0
  ) {
    drawImageCover(
      ctx,
      backgroundImage,
      0,
      0,
      WIDTH,
      HEIGHT
    );
  } else {
    /*
     * Fallback if rakhi.png
     * is missing.
     */

    ctx.fillStyle =
      createGradient(ctx, [
        "#f9a8d4",
        "#ec4899",
        "#7e22ce",
      ]);

    ctx.fillRect(
      0,
      0,
      WIDTH,
      HEIGHT
    );

    ctx.fillStyle =
      "#ffffff";

    ctx.textAlign =
      "center";

    ctx.font =
      "900 105px Arial";

    ctx.fillText(
      "Happy Rakhi ❤️",
      540,
      300
    );
  }

  /*
   * IMPORTANT:
   *
   * The reference image already contains
   * its own text and decorations.
   *
   * We therefore only add the user's
   * uploaded photo in the central area
   * and optional personalized information.
   */

  if (image) {
    drawCircularPhoto(
      ctx,
      image,
      540,
      1010,
      190,
      "#fff7ed"
    );
  }

  /*
   * User name
   */

  if (name.trim()) {
    ctx.textAlign =
      "center";

    roundedRect(
      ctx,
      350,
      1245,
      380,
      70,
      30
    );

    ctx.fillStyle =
      "rgba(255,248,235,0.92)";

    ctx.fill();

    ctx.fillStyle =
      "#8f1d2c";

    ctx.font =
      "700 38px Georgia";

    ctx.fillText(
      name.trim(),
      540,
      1292
    );
  }

  /*
   * Custom message
   */

  if (message.trim()) {
    roundedRect(
      ctx,
      150,
      1335,
      780,
      170,
      30
    );

    ctx.fillStyle =
      "rgba(255,248,235,0.90)";

    ctx.fill();

    ctx.strokeStyle =
      "rgba(181,120,50,0.6)";

    ctx.lineWidth = 3;

    ctx.stroke();

    ctx.fillStyle =
      "#54251d";

    ctx.font =
      "500 28px Georgia";

    ctx.textAlign =
      "center";

    wrapText(
      ctx,
      message,
      540,
      1405,
      650,
      42
    );
  }

  ctx.textAlign =
    "start";
}

/* =====================================================
   DIWALI
===================================================== */

function drawDiwali(
  ctx,
  image,
  name,
  message
) {
  ctx.fillStyle =
    createGradient(ctx, [
      "#451a03",
      "#9a3412",
      "#ea580c",
      "#facc15",
    ]);

  ctx.fillRect(
    0,
    0,
    WIDTH,
    HEIGHT
  );

  ctx.textAlign =
    "center";

  ctx.fillStyle =
    "rgba(255,215,80,0.18)";

  ctx.fillRect(
    50,
    50,
    980,
    1820
  );

  ctx.fillStyle =
    "#fff7ed";

  ctx.font =
    "90px Arial";

  ctx.fillText(
    "🪔",
    540,
    180
  );

  ctx.font =
    "italic 600 75px Georgia";

  ctx.fillText(
    "Happy",
    540,
    285
  );

  ctx.font =
    "900 105px Arial";

  ctx.fillText(
    "DIWALI",
    540,
    410
  );

  ctx.font =
    "28px Arial";

  ctx.fillText(
    "THE FESTIVAL OF LIGHTS",
    540,
    465
  );

  if (image) {
    drawPhotoCard(
      ctx,
      image,
      270,
      580,
      540,
      680
    );
  } else {
    drawPlaceholder(
      ctx,
      540,
      920,
      250
    );
  }

  ctx.fillStyle =
    "#fff7ed";

  if (name.trim()) {
    ctx.font =
      "700 52px Arial";

    ctx.fillText(
      name.trim(),
      540,
      1390
    );
  }

  ctx.font =
    "500 34px Arial";

  wrapText(
    ctx,
    message ||
      "May your life shine with happiness, prosperity and beautiful memories.",
    540,
    1480,
    760,
    50
  );

  ctx.font =
    "85px Arial";

  ctx.fillText(
    "🪔   🪔   🪔",
    540,
    1740
  );

  ctx.font =
    "45px Arial";

  ctx.fillText(
    "✨ • ✨ • ✨ • ✨",
    540,
    1820
  );

  ctx.textAlign =
    "start";
}

/* =====================================================
   HOLI
===================================================== */

function drawHoli(
  ctx,
  image,
  name,
  message
) {
  ctx.fillStyle =
    createGradient(ctx, [
      "#ec4899",
      "#8b5cf6",
      "#3b82f6",
      "#06b6d4",
    ]);

  ctx.fillRect(
    0,
    0,
    WIDTH,
    HEIGHT
  );

  ctx.textAlign =
    "center";

  /*
   * Fixed decorative circles.
   * No Math.random(), so the preview
   * stays stable.
   */

  const circles = [
    [120, 520, 80, "#facc15"],
    [930, 560, 100, "#22c55e"],
    [150, 1050, 70, "#fb7185"],
    [920, 1100, 85, "#f97316"],
    [130, 1510, 75, "#a3e635"],
    [950, 1530, 70, "#f43f5e"],
  ];

  circles.forEach(
    ([x, y, radius, color]) => {
      ctx.beginPath();

      ctx.arc(
        x,
        y,
        radius,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        color;

      ctx.globalAlpha =
        0.75;

      ctx.fill();

      ctx.globalAlpha =
        1;
    }
  );

  ctx.fillStyle =
    "#ffffff";

  ctx.font =
    "100px Arial";

  ctx.fillText(
    "🎨",
    540,
    190
  );

  ctx.font =
    "900 105px Arial";

  ctx.fillText(
    "HAPPY HOLI",
    540,
    340
  );

  ctx.font =
    "italic 40px Georgia";

  ctx.fillText(
    "Paint your memories with happiness",
    540,
    410
  );

  if (image) {
    drawCircularPhoto(
      ctx,
      image,
      540,
      880,
      260
    );
  } else {
    drawPlaceholder(
      ctx,
      540,
      880,
      260
    );
  }

  ctx.fillStyle =
    "#ffffff";

  if (name.trim()) {
    ctx.font =
      "700 55px Arial";

    ctx.fillText(
      name.trim(),
      540,
      1300
    );
  }

  ctx.font =
    "500 34px Arial";

  wrapText(
    ctx,
    message ||
      "Wishing you a colorful Holi filled with laughter, love and unforgettable moments!",
    540,
    1400,
    760,
    50
  );

  ctx.font =
    "85px Arial";

  ctx.fillText(
    "🌈",
    540,
    1740
  );

  ctx.textAlign =
    "start";
}

/* =====================================================
   UGADI
===================================================== */

function drawUgadi(
  ctx,
  image,
  name,
  message
) {
  ctx.fillStyle =
    createGradient(ctx, [
      "#166534",
      "#22c55e",
      "#84cc16",
      "#facc15",
    ]);

  ctx.fillRect(
    0,
    0,
    WIDTH,
    HEIGHT
  );

  ctx.textAlign =
    "center";

  ctx.strokeStyle =
    "rgba(255,255,255,0.55)";

  ctx.lineWidth = 6;

  ctx.strokeRect(
    45,
    45,
    WIDTH - 90,
    HEIGHT - 90
  );

  ctx.fillStyle =
    "#ffffff";

  ctx.font =
    "95px Arial";

  ctx.fillText(
    "🌿",
    540,
    180
  );

  ctx.font =
    "italic 600 75px Georgia";

  ctx.fillText(
    "Happy",
    540,
    290
  );

  ctx.font =
    "900 105px Arial";

  ctx.fillText(
    "UGADI",
    540,
    410
  );

  ctx.font =
    "28px Arial";

  ctx.fillText(
    "A NEW BEGINNING",
    540,
    465
  );

  if (image) {
    drawCircularPhoto(
      ctx,
      image,
      540,
      850,
      260,
      "#fef9c3"
    );
  } else {
    drawPlaceholder(
      ctx,
      540,
      850,
      260
    );
  }

  ctx.font =
    "65px Arial";

  ctx.fillText(
    "🌿",
    150,
    700
  );

  ctx.fillText(
    "🌿",
    930,
    700
  );

  if (name.trim()) {
    ctx.font =
      "700 55px Arial";

    ctx.fillText(
      name.trim(),
      540,
      1260
    );
  }

  ctx.font =
    "500 34px Arial";

  wrapText(
    ctx,
    message ||
      "May this Ugadi bring peace, prosperity, happiness and wonderful new beginnings.",
    540,
    1370,
    760,
    50
  );

  ctx.font =
    "65px Arial";

  ctx.fillText(
    "🌸  🌿  🌸",
    540,
    1580
  );

  ctx.font =
    "40px Arial";

  ctx.fillText(
    "May every new beginning bring joy.",
    540,
    1690
  );

  ctx.textAlign =
    "start";
}

/* =====================================================
   CHRISTMAS
===================================================== */

function drawChristmas(
  ctx,
  image,
  name,
  message
) {
  ctx.fillStyle =
    createGradient(ctx, [
      "#7f1d1d",
      "#dc2626",
      "#166534",
      "#064e3b",
    ]);

  ctx.fillRect(
    0,
    0,
    WIDTH,
    HEIGHT
  );

  drawStars(ctx, [
    [120, 250, 5],
    [250, 500, 4],
    [850, 250, 5],
    [950, 450, 4],
    [140, 1450, 5],
    [920, 1450, 4],
    [800, 1650, 5],
    [260, 1650, 4],
  ]);

  ctx.textAlign =
    "center";

  ctx.fillStyle =
    "#ffffff";

  ctx.font =
    "100px Arial";

  ctx.fillText(
    "🎄",
    540,
    190
  );

  ctx.font =
    "900 85px Arial";

  ctx.fillText(
    "MERRY CHRISTMAS",
    540,
    335
  );

  ctx.font =
    "italic 40px Georgia";

  ctx.fillText(
    "Warm wishes • Happy moments • Beautiful memories",
    540,
    405
  );

  if (image) {
    drawCircularPhoto(
      ctx,
      image,
      540,
      850,
      260,
      "#fef2f2"
    );
  } else {
    drawPlaceholder(
      ctx,
      540,
      850,
      260
    );
  }

  ctx.font =
    "60px Arial";

  ctx.fillText(
    "❄️",
    160,
    650
  );

  ctx.fillText(
    "⭐",
    920,
    680
  );

  if (name.trim()) {
    ctx.font =
      "700 55px Arial";

    ctx.fillText(
      name.trim(),
      540,
      1260
    );
  }

  ctx.font =
    "500 34px Arial";

  wrapText(
    ctx,
    message ||
      "May your Christmas be filled with love, laughter and unforgettable memories.",
    540,
    1370,
    760,
    50
  );

  ctx.font =
    "75px Arial";

  ctx.fillText(
    "🎁  ⭐  🎄  ⭐  🎁",
    540,
    1640
  );

  ctx.font =
    "42px Arial";

  ctx.fillText(
    "Merry Christmas & Happy Holidays",
    540,
    1750
  );

  ctx.textAlign =
    "start";
}

/* =====================================================
   NEW YEAR
===================================================== */

function drawNewYear(
  ctx,
  image,
  name,
  message
) {
  ctx.fillStyle =
    createGradient(ctx, [
      "#020617",
      "#312e81",
      "#4f46e5",
      "#7c3aed",
    ]);

  ctx.fillRect(
    0,
    0,
    WIDTH,
    HEIGHT
  );

  drawStars(ctx, [
    [100, 250, 4],
    [200, 400, 3],
    [900, 240, 4],
    [960, 420, 3],
    [120, 1400, 4],
    [930, 1450, 4],
    [200, 1650, 3],
    [850, 1700, 4],
  ]);

  ctx.textAlign =
    "center";

  ctx.fillStyle =
    "#ffffff";

  ctx.font =
    "100px Arial";

  ctx.fillText(
    "🎉",
    540,
    190
  );

  ctx.font =
    "900 110px Arial";

  ctx.fillText(
    "NEW YEAR",
    540,
    340
  );

  ctx.font =
    "italic 50px Georgia";

  ctx.fillText(
    "New hopes. New dreams. New memories.",
    540,
    420
  );

  if (image) {
    drawPhotoCard(
      ctx,
      image,
      270,
      580,
      540,
      680
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
    ctx.font =
      "700 55px Arial";

    ctx.fillText(
      name.trim(),
      540,
      1380
    );
  }

  ctx.font =
    "500 34px Arial";

  wrapText(
    ctx,
    message ||
      "Cheers to a fresh year filled with happiness, success and beautiful memories!",
    540,
    1470,
    760,
    50
  );

  ctx.font =
    "80px Arial";

  ctx.fillText(
    "✨ 🎆 ✨",
    540,
    1700
  );

  ctx.font =
    "42px Arial";

  ctx.fillText(
    "WELCOME TO A NEW CHAPTER",
    540,
    1790
  );

  ctx.textAlign =
    "start";
}

/* =====================================================
   BIRTHDAY
===================================================== */

function drawBirthday(
  ctx,
  image,
  name,
  message
) {
  ctx.fillStyle =
    createGradient(ctx, [
      "#db2777",
      "#8b5cf6",
      "#6366f1",
      "#2563eb",
    ]);

  ctx.fillRect(
    0,
    0,
    WIDTH,
    HEIGHT
  );

  ctx.textAlign =
    "center";

  ctx.fillStyle =
    "rgba(255,255,255,0.75)";

  ctx.font =
    "40px Arial";

  ctx.fillText(
    "✨",
    150,
    300
  );

  ctx.fillText(
    "✨",
    920,
    330
  );

  ctx.fillStyle =
    "#ffffff";

  ctx.font =
    "100px Arial";

  ctx.fillText(
    "🎂",
    540,
    180
  );

  ctx.font =
    "900 92px Arial";

  ctx.fillText(
    "HAPPY BIRTHDAY",
    540,
    330
  );

  ctx.font =
    "italic 45px Georgia";

  ctx.fillText(
    "A special day for a special person",
    540,
    405
  );

  if (image) {
    drawCircularPhoto(
      ctx,
      image,
      540,
      850,
      265
    );
  } else {
    drawPlaceholder(
      ctx,
      540,
      850,
      265
    );
  }

  if (name.trim()) {
    ctx.font =
      "700 58px Arial";

    ctx.fillText(
      name.trim(),
      540,
      1270
    );
  }

  ctx.font =
    "500 35px Arial";

  wrapText(
    ctx,
    message ||
      "Wishing you happiness, laughter, success and countless beautiful moments!",
    540,
    1380,
    760,
    50
  );

  ctx.font =
    "80px Arial";

  ctx.fillText(
    "🎈 🎉 🎈",
    540,
    1600
  );

  ctx.font =
    "65px Arial";

  ctx.fillText(
    "🎂  ✨  🎂",
    540,
    1740
  );

  ctx.textAlign =
    "start";
}

/* =====================================================
   FRIENDSHIP
===================================================== */

function drawFriendship(
  ctx,
  image,
  name,
  message
) {
  ctx.fillStyle =
    createGradient(ctx, [
      "#0369a1",
      "#0891b2",
      "#14b8a6",
      "#0f766e",
    ]);

  ctx.fillRect(
    0,
    0,
    WIDTH,
    HEIGHT
  );

  ctx.textAlign =
    "center";

  ctx.strokeStyle =
    "rgba(255,255,255,0.35)";

  ctx.lineWidth = 5;

  ctx.strokeRect(
    55,
    55,
    WIDTH - 110,
    HEIGHT - 110
  );

  ctx.fillStyle =
    "#ffffff";

  ctx.font =
    "90px Arial";

  ctx.fillText(
    "👫",
    540,
    190
  );

  ctx.font =
    "900 90px Arial";

  ctx.fillText(
    "BEST FRIENDS",
    540,
    340
  );

  ctx.font =
    "italic 43px Georgia";

  ctx.fillText(
    "Friends make ordinary moments unforgettable.",
    540,
    415
  );

  if (image) {
    drawPhotoCard(
      ctx,
      image,
      250,
      570,
      580,
      700,
      -0.015
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
    ctx.font =
      "700 55px Arial";

    ctx.fillText(
      name.trim(),
      540,
      1370
    );
  }

  ctx.font =
    "500 35px Arial";

  wrapText(
    ctx,
    message ||
      "Together we create memories that last forever.",
    540,
    1470,
    760,
    50
  );

  ctx.font =
    "75px Arial";

  ctx.fillText(
    "❤️  ✨  👫  ✨  ❤️",
    540,
    1700
  );

  ctx.font =
    "40px Arial";

  ctx.fillText(
    "FOREVER GRATEFUL FOR THIS FRIENDSHIP",
    540,
    1790
  );

  ctx.textAlign =
    "start";
}

/* =====================================================
   MEMORIES
===================================================== */

function drawMemories(
  ctx,
  image,
  name,
  message
) {
  ctx.fillStyle =
    createGradient(ctx, [
      "#0f172a",
      "#334155",
      "#475569",
      "#020617",
    ]);

  ctx.fillRect(
    0,
    0,
    WIDTH,
    HEIGHT
  );

  ctx.fillStyle =
    "rgba(255,255,255,0.05)";

  ctx.fillRect(
    45,
    45,
    990,
    1830
  );

  ctx.textAlign =
    "center";

  ctx.fillStyle =
    "#f8fafc";

  ctx.font =
    "80px Arial";

  ctx.fillText(
    "📸",
    540,
    170
  );

  ctx.font =
    "900 100px Georgia";

  ctx.fillText(
    "MEMORIES",
    540,
    315
  );

  ctx.font =
    "italic 40px Georgia";

  ctx.fillText(
    "Some moments deserve to be remembered forever.",
    540,
    390
  );

  if (image) {
    drawPhotoCard(
      ctx,
      image,
      230,
      530,
      620,
      780
    );
  } else {
    drawPlaceholder(
      ctx,
      540,
      900,
      250
    );
  }

  ctx.strokeStyle =
    "rgba(255,255,255,0.3)";

  ctx.lineWidth = 3;

  ctx.strokeRect(
    130,
    500,
    820,
    850
  );

  if (name.trim()) {
    ctx.fillStyle =
      "#f8fafc";

    ctx.font =
      "700 55px Arial";

    ctx.fillText(
      name.trim(),
      540,
      1430
    );
  }

  ctx.font =
    "500 35px Georgia";

  wrapText(
    ctx,
    message ||
      "A beautiful memory captured in a single moment.",
    540,
    1520,
    760,
    50
  );

  ctx.font =
    "40px Arial";

  ctx.fillText(
    "────────────────",
    540,
    1690
  );

  ctx.font =
    "32px Arial";

  ctx.fillText(
    "A MOMENT • A MEMORY • A STORY",
    540,
    1770
  );

  ctx.textAlign =
    "start";
}

/* =====================================================
   MAIN RENDERER
===================================================== */

export async function renderTemplate(
  canvas,
  template,
  image,
  name,
  message
) {
  if (
    !canvas ||
    !template
  ) {
    return;
  }

  canvas.width =
    WIDTH;

  canvas.height =
    HEIGHT;

  const ctx =
    canvas.getContext("2d");

  ctx.clearRect(
    0,
    0,
    WIDTH,
    HEIGHT
  );

  switch (template.id) {
    case "sankranti":
      drawSankranti(
        ctx,
        image,
        name,
        message
      );
      break;

    case "rakhi":
      await drawRakhi(
        ctx,
        image,
        name,
        message
      );
      break;

    case "diwali":
      drawDiwali(
        ctx,
        image,
        name,
        message
      );
      break;

    case "holi":
      drawHoli(
        ctx,
        image,
        name,
        message
      );
      break;

    case "ugadi":
      drawUgadi(
        ctx,
        image,
        name,
        message
      );
      break;

    case "christmas":
      drawChristmas(
        ctx,
        image,
        name,
        message
      );
      break;

    case "new-year":
      drawNewYear(
        ctx,
        image,
        name,
        message
      );
      break;

    case "birthday":
      drawBirthday(
        ctx,
        image,
        name,
        message
      );
      break;

    case "friendship":
      drawFriendship(
        ctx,
        image,
        name,
        message
      );
      break;

    case "memories":
      drawMemories(
        ctx,
        image,
        name,
        message
      );
      break;

    default:
      drawMemories(
        ctx,
        image,
        name,
        message
      );
  }
}
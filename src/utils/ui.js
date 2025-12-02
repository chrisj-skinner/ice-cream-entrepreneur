// Shared UI helper functions

// for creating buttons
export function createButton(
  scene,
  x,
  y,
  width,
  height,
  label,
  options = {},
  onClick
) {
  const {
    baseColor = 0x4caf50,
    hoverColor = 0x66bb6a,
    strokeColor = 0x2e7d32,
    strokeWidth = 3,
    fontSize = '28px',
    fontColor = '#FFF',
    fontStyle = 'bold',
  } = options;
  const btn = scene.add.rectangle(x, y, width, height, baseColor);
  btn.setStrokeStyle(strokeWidth, strokeColor);
  btn.setInteractive({ useHandCursor: true });
  scene.add
    .text(x, y, label, { fontSize, color: fontColor, fontStyle })
    .setOrigin(0.5);
  btn.on('pointerover', () => btn.setFillStyle(hoverColor));
  btn.on('pointerout', () => btn.setFillStyle(baseColor));
  btn.on('pointerdown', () => {
    if (onClick) onClick();
  });
  return btn;
}

// for creating a panel background
export function createPanel(
  scene,
  x,
  y,
  width,
  height,
  {
    fillColor = 0xffffff,
    alpha = 0.95,
    strokeColor = 0x333333,
    strokeWidth = 4,
  } = {}
) {
  const panel = scene.add.rectangle(x, y, width, height, fillColor, alpha);
  panel.setStrokeStyle(strokeWidth, strokeColor);
  return panel;
}

// for adding a row with left and right aligned text
export function addValueRow(
  scene,
  y,
  leftText,
  rightText,
  {
    fontSize = '26px',
    boldRight = true,
    leftStyle = {},
    rightStyle = {},
    leftX,
    rightX,
  } = {}
) {
  const { width } = scene.cameras.main;
  const lx = leftX !== undefined ? leftX : width / 2 - 200;
  const rx = rightX !== undefined ? rightX : width / 2 + 200;
  scene.add
    .text(lx, y, leftText, {
      fontSize,
      color: leftStyle.color || '#333',
      fontStyle: leftStyle.fontStyle || 'normal',
      ...leftStyle,
    })
    .setOrigin(0, 0.5);
  scene.add
    .text(rx, y, rightText.toString(), {
      fontSize,
      color: rightStyle.color || '#333',
      fontStyle: boldRight ? 'bold' : rightStyle.fontStyle || 'normal',
      ...rightStyle,
    })
    .setOrigin(1, 0.5);
}

// for drawing a horizontal divider line
export function drawDivider(
  scene,
  y,
  width = 700,
  color = 0x333333,
  alpha = 0.3,
  lineWidth = 2
) {
  const { width: sceneW } = scene.cameras.main;
  const half = width / 2;
  return scene.add
    .line(0, 0, sceneW / 2, y, sceneW / 2 + half, y, color, alpha)
    .setLineWidth(lineWidth);
}

// for adding centered text
export function addCenteredText(scene, y, text, style = {}) {
  const { width } = scene.cameras.main;
  return scene.add.text(width / 2, y, text, style).setOrigin(0.5);
}

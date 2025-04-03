let selectedMain = '블랙';

let optionStates = {
  crotch: true,
  zipWrist: true,
  zipAnkle: true,
  pocket: true
};

function changeMainColor(code) {
  document.getElementById('main-layer').src = `assets/main-${code}.png`;
  const nameMap = {
    blk: '블랙', chr: '차콜', slv: '실버', blu: '블루', red: '레드',
    org: '오렌지', sky: '하늘', yel: '노랑', mnt: '민트', olv: '올리브',
    pur: '퍼플', wht: '화이트', cblu: '카모블루', cred: '카모레드',
    cgrn: '카모그린', csf: '카모SF', cblk: '카모블랙'
  };
  selectedMain = nameMap[code] || code;
  updateSelectedText();
}

function toggleOption(layerId) {
  const checkboxId = layerId.replace('-layer', '-checkbox');
  const isChecked = document.getElementById(checkboxId).checked;
  const layer = document.getElementById(layerId);
  layer.style.display = isChecked ? 'block' : 'none';

  if (layerId === 'crotch-layer') optionStates.crotch = isChecked;
  if (layerId === 'zip-wrist-layer') optionStates.zipWrist = isChecked;
  if (layerId === 'zip-ankle-layer') optionStates.zipAnkle = isChecked;
  if (layerId === 'pocket-layer') optionStates.pocket = isChecked;

  updateSelectedText();
}

function updateSelectedText() {
  const target = document.getElementById('selected-color-text');
  const crotch = optionStates.crotch ? "Yes" : "No";
  const wrist = optionStates.zipWrist ? "Yes" : "No";
  const ankle = optionStates.zipAnkle ? "Yes" : "No";
  const pocket = optionStates.pocket ? "Yes" : "No";

  target.textContent = `메인: ${selectedMain} / 크로치: ${crotch} / 손목지퍼: ${wrist} / 발목지퍼: ${ankle} / 포켓: ${pocket}`;
}

function downloadCompositeImage() {
  const base = document.getElementById('base-layer');
  const main = document.getElementById('main-layer');
  const crotch = document.getElementById('crotch-layer');
  const wrist = document.getElementById('zip-wrist-layer');
  const ankle = document.getElementById('zip-ankle-layer');
  const pocket = document.getElementById('pocket-layer');

  const text = document.getElementById('selected-color-text').textContent;
  const title = document.title;

  const canvas = document.createElement('canvas');
  const width = main.naturalWidth;
  const padding = 50;
  const height = main.naturalHeight + padding * 2;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#111';
  ctx.font = '50px Pretendard, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(title, width / 2, 40);

  ctx.drawImage(base, 0, padding);
  if (main.src) ctx.drawImage(main, 0, padding);
  if (optionStates.crotch) ctx.drawImage(crotch, 0, padding);
  if (optionStates.zipWrist) ctx.drawImage(wrist, 0, padding);
  if (optionStates.zipAnkle) ctx.drawImage(ankle, 0, padding);
  if (optionStates.pocket) ctx.drawImage(pocket, 0, padding);

  ctx.fillStyle = '#111';
  ctx.font = '50px Pretendard, sans-serif';
  ctx.fillText(text, width / 2, height - 20);

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${yyyy}-${mm}-${dd}`;

  const link = document.createElement('a');
  link.download = `color-simulator-${formattedDate}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

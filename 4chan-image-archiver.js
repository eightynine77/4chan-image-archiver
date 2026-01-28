javascript:(function(){
  const divs = document.querySelectorAll('div.fileText');
  let urls = [];

  divs.forEach(div => {
    const txt = div.textContent || '';
    if (txt.includes('File:')) {
      const a = div.querySelector('a[href]');
      if (a) {
        const href = a.href.trim();
        if (/^https?:\/\//i.test(href)) {
          urls.push(href);
        }
      }
    }
  });

  if (urls.length === 0) {
    alert('No valid image links found.');
    return;
  }

  const overlay = document.createElement('div');
  Object.assign(overlay.style, {
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
    background: 'rgba(0,0,0,0.8)', color: '#fff', zIndex: 999999,
    padding: '20px', boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif'
  });

  const ta = document.createElement('textarea');
  ta.value = urls.join('\n');
  Object.assign(ta.style, {
    width: '100%', height: '60%', marginBottom: '10px',
    fontSize: '14px'
  });
  
  const btnClear = document.createElement('button');
  btnClear.textContent = 'Clear';
  Object.assign(btnClear.style, {
    marginRight: '10px', padding: '10px', fontSize: '14px'
  });
  btnClear.onclick = () => { ta.value = ''; };

  const btnArchive = document.createElement('button');
  btnArchive.textContent = 'Archive All';
  Object.assign(btnArchive.style, {
    padding: '10px', fontSize: '14px'
  });
  
btnArchive.onclick = () => {
  const lines = ta.value
    .split('\n')
    .map(l => l.trim())
    .filter(l => /^https?:\/\//i.test(l));

  if (lines.length === 0) {
    alert('No valid links to archive!');
    return;
  }

  lines.forEach(link => {
    const target =
      'https://archive.ph/submit/?url=' + encodeURIComponent(link);
    window.open(target, '_blank');
  });
};

  const btnClose = document.createElement('button');
  btnClose.textContent = 'Close';
  Object.assign(btnClose.style, {
    marginLeft: '10px', padding: '10px', fontSize: '14px'
  });
  btnClose.onclick = () => document.body.removeChild(overlay);
  overlay.appendChild(ta);
  overlay.appendChild(btnClear);
  overlay.appendChild(btnArchive);
  overlay.appendChild(btnClose);
  document.body.appendChild(overlay);
})();

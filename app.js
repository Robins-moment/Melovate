/* ---- core/namespace.js ---- */
/* One global object holds the whole app, so files can be plain <script> tags
   (no build step, works on GitHub Pages and by double-clicking index.html). */
window.Mel = { data: {}, core: {}, views: {} };

/* ---- data/notes.js ---- */
/* Open-string MIDI numbers for standard tuning, string 6 (low E) to string 1 (high E). */
Mel.data.notes = {
  OPEN: [40, 45, 50, 55, 59, 64],
  NAMES: ['C','C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B']
};

/* ---- data/chords.js ---- */
/* Each chord: [frets, fingers, barre?]. Strings run 6 (low E) to 1 (high E).
   x = muted, 0 = open. barre = [fret, firstStringIndex]; it runs to the high E string. */
(() => {
  const RAW = {
    C:['x32010','032010'], D:['xx0232','000132'], E:['022100','023100'], G:['320003','210003'], A:['x02220','001230'],
    Am:['x02210','002310'], Em:['022000','023000'], Dm:['xx0231','000231'],
    A7:['x02020','002030'], D7:['xx0212','000213'], E7:['020100','020100'], G7:['320001','320001'], C7:['x32310','032410'],
    B7:['x21202','021304'], Am7:['x02010','002010'], Em7:['020000','020000'], Cmaj7:['x32000','032000'],
    Fmaj7:['xx3210','003210'], Dmaj7:['xx0222','000123'],
    Dsus2:['xx0230','000130'], Dsus4:['xx0233','000134'], Asus2:['x02200','001200'], Asus4:['x02230','001230'], Esus4:['022200','023400'],
    F:['133211','134211',[1,0]], Bb:['x13331','012341',[1,1]], B:['x24442','012341',[2,1]], Fm:['133111','134111',[1,0]],
    Bm:['x24432','013421',[2,1]], Cm:['x35543','013421',[3,1]], Gm:['355333','134111',[3,0]], 'F#m':['244222','134111',[2,0]],
    E5:['022xxx','012000'], A5:['x022xx','001200'], D5:['xx023x','000120'], G5:['355xxx','134000'], C5:['x355xx','013400']
  };
  const shapes = {};
  for (const k in RAW) {
    const [f, g, b] = RAW[k];
    shapes[k] = { f: [...f].map(x => x === 'x' ? -1 : +x), n: [...g].map(Number), b };
  }
  Mel.data.chords = {
    shapes,
    groups: [
      ['Open chords: major', ['C','D','E','G','A']],
      ['Open chords: minor', ['Am','Em','Dm']],
      ['Seventh chords (jazzy, bluesy, soulful)', ['A7','D7','E7','G7','C7','B7','Am7','Em7','Cmaj7','Fmaj7','Dmaj7']],
      ['Suspended chords (open and dreamy)', ['Dsus2','Dsus4','Asus2','Asus4','Esus4']],
      ['Barre chords: lay your index finger flat across the strings', ['F','Bb','B','Fm','Bm','Cm','Gm','F#m']],
      ['Power chords (rock and metal)', ['E5','A5','D5','G5','C5']]
    ],
    /* Colours + plain-English names used on the fretboard legend: "pink = E minor" */
    colors: {
      Em:['#FF2E93','pink','E minor'], Am:['#7B2FF7','purple','A minor'], C:['#FFC400','yellow','C major'],
      G:['#00B8D9','sky blue','G major'], D:['#FF8A1F','orange','D major'], A:['#2BBE6A','green','A major'],
      E:['#2F6BFF','blue','E major'], Dm:['#8A8A99','grey','D minor']
    }
  };
})();

/* ---- data/strumming.js ---- */
/* 8 steps = eighth notes: 1 & 2 & 3 & 4 &. D = down, U = up, '' = rest. */
Mel.data.strumming = [
  { name: 'Steady downs', steps: ['D','','D','','D','','D',''] },
  { name: 'Folk strum',   steps: ['D','','D','U','','U','D','U'] },
  { name: 'Easy ballad',  steps: ['D','','','U','D','U','D','U'] }
];

/* ---- data/lessons.js ---- */
/* Each lesson: title, body, and which section to open (go) with a button label. */
Mel.data.lessons = [
  { title:'Meet your guitar', go:'frets', label:'Explore the fretboard',
    body:'Your guitar has six strings. From the thickest (closest to your face) to the thinnest they are E, A, D, G, B, E. A handy phrase: “Eddie Ate Dynamite, Good Bye Eddie.” The metal bars along the neck are frets. Press a string just behind a fret and the note gets higher.' },
  { title:'Hold it and hold the pick', go:'strum', label:'See pick and finger technique',
    body:'Sit up tall with the guitar resting on your leg. Pinch the plectrum (pick) between your thumb and the side of your bent index finger, with only the tip showing. Hold it firm but relaxed, like holding a small bird. Rest your fretting hand’s thumb behind the neck.' },
  { title:'Your first notes', go:'frets', label:'Tap the notes',
    body:'Pluck each open string slowly from thickest to thinnest and name it out loud. Then try the first fret, second fret and third fret on any string. Press with your fingertip, close to the fret, not on top of it.' },
  { title:'Your first two chords', go:'chords', label:'Open the chord library',
    body:'Em and Am are the friendliest chords. Em needs just two fingers. Am uses three. Place your fingers as in the diagrams, strum all strings slowly, and check each string rings clearly. Switch between them four times, slowly.' },
  { title:'Strumming with a pick', go:'strum', label:'Practise a pattern',
    body:'Start with four down strums per bar, counting “1, 2, 3, 4”. Move from your elbow and wrist, not your fingers. Once that is steady, add up strokes on the “and” beats to get the classic folk pattern.' },
  { title:'Strumming with your fingers', go:'strum', label:'See finger technique',
    body:'Brush down across the strings with the nails of your fingers, and back up with your thumb or the pad of your index finger. Keep your hand loose. Fingerpicking works too: thumb plays the thick strings, index, middle and ring fingers play the thin ones.' },
  { title:'Play a real song', go:'songs', label:'Open the song',
    body:'Time to put it together! Play “Amazing Grace” with the chords G, C, D and Em. Go slowly and change chords on the highlighted words. It is fine to pause between chords until your fingers know the way.' }
];

/* ---- data/songs.js ---- */
/* SONGS
   Copyrighted songs: chords, sections, riffs and structure ONLY. Never add their lyrics.
   Public-domain songs may include lyrics in l (lines with [Chord] markers).
   Fields: t title, a artist, g genre, c chords used, s sections, m riff/map lines (no chords),
           capo, strum (suggested pattern name), n note, l lyrics (public domain only).
   s = [{n:'Verse', b:['G','Am','C','G'], x:2}]  each entry in b is one box = 4 beats.
   Put two chords in one box with a space ('G D7') = 2 beats each. x = times to repeat. */
Mel.data.genres = ['All','Pop','Disco','Rock','Pop rock','K-pop style','Heavy metal','Classic & folk'];
Mel.data.songs = [
 {t:'Massachusetts',a:'Bee Gees',g:'Pop',c:['G','Am','C','D','D7'],strum:'Folk strum',
  s:[{n:'Main part',b:['G','Am','C','G'],x:2},{n:'Closing line',b:['C','G','D','G D7']}],
  n:'Key of G, no capo. Play the main part twice, then the closing line. Chord order is simplified for learners.'},
 {t:'Stayin’ Alive',a:'Bee Gees',g:'Disco',c:['Em'],capo:1,strum:'Steady downs',
  s:[{n:'Verse groove',b:['Em','Em','Em','Em']}],
  n:'The record is in F minor, so put a capo on fret 1 and play Em shapes. The chorus uses more chords, so come back once you know your barre chords.'},
 {t:'Karma Chameleon',a:'Culture Club',g:'Pop',c:['G','D','Em','Am','C'],capo:3,strum:'Folk strum',
  s:[{n:'Verse (first half)',b:['G','D','G','Em','D']},{n:'Verse (second half)',b:['G','D','C','Em','D']},{n:'Chorus',b:['G','D','Em','Am','G','D']}],
  n:'Easy key of G. Capo on fret 3 to match the record, which is in B♭.'},
 {t:'Living Next Door to Alice',a:'Smokie',g:'Pop rock',c:['G','C','D'],capo:2,strum:'Folk strum',
  s:[{n:'Verse',b:['G','C','D','G']},{n:'Chorus',b:['D','C','D','G']}],
  n:'Easy key of G. Capo on fret 2 to match the record, which is in A.'},
 {t:'Stand By Me',a:'Ben E. King',g:'Pop',c:['G','Em','C','D'],capo:2,strum:'Steady downs',
  s:[{n:'Main loop',b:['G','Em','C','D'],x:4}],n:'Capo on fret 2 to match the record, which is in A.'},
 {t:'Riptide',a:'Vance Joy',g:'Pop',c:['Am','G','C'],strum:'Folk strum',
  s:[{n:'Main loop',b:['Am','G','C','C'],x:4}],n:'Try a bouncy folk strum.'},
 {t:'Knockin’ on Heaven’s Door',a:'Bob Dylan',g:'Rock',c:['G','D','Am','C'],strum:'Steady downs',
  s:[{n:'Loop 1',b:['G','D','Am','Am']},{n:'Loop 2',b:['G','D','C','C']}],n:'Slow and easy, one strum per beat.'},
 {t:'Sweet Home Alabama',a:'Lynyrd Skynyrd',g:'Rock',c:['D','C','G'],strum:'Folk strum',
  s:[{n:'Main loop',b:['D','C','G','G'],x:4}],n:'Just three chords, with a swinging rhythm.'},
 {t:'Highway to Hell',a:'AC/DC',g:'Rock',c:['A','D','G'],strum:'Steady downs',
  s:[{n:'Main riff',b:['A','D','G','A'],x:2}],n:'Strum hard and punchy.'},
 {t:'Seven Nation Army',a:'The White Stripes',g:'Rock',c:[],m:['A string only, frets: 7 – 7 – 10 – 7 – 5 – 3 – 2'],n:'One famous riff on a single string. Go slowly.'},
 {t:'Smoke on the Water',a:'Deep Purple',g:'Heavy metal',c:[],m:['D and G strings together: 0–3–5, 0–3–6–5, 0–3–5, 3–0'],n:'Play two strings at once, with a pick.'},
 {t:'Metal power practice',a:'Our own practice riff',g:'Heavy metal',c:['E5'],m:['Low E string, palm muted: 0–0–3–0–0–5–0–0–3–0'],n:'Rest the side of your picking hand on the strings by the bridge for that chunky sound.'},
 {t:'Pop and K-pop style loop',a:'Not one song: a loop used everywhere',g:'K-pop style',c:['G','D','Em','C'],strum:'Easy ballad',
  s:[{n:'Main loop',b:['G','D','Em','C'],x:4}],n:'Many pop and K-pop songs are built on loops like this.'},
 {t:'Amazing Grace',g:'Classic & folk',c:['G','C','D','Em'],l:['[G]Amazing grace, how [C]sweet the [G]sound,','That saved a [Em]wretch like [D]me.','I [G]once was lost, but [C]now am [G]found,','Was [Em]blind but [D]now I [G]see.']},
 {t:'When the Saints Go Marching In',g:'Classic & folk',c:['G','C','D'],l:['Oh, when the [G]saints go marching [G]in,','Oh, when the saints go [D]marching in,','Oh [G]Lord, I want to be in that [C]number,','When the [G]saints go [D]marching [G]in.']},
 {t:'Happy Birthday',g:'Classic & folk',c:['G','C','D'],l:['[G]Happy birthday to [D]you,','Happy birthday to [D]you,','Happy [G]birthday dear [C]friend,','Happy [G]birthday to [D]you [G]']}
];

/* ---- core/store.js ---- */
/* Saves progress (completed lessons, certificate name) in the browser. */
Mel.core.store = (() => {
  const KEY = 'melovate';
  const state = { done: [], name: '' };
  try { Object.assign(state, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
  return { state, save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} } };
})();

/* ---- core/audio.js ---- */
/* Tiny Web Audio synth: single notes and strummed chords. */
Mel.core.audio = (() => {
  let ac;
  const { OPEN } = Mel.data.notes;
  function tone(midi, delay = 0) {
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime + delay;
      o.type = 'triangle';
      o.frequency.value = 440 * 2 ** ((midi - 69) / 12);
      g.gain.setValueAtTime(.0001, t);
      g.gain.exponentialRampToValueAtTime(.25, t + .01);
      g.gain.exponentialRampToValueAtTime(.0001, t + 1.3);
      o.connect(g); g.connect(ac.destination);
      o.start(t); o.stop(t + 1.4);
    } catch (e) {}
  }
  function strum(name, dir = 'D') {
    const f = Mel.data.chords.shapes[name].f;
    const order = dir === 'U' ? [5,4,3,2,1,0] : [0,1,2,3,4,5];
    order.filter(i => f[i] >= 0).forEach((i, k) => tone(OPEN[i] + f[i], k * .025));
  }
  return { tone, strum };
})();

/* ---- core/chord-diagram.js ---- */
/* Draws a chord diagram as SVG. Handles open chords, barre chords and higher positions ("3fr"). */
Mel.core.chordDiagram = function (name) {
  const c = Mel.data.chords.shapes[name];
  const used = c.f.filter(x => x > 0);
  const base = Math.max(0, ...used) > 4 ? Math.min(...used) : 1;
  let s = `<svg viewBox="0 0 120 140" width="110" role="img" aria-label="${name} chord diagram">`;
  s += base === 1
    ? '<rect x="18" y="29" width="80" height="3.5" fill="currentColor"/>'
    : `<text x="102" y="52" style="font-size:10px">${base}fr</text>`;
  for (let i = 0; i < 6; i++) s += `<line x1="${18+i*16}" y1="30" x2="${18+i*16}" y2="118" stroke="currentColor" stroke-width="1.2"/>`;
  for (let r = 1; r <= 4; r++) s += `<line x1="18" y1="${30+r*22}" x2="98" y2="${30+r*22}" stroke="currentColor" stroke-width="1" opacity=".5"/>`;
  if (c.b) s += `<rect x="${12+c.b[1]*16}" y="${30+(c.b[0]-base+1)*22-19}" width="${(5-c.b[1])*16+12}" height="16" rx="8" fill="var(--pink)"/>`;
  c.f.forEach((f, i) => {
    const x = 18 + i * 16;
    if (f === -1) s += `<text x="${x}" y="20" text-anchor="middle">×</text>`;
    else if (f === 0) s += `<circle cx="${x}" cy="16" r="4" fill="none" stroke="currentColor"/>`;
    else {
      const y = 30 + (f - base + 1) * 22 - 11;
      s += `<circle cx="${x}" cy="${y}" r="8" fill="var(--pink)"/><text x="${x}" y="${y+4}" text-anchor="middle" style="fill:#fff">${c.n[i]}</text>`;
    }
  });
  return s + '</svg>';
};

/* ---- core/ui.js ---- */
/* Small shared UI helpers. */
Mel.core.ui = {
  /* Placeholder card for sections that are planned but not built yet. */
  soon(title, intro, todo) {
    return `<div class="card soon"><h2>${title}</h2><p>${intro}</p><p class="sub">Coming soon:</p>
      <p>${todo.map(t => `• ${t}`).join('<br>')}</p></div>`;
  },
  /* Turns "Oh [G]Lord" lines into chords-over-words markup. */
  lyrics(lines) {
    return lines.map(l => l.split(/(\[[^\]]+\])/).reduce((o, p) => {
      const m = p.match(/^\[(.+)\]$/);
      if (m) o.push([m[1], '']);
      else if (p) { if (o.length && !o[o.length-1][1]) o[o.length-1][1] = p; else o.push(['', p]); }
      return o;
    }, []).map(([c, t]) => `<span class="seg"><b>${c}</b>${t || ' '}</span>`).join('')).join('<br>');
  }
};

/* ---- views/lessons.js ---- */
Mel.views.lessons = (() => {
  const { state, save } = Mel.core.store, L = Mel.data.lessons;
  return {
    render() {
      const n = state.done.length, next = L.findIndex((_, i) => !state.done.includes(i));
      let h = `<div class="card"><h2>${n === L.length ? 'Course complete!' : 'Today’s lesson'}</h2>
        <div class="bar"><i style="width:${n / L.length * 100}%"></i></div>
        <p class="sub">${n} of ${L.length} lessons done${n && n < L.length ? '. Keep your streak going!' : ''}</p></div>`;
      L.forEach((l, i) => {
        const d = state.done.includes(i);
        h += `<div class="card lesson ${d ? 'done' : ''} ${i === next ? 'today' : ''}"><div class="dot">${d ? '✓' : i + 1}</div>
          <div><h3>${l.title}</h3><p>${l.body}</p><div class="row">
          <button class="btn alt" data-go="${l.go}">${l.label}</button>
          <button class="btn" data-toggle="${i}">${d ? 'Undo' : 'Mark complete'}</button></div></div></div>`;
      });
      if (n === L.length) h += `<div class="card cert"><h2>Certificate of Completion</h2><p>This proudly certifies that</p>
        <input id="nm" placeholder="Type your name" aria-label="Your name" value="${(state.name || '').replace(/"/g, '&quot;')}">
        <p class="nm" id="cn">${state.name || 'Your name'}</p>
        <p>has finished the 7-day Beginner Guitar Course: strings, notes, chords, strumming and a real song. Well played! 🎸</p>
        <p class="sub">${new Date().toLocaleDateString(undefined, { year:'numeric', month:'long', day:'numeric' })}</p></div>`;
      return h;
    },
    mount(el) {
      el.querySelectorAll('[data-go]').forEach(b => b.onclick = () => Mel.go(b.dataset.go));
      el.querySelectorAll('[data-toggle]').forEach(b => b.onclick = () => {
        const i = +b.dataset.toggle, k = state.done.indexOf(i);
        k < 0 ? state.done.push(i) : state.done.splice(k, 1);
        save(); Mel.refresh();
      });
      const nm = el.querySelector('#nm');
      if (nm) nm.oninput = () => { state.name = nm.value; save(); el.querySelector('#cn').textContent = nm.value || 'Your name'; };
    }
  };
})();

/* ---- views/chords.js ---- */
Mel.views.chords = {
  render() {
    const { groups } = Mel.data.chords, dia = Mel.core.chordDiagram;
    return `<div class="card"><h2>Chord library</h2>
      <p class="sub">Red dots show where to press, with the finger number inside (1 is your index finger). × means skip that string, ○ means play it open. A bar means a barre: press all those strings with one finger. “3fr” means the diagram starts at fret 3. Tap a chord to hear it.</p>
      <p>Learn the open chords first, then barre chords. Together these cover almost every pop, rock, folk, disco, metal and K-pop song.</p></div>`
      + groups.map(([t, list]) => `<h3 class="group-title">${t}</h3><div class="chords">${
        list.map(k => `<button class="card" data-chord="${k}"><h3>${k}</h3>${dia(k)}</button>`).join('')}</div>`).join('');
  },
  mount(el) { el.querySelectorAll('[data-chord]').forEach(b => b.onclick = () => Mel.core.audio.strum(b.dataset.chord)); }
};

/* ---- views/strumming.js ---- */
Mel.views.strum = (() => {
  let pat = 1, chord = 'Em', timer;
  const P = Mel.data.strumming, labels = ['1','&','2','&','3','&','4','&'];
  return {
    render() {
      return `<div class="card"><h2>Strumming patterns</h2>
        <p class="sub">↓ is a down strum, ↑ is an up strum. Pick a chord and a pattern, then press Play.</p>
        <div class="row"><select id="sc" aria-label="Chord">${Object.keys(Mel.data.chords.shapes).map(k => `<option ${k === chord ? 'selected' : ''}>${k}</option>`).join('')}</select>
        <select id="sp" aria-label="Pattern">${P.map((p, i) => `<option value="${i}" ${i === pat ? 'selected' : ''}>${p.name}</option>`).join('')}</select>
        <button class="btn" id="play">Play</button></div>
        <div class="arrows" id="ar">${P[pat].steps.map((x, i) => `<div><small>${labels[i]}</small>${x === 'D' ? '↓' : x === 'U' ? '↑' : '·'}</div>`).join('')}</div></div>
        <div class="card"><h3>With a plectrum</h3><p>Hold the pick between thumb and index finger, tip showing. Swing from your wrist like turning a doorknob. Keep the motion going even on beats where you miss the strings, so your rhythm stays steady.</p></div>
        <div class="card"><h3>With your fingers</h3><p>Strumming: brush down with your fingernails (or index finger) and up with your thumb. Fingerpicking: thumb on the thick strings (E, A, D), index on G, middle on B, ring on the high E. Try thumb, index, middle, ring one after another on a chord for a gentle rolling sound.</p></div>`;
    },
    mount(el) {
      el.querySelector('#sc').onchange = e => chord = e.target.value;
      el.querySelector('#sp').onchange = e => { pat = +e.target.value; Mel.refresh(); };
      el.querySelector('#play').onclick = () => {
        clearTimeout(timer);
        const steps = P[pat].steps, cells = [...el.querySelectorAll('#ar div')], gap = 60000 / 90 / 2;
        let i = 0;
        (function step() {
          cells.forEach(c => c.classList.remove('on'));
          if (i >= 8) return;
          cells[i].classList.add('on');
          if (steps[i]) Mel.core.audio.strum(chord, steps[i]);
          i++; timer = setTimeout(step, gap);
        })();
      };
    }
  };
})();

/* ---- views/songs.js ---- */
/* Songs: a list, and a detail page per song with sections, chord boxes, play-along and lyrics. */
Mel.views.songs = (() => {
  let genre = 'All', open = null, timer = null, bpm = 80;
  const dia = Mel.core.chordDiagram;
  const stop = () => { clearTimeout(timer); timer = null; document.querySelectorAll('.cbx.on').forEach(e => e.classList.remove('on')); };

  function list() {
    const songs = Mel.data.songs.filter(s => genre === 'All' || s.g === genre);
    return `<div class="card"><h2>Songs</h2>
      <p class="sub">Tap a song to see its chords section by section. Songs with public-domain lyrics show the words with chords above them.</p>
      <div class="row" style="margin-top:10px">${Mel.data.genres.map(g => `<button class="chip" data-genre="${g}" aria-pressed="${g === genre}">${g}</button>`).join('')}</div></div>`
      + songs.map(s => `<button class="card songrow" data-song="${Mel.data.songs.indexOf(s)}"><h3>${s.t}</h3><span class="sub">${s.a ? s.a + ', ' : ''}${s.g}${s.l ? ', lyrics included' : ''}</span></button>`).join('');
  }

  function detail(s) {
    const strum = s.strum ? Mel.data.strumming.find(p => p.name === s.strum) : null;
    const q = encodeURIComponent(`${s.t} ${s.a || ''} lyrics`);
    let h = `<button class="btn alt" data-back>← All songs</button>
      <div class="card" style="margin-top:12px"><h2>${s.t}</h2><p class="sub">${s.a ? s.a + ', ' : ''}${s.g}</p>
      ${s.capo ? `<p><b>Capo:</b> fret ${s.capo}</p>` : ''}${strum ? `<p><b>Try this strum:</b> ${strum.name} (see the Strumming tab)</p>` : ''}${s.n ? `<p>${s.n}</p>` : ''}</div>`;
    if (s.c.length) h += `<div class="card"><h3>Chords you’ll need</h3><div class="chords" style="grid-template-columns:repeat(auto-fill,minmax(100px,1fr))">${s.c.map(c => `<div class="card"><h3>${c}</h3>${dia(c)}</div>`).join('')}</div></div>`;
    if (s.s) {
      h += `<div class="card"><h3>Play it section by section</h3>
        <p class="sub">Each box is one chord change, 4 beats long. Two chords in one box share the 4 beats. Chord order is simplified for learners.</p>
        <div class="row" style="margin:10px 0"><button class="btn" id="play">▶ Play along</button><button class="btn alt" id="stop">Stop</button>
        <select id="bpm" aria-label="Speed"><option value="60" ${bpm === 60 ? 'selected' : ''}>Slow</option><option value="80" ${bpm === 80 ? 'selected' : ''}>Medium</option><option value="100" ${bpm === 100 ? 'selected' : ''}>Faster</option></select></div>`;
      s.s.forEach((sec, si) => {
        h += `<h3 class="group-title">${sec.n}${sec.x ? `, play ${sec.x} times` : ''}</h3><div class="cboxes">${sec.b.map((b, bi) => `<div class="cbx" id="bx-${si}-${bi}">${b}</div>`).join('')}</div>`;
      });
      h += '</div>';
    }
    if (s.m) h += `<div class="card"><h3>The riff</h3>${s.m.map(x => `<p class="map">${x}</p>`).join('')}</div>`;
    if (s.l) h += `<div class="card"><h3>Lyrics and chords</h3><div class="song">${Mel.core.ui.lyrics(s.l)}</div></div>`;
    else h += `<div class="card"><h3>Lyrics</h3><p>This song is copyrighted, so we can’t show the words here. Open the lyrics in a new tab, then play the chords above while you read along.</p>
      <a class="btn" style="display:inline-block;text-decoration:none" target="_blank" rel="noopener" href="https://www.google.com/search?q=${q}">Find the lyrics</a></div>`;
    return h;
  }

  function play(el, s) {
    stop();
    const beats = [];
    s.s.forEach((sec, si) => { for (let r = 0; r < (sec.x || 1); r++) sec.b.forEach((b, bi) => {
      const chords = b.split(' '), per = 4 / chords.length;
      chords.forEach(c => { for (let k = 0; k < per; k++) beats.push({ id: `bx-${si}-${bi}`, c, first: !k && c === chords[0] }); });
    }); });
    let i = 0;
    (function tick() {
      if (i >= beats.length) return stop();
      const b = beats[i++], box = document.getElementById(b.id);
      if (!box) return stop();
      if (b.first) { document.querySelectorAll('.cbx.on').forEach(e => e.classList.remove('on')); box.classList.add('on'); box.scrollIntoView({ block: 'nearest' }); }
      if (Mel.data.chords.shapes[b.c]) Mel.core.audio.strum(b.c);
      timer = setTimeout(tick, 60000 / bpm);
    })();
  }

  return {
    render() { stop(); return open === null ? list() : detail(Mel.data.songs[open]); },
    mount(el) {
      el.querySelectorAll('[data-genre]').forEach(b => b.onclick = () => { genre = b.dataset.genre; Mel.refresh(); });
      el.querySelectorAll('[data-song]').forEach(b => b.onclick = () => { open = +b.dataset.song; Mel.refresh(); scrollTo(0, 0); });
      const back = el.querySelector('[data-back]'); if (back) back.onclick = () => { open = null; Mel.refresh(); };
      const p = el.querySelector('#play');
      if (p) { p.onclick = () => play(el, Mel.data.songs[open]); el.querySelector('#stop').onclick = stop; el.querySelector('#bpm').onchange = e => bpm = +e.target.value; }
    }
  };
})();

/* ---- views/fretboard.js ---- */
Mel.views.frets = (() => {
  let shown = ['Em', 'Am', 'C'];
  const { OPEN, NAMES } = Mel.data.notes, CC = Mel.data.chords.colors, CH = Mel.data.chords.shapes;
  return {
    render() {
      let h = `<div class="card"><h2>Fretboard</h2>
        <p class="sub">Tap a colour to show or hide a chord. Each coloured dot shows where that chord’s fingers go. Tap any square to hear its note.</p>
        <div class="row" style="margin-top:10px">${Object.keys(CC).map(k => `<button class="chip" data-chord="${k}" aria-pressed="${shown.includes(k)}"><i style="background:${CC[k][0]}"></i>${CC[k][1]} = ${CC[k][2]}</button>`).join('')}</div>
        <div class="fb"><span></span>${['Open','1','2','3','4','5'].map(x => `<span>${x}</span>`).join('')}`;
      OPEN.forEach((m, i) => {
        h += `<span>${6 - i}</span>`;
        for (let f = 0; f <= 5; f++) {
          const dots = shown.filter(k => CH[k].f[i] === f).map(k => `<i style="background:${CC[k][0]}"></i>`).join('');
          h += `<button class="${f ? '' : 'open'}" data-midi="${m + f}"><div class="ds">${dots}</div>${NAMES[(m + f) % 12]}</button>`;
        }
      });
      return h + '</div></div>';
    },
    mount(el) {
      el.querySelectorAll('.chip').forEach(b => b.onclick = () => {
        const k = b.dataset.chord, i = shown.indexOf(k);
        i < 0 ? shown.push(k) : shown.splice(i, 1); Mel.refresh();
      });
      el.querySelectorAll('.fb button').forEach(b => b.onclick = () => {
        el.querySelectorAll('.fb .hit').forEach(x => x.classList.remove('hit'));
        b.classList.add('hit'); Mel.core.audio.tone(+b.dataset.midi);
      });
    }
  };
})();

/* ---- views/theory.js ---- */
/* TODO: music theory lessons (notes, scales, intervals, keys, chord building). */
Mel.views.theory = { render: () => Mel.core.ui.soon('Music theory',
  'Understand why songs work, in plain language.',
  ['Notes, scales and keys', 'How chords are built', 'Reading chord progressions (I – IV – V)', 'Quizzes after each lesson']) };

/* ---- views/sheet.js ---- */
/* TODO: sheet music and tab writer. */
Mel.views.sheet = { render: () => Mel.core.ui.soon('Sheet music and tabs',
  'Write your own sheet music and guitar tabs.',
  ['Tab editor for guitar', 'Staff notation editor', 'Play back what you write', 'Save and share your pieces']) };

/* ---- views/melody.js ---- */
/* TODO: melody maker and more instruments. */
Mel.views.melody = { render: () => Mel.core.ui.soon('Create melodies',
  'Compose your own tunes and explore other instruments.',
  ['Tap-to-compose melody maker', 'Piano and ukulele modules', 'Practice streaks and badges']) };

/* ---- app.js ---- */
/* Boot + simple tab router. To add a section: create js/views/<name>.js,
   add a <script> tag in index.html, then add it to TABS below. */
(() => {
  const TABS = [['lessons','Lessons'],['chords','Chords'],['strum','Strumming'],['songs','Songs'],
                ['frets','Fretboard'],['theory','Theory'],['sheet','Sheet music'],['melody','Melodies']];
  let tab = 'lessons';
  const nav = document.getElementById('nav'), app = document.getElementById('app');

  function renderNav() {
    nav.innerHTML = TABS.map(([k, l]) => `<button data-tab="${k}" ${k === tab ? 'aria-current="true"' : ''}>${l}</button>`).join('');
    nav.querySelectorAll('button').forEach(b => b.onclick = () => Mel.go(b.dataset.tab));
  }
  function render() {
    const view = Mel.views[tab];
    app.innerHTML = view.render();
    if (view.mount) view.mount(app);
  }
  Mel.go = t => { tab = t; renderNav(); render(); scrollTo(0, 0); };
  Mel.refresh = render;
  renderNav(); render();
})();

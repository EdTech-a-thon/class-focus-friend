// Shared ink, wood and cream keep every reward in the same illustrated world.
export const roomArtwork = (id, type, color, icon) => {
  const ink = '#36554c';
  const wood = '#b9825d';
  const cream = '#fff5df';
  let height = 180;
  const rect = (x,y,w,h,fill,r=6) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/>`;
  const legs = `<path d="M30 145v22m180-22v22" stroke="${wood}" stroke-width="10"/>`;
  const books = [0,1,2,3,4,5].map((n)=>rect(30+n*29,42+(n%2)*8,20,51-(n%2)*8,['#83a991','#e5ad68','#89afc4','#d79283'][n%4],2)).join('');
  let body;
  if (['bookcase','book-nook'].includes(id)) {
    height = 240;
    body = rect(16,8,208,220,wood)+rect(25,18,190,198,'#795c46',2)+books+`<path d="M25 99h190M25 177h190" stroke="${wood}" stroke-width="10"/><g transform="translate(0 78)">${books}</g>`+rect(30,191,78,19,cream)+rect(118,191,83,19,color);
  } else if (id === 'cozy-bed') {
    body = rect(17,18,206,116,wood,14)+rect(27,27,186,75,'#d9c5a3',10)+rect(24,64,192,92,color,12)+rect(34,46,77,33,cream,12)+rect(128,46,77,33,cream,12)+`<path d="M26 92h188M30 156v15m180-15v15"/><path d="M39 104h162" stroke="${cream}" opacity=".55"/>`;
  } else if (id === 'bubble-bath') {
    height = 140;
    body = `<path d="M190 47V20q0-13 13-13t13 13" fill="none" stroke="#72968d" stroke-width="6"/>
      <path d="M22 54h196l-17 54q-4 12-22 12H62q-21 0-25-12z" fill="${cream}"/>
      <path d="M50 120l-7 13m149-13 7 13" stroke="${wood}" stroke-width="7"/>
      <ellipse cx="120" cy="54" rx="100" ry="20" fill="${cream}"/>
      <ellipse cx="120" cy="54" rx="87" ry="13" fill="#a9d5d4" stroke="#88b8b6"/>
      <g fill="#f6fcf7" stroke="#aacdc3" stroke-width="1.5"><circle cx="67" cy="52" r="7"/><circle cx="78" cy="48" r="9"/><circle cx="89" cy="54" r="6"/><circle cx="55" cy="55" r="4"/></g>
      <path d="M40 66q80 24 160 0" stroke="#d8e6db" fill="none"/>
      <path d="M62 95q58 15 113 0" stroke="#d8e6db" fill="none"/>`;
  } else if (id === 'office-desk') {
    height = 150;
    body = `<path d="M24 37v104m192-104v104" stroke="${wood}" stroke-width="10"/>
      <path d="M150 36h64v94h-64z" fill="#cda47c"/>
      <path d="M157 46h50v32h-50zM157 85h50v34h-50z" fill="#e2bd92"/>
      <path d="M173 59h18m-18 39h18" stroke="#8a6b4e" stroke-width="3"/>
      <path d="m9 27 13-16h205l5 16z" fill="#dfb98c"/>
      <path d="M9 27h223v12H9z" fill="${wood}"/>`;
  } else if (id === 'dining-table') {
    height = 120;
    body = `<path d="M36 29v81m167-81v81" stroke="#99704e" stroke-width="9"/>
      <path d="M49 35v61m143-61v61" stroke="#b28a61" stroke-width="7"/>
      <path d="M13 18h214v16q-107 15-214 0z" fill="${wood}"/>
      <ellipse cx="120" cy="18" rx="107" ry="14" fill="#e3be8b"/>`;
  } else if (id === 'sunny-table') {
    height = 180;
    body = `<path d="M31 48v108m179-108v108" stroke="${wood}" stroke-width="7"/>
      <path d="M25 126h191v13H25z" fill="#c79a70"/>
      <ellipse cx="73" cy="125" rx="31" ry="5" fill="${cream}"/><path d="M44 119h57m-54-6h52" stroke="${cream}" stroke-width="4"/>
      <path d="M144 101h45v23h-45z" fill="#8cb6b0"/>
      <path d="m18 43 13-13h179l12 13v12H18z" fill="#dfb98c"/>
      <path d="M20 44h200" stroke="${wood}"/>
      <path d="M208 32V16h20" stroke="${wood}" stroke-width="6"/>
      <circle cx="32" cy="162" r="9" fill="#526c60"/><circle cx="209" cy="162" r="9" fill="#526c60"/>`;
  } else if (id === 'tea-table') {
    height = 165;
    body = `<path d="M47 81v75m147-75v75" stroke="${wood}" stroke-width="8"/>
      <ellipse cx="120" cy="88" rx="108" ry="24" fill="${wood}"/>
      <ellipse cx="120" cy="80" rx="108" ry="24" fill="#e2ba87"/>
      <ellipse cx="114" cy="76" rx="31" ry="7" fill="${cream}" stroke-width="2"/>
      <path d="M94 43h38v24q0 15-19 15T94 67z" fill="#82b4b0"/>
      <path d="M133 49q24-2 20 12-2 11-20 8" fill="none" stroke-width="4"/>
      <ellipse cx="113" cy="43" rx="19" ry="4" fill="#785943"/>
      <path d="M106 31q-7-6 0-12m12 12q-7-6 0-12" stroke="#fff5df" stroke-width="3"/>`;
  } else if (['nightstand','filing-cabinet','closet'].includes(id)) {
    height=id==='closet'?280:190;
    body=rect(23,8,194,height-28,id==='nightstand'?wood:color)+`<path d="M35 ${height-20}v13m170-13v13" stroke="${wood}" stroke-width="9"/>`;
    if(id==='closet') body+=rect(36,22,76,150,cream,4)+rect(128,22,76,150,cream,4)
      +rect(36,182,76,58,cream,4)+rect(128,182,76,58,cream,4)
      +`<path d="M120 10v242"/><path d="M106 122v26m28-26v26" stroke="${wood}" stroke-width="7"/>`;
    else body+=rect(35,22,170,60,'#fff5df')+rect(35,92,170,height-126,'#fff5df')+`<path d="M104 49h32m-32 68h32"/>`;
   } else if (id === 'desk-chair') {
    body=rect(60,8,120,86,color,20)+rect(72,22,96,58,'#dfe8f2',14)
      +`<path d="M120 94v22" stroke="${ink}" stroke-width="7"/>`
      +rect(44,112,152,28,color,13)+rect(56,118,128,14,'#dfe8f2',7)
      +`<path d="M120 140v22M74 176h92" stroke="${ink}" stroke-width="8"/>
      <path d="m120 162-44 14m44-14 44 14" stroke="${ink}" stroke-width="7"/>
      <circle cx="70" cy="182" r="9" fill="${ink}"/><circle cx="170" cy="182" r="9" fill="${ink}"/><circle cx="120" cy="186" r="9" fill="${ink}"/>`;
  } else if (id === 'comfy-chair') {
    // A single armchair, so it never reads as a second sofa.
    body=`<path d="M62 145v22m116-22v22" stroke="${wood}" stroke-width="10"/>`
      +rect(54,10,132,112,color,26)+rect(68,24,104,80,cream,18)
      +rect(48,86,144,58,color,16)+rect(36,66,28,80,color,13)+rect(176,66,28,80,color,13)
      +`<path d="M66 114h108" fill="none" opacity=".35"/><path d="M84 40h72" stroke="${color}" opacity=".5"/>`;
  } else if (id === 'sunny-sofa') {
    body=legs+rect(20,12,200,116,color,23)+rect(32,25,84,72,cream,15)+rect(124,25,84,72,cream,15)+rect(20,91,200,56,color,14)+rect(8,70,26,77,color,12)+rect(206,70,26,77,color,12)+`<path d="M39 119h162" fill="none" opacity=".4"/>`;
  } else if(type==='plant') {
    height=240;
    body=`<path d="M120 175V35m0 86L66 81m54 58 52-47" fill="none" stroke-width="6"/><path d="M119 78Q68 57 95 12q40 14 24 66M105 119Q40 125 35 66q55-1 70 53M129 135q-3-63 71-69-3 59-71 69" fill="#78a889"/><path d="M82 166h76l-10 64H92z" fill="#c98268"/>`+rect(77,163,86,15,'#dfa182');
  } else if(type==='rug') {
    height=72;
    const ring = (rx,ry,fill) => `<ellipse cx="120" cy="36" rx="${rx}" ry="${ry}" fill="${fill}"/>`;
    if(id==='rainbow-rug') {
      // Concentric arcs read as a rainbow even at thumbnail size.
      body=['#d97f8f','#e9a765','#f0d071','#86b785','#6fa3c6','#9a8ac4']
        .map((band,n)=>ring(114-n*17,30-n*4.5,band)).join('')+ring(12,3,cream);
    } else {
      body=ring(114,30,color)+`<ellipse cx="120" cy="36" rx="99" ry="22" fill="none" stroke="${cream}" stroke-width="4"/><ellipse cx="120" cy="36" rx="80" ry="15" fill="none" stroke="#83a991" stroke-width="5"/>`;
    }
    if(id==='star-rug') body+=`<path d="m120 20 7 10 18 3-14 7 3 11-14-6-14 6 3-11-14-7 18-3z" fill="${cream}" stroke="none"/>`;
  } else if(type==='curtain') {
    height=185;
    body=`<path d="M5 9h230" stroke="${wood}" stroke-width="7"/><path d="M12 14h66q0 60-35 85l20 74H12zM228 14h-66q0 60 35 85l-20 74h51z" fill="${color}"/><path d="M31 22v64m22-64-9 55m164-55v64m-22-64 9 55" fill="none" opacity=".3"/><path d="M14 101h29m154 0h29" stroke="#efc677" stroke-width="7"/>`;
  } else if(type==='lamp') {
    height=240;
    body=`<ellipse cx="120" cy="230" rx="37" ry="7" fill="#b9825d"/>
      <path d="M120 85v140" stroke="#9b7953" stroke-width="6"/>
      <path d="M78 13h84l29 81H49z" fill="#efd3a1"/>
      <ellipse cx="120" cy="94" rx="71" ry="9" fill="#fff1cd"/>
      <path d="M88 24 74 79m78-55 14 55" stroke="#d3ae78" opacity=".6"/>`;
    if(id==='moon-lamp') {
      height=180;
      body=`<ellipse cx="120" cy="168" rx="53" ry="9" fill="${wood}"/>
        <path d="M120 143v20" stroke="${wood}" stroke-width="8"/>
        <path d="M139 14a68 68 0 1 0 39 115A65 65 0 0 1 139 14z" fill="#f6dea0" stroke="#c5a16a"/>`;
    }
    if(id==='desk-lamp') {
      height=200;
      body=`<ellipse cx="120" cy="188" rx="53" ry="9" fill="#c69b61"/>
        <path d="m120 180-35-68 58-65" stroke="#6d8c7f" stroke-width="9"/>
        <circle cx="85" cy="112" r="8" fill="#e7c58e"/>
        <path d="m133 24 29 10 28 47-81-26z" fill="#87aaa0"/>
        <ellipse cx="150" cy="68" rx="43" ry="8" transform="rotate(18 150 68)" fill="#ffe9ae"/>
        <circle cx="143" cy="43" r="5" fill="#e7c58e"/>`;
    }
   } else if(id==='soft-towels') {
    height=160; body=`<path d="M10 20h220" stroke="${wood}" stroke-width="8"/>`+rect(35,14,112,132,color)+rect(137,14,64,100,cream)+`<path d="M45 125h91m11-31h44" stroke="#b77e93"/>`;
  } else if(id==='round-mirror') {
    height=240; body=`<circle cx="120" cy="120" r="105" fill="#a7cfd4" stroke="${wood}" stroke-width="9"/><path d="m63 119 69-69m-52 112 88-88" stroke="${cream}" stroke-width="9" opacity=".6"/>`;
  } else if(id==='skin-care') {
    height=190; body=rect(24,53,82,129,color)+rect(42,30,46,23,cream)+rect(132,86,87,96,'#9cbdac')+rect(139,68,73,18,cream)+rect(40,101,50,42,cream)+`<path d="M63 30V13h35" stroke-width="8"/>`;
  } else if(id==='soft-blanket') {
    height=110;
    // A blanket folded in three, each fold sitting on the one below.
    body=`<path d="M16 62q104-26 208 0v32q-104 26-208 0z" fill="${color}"/>
      <path d="M16 62q104-26 208 0v12q-104 26-208 0z" fill="#c9788c"/>
      <path d="M28 40q92-22 184 0v26q-92-24-184 0z" fill="#f4c4cb"/>
      <path d="M40 20q80-18 160 0v24q-80-20-160 0z" fill="${cream}"/>
      <path d="M72 26v22m48-27v24m48-20v22" stroke="#e6cfae" stroke-width="3"/>
      <path d="M62 48v22m58-24v24m58-22v22" stroke="#e8a9b6" stroke-width="3"/>
      <path d="M62 74v22m58-24v24m58-22v22" stroke="#fff5df" stroke-width="3" opacity=".65"/>`;
  } else if(id==='cloud-pillows') {
    height=100;
    body=`<g transform="rotate(-9 61 53)"><rect x="16" y="14" width="87" height="75" rx="17" fill="#95bfc7"/>
      <rect x="24" y="22" width="71" height="59" rx="12" stroke="#cee3df" stroke-width="2" stroke-dasharray="3 4"/>
      <path d="M38 60a10 10 0 0 1 0-20 15 15 0 0 1 28-3 11 11 0 0 1 9 23z" fill="${cream}" stroke="none"/></g>
      <g transform="rotate(8 179 53)"><rect x="137" y="14" width="87" height="75" rx="17" fill="#eac987"/>
      <rect x="145" y="22" width="71" height="59" rx="12" stroke="#fff1cf" stroke-width="2" stroke-dasharray="3 4"/></g>`;
  } else if(id==='tea-kettle') {
    height=190;
    body=`<path d="M70 65q-26-68 45-55t54 68" fill="none" stroke="${wood}" stroke-width="10"/>
      <path d="M56 73q-27 76 28 101h74q49-33 11-101z" fill="${color}"/>
      <path d="m169 101 48-44-14 65-34 27" fill="${color}"/>
      <ellipse cx="113" cy="73" rx="56" ry="12" fill="#b8d3cb"/>
      <path d="M103 62v-9h20v9" fill="${wood}"/>
      <path d="M75 100q-13 34 4 47" stroke="#c8dfd4" stroke-width="5" fill="none"/>`;
  } else if(id==='dinner-feast') {
    height=130;
    body=`<ellipse cx="120" cy="111" rx="109" ry="12" fill="${wood}"/>
      <path d="M36 67h168l-15 40H51z" fill="#cc856c"/>
      <path d="M35 79H15v16h29m160-16h21v16h-29" fill="none" stroke-width="5"/>
      <ellipse cx="120" cy="67" rx="84" ry="17" fill="#e4b563"/>
      <g fill="#85a66e" stroke="none"><ellipse cx="78" cy="64" rx="15" ry="6"/><ellipse cx="131" cy="72" rx="12" ry="5"/><ellipse cx="159" cy="63" rx="13" ry="5"/></g>
      <path d="M92 41q-10-10 0-20m28 20q-10-10 0-20m28 20q-10-10 0-20" stroke="#fff5df" stroke-width="4"/>`;
  } else if(id==='cake-stand') {
    height=200;
    body=`<path d="M120 148v35m-43 6h86" stroke="#789c8e" stroke-width="7"/>
      <ellipse cx="120" cy="144" rx="93" ry="10" fill="#b6d2be"/>
      <path d="M46 63h148v72H46z" fill="#dba2a7"/>
      <path d="M48 104h144" stroke="#fff0d6" stroke-width="9"/>
      <path d="M46 64q74-24 148 0v22q-12 14-25 0-13 16-25 0-13 16-25 0-13 16-25 0-13 16-25 0-13 12-23 0z" fill="#fff0d6"/>
      <circle cx="120" cy="48" r="12" fill="#cb7765"/><path d="m120 36 5-13" stroke="#789c8e"/>`;
  } else if(id==='wall-calendar') {
    height=220;
    body=rect(29,14,182,196,cream,4)+rect(29,14,182,40,'#91afa2',4)+
      `<path d="M68 7v22m104-22v22" stroke="${wood}" stroke-width="6"/>`+
      [0,1,2,3].map(row=>[0,1,2,3,4].map(col=>rect(46+col*31,73+row*30,16,16,row===1&&col===2?'#d99b7f':'#dbe4d5',2)).join('')).join('');
  } else if(id==='coffee-maker') {
    height=210;
    body=rect(37,15,160,182,'#69978f',12)+rect(49,30,136,44,'#b4ccc0',6)+
      `<path d="M56 96h116v74H56z" fill="#36554c"/><path d="M72 117h56v38q-28 18-56 0z" fill="${cream}"/>
      <path d="M129 124q29-3 20 16-5 8-20 4" fill="none" stroke="${cream}" stroke-width="5"/>
      <path d="M100 79v17" stroke="#b4ccc0" stroke-width="8"/>
      <path d="M51 184h132" stroke="#36554c" stroke-width="6"/><circle cx="165" cy="51" r="7" fill="#eacb87"/>`;
  } else if(id==='family-photo') {
    // A photo: two otter friends under a sunny sky.
    height=180; body=rect(12,8,216,162,wood)+rect(24,20,192,138,'#cfe6ef')
      +`<circle cx="180" cy="52" r="18" fill="#f5d472" stroke="none"/>
      <path d="M24 118h192v40H24z" fill="#9cc196" stroke="none"/>
      <path d="M24 118h192" />
      <g fill="#c08a5f"><ellipse cx="92" cy="118" rx="30" ry="34"/><circle cx="92" cy="74" r="22"/><circle cx="76" cy="56" r="9"/><circle cx="108" cy="56" r="9"/></g>
      <g fill="#a9764f"><ellipse cx="152" cy="124" rx="26" ry="28"/><circle cx="152" cy="86" r="19"/><circle cx="138" cy="70" r="8"/><circle cx="166" cy="70" r="8"/></g>
      <g fill="${ink}" stroke="none"><circle cx="85" cy="72" r="3.5"/><circle cx="99" cy="72" r="3.5"/><circle cx="146" cy="85" r="3"/><circle cx="158" cy="85" r="3"/></g>`;
  } else if(id==='art-wall') {
    // A little gallery wall of three hand-made pictures.
    height=180;
    body=rect(10,14,96,80,wood)+rect(20,24,76,60,cream)
      +`<path d="m26 78 22-28 18 18 14-14 16 24z" fill="#82a991" stroke="none"/><circle cx="78" cy="40" r="9" fill="#edc875" stroke="none"/>
      `+rect(122,8,108,70,color)+rect(132,18,88,50,cream)
      +`<path d="m140 60 16-24 14 16 18-22 20 30z" fill="#7fa9c6" stroke="none"/>
      `+rect(78,104,140,66,wood)+rect(88,114,120,46,cream)
      +`<g fill="#e08c6e" stroke="none"><circle cx="118" cy="137" r="14"/></g><g fill="#f0c56a" stroke="none"><circle cx="152" cy="137" r="14"/></g><g fill="#8bb4c3" stroke="none"><circle cx="186" cy="137" r="14"/></g>`;
  } else if(id==='wall-art') {
    // A bold abstract canvas, framed differently from the photo frames.
    height=180; body=rect(12,8,216,162,color)+rect(26,22,188,134,'#f7f1e2')
      +`<circle cx="92" cy="74" r="34" fill="#e3936f" stroke="none"/>
      <path d="M126 122h74l-37-58z" fill="#7fa9c6" stroke="none"/>
      <path d="M40 122h62v34H40z" fill="#8fb68c" stroke="none"/>
      <path d="M154 30h42v30h-42z" fill="#f0c56a" stroke="none"/>
      <path d="M26 22h188v134H26z" fill="none"/>`;
  } else if(id==='mixing-bowls') {
    height=150;
    body=`<path d="M22 58h108q-6 56-54 56T22 58z" fill="#e2a9cd"/>
      <ellipse cx="76" cy="58" rx="54" ry="13" fill="#f3d3e5"/>
      <path d="M118 30h100q-6 52-50 52T118 30z" fill="${color}"/>
      <ellipse cx="168" cy="30" rx="50" ry="12" fill="#f3d3e5"/>
      <path d="M62 112h116q-6 34-58 34t-58-34z" fill="#8fb6a6"/>
      <ellipse cx="120" cy="112" rx="58" ry="13" fill="#bcd8c8"/>
      <path d="M40 72h72m14-30h84m-146 84h74" stroke="${cream}" stroke-width="4"/>`;
  } else if(id==='cookie-jar') {
    height=170;
    body=`<path d="M46 52h148v82q0 26-74 26t-74-26z" fill="${color}"/>
      <ellipse cx="120" cy="52" rx="74" ry="18" fill="#e8c295"/>
      <path d="M50 30h140v16q0 14-70 14T50 46z" fill="#9db894"/>
      <ellipse cx="120" cy="30" rx="70" ry="16" fill="#bcd3af"/>
      <path d="M110 16h20v12h-20z" fill="${wood}"/>
      <g fill="#a8713f" stroke="none"><circle cx="86" cy="92" r="17"/><circle cx="142" cy="112" r="17"/><circle cx="104" cy="132" r="13"/></g>
      <g fill="#5b3a22" stroke="none"><circle cx="80" cy="88" r="3"/><circle cx="92" cy="96" r="3"/><circle cx="86" cy="100" r="2.5"/><circle cx="137" cy="106" r="3"/><circle cx="148" cy="116" r="3"/><circle cx="101" cy="130" r="2.5"/></g>`;
  } else if(id==='happy-toaster') {
    height=160;
    body=`<path d="M58 78V56q0-16 16-16t16 16v22z" fill="#e6b86b"/>
      <path d="M134 72V48q0-16 16-16t16 16v24z" fill="#e6b86b"/>
      <path d="M62 62h24m52-10h24" stroke="#b98341" stroke-width="4"/>
      <path d="M24 72h192q14 0 14 16v46q0 16-16 16H26q-16 0-16-16V88q0-16 14-16z" fill="${color}"/>
      <path d="M46 84h68v10H46zM126 84h68v10h-68z" fill="#30474f"/>
      <path d="M198 116a9 9 0 1 1 0 18 9 9 0 0 1 0-18z" fill="${cream}"/>
      <circle cx="82" cy="112" r="5" fill="${ink}" stroke="none"/><circle cx="142" cy="112" r="5" fill="${ink}" stroke="none"/>
      <path d="M100 124q12 12 24 0" stroke-width="4"/>
      <g fill="#e78ba0" stroke="none" opacity=".75"><circle cx="64" cy="124" r="7"/><circle cx="160" cy="124" r="7"/></g>`;
  } else if(id==='place-settings') {
    height=110;
    body=`<ellipse cx="120" cy="58" rx="74" ry="36" fill="${cream}"/>
      <ellipse cx="120" cy="58" rx="52" ry="24" fill="${color}"/>
      <ellipse cx="120" cy="58" rx="30" ry="13" fill="#e8f1ea" stroke-width="2"/>
      <path d="M26 16v76" stroke-width="7"/><path d="M14 16v22q0 10 12 10t12-10V16" fill="none" stroke-width="5"/>
      <path d="M214 16v76" stroke-width="7"/><path d="M214 16q20 10 20 30t-20 14z" fill="#cfd9d2"/>`;
  } else if(id==='kitchen-utensils') {
    height=180;
    body=`<path d="M10 14h220" stroke="${wood}" stroke-width="9"/>
      <path d="M54 22v18m56-18v18m56-18v18" stroke-width="4"/>
      <path d="M40 40h28v44q0 16-14 16t-14-16z" fill="${color}"/><path d="M54 100v66" stroke="${wood}" stroke-width="7"/>
      <path d="M96 40h28v52q0 18-14 18t-14-18z" fill="#8fb6a6"/><path d="M110 110v56" stroke="${wood}" stroke-width="7"/>
      <path d="M110 48v40" stroke="${cream}" stroke-width="3"/>
      <path d="M152 44q28 8 28 40t-28 34z" fill="#cfd9d2"/><path d="M166 118v48" stroke="${wood}" stroke-width="7"/>
      <path d="M158 52q12 22 0 60" stroke-width="2.5"/>`;
  } else if(id==='recipe-board') {
    height=200;
    body=rect(20,16,200,168,wood,8)+rect(32,28,176,144,'#3f6152',4)
      +`<path d="M52 56h136M52 82h110M52 108h124M52 134h92" stroke="${cream}" stroke-width="5"/>
      <path d="M92 8h56v18H92z" fill="${color}"/>
      <path d="M120 8v-8" stroke-width="4"/>
      <circle cx="188" cy="150" r="14" fill="${color}"/><path d="M188 143v14" stroke="${cream}" stroke-width="3"/>`;
  } else if(id==='herb-garden') {
    height=190;
    const pot=(x,h,leaf)=>`<path d="M${x-28} ${190-h} h56 l-7 ${h-4} h-42z" fill="${color}"/>`
      +`<path d="M${x-30} ${186-h}h60v14h-60z" fill="#e0a882"/>`+leaf;
    body=pot(56,74,`<path d="M56 116q-30-6-26-40 26 2 26 40M56 116q26-10 30-42-28 0-30 42" fill="#6fa377"/><path d="M56 118V78" stroke-width="4"/>`)
      +pot(124,92,`<path d="M124 98q-24-14-16-44 22 10 16 44M124 98q22-16 18-46-22 12-18 46" fill="#86b785"/><path d="M124 100V62" stroke-width="4"/>`)
      +pot(192,70,`<path d="M192 120q-26-10-22-38 22 6 22 38M192 120q22-8 24-34-24 0-24 34" fill="#9dc48c"/><path d="M192 122V88" stroke-width="4"/>`);
  } else if(id==='toothbrush-cup') {
    height=180;
    body=`<path d="M78 74h84l-10 96H88z" fill="${color}"/>
      <ellipse cx="120" cy="74" rx="42" ry="12" fill="#f0c18e"/>
      <path d="M88 108h64" stroke="${cream}" stroke-width="5"/>
      <path d="M88 26h20v54H88z" fill="#6fa3c6"/><path d="M92 14h12v14H92z" fill="#e8f1ea"/>
      <path d="M90 12h4v-8h-4zm6 0h4v-8h-4zm6 0h4v-8h-4z" fill="#cfd9d2" stroke-width="1.5"/>
      <path d="M132 34h20v46h-20z" fill="#d9808f"/><path d="M136 22h12v14h-12z" fill="#e8f1ea"/>
      <path d="M134 20h4v-8h-4zm6 0h4v-8h-4zm6 0h4v-8h-4z" fill="#cfd9d2" stroke-width="1.5"/>`;
  } else if(id==='face-masks') {
    height=180;
    body=`<path d="M30 46h84v120H30z" fill="${color}" transform="rotate(-8 72 106)"/>
      <path d="M126 40h84v126h-84z" fill="#c9a7cf" transform="rotate(6 168 103)"/>
      <path d="M40 60h60v6H40z" fill="${cream}" transform="rotate(-8 70 63)"/>
      <path d="M136 54h60v6h-60z" fill="${cream}" transform="rotate(6 166 57)"/>
      <ellipse cx="72" cy="112" rx="26" ry="32" fill="${cream}" transform="rotate(-8 72 112)"/>
      <ellipse cx="168" cy="110" rx="26" ry="32" fill="${cream}" transform="rotate(6 168 110)"/>
      <path d="M62 106h8m4 0h8m-16 18q8 6 16 0" stroke-width="3"/>
      <path d="M158 104h8m4 0h8m-16 18q8 6 16 0" stroke-width="3"/>`;
  } else if(id==='rubber-duck') {
    height=160;
    body=`<path d="M40 140q-16-52 30-72 8-44 54-42 40 2 42 40 34 22 20 74z" fill="${color}"/>
      <path d="M124 26q34 0 36 34-18 16-40 12-22-6-20-26 4-20 24-20z" fill="#f6d979"/>
      <path d="M160 48h34l-14 12 14 12h-34z" fill="#e58c4e"/>
      <circle cx="136" cy="44" r="6" fill="${ink}" stroke="none"/>
      <circle cx="134" cy="42" r="2" fill="${cream}" stroke="none"/>
      <path d="M62 92q42-14 76 14-26 34-62 20z" fill="#f2c95c"/>
      <path d="M44 138q54 14 116 0" stroke="#d3a63f" stroke-width="3"/>`;
  } else {
    // Small objects use their actual silhouette, without a generic box or frame.
    height=220;
    body=`<svg width="240" height="220" viewBox="18 17 92 100" preserveAspectRatio="xMidYMax meet">${icon(id,color)}</svg>`;
    if(id==='toy-basket') {
      // Toys peek over the rim, so the basket reads as full rather than flat.
      body=`<circle cx="76" cy="66" r="31" fill="#bb8b62"/>
        <circle cx="52" cy="40" r="14" fill="#bb8b62"/><circle cx="100" cy="40" r="14" fill="#bb8b62"/>
        <circle cx="52" cy="40" r="6" fill="#d9a77d" stroke="none"/><circle cx="100" cy="40" r="6" fill="#d9a77d" stroke="none"/>
        <ellipse cx="76" cy="78" rx="17" ry="13" fill="#e3c39d"/>
        <circle cx="64" cy="58" r="4" fill="${ink}" stroke="none"/><circle cx="88" cy="58" r="4" fill="${ink}" stroke="none"/>
        <path d="M76 72v6m-7 6q7 6 14 0" stroke-width="3"/>
        <circle cx="152" cy="74" r="28" fill="#e9a765"/><path d="M124 74h56M152 46q18 28 0 56" stroke-width="3"/>
        <path d="M186 60h34v34h-34z" fill="#7fa9c6"/><path d="M196 72h14v14h-14z" fill="${cream}"/>
        <path d="M22 96h196l-9 26H31z" fill="#c98f63"/>
        <path d="M31 122h178l-16 84H47z" fill="${color}"/>
        <path d="M42 148h156M47 172h146" stroke="${cream}" stroke-width="4"/>
        <path d="M70 124l-6 80m52-80-2 80m52-80 4 80" stroke="${cream}" stroke-width="3" opacity=".7"/>`;
    }
    if(id==='wash-basket') body=`<path d="M45 96Q20 35 74 45q34-38 55 12 55-33 64 40" fill="${cream}"/><path d="M30 99h180l-17 103H47z" fill="${color}"/><path d="M42 126h157M47 150h148M52 174h139" stroke="${cream}"/>`;
    if(id==='record-player') {
      height=150;
      body=`<path d="m17 85 16-70h181l10 70z" fill="#7b9c90"/>
        <path d="M28 24h177l7 45H20z" fill="#adc6b6" stroke="none"/>
        <path d="M10 91h220v45H10z" fill="${wood}"/>
        <path d="m10 91 22-25h179l19 25z" fill="#e2be91"/>
        <ellipse cx="106" cy="82" rx="59" ry="15" fill="#36554c"/>
        <ellipse cx="106" cy="82" rx="39" ry="10" fill="none" stroke="#68877a" stroke-width="1.5"/>
        <ellipse cx="106" cy="82" rx="13" ry="4" fill="#e7b984"/>
        <path d="m189 74 5 18-35 4" fill="none" stroke="${cream}" stroke-width="4"/>
        <path d="M25 115h38" stroke="#815d42"/><circle cx="208" cy="115" r="5" fill="#efd5a3"/>`;
    }
  }
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 ${height}"><g fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${body}</g></svg>`)}`;
};

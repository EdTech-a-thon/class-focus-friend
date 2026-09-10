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
    body = `<path d="M185 58V25q0-24 23-17q10 4 10 15" fill="none" stroke-width="8"/><ellipse cx="116" cy="65" rx="107" ry="24" fill="#bfe3e5"/><path d="M13 65h213l-18 68q-5 20-30 20H58q-25 0-30-20z" fill="${cream}"/><path d="M43 151l-8 16m162-16 8 16" stroke-width="9"/><path d="M42 113q75 25 151 0" fill="none" stroke="#a5c6c4"/><g fill="#fffaf0"><circle cx="48" cy="56" r="15"/><circle cx="72" cy="49" r="20"/><circle cx="99" cy="57" r="12"/></g>`;
  } else if (['office-desk','dining-table','sunny-table','tea-table'].includes(id)) {
    height = 150;
    body = `<path d="M28 38v101m184-101v101" stroke="${wood}" stroke-width="13"/>`+rect(8,18,224,24,wood)+ (id==='office-desk' ? rect(152,45,63,61,'#d9ac7e')+`<path d="M153 76h61m-39-15h17m-17 30h17"/>` : `<path d="M28 112h184" stroke="${wood}" stroke-width="7"/>`);
    if(id==='tea-table') {
      height=180;
      body=`<g transform="translate(0 30)">${body}<g transform="translate(75 -45) scale(.65)">${icon('tea-kettle',color)}</g></g>`;
    }
  } else if (['nightstand','filing-cabinet','closet'].includes(id)) {
    height=id==='closet'?280:190;
    body=rect(23,8,194,height-28,id==='nightstand'?wood:color)+`<path d="M35 ${height-20}v13m170-13v13" stroke="${wood}" stroke-width="9"/>`;
    if(id==='closet') body+=`<path d="M120 10v242M103 128v20m34-20v20"/>`;
    else body+=rect(35,22,170,60,'#fff5df')+rect(35,92,170,height-126,'#fff5df')+`<path d="M104 49h32m-32 68h32"/>`;
   } else if (id === 'desk-chair') {
    body=rect(58,8,124,78,color,18)+`<path d="M120 85v39m0 15v24m-52 0h104" stroke-width="8"/>`+rect(40,115,160,25,color,12)+`<circle cx="68" cy="169" r="6" fill="${ink}"/><circle cx="172" cy="169" r="6" fill="${ink}"/>`;
  } else if (['sunny-sofa','comfy-chair'].includes(id)) {
    body=legs+rect(20,12,200,116,color,23)+rect(32,25,84,72,cream,15)+rect(124,25,84,72,cream,15)+rect(20,91,200,56,color,14)+rect(8,70,26,77,color,12)+rect(206,70,26,77,color,12)+`<path d="M39 119h162" fill="none" opacity=".4"/>`;
  } else if(type==='plant') {
    height=240;
    body=`<path d="M120 175V35m0 86L66 81m54 58 52-47" fill="none" stroke-width="6"/><path d="M119 78Q68 57 95 12q40 14 24 66M105 119Q40 125 35 66q55-1 70 53M129 135q-3-63 71-69-3 59-71 69" fill="#78a889"/><path d="M82 166h76l-10 64H92z" fill="#c98268"/>`+rect(77,163,86,15,'#dfa182');
  } else if(type==='rug') {
    height=72;
    body=`<ellipse cx="120" cy="36" rx="114" ry="30" fill="${color}"/><ellipse cx="120" cy="36" rx="99" ry="22" fill="none" stroke="${cream}" stroke-width="4"/><ellipse cx="120" cy="36" rx="80" ry="15" fill="none" stroke="#83a991" stroke-width="5"/>`;
    if(id==='star-rug') body+=`<path d="m120 20 7 10 18 3-14 7 3 11-14-6-14 6 3-11-14-7 18-3z" fill="${cream}" stroke="none"/>`;
  } else if(type==='curtain') {
    height=185;
    body=`<path d="M5 9h230" stroke="${wood}" stroke-width="7"/><path d="M12 14h66q0 60-35 85l20 74H12zM228 14h-66q0 60 35 85l-20 74h51z" fill="${color}"/><path d="M31 22v64m22-64-9 55m164-55v64m-22-64 9 55" fill="none" opacity=".3"/><path d="M14 101h29m154 0h29" stroke="#efc677" stroke-width="7"/>`;
  } else if(type==='lamp') {
    height=240;
    body=`<path d="M120 91v133m-39 4h78" stroke="${wood}" stroke-width="9"/><path d="M77 12h86l31 88H46z" fill="${color}"/><path d="M88 22 73 85m79-63 15 63" stroke="${cream}" opacity=".6"/>`;
    if(id==='moon-lamp') body=`<path d="M120 155v63m-40 9h80" stroke="${wood}" stroke-width="9"/><path d="M151 14a76 76 0 1 0 50 113A72 72 0 0 1 151 14" fill="#f3d88f"/>`;
   } else if(id==='soft-towels') {
    height=160; body=`<path d="M10 20h220" stroke="${wood}" stroke-width="8"/>`+rect(35,14,112,132,color)+rect(137,14,64,100,cream)+`<path d="M45 125h91m11-31h44" stroke="#b77e93"/>`;
  } else if(id==='round-mirror') {
    height=240; body=`<circle cx="120" cy="120" r="105" fill="#a7cfd4" stroke="${wood}" stroke-width="9"/><path d="m63 119 69-69m-52 112 88-88" stroke="${cream}" stroke-width="9" opacity=".6"/>`;
  } else if(id==='skin-care') {
    height=190; body=rect(24,53,82,129,color)+rect(42,30,46,23,cream)+rect(132,86,87,96,'#9cbdac')+rect(139,68,73,18,cream)+rect(40,101,50,42,cream)+`<path d="M63 30V13h35" stroke-width="8"/>`;
  } else if(id==='face-masks') {
    height=190; body=rect(27,15,186,164,color,12)+`<path d="M80 51q40-23 80 0v62q-40 56-80 0z" fill="${cream}"/><path d="M91 81h17m24 0h17m-41 38q12 10 24 0"/>`;
  } else if(id==='place-settings') {
    height=90; body=`<ellipse cx="120" cy="44" rx="72" ry="35" fill="${cream}"/><ellipse cx="120" cy="44" rx="49" ry="22" fill="${color}"/><path d="M20 12v65m-8-65v24h16V12m187 0v65m0-65q20 10 0 34"/>`;
  } else if(id==='soft-blanket') {
    height=90; body=rect(10,5,220,71,color,10)+`<path d="M25 19h190M25 32h190m-190 29h190M30 76v10m20-10v10m20-10v10m20-10v10m20-10v10m20-10v10m20-10v10m20-10v10m20-10v10m20-10v10" stroke="${cream}"/>`;
  } else if(id==='cloud-pillows') {
    height=100; body=`<path d="M27 81a22 22 0 0 1-2-44 32 32 0 0 1 59-12 26 26 0 0 1 42 30 20 20 0 0 1-9 26z" fill="${cream}"/>`+rect(133,18,89,68,color,20);
  } else if(['family-photo','art-wall','wall-art'].includes(id)) {
    height=180; body=rect(12,8,216,162,wood)+rect(24,20,192,138,cream)+`<circle cx="170" cy="58" r="20" fill="#edc875" stroke="none"/><path d="m32 145 56-74 46 51 31-33 44 56" fill="#82a991" stroke="none"/><path d="m32 145 76-34 101 34" fill="#8bb4c3" stroke="none"/>`;
  } else {
    // Small objects use their actual silhouette, without a generic box or frame.
    height=220;
    body=`<svg width="240" height="220" viewBox="18 17 92 100" preserveAspectRatio="xMidYMax meet">${icon(id,color)}</svg>`;
    if(['toy-basket','wash-basket'].includes(id)) body=`<circle cx="83" cy="70" r="34" fill="#bb8b62"/><circle cx="56" cy="43" r="13" fill="#bb8b62"/><circle cx="110" cy="43" r="13" fill="#bb8b62"/><path d="M30 99h180l-17 103H47z" fill="${color}"/><path d="M42 126h157M47 150h148M52 174h139" stroke="${cream}"/>`;
    if(id==='wash-basket') body=`<path d="M45 96Q20 35 74 45q34-38 55 12 55-33 64 40" fill="${cream}"/><path d="M30 99h180l-17 103H47z" fill="${color}"/><path d="M42 126h157M47 150h148M52 174h139" stroke="${cream}"/>`;
    if(id==='record-player') { height=130; body=`<g transform="translate(0 -60)">`+rect(13,65,214,122,wood)+`<ellipse cx="109" cy="111" rx="69" ry="35" fill="#36554c"/><ellipse cx="109" cy="111" rx="23" ry="12" fill="${color}"/><path d="M203 85v52l-44 17" fill="none" stroke="${cream}" stroke-width="7"/></g>`; }
  }
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 ${height}"><g fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${body}</g></svg>`)}`;
};

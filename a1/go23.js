/* AYDA ÖSD A1 | GO-2 + GO-3 | Educational coaching + practice exam.
   Injected through the pre-existing A1 app; no external dependencies, no automatic language scores. */
(function(global){
'use strict';
global.AYDA_GO23 = function(ctx){
  const {DATA, v7Coach, v7TopicList, go1RoleFirstWho, go1RoleLabels, scenePhoto, speakGerman, escape} = ctx;
  const KEY = 'ayda-a1-go23-v1';
  const defaultState = () => ({
    tab:1, topics:[...((v7Coach.topics||[]).slice(0,4))], topicIndex:0, topicHelp:1, topicAnswers:{}, topicFollowups:{},
    set:0, sceneId:Number(v7Coach.sceneId)||2, photoStep:0, photoHelp:1, photoAnswers:{}, photoReveals:{}, photoChecks:{},
    roleStep:0, roleAnswers:{}, roleReveals:{}, roleHelp:false,
    exam:{phase:'setup',set:0,selectedPhoto:2,topics:[],prepEnd:0,oralEnd:0,oralStarted:0,task:1,turn:0,topicIndex:0,notes:{},ratings:{}}
  });
  let m = defaultState();
  try {const old = JSON.parse(localStorage.getItem(KEY)||'null');if(old&&typeof old==='object')m={...m,...old,exam:{...m.exam,...(old.exam||{})}};}catch{}
  const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(m))}catch{}};
  const e = (v)=>escape(String(v??''));
  const tr=(x)=>Array.isArray(x)?x[1]||'':'';
  const photo=(id)=>DATA.scenes.find(s=>s.id===Number(id))||DATA.scenes[1]||DATA.scenes[0];
  const sets=[[2,1,6],[3,4,5],[7,8,9],[10,11,12],[13,14,15],[16,17,18]];
  const questions=[
    ['Was sehen Sie auf dem Foto?','Ne görüyorsun?','İnsanlar dışında en az iki nesne, renk veya ayrıntı da söyle.','Ich sehe ... und ... .'],
    ['Wie viele Personen sehen Sie?','Kaç kişi görüyorsun?','Kişileri fotoğrafa bakarak say. Her resimde sayı aynı olmayabilir.','Ich sehe ... Personen.'],
    ['Wo sind die Personen?','Kişiler nerede?','Kısa bir yer ifadesi yeterlidir: im Café, im Park, in der Küche.','Sie sind ... .'],
    ['Was machen die Personen?','Kişiler ne yapıyor?','Görülen işi basit fiille anlat: sprechen, kaufen, warten, trinken.','Die Personen ... .']
  ];
  const followups={
    Beruf:[['Wo arbeiten Sie?','Nerede çalışıyorsunuz?'],['Wann arbeiten Sie?','Ne zaman çalışıyorsunuz?'],['Arbeiten Sie allein?','Yalnız mı çalışıyorsunuz?']],
    Sport:[['Welchen Sport machen Sie gern?','Hangi sporu seversiniz?'],['Wann machen Sie Sport?','Ne zaman spor yaparsınız?'],['Mit wem machen Sie Sport?','Kiminle spor yaparsınız?']],
    Hobbys:[['Was machen Sie am Wochenende?','Hafta sonu ne yaparsınız?'],['Was machen Sie gern zu Hause?','Evde ne yapmayı seversiniz?'],['Haben Sie am Abend Zeit?','Akşam vaktiniz olur mu?']],
    Familie:[['Wie groß ist Ihre Familie?','Aileniz kaç kişilik?'],['Wo wohnt Ihre Familie?','Aileniz nerede yaşıyor?'],['Was machen Sie mit Ihrer Familie?','Ailenizle ne yaparsınız?']],
    Sprachen:[['Welche Sprachen sprechen Sie?','Hangi dilleri konuşuyorsunuz?'],['Warum lernen Sie Deutsch?','Neden Almanca öğreniyorsunuz?'],['Sprechen Sie Englisch?','İngilizce konuşur musunuz?']],
    Lieblingsessen:[['Was essen Sie gern?','Ne yemeyi seversiniz?'],['Kochen Sie gern?','Yemek yapmayı sever misiniz?'],['Was trinken Sie gern?','Ne içmeyi seversiniz?']]
  };
  const answerKey=(s,idx)=>`${s}-${idx}`;
  const tagline=(label,txt)=>`<p class="g23-label">${e(label)}</p><p class="g23-note">${e(txt)}</p>`;
  const speakButton=(de)=>`<button type="button" class="g23-icon-btn" data-go23="say" data-text="${e(de)}" aria-label="Almanca dinle">▶ Dinle</button>`;
  const nav=(active)=>`<div class="g23-steps" aria-label="Sözlü sınavın üç bölümü">${[['1','Kendini anlat'],['2','Fotoğrafı anlat'],['3','Diyalog kur']].map(([n,t])=>`<button data-go23="tab" data-n="${n}" class="${Number(active)===Number(n)?'selected':''}"><b>${n}</b><span>${t}</span></button>`).join('')}</div>`;
  const primary=(label,action,extra='')=>`<button type="button" class="g23-main-btn" data-go23="${action}" ${extra}>${label}</button>`;
  const secondary=(label,action,extra='')=>`<button type="button" class="g23-soft-btn" data-go23="${action}" ${extra}>${label}</button>`;
  const badge=(n,tot)=>`<span class="g23-pill">Adım ${n} / ${tot}</span>`;
  const line=(de,trn)=>`<div class="g23-example"><div><strong lang="de">${e(de)}</strong>${trn?`<small>${e(trn)}</small>`:''}</div>${speakButton(de)}</div>`;
  const area=(id,placeholder,stored,rows=3)=>`<textarea class="g23-answer" data-go23-note="${e(id)}" rows="${rows}" placeholder="${e(placeholder)}" aria-label="Almanca cevabın">${e(stored||'')}</textarea>`;
  const miniCheck=(items,prefix)=>`<div class="g23-checks">${items.map(([i,t])=>`<label><input type="checkbox" data-go23-check="${e(prefix)}:${i}" ${m.photoChecks[`${prefix}:${i}`]?'checked':''}> ${e(t)}</label>`).join('')}</div>`;
  function topicsScreen(){
    const ts=m.topics||[], topic=v7TopicList.find(t=>t.key===ts[Math.min(m.topicIndex,ts.length-1)])||v7TopicList[0], qa=followups[topic.key]||[], fIdx=m.topicFollowups[topic.key]||0, key=topic.key;
    return `<section class="g23-panel"><div class="g23-head"><span class="g23-pill">AUFGABE 1</span><h2>Dört konuda kendini anlat</h2><p>Önce konu seç, sonra hazır örneği kendi hayatına uyarlayarak konuş. Dört konunun hepsini anlatmayı çalış.</p></div>
      <div class="g23-topics">${v7TopicList.map(t=>`<button data-go23="topic-toggle" data-key="${e(t.key)}" class="${ts.includes(t.key)?'selected':''}"><span>${ts.includes(t.key)?'✓ ':''}${e(t.key)}</span><small>${e(t.tr)}</small></button>`).join('')}</div>
      <p class="g23-small">${ts.length} / 4 konu seçildi. Bilmiyorsan bir konuyu değiştirebilirsin.</p>
      ${ts.length===4?`<div class="g23-subpanel">${badge(m.topicIndex+1,4)}<h3>${e(topic.key)} <small>· ${e(topic.tr)}</small></h3>
       <p class="g23-note">Üç basamak: <b>örneği incele → kendi cümleni oluştur → ek soruyu cevapla.</b></p>
       <details class="g23-disclose" ${m.topicHelp?'open':''}><summary>Örnek cümleler ve Almanca dinleme</summary>${(topic.sent||[]).map(a=>line(a[0],a[1])).join('')}<p class="g23-note">Hazır kişiyi ezberleme; kendi mesleğini, gününü ve aileni söyle.</p></details>
       <label class="g23-field-label">Senin hayatın: bu konuda 2–4 Almanca cümle kur</label>${area(`topic:${key}`,'Ich ... / Ich kann ... / Am Wochenende ...',m.topicAnswers[key],4)}
       <div class="g23-question"><span>Beklenmedik ek soru</span><strong lang="de">${e(qa[fIdx%qa.length]?.[0]||topic.question)}</strong><small>${e(qa[fIdx%qa.length]?.[1]||'Soruyu cevapla')}</small>${speakButton(qa[fIdx%qa.length]?.[0]||topic.question)}</div>
       ${secondary('Başka ek soru sor','topic-followup')}
       <div class="g23-record-zone">${secondary('● Sesli cevabımı kaydet','record')}<div id="g23-record-out" aria-live="polite" class="g23-record-out"></div></div>
       <div class="g23-actions">${m.topicIndex?secondary('← Önceki konu','topic-prev'):''}${primary(m.topicIndex===3?'Fotoğraf bölümüne geç →':'Sonraki konu →',m.topicIndex===3?'tab2':'topic-next')}</div>
       </div>`:`<p class="g23-tip">Dört konu seç. Senin için en kolay olanlarla başlamak sınavda avantaj sağlar.</p>`}
     </section>`;
  }
  function chooser(active, handler='photo-select',set=m.set){return `<div class="g23-photo-set"><div class="g23-sets">${sets.map((_,i)=>`<button data-go23="${handler==='photo-select'?'set':'exam-set'}" data-i="${i}" class="${set===i?'selected':''}">${i+1}. set</button>`).join('')}</div><div class="g23-photo-options">${sets[set].map(id=>{const s=photo(id);return `<button type="button" class="g23-photo-tile ${Number(active)===id?'selected':''}" data-go23="${handler}" data-i="${id}"><div>${scenePhoto(s)}</div><span>${e(s.title)}</span><small>${e(s.place||'Günlük yaşam')}</small></button>`}).join('')}</div></div>`}
  function photoScreen(){
    const s=photo(m.sceneId), i=Math.min(4,Math.max(0,m.photoStep)),k=answerKey(s.id,i),v=(s.fourAnswers||[])[i]||'', word=(s.vocab||[]).slice(0,9);
    return `<section class="g23-panel"><div class="g23-head"><span class="g23-pill">AUFGABE 2</span><h2>Fotoğrafı seç ve anlat</h2><p>En ilginç fotoğrafı değil, <b>kelimelerini bildiğin</b> fotoğrafı seç. Sonraki bölümde bu fotoğrafın içinde konuşacaksın.</p></div>
     ${chooser(m.sceneId)}<div class="g23-photo-large">${scenePhoto(s)}</div><p class="g23-note">${e(s.title)} · ${e(s.description||'')}</p>
     ${i<4?`<div class="g23-subpanel">${badge(i+1,5)}<h3 lang="de">${e(questions[i][0])}</h3><p class="g23-note">${e(questions[i][1])}</p><div class="g23-focus"><b>Bu sorunun amacı:</b> ${e(questions[i][2])}</div>
       ${secondary(m.photoHelp?'Yardımcı kelimeleri gizle':'Yardımcı kelimeleri göster','photo-hint')}
       ${m.photoHelp?`<details class="g23-disclose"><summary>İpucu kelimeler ve yardımcı kalıp</summary><div class="g23-words">${word.map(w=>`<span>${e(w.de)} <small>${e(w.tr)}</small></span>`).join('')}</div>${line(questions[i][3],'Cümleyi kendi bilgine göre tamamla')}</details>`:''}
       <label class="g23-field-label">Önce sesli söyle, sonra istersen yaz</label>${area(`photo:${k}`,'Auf dem Foto sehe ich ...',m.photoAnswers[k],3)}
       ${secondary(m.photoReveals[k]?'Örnek cevabı gizle':'Örneği karşılaştır','photo-reveal',`data-k="${e(k)}"`)}
       ${m.photoReveals[k]?`<div class="g23-model">${line(v,'Bu yalnızca bir modeldir; fotoğraftaki gerçek ayrıntıları seç.')}<p>Yazdığın cümle ile farkına bak. Aynısını ezberlemek zorunda değilsin.</p></div>`:''}
       <div class="g23-actions">${i?secondary('← Önceki soru','photo-prev'):''}${primary('Sonraki adım →','photo-next')}</div></div>`:
       `<div class="g23-subpanel">${badge(5,5)}<h3>Şimdi hepsini 45–60 saniyede anlat</h3><p>Artık dört soruya tek tek bakmadan fotoğrafı anlatmayı dene. İstersen kısa not yaz; asıl hedef <b>sesli konuşmak</b>.</p>${area(`photo:${s.id}:free`,'Ich sehe ... Es gibt ... Sie sind ... Die Frau ...',m.photoAnswers[`${s.id}:free`],5)}
       <div class="g23-record-zone">${secondary('● 60 saniye ses kaydı','record')}<div id="g23-record-out" aria-live="polite"></div></div>
       ${miniCheck([[1,'İnsanları ve en az iki ayrıntıyı anlattım'],[2,'Kişi sayısını fotoğrafa bakarak söyledim'],[3,'Mekânı belirttim'],[4,'Bir eylemi anlattım']],'picture:'+s.id)}
       <details class="g23-disclose"><summary>Kısa ve ayrıntılı model cevapları aç</summary>${line(s.model||'','Kısa model')}${line(s.modelMore||'','Ayrıntılı model')}</details>
       ${primary('Aynı fotoğrafla 3. bölüme geç →','tab3')}</div>`}
     </section>`;
  }
  const turnLabel=(id,idx)=>{if(Number(id)===3)return ['Görevli','Sen','Görevli','Görevli','Sen','Görevli'][idx]||'Görevli';const first=go1RoleFirstWho[id]==='Sen'?'Sen':'Görevli';return idx%2===0?first:first==='Sen'?'Görevli':'Sen'};
  function roleScreen(){
    const s=photo(m.sceneId), dialog=(s.go1?.dialog||[]), n=Math.min(dialog.length,Math.max(0,m.roleStep)), current=dialog[n],who=turnLabel(s.id,n), key=`${s.id}:${n}`;
    return `<section class="g23-panel"><div class="g23-head"><span class="g23-pill">AUFGABE 3</span><h2>Aynı fotoğrafta konuş</h2><p>Burada fotoğrafı tarif etmeyi bırakıp <b>müşteri, yolcu, hasta veya arkadaş</b> olarak konuşuyorsun. Her durum plan yapma değildir.</p></div>
     <div class="g23-photo-small">${scenePhoto(s)}<div><b>${e(go1RoleLabels[s.id]||'Günlük durum')}</b><small>${e(s.role||'')}</small></div></div>
     <p class="g23-tip"><b>Yalnızca duruma uygun soru sor:</b> ${e(s.go1?.tip||'Önce dinle, kısa cevap ver ve doğru soru sor.')} ${m.roleHelp?'İpucu açık':'İpuçlarını kapatabilirsin.'}</p>
     ${n<dialog.length?`<div class="g23-subpanel">${badge(n+1,dialog.length)}<h3>${who==='Sen'?'Şimdi senin sıran':'Karşı taraf konuşuyor'}</h3>
      ${n?`<details class="g23-disclose"><summary>Geçmiş konuşmaları gör (${n} satır)</summary>${dialog.slice(0,n).map((t,i)=>line(turnLabel(s.id,i)==='Sen'?(m.roleAnswers[`${s.id}:${i}`]||t):t,turnLabel(s.id,i))).join('')}</details>`:''}
      ${who==='Sen'?`<p>Sesli cevap ver. İstersen kısa not yaz; sonra örnekle karşılaştır.</p>${area(`role:${key}`,'Ich möchte ... / Haben Sie ...? / Wann ...?',m.roleAnswers[key],4)}
       ${m.roleHelp?`<div class="g23-words">${(s.go1?.questions||[]).map(q=>`<span lang="de">${e(q)}</span>`).join('')}</div>`:''}
       ${secondary(m.roleReveals[key]?'Örnek cevabı gizle':'Takıldım: bir örnek göster','role-reveal',`data-k="${e(key)}"`)}
       ${m.roleReveals[key]?line(current,'Örnek; görevliden gelen cevaba uygun konuş.') :''}
       <div class="g23-record-zone">${secondary('● Cevabımı kaydet','record')}<div id="g23-record-out" aria-live="polite"></div></div>`:
       `<div class="g23-examiner"><span>SINAV GÖREVLİSİ / KONUŞMA PARTNERİ</span><strong lang="de">${e(current)}</strong>${speakButton(current)}</div><p>Görevliyi dinle ve cevap vermek için devam et.</p>`}
      <div class="g23-actions">${n?secondary('← Önceki replik','role-prev'):''}${primary(n===dialog.length-1?'Diyaloğu tamamla →':'Sonraki konuşma →','role-next')}</div></div>`:
      `<div class="g23-subpanel"><h3>Bir diyalog tamamladın!</h3><p>Şimdi aynı sahnede soruyu farklı şekilde cevaplayabilir misin? Örneğin farklı bir ürün, saat veya fiyat kullan.</p>
       ${secondary('Baştan tekrar et','role-restart')}${primary('İpuçsuz denemeye geç →','exam-open')}</div>`}
     <div class="g23-bottom-links">${secondary(m.roleHelp?'Joker soruları gizle':'Bu durumun jokerlerini göster','role-hint')}${secondary('Başka fotoğraf seç','tab2')}</div></section>`;
  }
  function coachScreen(){return `<div class="kid-narrow g23-wrap"><button class="kid-back" data-view="library">← Çalışma köşesi</button><div class="g23-title"><span class="kid-pill">AYDA · ÖSD A1 SINAV KOÇU · GO-2</span><h1>Adım adım konuşmayı öğren</h1><p>Önce yardım alarak çöz, ardından kendi cümlelerinle konuş. Aynı fotoğrafı üçüncü bölümde de kullan.</p></div>${nav(m.tab)}${m.tab===1?topicsScreen():m.tab===2?photoScreen():roleScreen()}
     <div class="g23-exam-banner"><div><strong>Artık yardımsız prova yapmak ister misin?</strong><p>Gerçek sınav akışında ipuçları ve örnek cevaplar kapalı.</p></div>${primary('Sınav provası →','exam-open')}</div><p class="g23-foot">AYDA özgün öğretici alıştırmalarıdır; resmî ÖSD sınav görselleri değildir. Hazır metni aynen söylemek zorunda değilsin.</p></div>`;}
  function prepareTimerText(end){if(!end)return '10:00';const n=Math.max(0,Math.ceil((end-Date.now())/1000));return `${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;}
  const ex=()=>m.exam;
  function examScreen(){
    const x=ex(),s=photo(x.selectedPhoto);let content='';
    if(x.phase==='setup')content=`<div class="g23-subpanel"><h2>Denemeyi başlat</h2><p>Hazırlıkta dört tanıtım konusu ve üç fotoğraftan birini seç. Aynı fotoğraf üçüncü görevde kullanılacak.</p>
      <h3>1. Dört konu seç</h3><div class="g23-topics">${v7TopicList.map(t=>`<button data-go23="exam-topic" data-key="${e(t.key)}" class="${x.topics.includes(t.key)?'selected':''}">${x.topics.includes(t.key)?'✓ ':''}${e(t.key)}</button>`).join('')}</div><p class="g23-small">${x.topics.length}/4</p>
      <h3>2. Fotoğraf seç</h3>${chooser(x.selectedPhoto,'exam-photo',x.set)}<p class="g23-tip">Üç fotoğraftan konuşabileceğin en kolayını seç. Hastalık kelimelerini bilmiyorsan doktor fotoğrafını seçmek zorunda değilsin.</p>
      ${primary('10 dakikalık hazırlığa başla','exam-prep',x.topics.length===4?'':'disabled')}</div>`;
    if(x.phase==='prepare')content=`<div class="g23-subpanel"><h2>Hazırlık süresi</h2><div class="g23-clock" id="g23-clock">${prepareTimerText(x.prepEnd)}</div><p>Önce dört konunu düşün. Seçtiğin fotoğrafta hangi kişiler, eşyalar, yer ve eylemler var? Üçüncü bölümde hangi soruyu sorabilirsin?</p>
        <p class="g23-tip">Yalnızca kendi kısa notlarını oluştur. Sözlüye geçince hazır cümle örnekleri açılmayacak.</p>
        <div class="g23-photo-small">${scenePhoto(s)}<strong>${e(s.title)}</strong></div>${area('exam:prep','Kısa hazırlık notları (isteğe bağlı)',x.notes.prep,4)}
        ${primary('Hazırım, sözlü sınava geç →','exam-start')}</div>`;
    if(x.phase==='oral'){
      let body='';
      if(x.task===1){const topic=x.topics[Math.min(x.topicIndex,3)]||'Familie',q=(followups[topic]||[])[(x.topicIndex+1)%3]?.[0]||'Erzählen Sie bitte.';
        body=`<h2>Aufgabe 1 — Sich vorstellen</h2><p>Konu ${x.topicIndex+1}/4: <b>${e(topic)}</b>. Kendi hayatını kısa, anlaşılır cümlelerle anlat.</p><div class="g23-question"><strong lang="de">${e(q)}</strong>${speakButton(q)}</div>${area(`exam:t1:${x.topicIndex}`,'Konuştuysan istersen kısa not bırak',x.notes[`t1:${x.topicIndex}`],3)}
          ${primary(x.topicIndex===3?'Fotoğraf anlatmaya geç →':'Sonraki konu →','exam-next')}`;
      }else if(x.task===2){body=`<h2>Aufgabe 2 — Ein Bild beschreiben</h2><p>Fotoğrafı sesli anlat. Dört temel soruyu karşılamaya çalış.</p><div class="g23-photo-large">${scenePhoto(s)}</div>
          <div class="g23-exam-questions">${questions.map(q=>`<span lang="de">${e(q[0])}</span>`).join('')}</div>${area('exam:t2','Konuştuysan kısa not bırak (isteğe bağlı)',x.notes.t2,3)}
          ${primary('Aynı fotoğrafta diyaloga geç →','exam-next')}`;
      }else if(x.task===3){const dialog=s.go1?.dialog||[],current=dialog[Math.min(x.turn,dialog.length-1)],who=turnLabel(s.id,x.turn),finished=x.turn>=dialog.length;
        body=`<h2>Aufgabe 3 — Miteinander sprechen</h2><p><b>Senin rolün:</b> ${e(s.role)}</p><div class="g23-photo-small">${scenePhoto(s)}<strong>${e(s.title)}</strong></div>
         ${finished?`<h3>Görüşme tamamlandı</h3>${primary('Değerlendirmeye geç →','exam-review')}`:`<div class="g23-subpanel"><span class="g23-pill">Konuşma ${x.turn+1} / ${dialog.length}</span>
          ${who==='Sen'?`<p>Şimdi senin konuşma sıran. Duruma uygun bir cümle söyle veya soru sor.</p>${area(`exam:t3:${x.turn}`,'Cevabım (isteğe bağlı)',x.notes[`t3:${x.turn}`],3)}`:
           `<div class="g23-examiner"><span>KARŞI TARAF</span><strong lang="de">${e(current)}</strong>${speakButton(current)}</div>`}
          ${primary('Sonraki konuşma →','exam-next')}</div>`}`;
      }
      content=`<div class="g23-subpanel"><div class="g23-exam-bar"><span>SÖZLÜ SINAV · ${x.task}. BÖLÜM</span><div class="g23-clock-small" id="g23-clock">${prepareTimerText(x.oralEnd)}</div></div><p class="g23-note">Bu denemede jokerler, hazır cevaplar ve gramer ipuçları kapalıdır.</p>${body}
        <div class="g23-record-zone">${secondary('● Sesli yanıtımı kaydet','record')}<div id="g23-record-out" aria-live="polite"></div></div></div>`;
    }
    if(x.phase==='review'){
      const categories=[['Kendini tanıtma',4],['Görsel anlatma',4],['Karşılıklı konuşma',4],['Kelime ve ifadeler',5],['Telaffuz ve anlaşılırlık',4],['Dil bilgisi',4]];
      const filled=categories.every((_,i)=>x.ratings[i]!==undefined),score=categories.reduce((sum,_,i)=>sum+(Number(x.ratings[i])||0),0);
      content=`<div class="g23-subpanel"><h2>Öğretmen değerlendirme formu</h2><p>Bu form otomatik konuşma puanı üretmez. Sözlü cevabı dinleyen öğretmen ölçütleri kullanarak puan verir.</p>
        <div class="g23-score-grid">${categories.map(([name,max],i)=>`<label><span>${e(name)} <small>/ ${max}</small></span><select data-go23-score="${i}"><option value="">Seç</option>${Array.from({length:max+1},(_,v)=>`<option value="${v}" ${Number(x.ratings[i])===v&&x.ratings[i]!==undefined?'selected':''}>${v}</option>`).join('')}</select></label>`).join('')}</div>
        <div class="g23-score-total">${filled?`${score} / 25`:'— / 25'}<small>${filled?'Öğretmenin verdiği puanların toplamı':'Tüm alanlar öğretmen tarafından doldurulmalı'}</small></div>
        <p class="g23-note">Sözlü modül barajı 12/25'tir; AYDA iç çalışma hedefi 18/25. Bu form gerçek sınav sonucunu garanti etmez.</p>
        ${secondary('Yeni deneme başlat','exam-reset')}${primary('Çalışma koçuna dön →','coach-open')}</div>`;
    }
    return `<div class="kid-narrow g23-wrap"><button class="kid-back" data-view="library">← Çalışma köşesi</button><div class="g23-title"><span class="kid-pill">AYDA · GO-3 · İPUÇLARI KAPALI</span><h1>ÖSD A1 Sözlü Sınav Provası</h1><p>10 dakika hazırlık, yaklaşık 10 dakika konuşma. Fotoğraf, ikinci ve üçüncü bölümde aynı kalır.</p></div>${content}<p class="g23-foot">Bu AYDA eğitim simülasyonudur; resmî sınav oturumu değildir. Mikrofon kaydı sunucuya gönderilmez.</p></div>`;
  }
  let onRender=()=>{};
  function redraw(){save();onRender();}
  function install(renderFn){
    onRender=renderFn;
    document.addEventListener('click',async ev=>{
      const b=ev.target.closest('button[data-go23]');if(!b)return;
      ev.preventDefault();ev.stopImmediatePropagation();const a=b.dataset.go23, key=b.dataset.key, idx=Number(b.dataset.i), k=b.dataset.k;
      if(a==='say'){speakGerman(b.dataset.text||'');return;}
      if(a==='record'){await record(b);return;}
      if(a==='coach-open'){ctx.state.view='exam';redraw();return;}
      if(a==='exam-open'){ctx.state.view='exam-prova';redraw();return;}
      if(a==='tab'||/^tab[23]$/.test(a)){m.tab=a==='tab'?Number(b.dataset.n):Number(a.slice(-1));if(m.tab===3)m.roleStep=0;redraw();return;}
      if(a==='topic-toggle'){m.topics=m.topics.includes(key)?m.topics.filter(t=>t!==key):m.topics.length<4?[...m.topics,key]:m.topics;m.topicIndex=0;}
      if(a==='topic-next'){m.topicIndex=Math.min(3,m.topicIndex+1);}
      if(a==='topic-prev'){m.topicIndex=Math.max(0,m.topicIndex-1);}
      if(a==='topic-followup'){const t=m.topics[m.topicIndex];m.topicFollowups[t]=((m.topicFollowups[t]||0)+1)%3;}
      if(a==='set'){m.set=idx;m.sceneId=sets[idx][0];m.photoStep=0;}
      if(a==='photo-select'){m.sceneId=idx;m.photoStep=0;m.roleStep=0;v7Coach.sceneId=idx;ctx.saveV7();}
      if(a==='photo-hint'){m.photoHelp=!m.photoHelp;}
      if(a==='photo-prev'){m.photoStep=Math.max(0,m.photoStep-1);}
      if(a==='photo-next'){m.photoStep=Math.min(4,m.photoStep+1);}
      if(a==='photo-reveal'){m.photoReveals[k]=!m.photoReveals[k];}
      if(a==='role-next'){m.roleStep=Math.min((photo(m.sceneId).go1?.dialog||[]).length,m.roleStep+1);}
      if(a==='role-prev'){m.roleStep=Math.max(0,m.roleStep-1);}
      if(a==='role-restart'){m.roleStep=0;}
      if(a==='role-reveal'){m.roleReveals[k]=!m.roleReveals[k];}
      if(a==='role-hint'){m.roleHelp=!m.roleHelp;}
      if(a==='exam-reset'){m.exam={...defaultState().exam,topics:[]};}
      if(a==='exam-set'){m.exam.set=idx;m.exam.selectedPhoto=sets[idx][0];}
      if(a==='exam-photo'){m.exam.selectedPhoto=idx;}
      if(a==='exam-topic'){const ts=m.exam.topics;m.exam.topics=ts.includes(key)?ts.filter(x=>x!==key):ts.length<4?[...ts,key]:ts;}
      if(a==='exam-prep'){if(m.exam.topics.length!==4)return;m.exam.phase='prepare';m.exam.prepEnd=Date.now()+600000;}
      if(a==='exam-start'){m.exam.phase='oral';m.exam.task=1;m.exam.topicIndex=0;m.exam.turn=0;m.exam.oralStarted=Date.now();m.exam.oralEnd=Date.now()+600000;}
      if(a==='exam-next'){
        if(m.exam.task===1){if(m.exam.topicIndex<3)m.exam.topicIndex++;else m.exam.task=2;}
        else if(m.exam.task===2){m.exam.task=3;m.exam.turn=0;}
        else if(m.exam.task===3)m.exam.turn=Math.min((photo(m.exam.selectedPhoto).go1?.dialog||[]).length,m.exam.turn+1);
      }
      if(a==='exam-review')m.exam.phase='review';
      redraw();
    },true);
    document.addEventListener('input',ev=>{
      const node=ev.target;if(!node.matches?.('[data-go23-note]'))return;
      const id=node.dataset.go23Note,v=node.value;
      if(id.startsWith('topic:'))m.topicAnswers[id.slice(6)]=v;
      else if(id.startsWith('photo:'))m.photoAnswers[id.slice(6)]=v;
      else if(id.startsWith('role:'))m.roleAnswers[id.slice(5)]=v;
      else if(id.startsWith('exam:'))m.exam.notes[id.slice(5)]=v;
      save();
    },true);
    document.addEventListener('change',ev=>{
      if(ev.target.matches?.('[data-go23-check]')){m.photoChecks[ev.target.dataset.go23Check]=!!ev.target.checked;save();}
      if(ev.target.matches?.('[data-go23-score]')){const i=ev.target.dataset.go23Score, value=ev.target.value;if(value==='')delete m.exam.ratings[i];else m.exam.ratings[i]=Number(value);redraw();}
    },true);
    document.getElementById('resetBtn')?.addEventListener('click',()=>{if(!localStorage.getItem('ayda-a1-sprechen-demo-v6')){m=defaultState();try{localStorage.removeItem(KEY)}catch{}}},false);
    window.setInterval(()=>{const clock=document.getElementById('g23-clock');if(!clock)return;const exm=m.exam;clock.textContent=prepareTimerText(exm.phase==='prepare'?exm.prepEnd:exm.oralEnd);},1000);
  }
  let recorder=null,recordStream=null,audioParts=[],recordUrl=null;
  async function record(btn){
    const out=document.getElementById('g23-record-out');if(!out)return;
    if(recorder?.state==='recording'){recorder.stop();return;}
    if(!navigator.mediaDevices?.getUserMedia||!global.MediaRecorder){out.textContent='Bu cihaz mikrofon kaydını desteklemiyor.';return;}
    try{
      if(recordUrl){URL.revokeObjectURL(recordUrl);recordUrl=null;}
      recordStream=await navigator.mediaDevices.getUserMedia({audio:true});audioParts=[];
      recorder=new MediaRecorder(recordStream);
      recorder.ondataavailable=ev=>{if(ev.data?.size)audioParts.push(ev.data)};
      recorder.onstop=()=>{
        recordStream?.getTracks().forEach(t=>t.stop());recordStream=null;
        const blob=new Blob(audioParts,{type:recorder.mimeType||'audio/webm'});recordUrl=URL.createObjectURL(blob);
        const target=document.getElementById('g23-record-out');if(target){target.innerHTML='';const player=document.createElement('audio');player.controls=true;player.src=recordUrl;target.appendChild(player);const text=document.createElement('small');text.textContent='Kayıt sadece bu oturumda oynatılır, sunucuya gönderilmez.';target.appendChild(text);}
      };
      recorder.start();btn.textContent='■ Kaydı bitir';out.textContent='Kayıt başladı; konuş ve bitir.';
      setTimeout(()=>{if(recorder?.state==='recording')recorder.stop()},60000);
    }catch(err){recordStream?.getTracks().forEach(t=>t.stop());out.textContent='Mikrofon izni verilmedi veya cihaz kaydı desteklemiyor.';}
  }
  const css=`
.g23-wrap{max-width:940px!important;margin:0 auto}.g23-title{margin:0 0 18px}.g23-title h1{font-size:clamp(26px,4vw,38px);line-height:1.16;margin:10px 0}.g23-title p{font-size:15px;line-height:1.6;color:#49677c}.g23-panel{background:#fff;border:1px solid #dce7ef;border-radius:19px;padding:clamp(16px,3vw,28px);margin-top:16px}.g23-head h2{font-size:clamp(21px,3vw,27px);margin:12px 0}.g23-head p{line-height:1.6;color:#47637a;font-size:15px}.g23-steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.g23-steps button{border:1px solid #dbe5ef;background:#f5f8fb;border-radius:12px;padding:12px 8px;color:#183752;display:flex;align-items:center;justify-content:center;gap:8px;font-weight:700}.g23-steps button b{display:grid;place-items:center;background:#dce9f2;width:27px;height:27px;border-radius:50%}.g23-steps button.selected{background:#e6f4ee;border-color:#40a984}.g23-steps button.selected b{background:#248e68;color:white}.g23-pill{display:inline-block;padding:6px 11px;border-radius:40px;background:#e6f4f0;color:#157355;font-size:12px;font-weight:850}.g23-small,.g23-note{color:#516a7c;font-size:14px;line-height:1.6}.g23-subpanel{border:1px solid #e1e9ee;background:#fcfdff;border-radius:16px;padding:clamp(14px,2.5vw,22px);margin:18px 0}.g23-subpanel h3{font-size:21px;margin:12px 0 8px}.g23-subpanel h3 small{color:#607789;font-size:13px}.g23-topics{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:16px 0 8px}.g23-topics button{padding:14px 8px;text-align:left;border:1px solid #d9e5ef;border-radius:12px;background:white;color:#193c55;font-size:14px;font-weight:750}.g23-topics button small{display:block;font-size:11px;font-weight:500;color:#698293;padding-top:5px}.g23-topics button.selected,.g23-sets button.selected{border-color:#45a889;background:#e8f8f2}.g23-disclose{margin:16px 0;padding:14px;border:1px solid #dae8f1;border-radius:12px;background:#fff}.g23-disclose summary{cursor:pointer;font-weight:800;color:#1d5275;font-size:14px}.g23-example{display:flex;align-items:center;justify-content:space-between;gap:12px;border-bottom:1px solid #e8eef3;padding:12px 0}.g23-example strong{font-size:15px;color:#153a54;line-height:1.5}.g23-example small{display:block;font-size:12px;color:#637987;margin-top:3px}.g23-icon-btn{flex-shrink:0;background:#e6effb;border:0;border-radius:10px;color:#1d5e9e;padding:9px 12px;font-size:12px;font-weight:800}.g23-field-label{display:block;font-size:14px;font-weight:800;margin:16px 0 8px;color:#193c53}.g23-answer{display:block;width:100%;min-height:100px;border:1px solid #bfcfdf;border-radius:12px;background:#fff;font-size:16px;line-height:1.6;padding:12px;color:#12364f;box-sizing:border-box}.g23-question,.g23-examiner{margin:18px 0;border-radius:13px;border:1px solid #c9e1f3;background:#f2f8fd;padding:16px}.g23-question span,.g23-examiner span{display:block;font-size:12px;color:#426d89;font-weight:750;margin-bottom:6px}.g23-question strong,.g23-examiner strong{display:block;font-size:18px;margin-bottom:6px;color:#123b62;line-height:1.5}.g23-question small{display:block;color:#55768b;font-size:12px;margin-bottom:8px}.g23-record-zone{margin:16px 0}.g23-record-out audio{display:block;width:min(100%,370px);margin:10px 0}.g23-record-out small{display:block;color:#597283;font-size:12px}.g23-main-btn,.g23-soft-btn{border-radius:11px;min-height:44px;padding:11px 16px;font-weight:800;font-size:14px;cursor:pointer}.g23-main-btn{background:#176caa;color:white;border:1px solid #176caa}.g23-main-btn:disabled{opacity:.45;cursor:not-allowed}.g23-soft-btn{background:#edf4f8;border:1px solid #d1e1ec;color:#1c567b}.g23-actions{display:flex;justify-content:flex-end;align-items:center;gap:10px;flex-wrap:wrap;margin:20px 0 2px}.g23-tip{background:#fff6e4;color:#6a502b;border:1px solid #f2d5a0;padding:14px;border-radius:12px;font-size:14px;line-height:1.6}.g23-focus{background:#eaf8f3;border-left:4px solid #3b9d7c;border-radius:8px;padding:12px;margin:14px 0;color:#205747;font-size:14px;line-height:1.5}.g23-photo-set{margin:18px 0}.g23-sets{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:12px}.g23-sets button{border:1px solid #d9e3ed;border-radius:9px;background:#f5f8fb;padding:8px 12px;font-weight:700;color:#24485e}.g23-photo-options{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.g23-photo-tile{border:2px solid #e2e9f0;background:white;border-radius:13px;overflow:hidden;text-align:left;color:#153750;padding:0 0 10px;cursor:pointer}.g23-photo-tile.selected{border-color:#289e77;background:#f2fcf8}.g23-photo-tile>div{height:120px;overflow:hidden}.g23-photo-tile .scene-photo{width:100%;height:100%;border-radius:0}.g23-photo-tile span,.g23-photo-tile small{display:block;margin:8px 12px 0;font-size:14px;font-weight:800}.g23-photo-tile small{font-size:11px;font-weight:400;color:#718697}.g23-photo-large .scene-photo{height:360px;border-radius:15px}.g23-photo-small{display:flex;align-items:center;gap:15px;margin:16px 0;background:#f3f8fb;border-radius:13px;padding:11px}.g23-photo-small .scene-photo{flex:0 0 165px;height:110px;border-radius:10px}.g23-photo-small b,.g23-photo-small strong{display:block;font-size:16px;color:#143c5b}.g23-photo-small small{display:block;margin-top:5px;font-size:13px;color:#527284}.g23-words{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0}.g23-words span{background:#edf5fa;border-radius:10px;padding:8px 10px;font-weight:700;color:#25516b;font-size:13px}.g23-words small{font-weight:400;color:#698294}.g23-model{margin:15px 0;background:#eaf8f2;border-radius:13px;padding:12px}.g23-model p{font-size:12px;color:#48725c}.g23-checks{display:grid;gap:10px;margin:18px 0}.g23-checks label{display:flex;gap:8px;align-items:center;font-size:14px;color:#244b60}.g23-bottom-links{display:flex;flex-wrap:wrap;gap:8px}.g23-exam-banner{margin:18px 0;border-radius:16px;background:#133d58;color:white;padding:19px;display:flex;align-items:center;justify-content:space-between;gap:14px}.g23-exam-banner strong{font-size:18px}.g23-exam-banner p{font-size:13px;color:#c9dfe9;margin:5px 0}.g23-exam-banner button{background:#fff;color:#143d5b;border-color:#fff;flex-shrink:0}.g23-foot{color:#657f8e;font-size:12px;line-height:1.6;margin:20px 0}.g23-clock{font-size:48px;font-weight:850;color:#1f669c;margin:15px 0}.g23-clock-small{font-size:24px;font-weight:850;color:#1e6eac}.g23-exam-bar{display:flex;align-items:center;justify-content:space-between;gap:10px}.g23-exam-bar span{font-size:12px;font-weight:800;color:#234d68}.g23-exam-questions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:12px 0}.g23-exam-questions span{border:1px solid #dce7ef;border-radius:9px;padding:10px;font-size:13px;color:#2a536a}.g23-score-grid{display:grid;gap:12px;margin:18px 0}.g23-score-grid label{display:flex;justify-content:space-between;align-items:center;gap:12px;border-bottom:1px solid #e4edf3;padding:8px 0;color:#193b55}.g23-score-grid small{color:#6a8190}.g23-score-grid select{padding:7px;border:1px solid #c5d8e5;border-radius:8px;background:white;color:#173e58}.g23-score-total{font-size:35px;font-weight:850;color:#276b89;margin:19px 0}.g23-score-total small{display:block;font-size:12px;color:#627c8b;font-weight:400}@media(max-width:680px){.g23-steps button{flex-direction:column;font-size:12px}.g23-topics{grid-template-columns:repeat(2,minmax(0,1fr))}.g23-photo-options{gap:6px}.g23-photo-tile>div{height:90px}.g23-photo-tile span{font-size:12px;margin:6px}.g23-photo-tile small{display:none}.g23-photo-large .scene-photo{height:235px}.g23-photo-small .scene-photo{flex-basis:120px;height:90px}.g23-exam-banner{flex-direction:column;align-items:stretch}.g23-exam-questions{grid-template-columns:1fr}.g23-actions{flex-direction:column-reverse;align-items:stretch}.g23-actions button{width:100%}}
`;
  if(!document.getElementById('ayda-go23-css')){const style=document.createElement('style');style.id='ayda-go23-css';style.textContent=css;document.head.appendChild(style);}
  return {coachScreen,examScreen,install};
};
})(window);
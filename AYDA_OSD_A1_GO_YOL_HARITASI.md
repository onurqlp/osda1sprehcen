# AYDA ÖSD A1 Sprechen — GO Takip ve Yayın Yol Haritası

**Sürüm:** GO-3 · 11 Kasım 2026 · 11 Kasım 2026  
**Hedef kitle:** Menschen A1.1'in ilk 12 ünitesini bitirmiş; ÖSD A1 sözlü sınavına 15 günlük yoğun programla hazırlanacak öğrenci.  
**Hedef repo:** [`onurqlp/osda1sprehcen`](https://github.com/onurqlp/osda1sprehcen)  
**A1 yayın yolu:** [`/a1/`](https://onurqlp.github.io/osda1sprehcen/a1/)  
**Korunacak mevcut sayfa:** Reponun kök `/` adresindeki A2 sayfası ve mevcut merkezi öğrenci girişi.

> **3x hedefi:** Demo sürümünü yalnızca tasarım açısından değil; sınav içeriği, kullanım kolaylığı, pedagojik doğruluk, görsel-senaryo eşleşmesi ve test kalitesi bakımından belirgin biçimde geliştirmek. “3x” bir öğrenme/başarı garantisi veya ölçülmüş performans artışı değildir.

## GO durumu

- [x] **GO-1.3x — 18 görsel ve diyalog eşleşmesini güçlendir; korumalı A1 yoluna yayımla.**
- [x] **GO-2 — Sınavın üç görevini daha aktif öğreten konu bazlı uygulamalar.**
- [x] **GO-3 — Gerçekçi görevli-öğrenci diyalog simülatörü ve yardımsız deneme modu.**
- [ ] **GO-4 — Gerçek cihaz testleri, ses, öğrenci girişi ve veri/ilerleme kontrolleri.**
- [ ] **GO-5 — Kod bakımı, performans ve erişilebilirlik iyileştirmeleri.**
- [ ] **GO-6 — Pedagojik son kabul, tam sınav simülasyonları ve son yayın onayı.**

## GO-1.3x — Teslim kapsamı

- [x] 18 günlük yaşam sahnesi için fotoğraf, yer ve rol yapma görevlerini eşleştir.
- [x] 18 × 4 = **72** yönlendirilmiş görsel sorusu ve örnek cevap oluştur.
- [x] 18 × 8 = **144** sahneye özgü kelime kartı yerleştir (tekrar eden kelimeler olabilir).
- [x] 18 × 3 = **54** duruma uygun joker soru ekle.
- [x] 18 × 6 = **108** rol yapma konuşma satırı oluştur.
- [x] Kısa A1.1 ve daha ayrıntılı A1.2 örnek cevapları bir arada sun.
- [x] Altı tekrar sahnesi için altı yeni özgün öğretici fotoğraf kullan; tüm fotoğrafları sayfada erişilebilir tut.
- [x] Ayrı görsel pratik ekranındaki 18 sahnenin tümünü yeni ayrıntılı sınav formatına bağla.
- [x] `Was sehen Sie?` sorusunu kişi sayısından ayrı öğret; nesne, kıyafet, renk ve çevreye yer ver.
- [x] Fotoğrafı seçerken kelime bilgisine göre karar vermeyi anlat; doktor/veteriner gibi zor bağlamları zorlamama taktiğini açıkla.
- [x] 390 px mobil genişlikte 18 senaryoyu uçtan uca aç ve yatay taşmayı kontrol et.
- [x] Tarayıcı konsolunda temel sayfa ve senaryo geçişlerinde JavaScript hatası olmamasını doğrula.
- [x] Mevcut AYDA merkezi giriş ekranını yeni A1 sayfasında koru ve arama motoru indekslemesini kapalı tut.
- [x] A2 ana sayfasını değiştirmeden ayrı A1 yayın yolunu kullan.

**Doğrulanmış teknik kapsam:** HTML/JS sözdizimi; mobil 390 px ekranda tüm 18 fotoğrafın ayrıntılı anlatım ve rol yapma ekranları; temel masaüstü gezinme; GitHub dalında içerik ve erişim kontrolü doğrulaması.  
**Sınır:** Otomatik ses puanlama yoktur. Gerçek öğrenci hesabıyla giriş, Android/iOS ses motorları, mikrofon izinleri, ekran okuyucu ve farklı cihazlarda son kullanıcı testleri GO-4'ün kapsamındadır. Yalnızca istemci taraflı giriş perdelemesi güçlü bir sunucu tarafı yetkilendirmenin yerini tutmaz.

## GO-2 — Sözlü görevler

- [x] **Aufgabe 1:** Altı resmî konu içinden dört seçim; her konuda model → kişisel cevap → beklenmedik ek soru.
- [x] **Aufgabe 2:** Görüleni tanı → cümle kur → dört soruyu kapsa → ipuçlarını gizle → serbest konuş.
- [x] **Aufgabe 3:** Fotoğraftaki role göre müşteri/görevli/arkadaş ifadelerini ayır; karşı tarafa uygun soru sor.
- [x] Her görevde sık hata, doğru karşılaştırma ve kendi kendini kontrol alanları.

## GO-3 — Sınav simülasyonu

- [x] **Öğrenme modu** ile **yardımsız deneme modu** ayrı olsun.
- [x] 10 dakika hazırlık, yaklaşık 10 dakika sözlü sınav akışı; fotoğraf seçimi ve aynı ortamda rol yapma.
- [x] Görevli sorusu → öğrenci cevabı → uygun takip sorusu / yanıt turu.
- [x] Ses kaydını dinleme ve öğretmenin 25 puanlık ölçüte göre değerlendirmesi.

## GO-4 — Teknik kabul

- [ ] Merkezi öğrenci girişi ve erişim reddi/düşük bağlantı senaryolarını gerçek cihazlarda doğrula.
- [ ] Android ve iPhone'da Almanca konuşma sesleri, mikrofon izni, kayıt ve tekrar dinleme çalışsın.
- [ ] Veri/ilerleme sistemi, tarayıcı değiştirme ve önbellek davranışı açıkça belgelensin.
- [ ] Erişilebilirlik (klavye, odak, kontrast) ve mobil ekran testleri geçsin.

## GO-5 — Bakım ve performans

- [ ] Tek HTML'de biriken sürüm kodlarını modüllere ayır; çalışan bağlantıları ve kayıt anahtarlarını koru.
- [ ] Gereksiz fotoğraf boyutları, yinelenen cümleler ve sayfa yükünü azalt.
- [ ] Ana sayfada tek eylem, derslerde kademeli içerik gösterimini koru.

## GO-6 — Yayın kabulü

- [ ] AYDA eğitmen/Prüfer içeriği ve ÖSD görevlerine uygunluğu gözden geçirsin.
- [ ] En az bir A1.1 (12 ünite) mezunu öğrenciyle öğretmen gözetiminde 15 günlük akışın kullanılabilirliği ölçülsün.
- [ ] Son gerçek cihaz ve senaryo testleri, kritik hatasız kabul edilsin.
- [ ] Sonraki yayınlarda önce dal/önizleme, sonra ana dala geçiş ve geri dönüş noktası kullanılsın.

## Yayın ilkeleri

1. Kök A2 sayfası ve eski yönlendirmeler korunur; A1 ayrı `/a1/` yolunda çalışır.
2. Öğrenci giriş kontrolü kaldırılmaz; mevcut merkezî düzen korunur. Bu düzen sunucu tarafı yetki doğrulamasına eşdeğer değildir.
3. Daha sonraki GO'lar tamamlanmadan **işaretlenmez**; bir kutu ancak uygulanıp doğrulandıktan sonra `[x]` olur.
4. ÖSD'nin resmî telifli materyalleri çoğaltılmaz; fotoğraflar ve örnekler AYDA'ya ait öğretici üretimlerdir.
5. ÖSD A1 sözlü geçme şartı veya 15 günde başarı **garanti edilmez**. AYDA'nın deneme hedefi eğitim amaçlıdır.

## GO-2 ve GO-3 gerçekleştirme özeti

- Öğrenci seçtiği dört konuda örnekleri kendi hayatına uyarlayıp farklı ek soruları cevaplıyor.
- Fotoğrafta dört ayrı soruyu tek tek çalışıyor; sahne kelimelerini açıp kapatabiliyor ve model cevabı yalnızca istediğinde görüyor.
- Üçüncü görevde seçtiği fotoğraf korunuyor; görevli/öğrenci replikleri sırayla ilerliyor, role uygun jokerler kullanılıyor. 18 sahne için diyaloglar korunuyor.
- Sınav modunda dört konu ve üç fotoğraftan seçim sonrası 10 dk hazırlık ve 10 dk sözlü zamanlayıcı, kapalı öğretici ipuçları, öğretmene özel 25 puan formu yer alıyor.
- 18 sahne / 15 gün veri bütünlüğü ve uygulama akışları kod seviyesinde sınandı; otomatik tarayıcı erişimi bu ortamda engellendiğinden gerçek cihaz/doğrudan uçtan uca test sonraki GO'ya bırakıldı.
- A2 kök sayfası ve mevcut şifre altyapısı değiştirilmedi. Yeni motor `a1/go23.js` dosyasında, bağlayıcı minimal ekleme `a1/index.html` içindedir.

**Takip:** GO-4, GO-5 ve GO-6 henüz tamamlanmadı. Başarı veya telaffuz puanı otomatik verilmez.

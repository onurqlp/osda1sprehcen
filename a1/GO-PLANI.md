# AYDA ÖSD A1 Sprechen — Canlı GO Yol Haritası

**Sürüm:** GO-1.3x · 11 Kasım 2026  
**Hedef repo:** `onurqlp/osda1sprehcen`  
**A1 yayın yolu:** `https://onurqlp.github.io/osda1sprehcen/a1/`  
**Bağımsız önizleme:** `https://ayda-osd-a1-15gun-onizleme.vercel.app/`  
**İş prensibi:** Her GO bir aşamayı tamamlar, test edilir, A1 yayın yoluna alınır ve bu dosyada `[x]` yapılır. Var olan `/` ana sayfası (A2) ve merkezi öğrenci giriş mekanizması korunur.

## GO durumu

- [x] **GO-1.3x — 18 görseli doğrula ve zenginleştir.** 18 görsel / 18 eşleşen görev, 6 yeni özgün fotoğraf, 72 dört-soru cevabı, 54 duruma uygun joker, 108 kısa diyalog repliği, A1.1 → A1.2 model anlatımlar, ayrı öğrenci/görevli rolleri, yanlış eşleşme düzeltmeleri. İlk canlı A1 sürümü ayrı `/a1/` yoluna alınır.
- [ ] **GO-2 — Aufgabe 1–2 öğretim derinliği.** Altı resmî tanıtım konusundan dört seçim, kişisel konuşma planları, kademeli ipucu, cümle çeşitlendirme, resimde nesne/kişi/yer/eylem becerileri için etkin çalışmalar.
- [ ] **GO-3 — Aufgabe 3 gerçek etkileşim.** Öğrenci–görevli sıra alma, duruma göre soru sorup yanıtlama, plan/alışveriş/sağlık/ulaşım farklılıkları, jokerlerin yanlış kullanılmasına karşı geri bildirim.
- [ ] **GO-4 — Gerçekçi tam sözlü denemeler.** Hazırlık ve sınav zamanlaması, seçilen görseli üçüncü görevde koruma, ipuçlarını kapatma, öğretmen için resmî 25 puanlık değerlendirme ölçütleri.
- [ ] **GO-5 — Kalite ve kullanılabilirlik.** Android/iPhone ses-telaffuz, mikrofon, 360–1440 px arayüz, erişilebilirlik, hız, resim telif ve içerik doğruluğu, öğrenci veri saklama ve erişim güvenliği kontrolü.
- [ ] **GO-6 — Son onay ve ana yönlendirme.** Tüm testler ve öğretmen içerik kontrolü, yedek/geri dönüş, A1 navigasyonu ve eski bağlantılar, gerekirse ana sayfa yönlendirmeleri. Sonrasında baskıya uygun PDF çalışması.

## GO-1.3x doğrulama

- [x] 18 görselin dört soru ve rol yapma görevi aynı fotoğrafa dayanıyor.
- [x] Önceki yanlış bağlamlar onarıldı: park/ders saati, market/beden, kafe/ekmek, tren/bilet yerine yön tarifi, doktor/randevu yerine muayene diyaloğu, mutfak/davet yerine birlikte yemek hazırlama.
- [x] Görsellerde gözlenenler ile tahmin edilenler ayrıldı; arka planda insanlar bulunan sınıf örneğinde kesin toplam sayı uydurulmadı.
- [x] Fotoğraf seçimi, sahne kelimeleri, dört soru, üç joker ve altı replikten oluşan diyalog aynı veriyle eşleştirildi.
- [x] Her sahne için başlangıç ve genişletilmiş A1 anlatım modelleri mevcut.
- [x] Masaüstünde 18 sahnenin soru/joker/diyalog sayıları test edildi; 390px mobilde fotoğraf, rol, yatay taşma, giriş ekranı ve JS hata kontrolü yapıldı.
- [x] A1 sayfasına repodaki mevcut merkezi giriş deseni eklendi; eski ana sayfa dosyaları değiştirilmedi.
- [ ] Gerçek öğrenci hesabıyla giriş ve bütün cihazlarda ses/mikrofon kontrolü (GO-5 kapsamında).

**Sınırlar:** Bu bir ÖSD resmî materyali değildir; AYDA tarafından hazırlanmış özgün öğretici içeriktir. Otomatik telaffuz puanı/başarı garantisi yoktur. İlk GO'yu tamamlamak GO-2–GO-6'nın yapıldığı anlamına gelmez.

## Yayın ve geri alma prensibi

- Her GO'da yalnızca A1 klasörü güncellenir; mevcut `index.html`, `script.js`, `styles.css`, yönlendirme veya `ayda-pass` kodu üstüne yazılmaz.
- Vercel önizlemesi ve GitHub Pages A1 sayfası aynı içerik sürümüne getirilir.
- Sorun varsa önceki GitHub commit'i üzerinden yalnızca A1 yolunun eski dosyası geri getirilebilir; A2 sayfasına müdahale edilmez.
- Öğretim güvenilirliği için resmî ÖSD ZA1 formatı, görev dili ve puan formu kullanılır; özgün fotoğraflar gerçek sınav görseli olarak tanıtılmaz.

### Dayanaklar

- ÖSD ZA1 resmî açıklama: https://osd.at/portfolio-item/osd-zertifikat-a1-za1/
- ÖSD sözlü örnek kâğıdı: https://www.osd.at/wp-content/uploads/sites/7/2024/03/za1oe_ms_hp_sprechen_2024-03-26.pdf
- ÖSD değerlendirme formu: https://www.osd.at/wp-content/uploads/2024/07/ZA1-AW_m_Ver.4.0_22_04_24-1.pdf
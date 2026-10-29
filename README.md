# Kalkulator stali

Kalkulator który liczy stal – wycena materiału: wagi profili, blach i prętów, rozkroje z PDF (np. Mazak), listy materiałowe z Excela/PDF, eksport do PDF i Excela.

Jedna aplikacja, trzy formy:

| Gdzie | Jak zdobyć |
|---|---|
| **Przeglądarka / PWA** (telefon i komputer) | https://mateo170271824.github.io/Kalkulator-stali/ → „Zainstaluj aplikację” (Android/Chrome) lub Udostępnij → „Do ekranu początkowego” (iPhone) |
| **Android (APK)** | [Kalkulator-stali.apk](https://github.com/Mateo170271824/Kalkulator-stali/releases/download/android/Kalkulator-stali.apk) – pobierz na telefonie i otwórz; Android zapyta o zgodę na instalację z tego źródła |
| **iOS (IPA)** | [Kalkulator-stali-niepodpisana.ipa](https://github.com/Mateo170271824/Kalkulator-stali/releases/download/ios/Kalkulator-stali-niepodpisana.ipa) – wymaga podpisania przy instalacji (Sideloadly/AltStore z Apple ID albo Xcode z kontem Apple Developer) |

Wszystko działa bez internetu, dane zostają na urządzeniu.

## Jak to jest zbudowane

- `index.html` – cała aplikacja; `vendor/` – pdf.js, SheetJS, jsPDF; `fonts/` – IBM Plex
- `sw.js`, `manifest.webmanifest`, `icons/` – tryb offline i instalacja PWA (po zmianie plików podbij `VERSION` w `sw.js`)
- `src/native.js` – zapis plików w aplikacji Android/iOS (okno „Udostępnij”)
- `android/`, `ios/` – projekty natywne [Capacitor](https://capacitorjs.com); `assets/` – źródła ikon i ekranu startowego
- `npm run build` składa stronę do `www/`, `npm run sync` kopiuje ją do projektów natywnych

## Automaty (GitHub Actions)

Każdy push do `main`:
- `pages.yml` – publikuje stronę na GitHub Pages
- `android.yml` – buduje APK i wystawia w Releases (tag `android`)
- `ios.yml` – buduje niepodpisane IPA i wystawia w Releases (tag `ios`)

Na pull requestach APK i IPA są tylko budowane (do sprawdzenia w zakładce Actions → Artifacts).

### Podpis Androida

Klucz podpisu trzymaj tylko w sekretach repozytorium (Settings → Secrets and variables → Actions):
`ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`, `ANDROID_KEY_PASSWORD`.
Z nim kolejne wersje APK instalują się na poprzednich bez utraty danych. Bez sekretów APK jest podpisane
kluczem testowym, który zmienia się przy każdej kompilacji – wtedy przed instalacją nowej wersji trzeba odinstalować starą.

## Lokalnie

```
npm ci
npm run serve          # strona na http://localhost:8000
npm run sync           # potem: npx cap open android / npx cap open ios
```

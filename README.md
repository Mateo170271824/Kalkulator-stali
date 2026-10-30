# Kalkulator stali

Kalkulator który liczy stal – wycena materiału: wagi profili, blach i prętów, rozkroje z PDF (np. Mazak), listy materiałowe z Excela/PDF, eksport do PDF i Excela.

Jedna aplikacja, dwie formy:

| Gdzie | Jak zdobyć |
|---|---|
| **Przeglądarka / PWA** (telefon i komputer) | https://mateo170271824.github.io/Kalkulator-stali/ → „Zainstaluj aplikację” (Android/Chrome) lub Udostępnij → „Do ekranu początkowego” (iPhone) |
| **Android (APK)** | [Kalkulator-stali.apk](https://github.com/Mateo170271824/Kalkulator-stali/releases/download/android/Kalkulator-stali.apk) – pobierz na telefonie i otwórz; Android zapyta o zgodę na instalację z tego źródła |

Wszystko działa bez internetu, dane zostają na urządzeniu.

## Jak to jest zbudowane

- `index.html` – cała aplikacja; `vendor/` – pdf.js, SheetJS, jsPDF; `fonts/` – IBM Plex
- `sw.js`, `manifest.webmanifest`, `icons/` – tryb offline i instalacja PWA (po zmianie plików podbij `VERSION` w `sw.js`)
- `src/native.js` – zapis plików w aplikacji Android (okno „Udostępnij”)
- `android/` – projekt natywny [Capacitor](https://capacitorjs.com); `assets/` – źródła ikon i ekranu startowego
- `npm run build` składa stronę do `www/`, `npm run sync` kopiuje ją do projektu Android

## Automaty (GitHub Actions)

Każdy push do `main`:
- `pages.yml` – publikuje stronę na GitHub Pages
- `android.yml` – buduje APK i wystawia w Releases (tag `android`)

Na pull requestach APK jest tylko budowane (do sprawdzenia w zakładce Actions → Artifacts).

Na iPhonie używaj wersji z Safari (PWA): Udostępnij → „Do ekranu początkowego”.

### Podpis Androida

APK jest podpisywane stałym kluczem z sekretów repozytorium (Settings → Secrets and variables → Actions):
`ANDROID_KEYSTORE_BASE64` (plik klucza w base64) i `ANDROID_KEYSTORE_PASSWORD`. Dzięki temu nowe wersje
instalują się na starych bez utraty danych. Bez tych sekretów wersja z `main` nie zostanie opublikowana.
Kopię klucza i hasła trzymaj bezpiecznie poza GitHubem – sekretu nie da się później odczytać.

## Lokalnie

```
npm ci
npm run serve          # strona na http://localhost:8000
npm run sync           # potem: npx cap open android
```

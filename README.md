# Kalkulator stali

Kalkulator który liczy stal – wycena materiału: wagi profili, blach i prętów, rozkroje z PDF (np. Mazak), listy materiałowe z Excela/PDF, eksport do PDF i Excela.

To aplikacja webowa (PWA): działa w przeglądarce, można ją zainstalować na telefonie i komputerze, działa też bez internetu. Dane zostają na urządzeniu.

## Instalacja na telefonie

- **Android (Chrome):** otwórz adres aplikacji → menu ⋮ → „Zainstaluj aplikację” / „Dodaj do ekranu głównego”.
- **iPhone (Safari):** otwórz adres → przycisk Udostępnij → „Do ekranu początkowego”.
- **Komputer (Chrome/Edge):** ikona instalacji na pasku adresu.

## Publikacja

Każdy push do `main` publikuje aplikację na GitHub Pages (`.github/workflows/pages.yml`).
Jednorazowo: Settings → Pages → Source: **GitHub Actions**.

## Struktura

- `index.html` – cała aplikacja (z artefaktu „Kalkulator stali”)
- `vendor/` – biblioteki (pdf.js, SheetJS, jsPDF) zapisane lokalnie, żeby działało offline
- `fonts/` – czcionki IBM Plex
- `sw.js` – tryb offline; po zmianie plików podbij `VERSION`
- `manifest.webmanifest`, `icons/` – ikona i ustawienia instalacji

Uruchomienie lokalne: `python3 -m http.server` i wejdź na http://localhost:8000

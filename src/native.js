// Zapis plików w aplikacji Android: plik trafia do pamięci podręcznej,
// a potem otwiera się systemowe okno „Udostępnij” (zapis do Pobranych/Plików, mail, WhatsApp…).
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

function toBase64(blob) {
  return new Promise((ok, err) => {
    const r = new FileReader();
    r.onload = () => ok(String(r.result).split(',')[1] || '');
    r.onerror = () => err(r.error);
    r.readAsDataURL(blob);
  });
}

window.NativeApp = {
  isNative: Capacitor.isNativePlatform(),
  async saveFile(filename, blob) {
    const data = await toBase64(blob);
    const { uri } = await Filesystem.writeFile({ path: filename, data, directory: Directory.Cache });
    try {
      await Share.share({ title: filename, files: [uri], dialogTitle: 'Zapisz lub wyślij ' + filename });
    } catch (e) {
      const msg = String((e && e.message) || e);
      if (/cancel/i.test(msg)) return 'cancelled';
      throw e;
    }
    return 'shared';
  }
};

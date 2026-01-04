// Script para extraer los nombres de todas las canciones
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Leer el archivo de playlists
const playlistsPath = path.join(__dirname, 'src', 'data', 'playlists.json');
const playlists = JSON.parse(fs.readFileSync(playlistsPath, 'utf-8'));

// Extraer todas las canciones
const todasLasCanciones = [];

playlists.forEach(playlist => {
  console.log(`\n📀 Playlist: ${playlist.nombre}`);
  console.log('─'.repeat(50));
  
  playlist.canciones.forEach((cancion, index) => {
    console.log(`${index + 1}. ${cancion}`);
    todasLasCanciones.push({
      playlist: playlist.nombre,
      cancion: cancion
    });
  });
});

// Resumen
console.log('\n' + '═'.repeat(50));
console.log(`\n📊 Total de canciones: ${todasLasCanciones.length}`);
console.log(`📊 Total de playlists: ${playlists.length}`);

// Guardar en un archivo de texto
const outputPath = path.join(__dirname, 'canciones.txt');
let contenido = 'LISTA DE TODAS LAS CANCIONES\n';
contenido += '═'.repeat(50) + '\n\n';

playlists.forEach(playlist => {
  contenido += `\n📀 ${playlist.nombre}\n`;
  contenido += '─'.repeat(50) + '\n';
  playlist.canciones.forEach((cancion, index) => {
    contenido += `${index + 1}. ${cancion}\n`;
  });
});

contenido += `\n${'═'.repeat(50)}\n`;
contenido += `Total: ${todasLasCanciones.length} canciones en ${playlists.length} playlists\n`;

fs.writeFileSync(outputPath, contenido, 'utf-8');
console.log(`\n✅ Archivo guardado en: ${outputPath}`);

// Script para extraer nombres de canciones desde URLs de Spotify
import fs from 'fs';
import https from 'https';

// Lista de URLs de Spotify
const spotifyUrls = [
 "https://open.spotify.com/track/0BQlvUmALL0LY6m0SdWQBh" 
, "https://open.spotify.com/track/4NaTAo6cCbOhZd5NFg4GZE" 
, "https://open.spotify.com/track/1IlCigMLxgjhs2V4wqNTjE" 
, "https://open.spotify.com/track/6PKDXMbd0gSKexNhSMh9y4" 
, "https://open.spotify.com/track/77WEIlG4bwu8YwbGHiA12q" 
, "https://open.spotify.com/track/5hdfJikp4DEYpaQCY0bfCO" 
, "https://open.spotify.com/track/7qeC5v437Gspg9ztWe8iB7" 
, "https://open.spotify.com/track/2PlzgmOJzXWllsy3qeKzBM" 
, "https://open.spotify.com/track/7CvbTPKaIIjCcGliRy0s0s" 
, "https://open.spotify.com/track/3K2bKeDWgBa0Ue2RaaldSg" 
, "https://open.spotify.com/track/4Kf7N1Zw2KCXiO3ZfGx1lr" 
, "https://open.spotify.com/track/2IEKK0tfMWp9GCPQSuNO12" 
, "https://open.spotify.com/track/0GRiY88LmhQfCJvpYxCpwp" 
, "https://open.spotify.com/track/6UAxSn52BI7374D8T77ui9" 
, "https://open.spotify.com/track/1K1G1elLyvVv8TJrzQdEti" 
, "https://open.spotify.com/track/081Mvz7Yv6PuKxL1qoz2mk" 
, "https://open.spotify.com/track/3RMAD5w0MMis2jhEpJxfHE" 
, "https://open.spotify.com/track/1V5Sp7oibiBMM93WBaSgmC" 
, "https://open.spotify.com/track/0RpkcMr1qsjJOu5EFtWWhK" 
, "https://open.spotify.com/track/0JC1L6Q2plZjQ725jObjzS" 
, "https://open.spotify.com/track/19TEEWVkSpCIQ4WI9EwkdS" 
, "https://open.spotify.com/track/4Y58EZbPYHrBzVcsgBqo9I" 
, "https://open.spotify.com/track/6x35ffNJS5sUE7aeswXdvI" 
, "https://open.spotify.com/track/74eBz0JzQTcAuC4uFuHySZ" 
, "https://open.spotify.com/track/6oUmpfin2X6uFMog9Ni78Y" 
, "https://open.spotify.com/track/1bVWqekrhC0jLxzv25Kupx" 
, "https://open.spotify.com/track/3fV60Gc7UUzZL1Exx9Uwsu" 
, "https://open.spotify.com/track/6O5Cn5UZNjlpmscE7GXygW" 
, "https://open.spotify.com/track/6dU2Iqanz24i29DBsN2rB8" 
, "https://open.spotify.com/track/6xuLaXMp08OMfhVjSpOwbE" 
, "https://open.spotify.com/track/25ceQNY9Lmb9XAMciab1zF" 
, "https://open.spotify.com/track/1fF6GpF46Nk3eqohii0Xnm" 
, "https://open.spotify.com/track/7HZ372hIGqOLOXKCs1idBg" 
, "https://open.spotify.com/track/6PY1R0WG4E9IVmeVTex0Yz" 
, "https://open.spotify.com/track/4NlFzL2g7SRUEzG6cMMqAZ" 
, "https://open.spotify.com/track/7uDngH8WP4UiPCAasXf4bT" 
, "https://open.spotify.com/track/21ewUBMvZaP10vQedqCpMt" 
, "https://open.spotify.com/track/7dFS1o7ONIBrx1OhjeP9Rf" 
, "https://open.spotify.com/track/52Z8fEwnvGSxOfI3vNswav" 
, "https://open.spotify.com/track/6M9SKjnKml7CFn713zlsvf" 
];

// Función para hacer la petición HTTP y extraer el nombre de la canción
function fetchSongName(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          // Extraer el título de la página usando regex
          const titleMatch = data.match(/<title>(.*?)<\/title>/i);
          if (titleMatch && titleMatch[1]) {
            // El formato es generalmente "Nombre de la Canción - song and lyrics by Artista | Spotify"
            let songInfo = titleMatch[1]
              .replace(' | Spotify', '')
              .replace(' - song and lyrics by', ' -')
              .replace(' - song by', ' -')
              .trim();
            resolve(songInfo);
          } else {
            resolve('No se pudo extraer el nombre');
          }
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Función para agregar delay entre peticiones
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Función principal
async function extractAllSongs() {
  console.log(`🎵 Extrayendo información de ${spotifyUrls.length} canciones...\n`);
  
  const songs = [];
  let processed = 0;
  
  for (const url of spotifyUrls) {
    try {
      processed++;
      console.log(`[${processed}/${spotifyUrls.length}] Procesando: ${url}`);
      
      const songInfo = await fetchSongName(url);
      songs.push(songInfo);
      console.log(`  ✓ ${songInfo}\n`);
      
      // Esperar 500ms entre peticiones para no saturar el servidor
      await delay(500);
    } catch (error) {
      console.error(`  ✗ Error: ${error.message}\n`);
      songs.push(`Error al obtener: ${url}`);
    }
  }
  
  // Generar el archivo de texto
  let content = 'LISTA DE CANCIONES EXTRAÍDAS DE SPOTIFY\n';
  content += '═'.repeat(60) + '\n';
  content += `Fecha: ${new Date().toLocaleString('es-ES')}\n`;
  content += `Total de canciones: ${songs.length}\n`;
  content += '═'.repeat(60) + '\n\n';
  
  songs.forEach((song, index) => {
    content += `${index + 1}. ${song}\n`;
  });
  
  content += '\n' + '═'.repeat(60) + '\n';
  content += `✓ Extracción completada\n`;
  
  const outputFile = 'canciones-spotify.txt';
  fs.writeFileSync(outputFile, content, 'utf-8');
  
  console.log('═'.repeat(60));
  console.log(`✅ Archivo generado exitosamente: ${outputFile}`);
  console.log(`📊 Total de canciones procesadas: ${songs.length}`);
  console.log('═'.repeat(60));
}

// Ejecutar el script
extractAllSongs().catch(console.error);
